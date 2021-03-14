/* eslint-disable vue/no-mutating-props */ /* eslint-disable vue/valid-v-model
*/
<template>
  <v-form ref="form" v-model="isFormValid" lazy-validation @submit.prevent="">
    <v-container>
      <v-row justify="start" align="start">
        <v-col
          v-for="(field, index) in items"
          :key="index"
          :sm="field.cols ? field.cols : '6'"
          cols="12"
        >
          <component
            :is="field.type"
            :value="model[field.name]"
            :field="field"
            :min="items[index][field.min]"
            v-bind="field"
            @action="handleAction"
            @fieldUpdated="ListUpdating"
            @keyup.enter.native="enterButton"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import TextInput from './FormEditor/TextInput'
import DateInput from './FormEditor/Date'
import NumberInput from './FormEditor/NumberInput'
import RadioInput from './FormEditor/RadioInput'
import ToggleInput from './FormEditor/ToggleInput'
import ActionInput from './FormEditor/ActionInput'

export default {
  name: 'InputCreator',
  data() {
    return {
      isFormValid: false
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    model(newValue) {
      // eslint-disable-next-line no-unused-vars
      const a = newValue
      this.$refs.form.validate()
    }
  },
  computed: {
    validate() {
      return this.$refs.form.validate()
    },
    model() {
      return this.value
    }
  },
  components: {
    TextInput,
    DateInput,
    NumberInput,
    RadioInput,
    ToggleInput,
    ActionInput
  },
  methods: {
    handleAction(action, status) {
      this.$emit('action', action, status)
    },
    enterButton() {
      this.$emit('submit', true)
    },
    ListUpdating(name, value) {
      this.$nextTick(() => {
        this.$emit('FormUpdated', {
          valid: this.$refs.form.validate(),
          data: { [name]: value }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
