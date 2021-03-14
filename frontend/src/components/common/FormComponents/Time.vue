<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
    hide-details="auto"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :hidden="field.hidden"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :label="field.text.toUpperCase()"
        :name="field.text"
        :value="data"
        color="blue"
        v-on="on"
      >
        <v-icon slot="prepend" color="primary">{{ field.icon }}</v-icon>
      </v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      full-width
      @click:minute="updateForm(time)"
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  props: ['field', 'data'],
  data() {
    return {
      time: '00:00:00',
      menu: false
    }
  },
  methods: {
    updateForm(item) {
      this.time = item
      this.$emit('fieldUpdated', item)
      this.$refs.menu.save(item)
      this.menu = false
    },
    upperCase() {
      return this.data ? this.data.toUpperCase() : ''
    }
  }
}
</script>
<style scoped></style>
