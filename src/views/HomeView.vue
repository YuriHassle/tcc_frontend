<template>
  <v-main class="inn-container">
    <section v-if="inns && inns.length === 0">
      <h1 class="mb-6">
        Seu perfil ainda não foi associado a nenhuma pousada.
      </h1>
      <p>
        Se você é proprietário de uma pousada e deseja cadastrá-la
        <RouterLink :to="{ name: 'register_inn' }">clique aqui</RouterLink>
      </p>
    </section>
    <section v-if="inns && inns.length > 0">
      <h1 class="mb-6">Suas Pousadas</h1>
      <div v-for="(inn, index) in inns" :key="index" class="mb-4">
        <a class="inn-name" @click="handleClick(inn)">
          {{ inn.name }}
        </a>
      </div>
      <RouterLink :to="{ name: 'register_inn' }">
        Cadastrar nova pousada
      </RouterLink>
    </section>
    <Message :message="message" class="mt-6" />
  </v-main>
</template>

<script>
import { getInns } from '../services/inn'
import Message from '../components/atoms/Message.vue'
import { mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: { Message },
  data() {
    return {
      message: '',
      inns: null,
    }
  },
  methods: {
    ...mapActions('inn', ['setActiveInn']),
    loadInns() {
      this.message = 'Carregando Pousadas...'
      getInns()
        .then(({ data }) => {
          this.message = ''
          this.inns = data.data
        })
        .catch(
          () => (this.message = 'Não foi possível carregar suas pousadas.')
        )
    },
    handleClick(inn) {
      this.setActiveInn(inn)
      this.$router.push({ name: 'bookings', params: { inn_id: inn.id } })
    },
  },
  created() {
    this.loadInns()
    this.setActiveInn(null)
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
