<template>
  <v-flex xs12>
    <label>  </label>
    <v-card outlined class="px-2">
      <v-card-title>{{ attrs.label }}</v-card-title>
      <v-card-text>
         <v-radio-group
        outlined
        @change="input"
        v-model="newValue"
        class=""
        v-bind="attrs"
        v-on="listeners"
        mandatory
        label=""
      >
        <v-radio
          class=""
          v-for="(value, key, i) in options"
          :key="i"
          :value="value.value"
        >
          <template #label>
            <div>
              <v-icon left>{{ value.icon }}</v-icon> {{ value.label }}
            </div>
          </template>
        </v-radio>
      </v-radio-group>
      </v-card-text>

    </v-card>
  </v-flex>
</template>
<script>
export default {
  props: ['options', 'value'],
  inheritAttrs: false,
  data() {
    return {
      newValue: ''
    }
  },
  computed: {
    listeners() {
      // eslint-disable-next-line no-unused-vars
      const { input, ...listeners } = this.$listeners
      return listeners
    },
    attrs() {
      return this.$attrs
    }
  },
  mounted() {
    this.newValue = this.value
  },
  methods: {
    input() {
      this.$emit('input', this.newValue)
    }
  }
}
</script>
<style scoped>
.v-toolbar--dense .v-input__control {
  min-height: 38px !important;
}
.v-text-field__details {
  display: none !important;
}
</style>
