<template>
  <div>
    <v-autocomplete
      class="px-2"
      :items="items"
      :loading="isLoading"
      :filter="customFilter"
      v-model="model"
      color="blue-grey lighten-2"
      label="search"
      item-text="name"
      item-value="_id"
      return-object
      hide-selected
      hide-details
      solo-inverted
      append-icon="mdi-database-search"
    >
      <template slot="item" slot-scope="{ item }">
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <span>({{ item.stok }}) Adet</span>
        </v-list-item-subtitle>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'autocomplete',
  computed: {
    model: {
      get() {
        return this.$store.state.search.search
      },
      set(value) {
        this.$store.commit('setSearch', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
