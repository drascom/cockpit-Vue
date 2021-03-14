<template>
  <v-snackbar
    v-model="showSuccessMessage"
    color="success"
    multi-line
    top
    :timeout="successMessageTimeout"
  >
    {{ successMessage }}
  </v-snackbar>
</template>

<script>
import * as types from '@/store/mutation-types'

export default {
  name: 'SuccessMessage',
  computed: {
    showSuccessMessage: {
      get() {
        return this.$store.state.success.showSuccessMessage
      },
      set(value) {
        this.$store.commit(types.SHOW_SUCCESS, value)
      }
    },
    successMessage() {
      if (this.$store.state.success.successMessageParams) {
        return this.$i18n.t(this.$store.state.success.successMessage, [
          ...this.$store.state.success.successMessageParams
        ])
      }
      return this.$i18n.t(this.$store.state.success.successMessage)
    },
    successMessageTimeout() {
      return this.$store.state.success.successMessageTimeout
    }
  },
  watch: {
    successMessage() {
      setTimeout(() => {
        this.showSuccessMessage = this.successMessage !== ''
      }, 500)
    }
  }
}
</script>
