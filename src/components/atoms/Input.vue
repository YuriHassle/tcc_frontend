<template>
  <v-text-field
    outlined
    v-bind="$attrs"
    :value="value"
    @input="$emit('input', $event)"
  >
    <template v-if="required" v-slot:append>
      <span>*</span>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    value: {},
  },
}
</script>

<style scoped>
span {
  color: red;
  font-weight: bold;
  font-size: 1.3rem;
  padding-top: 4px;
}
/*   .v-input__append-inner {
    align-self: baseline !important;
  } */
</style>
