<template>
  <v-text-field
    type="Number"
    autocomplete="off"
    :value="value"
    @input="input"
    v-on="listeners"
    v-bind="attrs"
  >
  </v-text-field>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  name: 'BaseNumberInput',
  props: ['value'],
  inheritAttrs: false,
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },

    attrs() {
      return this.$attrs
    }
  },
  methods: {
    input(event) {
      this.$emit('input', event)
    }
  }
}
</script>
<style scoped></style>
