<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid class="page-container">
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/organisms/Header.vue'
import Footer from './components/organisms/Footer.vue'
export default {
  name: 'App',

  components: {
    Header,
    Footer,
  },

  created() {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const curr_url = this.$router.history.current.name
    if ((!token || !user) && curr_url !== 'login') {
      this.$store.dispatch('user/logout')
    }
  },
}
</script>

<style>
.btn {
  background-color: #2b62b4 !important;
  color: white !important;
}
.v-btn {
  text-transform: none !important;
}
.v-app-bar-title {
  text-transform: none !important;
  font-size: 1.1rem !important;
}
.card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f3f4c;
}
.strong {
  color: rgb(10, 137, 255);
}
.page-container {
  max-width: 90%;
}
.subtitle {
  color: rgb(114, 114, 114);
}

@media screen and (max-width: 600px) {
  .page-container {
    padding: 1px 1px 5px !important;
  }
  .v-app-bar-title {
    font-size: 1rem !important;
  }
}
</style>
