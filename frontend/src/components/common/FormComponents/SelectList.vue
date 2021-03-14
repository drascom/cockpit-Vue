<template>
  <div>
    <v-autocomplete
      :value="value"
      :items="options"
      item-value="_id"
      item-text="name"
      @change="input"
      hide-details="auto"
      autocomplete="off"
      v-on="listeners"
      v-bind="attrs"
      return-object
    >
    </v-autocomplete>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */

export default {
  name: 'BaseSelectlist',
  props: ['value', 'options'],
  inheritAttrs: false,
  data() {
    return {
      model: {
        id: this.value,
        name: ''
      }
    }
  },
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
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1
    },
    upperCase(value) {
      return value ? value.toUpperCase() : ''
    },
    input(event) {
      this.$emit('input', event)
    }
  }
}
</script>
