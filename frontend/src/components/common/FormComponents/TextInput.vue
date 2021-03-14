<template>
  <v-text-field
    autocomplete="off"
    :value="upperCase(value)"
    @input="input"
    v-on="listeners"
    :rows="rows"
    v-bind="attrs"
  >
    <template v-for="(_, slot) in $slots">
      <template :slot="slot">
        <slot :name="slot"></slot>
      </template>
    </template>
  </v-text-field>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  name: 'BaseTextInput',
  props: ['value'],
  inheritAttrs: false,
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },
    rows() {
      return this.$attrs.rows || 3
    },
    attrs() {
      const { rows, ...attrs } = this.$attrs
      return attrs
    }
  },
  methods: {
    upperCase(value) {
      if (value) {
        return value ? value.toLocaleUpperCase('tr-TR') : ''
      }
      return null
    },
    input(event) {
      this.$emit('input', event.toLocaleUpperCase('tr-TR'))
    }
  }
}
</script>
<style scoped></style>
