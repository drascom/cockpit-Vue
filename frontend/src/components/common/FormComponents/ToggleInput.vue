<template>
  <v-row no-gutters justify="space-around">
    <v-col cols="12">
    </v-col>
    <v-col cols="2">
      <v-switch
        v-model="newValue"
        color="success"
        inset
        @change="newvalue"
      >
        <template v-slot:label>
          <div>
            {{ newValue == true ? 'Yes' : 'No' }}
            <v-tooltip bottom>{{ field.text }}</v-tooltip>
          </div>
        </template>
      </v-switch>
    </v-col>
    <v-col cols="8">
      <v-text-field
        v-if="field.child"
        v-show="newValue"
        v-model="newValue.child.value"
        label="Please write details here"
      ></v-text-field>
      <template v-slot:prepend>
        <v-icon class="mr-3" :color="field.icon ? 'blue' : 'red'">{{
          field.icon
        }}</v-icon>
      </template>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['field', 'value'],
  data() {
    return {
      newValue: { type: Boolean }
    }
  },
  created() {
    // Mutating the prop :(
    this.newValue = this.value === '1'
  },
  methods: {
    newvalue() {
      const value = this.newValue === true ? 1 : 0
      this.$emit('fieldUpdated', value)
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
