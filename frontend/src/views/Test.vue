<template>
  <div>
    {{ yeniisim }}
    <child :isim="yeniisim" @posta="degistir" />
  </div>
</template>

<script>
import child from './testchild.vue'
export default {
  data() {
    return {
      yeniisim: 'ayhan'
    }
  },
  components: {
    child
  },
  methods: {
    degistir(data) {
      this.yeniisim = data
    }
  }
}
</script>

<style lang="scss" scoped></style>
