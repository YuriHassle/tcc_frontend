<template>
  <section class="login-container">
    <h1 class="mb-3">Login</h1>
    <LoginForm class="mb-8" />
    <span class="mb-6">
      Ainda não possui cadastro?
      <RouterLink :to="{ name: 'register' }">
        Registre-se gratuitamente
      </RouterLink>
    </span>
  </section>
</template>

<script>
import LoginForm from '../components/organisms/LoginForm.vue'
export default {
  components: { LoginForm },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
