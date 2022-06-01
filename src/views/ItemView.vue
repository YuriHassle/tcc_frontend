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
      :items="items"
      sort-by="name"
      class="elevation-1"
      :footer-props="{
        itemsPerPageAllText: 'Todos',
        itemsPerPageText: 'Itens por página',
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Itens</v-toolbar-title>
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
                        v-model.trim="item.name"
                        label="Name"
                        required
                        :rules="validators.name"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <Input
                        v-model="item.stock_quantity"
                        label="Quantidade"
                        required
                        :rules="validators.stock_quantity"
                      />
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
import { getItems, createItem, updateItem, deleteItem } from '@/services/items'
import { mapState } from 'vuex'

import { alert, errorAlert, deleteConfirmationAlert } from '@/helpers/alerts'

const NO_INDEX_FOCUSED = -1
const OBJECT = 'item'
const OBJECT_CAPITAL = 'Item'
const OBJECT_PLURAL = 'itens'

export default {
  components: { Input, Message },
  data() {
    return {
      dialogEdit: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },
        { text: 'Quantidade', value: 'stock_quantity' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      items: [],
      focusedIndex: NO_INDEX_FOCUSED,
      item: {
        id: '',
        name: '',
        stock_quantity: '',
      },
      validators: {
        name: [v.required()],
        stock_quantity: [v.required()],
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
      getItems({ inn_id: this.activeInn.id })
        .then(({ data }) => {
          this.items = data.data
        })
        .catch(() => errorAlert(`listar os ${OBJECT_PLURAL}`))
        .finally(() => (this.loading = false))
    },

    handleActionClick(type, item) {
      this.focusedIndex = this.items.indexOf(item)
      this.item = { ...item }
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
      updateItem(this.item.id, this.item)
        .then(({ data }) => {
          Object.assign(this.items[this.focusedIndex], data.data)
          alert('success', 'Sucesso!', `${OBJECT_CAPITAL} atualizado.`)
        })
        .catch(() => errorAlert(`editar o ${OBJECT}`))
        .finally(() => this.closeDialog())
    },

    save() {
      createItem({ ...this.item, inn_id: this.activeInn.id })
        .then(({ data }) => {
          this.items.push(data.data)
          alert('success', 'Sucesso!', `${OBJECT_CAPITAL} cadastrado.`)
        })
        .catch(() => errorAlert(`cadastrar ${OBJECT}`))
        .finally(() => this.closeDialog())
    },

    delete() {
      deleteItem(this.item.id)
        .then(() => {
          this.items.splice(this.focusedIndex, 1)
          alert('success', 'Sucesso!', `${OBJECT_CAPITAL} excluído.`)
        })
        .catch(() => errorAlert(`excluir ${OBJECT}`))
        .finally(() => this.closeDialog())
    },

    closeDialog() {
      this.dialogEdit = false
      this.message = ''
      this.$refs?.moduleForm?.reset()
      this.item = {}
      this.$nextTick(() => {
        this.focusedIndex = NO_INDEX_FOCUSED
      })
    },
  },
}
</script>

<style></style>
