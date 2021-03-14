<template>
  <div>
    <v-text-field
      ref="field"
      :value="value"
      :rules="attrs.rules"
      v-on="listeners"
      :label="attrs.label"
      v-bind="attrs"
      @click="clicked = !attrs.readonly"
      prepend-icon="mdi-calendar"
    />
    <v-dialog
      ref="dialog"
      v-model="clicked"
      :return-value.sync="date"
      width="290px"
    >
      <v-card>
        <v-date-picker :max="attrs.max" v-model="date" @input="closeDate" />
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="clicked = false">
          {{ $t('common.CANCEL') }}
        </v-btn>
        <v-btn text color="primary" @click="$refs.dialog.save(date)">
          {{ $t('common.OK') }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['value'],
  inheritAttrs: false,
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      clicked: false
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
    },
    initialDate: {
      get() {
        return this.value ? this.value : null
      },
      set(newValue) {
        return newValue
      }
    }
  },
  methods: {
    clickEvent() {
      this.clicked = this.attrs.readonly
    },
    closeDate() {
      this.clicked = false
      this.initialDate = this.formatDate(this.date)
      this.updateForm(this.date)
    },
    dateFunction(value) {
      console.log('date changed ', value)
    },
    formatDate(date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    updateForm(value) {
      console.log('field valid', this.$refs.field.valid)
      this.$emit('input', value)
      this.clicked = false
    }
  }
}
</script>
<style scoped></style>
