<template>
  <div>{{ isim }} <v-btn @click="degistir()">değiştir</v-btn></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['isim'],
  methods: {
    degistir() {
      this.$emit('posta', `${this.isim} konak`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
