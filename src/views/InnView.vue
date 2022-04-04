<template>
  <section class="inn-container">
    <h1 class="mb-3">Cadastrar Pousada</h1>
    <InnForm class="mb-8" />
  </section>
</template>

<script>
import InnForm from '../components/organisms/InnForm.vue'
export default {
  components: { InnForm },
}
</script>

<style lang="scss" scoped>
.inn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
