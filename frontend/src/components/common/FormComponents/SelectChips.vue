<template>
  <div>
    <v-autocomplete
      v-model="model"
      :disabled="isUpdating"
      :readonly="field.readonly"
      :items="options"
      item-value="id"
      :label="field.text.toUpperCase()"
      autocomplete="off"
      @change="updateForm"
      multiple
      return-object
      chips
      x-small
    >
      <template
        slot="selection"
        slot-scope="data"
      >
        <v-chip
          :input-value="data.selected"
          close
          @click:close="remove(data.item)"
          class="chip--select-multi"
          @input="data.parent.selectItem(data.item)"
        >
          {{ data.item.name }}
        </v-chip>
      </template>
      <template
        slot="item"
        slot-scope="data"
      >
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="data.item.id"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
export default {
  name: 'Selectlist',
  props: ['field', 'value'],
  data () {
    return {
      autoUpdate: true,
      isUpdating: false,
      model: [],
      title: 'The summer breeze'
    }
  },
  computed: {
    options () {
      return this.$store.getters.variables[this.field.variable]
    }
  },
  created () {
    // console.log(this.value.constructor.name) veri tipini ögrenmek için
    this.model = JSON.parse(this.value)
  },
  watch: {
    isUpdating (val) {
      if (val) {
        // eslint-disable-next-line no-return-assign
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    }
  },
  methods: {
    updateForm (item) {
      this.$emit('fieldUpdated', JSON.stringify(item))// veriyi string yapıp yolluyoruz.
    },
    remove (item) {
      // const index = this.model.indexOf(item)
      const index = this.model.findIndex((x) => x.id === item.id)
      if (index >= 0) { this.model.splice(index, 1) }
      this.updateForm (this.model)
    }
  }
}
</script>
