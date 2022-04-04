<template>
  <v-form
    ref="registerForm"
    v-model="valid"
    lazy-validation
    @submit.prevent="handleSubmit()"
  >
    <v-card width="500" class="mx-auto mb-3">
      <v-card-text class="pt-14 px-8">
        <Input
          v-model="user.name"
          :rules="validators.name"
          label="Nome"
          required
        ></Input>

        <Input
          v-model="user.email"
          :rules="validators.email"
          label="E-mail"
          required
        ></Input>

        <Input
          v-model="user.password"
          :rules="validators.password"
          label="Senha"
          type="password"
          required
        ></Input>

        <Input
          v-model="user.cpf"
          :rules="validators.cpf"
          label="CPF"
          required
        ></Input>

        <Input
          v-model="user.phone"
          :rules="validators.phone"
          label="Telefone"
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
import { Validator as v } from '@/helpers/validators'
import alert from '@/helpers/alerts'
import router from '../../router'

export default {
  components: { Input, Message },
  data() {
    return {
      valid: null,
      message: '',
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        cpf: '',
      },
      validators: {
        name: [v.required()],
        email: [v.required(), v.email()],
        password: [v.required()],
        phone: [v.minLen(10)],
        cpf: [v.required(), v.len(11)],
      },
    }
  },
  methods: {
    async handleSubmit() {
      this.$refs.registerForm.validate()
      if (!this.valid) {
        return (this.message = 'Por favor, preencha os dados corretamente!')
      }
      try {
        await this.$store.dispatch('register', this.user)
        alert('success', 'Sucesso!', 'Usuário cadastrado com sucesso.')
        router.push({ name: 'login' })
      } catch (error) {
        alert('error', 'Erro!', 'Não foi possível cadastrar o usuário.')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
