<template>
  <v-container>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="900"
      type="table-tbody"
    ></v-skeleton-loader>
    <v-data-table
      v-else
      :headers="headers"
      :items="bookings"
      sort-by="name"
      class="elevation-1"
      :footer-props="{
        itemsPerPageAllText: 'Todos',
        itemsPerPageText: 'Itens por página',
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Reservas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogEdit" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark class="mb-2 btn" v-bind="attrs" v-on="on">
                Cadastrar
              </v-btn>
            </template>
            <!-- Form -->
            <v-form
              ref="moduleForm"
              v-model="valid"
              @submit.prevent="handleSubmit()"
            >
              <v-card class="pa-5">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model.trim="booking.holder_name"
                        label="Nome do titular"
                        required
                        :rules="validators.name"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model.trim="booking.holder_phone"
                        label="Telefone do titular"
                        required
                        :rules="validators.holder_phone"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model.trim="booking.holder_email"
                        label="E-mail do titular"
                        required
                        :rules="validators.holder_email"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model="booking.guest_quantity"
                        label="Número de hóspedes"
                        required
                        :rules="validators.guest_quantity"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model.trim="booking.checkin"
                        label="Data de chegada"
                        required
                        :rules="validators.checkin"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model="booking.checkout"
                        label="Data de partida"
                        required
                        :rules="validators.checkout"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="booking.package_id"
                        :items="innPackages"
                        item-text="name"
                        item-value="id"
                        label="Pacote"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <Input v-model="booking.details" label="Detalhes" />
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions class="flex-column justify-center">
                  <Message v-if="message" :message="message" />
                  <div class="flex-row">
                    <v-btn color="blue darken-1" text type="submit">
                      Salvar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="closeDialog">
                      Cancelar
                    </v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="handleActionClick('edit', item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="handleActionClick('delete', item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Recarregar </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Input from '../components/atoms/Input.vue'
import Message from '../components/atoms/Message.vue'
import { Validator as v } from '@/helpers/validators'
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from '@/services/bookings'
import { getPackages } from '@/services/packages'
import { mapState } from 'vuex'

import { alert, errorAlert, deleteConfirmationAlert } from '@/helpers/alerts'

const NO_INDEX_FOCUSED = -1
const OBJECT = 'reserva'
const OBJECT_CAPITAL = 'Reserva'
const OBJECT_PLURAL = 'reservas'

export default {
  components: { Input, Message },
  data() {
    return {
      dialogEdit: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Titular',
          align: 'start',
          value: 'holder_name',
        },
        { text: 'Telefone', value: 'holder_phone' },
        { text: 'E-mail', value: 'holder_email' },
        { text: 'N. Convidados', value: 'guest_quantity' },
        { text: 'Chegada', value: 'checkin' },
        { text: 'Partida', value: 'checkout' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      innPackages: [],
      bookings: [],
      focusedIndex: NO_INDEX_FOCUSED,
      booking: {
        id: '',
        package_id: '',
        holder_name: '',
        holder_email: '',
        holder_phone: '',
        guest_quantity: '',
        checkin: '',
        checkout: '',
        is_cancelled: false,
        details: '',
      },
      validators: {
        guest_quantity: [v.required()],
        checkin: [v.required()],
        checkout: [v.required()],
        holder_name: [v.required()],
        holder_telephone: [v.required()],
        holder_email: [v.required()],
      },
      message: '',
      valid: null,
      loading: false,
    }
  },

  computed: {
    ...mapState('inn', ['activeInn']),
    formTitle() {
      return this.formType === 'register'
        ? `Cadastrar ${OBJECT_CAPITAL}`
        : `Editar ${OBJECT_CAPITAL}`
    },
    formType() {
      return this.focusedIndex === NO_INDEX_FOCUSED ? 'register' : 'edit'
    },
  },

  watch: {
    dialogEdit(val) {
      val || this.closeDialog()
    },
    dialogDelete(val) {
      val || this.closeDialog()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.loading = true
      getBookings({ inn_id: this.activeInn.id })
        .then(({ data }) => {
          this.bookings = data.data
        })
        .catch(() => errorAlert(`listar as ${OBJECT_PLURAL}`))
        .finally(() => (this.loading = false))

      getPackages({ inn_id: this.activeInn.id }).then(
        ({ data }) => (this.innPackages = data.data)
      )
    },

    handleActionClick(type, item) {
      this.focusedIndex = this.bookings.indexOf(item)
      this.booking = { ...item }
      switch (type) {
        case 'edit':
          this.dialogEdit = true
          break
        case 'delete':
          deleteConfirmationAlert(item.name).then((result) => {
            if (result.isConfirmed) return this.delete()
            this.closeDialog()
          })
          break
      }
    },

    handleSubmit() {
      this.$refs.moduleForm.validate()
      if (!this.valid) {
        return (this.message = 'Por favor, preencha os dados corretamente!')
      }

      this.message = 'Enviando dados...'

      if (this.formType === 'edit') {
        this.update()
      } else if (this.formType === 'register') {
        this.save()
      }
    },

    update() {
      updateBooking(this.booking.id, this.booking)
        .then(({ data }) => {
          Object.assign(this.bookings[this.focusedIndex], data.data)
          alert('success', 'Sucesso!', `${OBJECT_CAPITAL} atualizada.`)
        })
        .catch(() => errorAlert(`editar a ${OBJECT}`))
        .finally(() => this.closeDialog())
    },

    save() {
      createBooking({
        ...this.booking,
        inn_id: this.activeInn.id,
      })
        .then(({ data }) => {
          this.bookings.push(data.data)
          alert('success', 'Sucesso!', `${OBJECT_CAPITAL} cadastrada.`)
        })
        .catch(() => errorAlert(`cadastrar ${OBJECT}`))
        .finally(() => this.closeDialog())
    },

    delete() {
      deleteBooking(this.booking.id)
        .then(() => {
          this.bookings.splice(this.focusedIndex, 1)
          alert('success', 'Sucesso!', `${OBJECT_CAPITAL} excluído.`)
        })
        .catch(() => errorAlert(`excluir ${OBJECT}`))
        .finally(() => this.closeDialog())
    },

    closeDialog() {
      this.dialogEdit = false
      this.message = ''
      this.$refs?.moduleForm?.reset()
      this.booking = {}
      this.$nextTick(() => {
        this.focusedIndex = NO_INDEX_FOCUSED
      })
    },
  },
}
</script>

<style></style>
