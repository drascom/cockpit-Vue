<template>
  <v-text-field
    :placeholder="$t('dataTable.SEARCH')"
    :value="$store.state.search.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="expanding-search mt-4"
    :class="{ closed: searchClosed && !$store.state.search.search }"
    prepend-inner-icon="mdi-magnify"
    dense
    :shaped="!searchClosed"
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
