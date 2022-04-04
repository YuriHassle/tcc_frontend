<template>
  <v-form
    ref="loginForm"
    v-model="valid"
    @submit.prevent="handleSubmit()"
    lazy-validation
  >
    <v-card width="500" class="mx-auto mb-3">
      <v-card-text class="pt-14 px-8">
        <Input
          label="Email"
          v-model="credentials.email"
          :rules="validators.email"
          class="mb-5"
        />
        <Input
          label="Senha"
          v-model="credentials.password"
          :rules="validators.password"
          type="password"
        />
      </v-card-text>
      <v-card-actions class="flex-column justify-center">
        <v-btn class="white--text mb-4 btn" elevation="2" type="submit">
          Entrar
        </v-btn>
        <Message :message="message" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { Validator as v } from '@/helpers/validators'
import Message from '../atoms/Message.vue'
import Input from '../atoms/Input'

export default {
  name: 'Login',
  components: { Message, Input },
  data() {
    return {
      valid: null,
      credentials: {
        email: '',
        password: '',
      },
      validators: {
        email: [v.required(), v.email()],
        password: [v.required()],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate()
      if (this.valid) {
        this.$store.dispatch('login', this.credentials)
      }
    },
  },
  computed: {
    message() {
      const loginStatus = this.$store.state.loginStatus
      if (!this.valid) {
        return 'Por favor, preencha os dados corretamente'
      } else if (loginStatus.loggingIn) {
        return 'Verificando credenciais...'
      } else if (loginStatus.serverNotReachable) {
        return 'Não foi possível se conectar com o servidor :('
      } else if (loginStatus.loginFailure) {
        return 'Credenciais inválidas'
      }
      return ''
    },
  },
  created() {
    this.$store.dispatch('logout')
  },
}
</script>

<style lang="scss" scoped></style>
