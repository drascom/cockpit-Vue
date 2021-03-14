<template>
 <v-list-item>
    <v-list-item-action>
      <v-switch v-model="newValue"  v-on="listeners"  v-bind="attrs" color="success"  @change="changeAction" />
    </v-list-item-action>
  </v-list-item>

</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  name: 'BaseActionInput',
  props: ['value'],
  inheritAttrs: false,
  data() {
    return {
      newValue: { type: Boolean }
    }
  },
  created() {
    // Mutating the prop :(
    this.newValue = this.value === '1'
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },
    attrs() {
      const { rows, ...attrs } = this.$attrs
      return attrs
    }
  },
  methods: {
    changeAction() {
      // eslint-disable-next-line no-unused-vars
      const value = this.newValue === true ? 1 : 0
      this.$emit('action', this.newValue)
    }
  }
}
</script>
<style scoped></style>
