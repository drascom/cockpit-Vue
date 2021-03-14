<template>
  <v-snackbar
    v-model="showErrorMessage"
    color="error"
    multi-line
    top
    :timeout="2000"
  >
    <ul>
      <li v-for="(item, index) in error" :key="index">
        {{ item.errCode }} <br />{{ item.errMsg }}
      </li>
    </ul>
  </v-snackbar>
</template>

<script>
import * as types from '@/store/mutation-types'
import { formatErrorMessages } from '@/utils/utils.js'

export default {
  name: 'ErrorMessage',
  computed: {
    showErrorMessage: {
      get() {
        return this.$store.state.error.showErrorMessage
      },
      set(value) {
        this.$store.commit(types.SHOW_ERROR, value)
      }
    },
    error() {
      return formatErrorMessages('errors', this.$store.state.error)
    }
  }
  // watch: {
  //   error() {
  //     setTimeout(() => {
  //       this.showErrorMessage = this.error.length !== 0
  //     }, 1000)
  //   }
  // }
}
</script>
