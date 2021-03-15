<template>
  <v-text-field
    :placeholder="$t('dataTable.SEARCH')"
    :value="$store.state.search.search"
    @input="$store.commit('setSearch', $event)"
    @focus="setStatus(false)"
    @blur="setStatus(true)"
    class="expanding-search mt-4"
    :class="{ closed: searchClosed && !$store.state.search.search }"
    prepend-inner-icon="mdi-magnify"
    dense
    :outlined="!searchClosed"
    clearable
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true
    }
  },
  methods: {
    setStatus(status) {
      this.searchClosed = status
      this.$emit('searchStatus', status)
    }
  }
}
</script>

<style lang="sass">
.expanding-search
  transition: max-width 0.5s
  max-width: 350px
  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 45px
    .v-input__slot
      background: transparent !important
</style>
