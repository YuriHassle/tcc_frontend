<template>
  <v-footer app absolute>
    <p class="pa-3 my-auto subtitle">
      © 2022 - Inn Manager. Todos os direitos reservados.
    </p>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.subtitle {
  color: rgb(90, 90, 90);
}

@media screen and (max-width: 600px) {
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>
