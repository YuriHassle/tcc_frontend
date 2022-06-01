<template>
  <v-form
    ref="innForm"
    v-model="valid"
    lazy-validation
    @submit.prevent="handleSubmit()"
  >
    <v-card width="500" class="mx-auto mb-3">
      <v-card-text class="pt-14 px-8">
        <Input
          v-model="inn.name"
          :rules="validators.name"
          label="Nome"
          required
        ></Input>

        <Input
          v-model="inn.detail"
          :rules="validators.email"
          label="Descrição"
        ></Input>

        <Input
          v-model="address.country"
          :rules="validators.country"
          label="País"
          required
        ></Input>

        <Input
          v-model="address.state"
          :rules="validators.state"
          label="Estado"
          required
        ></Input>

        <Input
          v-model="address.city"
          :rules="validators.city"
          label="Cidade"
        ></Input>

        <Input
          v-model="address.street"
          :rules="validators.street"
          label="Rua"
        ></Input>
        <Input
          v-model="address.number"
          :rules="validators.number"
          label="Número"
        ></Input>
        <Input
          v-model="address.district"
          :rules="validators.district"
          label="Bairro"
        ></Input>
        <Input
          v-model="address.cep"
          :rules="validators.cep"
          label="CEP"
        ></Input>
        <Input
          v-model="address.complement"
          :rules="validators.complement"
          label="Complemento"
        ></Input>
      </v-card-text>
      <v-card-actions class="flex-column justify-center">
        <v-btn class="white--text mb-4 btn" elevation="2" type="submit">
          Cadastrar
        </v-btn>
        <Message :message="message" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import Input from '../atoms/Input'
import Message from '../atoms/Message'
import { storeInn } from '../../services/inn'
import { Validator as v } from '@/helpers/validators'
import { alert } from '@/helpers/alerts'
import router from '../../router'

export default {
  components: { Input, Message },
  data() {
    return {
      valid: null,
      message: '',
      inn: {
        name: '',
        detail: '',
      },
      address: {
        country: '',
        state: '',
        city: '',
        street: '',
        number: '',
        district: '',
        cep: '',
        complement: '',
      },
      validators: {
        name: [v.required()],
        detail: [],
        country: [v.required()],
        state: [v.required()],
        city: [v.required()],
        street: [v.required()],
        number: [v.required()],
        district: [v.required()],
        cep: [],
        complement: [],
      },
    }
  },
  methods: {
    async handleSubmit() {
      this.$refs.innForm.validate()
      if (!this.valid) {
        return (this.message = 'Por favor, preencha os dados corretamente!')
      }
      try {
        await storeInn({ ...this.inn, address: this.address })
        alert('success', 'Sucesso!', 'Pousada cadastrada com sucesso.')
        router.push({ name: 'home' })
      } catch (error) {
        alert('error', 'Erro!', 'Não foi possível cadastrar a pousada.')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
