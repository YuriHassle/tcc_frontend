<template>
  <v-main class="inn-container">
    <section v-if="inns.length <= 0 && message === ''">
      <h1 class="mb-6">
        Seu perfil ainda não foi vinculado a nenhuma pousada.
      </h1>
      <p>
        Se você é proprietário de uma pousada e deseja cadastrá-la
        <RouterLink to="/inn">clique aqui</RouterLink>
      </p>
    </section>
    <section v-else>
      <h1 class="mb-6">Suas Pousadas</h1>
      <div v-for="(inn, index) in inns" :key="index" class="mb-4">
        <strong class="inn-name">{{ inn.name }}</strong>
      </div>
      <RouterLink to="/inn">Cadastrar nova pousada</RouterLink>
    </section>
    <Message :message="message" class="mt-6" />
  </v-main>
</template>

<script>
import { getInns } from '../services/inn'
import Message from '../components/atoms/Message.vue'

export default {
  name: 'HomeView',
  components: { Message },
  data() {
    return {
      message: '',
      inns: [],
    }
  },
  methods: {
    loadInns() {
      this.message = 'Carregando Pousadas...'
      getInns()
        .then(({ data }) => (this.inns = data.data))
        .catch(
          () => (this.message = 'Não foi possível carregar suas pousadas.')
        )
        .finally(() => (this.message = ''))
    },
  },
  created() {
    this.loadInns()
  },
}
</script>

<style scoped>
.inn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inn-name {
  color: purple;
}
</style>
