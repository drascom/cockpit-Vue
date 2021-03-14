<template>
  <v-system-bar color="grey lighten-3" lights-out>
    <v-spacer></v-spacer>
    <div v-show="showLoading" v-if="!showCompleted">
      <span>{{ $t('loading.PLEASE_WAIT') }}</span>
      <v-icon> mdi-loading mdi-spin</v-icon>
    </div>
    <div v-else><span> OK ...</span> <v-icon>mdi-thumb-up</v-icon></div>
  </v-system-bar>
  <!-- <v-overlay v-model="showLoading" z-index="203">
    <v-progress-circular v-if="!showCompleted" indeterminate rotate size="64">
      {{ $t('loading.PLEASE_WAIT') }}</v-progress-circular
    >

    <v-col v-else class="shrink">
      <v-icon size="70" class="mx-auto d-flex">mdi-thumb-up</v-icon>
      <v-list-item-title>İşlem Tamam. </v-list-item-title>
    </v-col>
  </v-overlay> -->
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  data() {
    return {
      showCompleted: false
    }
  },
  computed: mapGetters(['showLoading', 'completed']),
  watch: {
    completed(newValue) {
      this.showCompleted = newValue
      setTimeout(() => {
        this.$store.commit(types.SHOW_LOADING, false)
        this.$store.commit(types.SHOW_COMPLETED, false)
      }, 500)
    }
  }
}
</script>
