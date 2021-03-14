<template>
  <v-bottom-navigation
    v-if="$vuetify.breakpoint.xs"
    fixed
    app
    color="primary"
    grow
    horizontal
    v-model="value"
  >
    <v-btn to="/" exact> Anasayfa <v-icon left>mdi-home</v-icon> </v-btn>
    <v-btn text :to="`/${pageName}/new`">
      {{ this.$t('adminItems.NEW') }}<v-icon left>mdi-plus</v-icon>
    </v-btn>
    <v-btn :to="`/${pageName}/list`">
      List
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  props: ['pageName']
}
</script>

<style lang="scss" scoped></style>
