<template>
  <section class="register-container">
    <h1 class="mb-3">Cadastro</h1>
    <RegisterForm class="mb-8" />
  </section>
</template>

<script>
import RegisterForm from '../components/organisms/RegisterForm.vue'
export default {
  components: { RegisterForm },
}
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
