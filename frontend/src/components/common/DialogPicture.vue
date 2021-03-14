<template>
  <v-dialog
    v-model="show"
    fullscreen
    persistent
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card flat>
      <v-app-bar
        fixed
        dark
        color="secondary"
        src="https://picsum.photos/1920/1080?random"
      >
        <template #img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.3), rgba(128,208,199,.7)"
          />
        </template>
        <v-btn large icon @click.stop="show = false">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          $t('componentModules.SELECTED_DOCUMENT')
        }}</v-toolbar-title>
        <v-spacer />
        <v-btn large icon @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card flat height="64" />
      <v-flex xs12 sm6 offset-sm3>
        <v-img :src="selectedPicture" />
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogPicture',
  props: {
    value: Boolean,
    selectedPicture: String
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
