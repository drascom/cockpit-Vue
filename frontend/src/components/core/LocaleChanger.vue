<template>
  <v-menu v-model="showMenu" offset-y>
    <template #activator="{ on }">
      <v-btn class="" text v-on="on">
        <v-icon>mdi-earth</v-icon>
        &nbsp;
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        active-class="white--text"
        :value="item.lang"
        :class="[item.class]"
        @click="switchLocale(item.lang)"
      >
        <CountryFlag :country="item.flag" size="small" />
        <v-list-item-title class="ml-3">{{
          item.desc.toUpperCase()
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  components: {
    CountryFlag
  },
  data() {
    return {
      showMenu: false,
      langs: [
        {
          lang: 'en',
          desc: 'English',
          flag: 'gb',
          class: 'btnEN'
        },
        {
          lang: 'tr',
          desc: 'Türkçe',
          flag: 'tr',
          class: 'btnES'
        }
      ]
    }
  },
  computed: {
    displayLocale() {
      return this.$i18n.locale
    },
    current() {
      return this.$store.state.locale.locale
    }
  },
  watch: {
    current(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`)
      this.switchLocale(this.current)
    }
  },
  created() {
    this.switchLocale(this.current)
  },
  methods: {
    switchLocale(lang) {
      this.$store.dispatch('setLocale', lang)
      if (lang === 'tr') {
        this.$moment.locale(lang)
      } else {
        this.$moment.locale('en-gb')
      }
    }
  }
}
</script>

<style>
.flag {
  width: 118px !important;
}

</style>
