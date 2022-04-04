<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
p {
  color: #3d3d3d;
  font-size: 1.1rem;
  margin-top: 5px;
}
</style>
