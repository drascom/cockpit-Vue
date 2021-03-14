<template>
  <v-card flat class="mt-n12 mx-auto">
    <v-app-bar app>
      <v-btn text to="/" exact>
        <v-icon>mdi-home</v-icon> {{$t('adminItems.HOME')}}
      </v-btn>
      <v-toolbar-items>
        <v-btn
          text
          :to="{ name: 'paymentsnew' }"
          exact
          class="hidden-sm-and-down"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ this.$t('adminItems.NEW') }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    <search />
      <v-btn small icon class="ml-4 mr-4">
        <v-icon dark>mdi-printer</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fluid grid-list-md class="pa-0">
      <router-view :key="$route.fullPath" />
    </v-container>
    <BottomBar :pageName="'payments'" />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import commonJS from '@/store/common.js'

export default {
  name: 'Payments',
  data() {
    return {
      filter: 'AllPayments',
      watchTable: 0
    }
  },
  components: {
    search: require('@/components/common/Search.vue').default,
    BottomBar: require('@/components/core/Bottombar.vue').default
  },
  computed: {
    sideBar: {
      get() {
        return this.$store.state.dashboard.sidebar
      },
      set(value) {
        this.$store.commit('UPDATE_SIDEBAR', value)
      }
    },
    ...mapGetters({
      AllPayments: 'payments/AllPayments',
      TotalCount: 'payments/TotalCount',
      ReceivedCount: 'payments/ReceivedCount',
      ReceivedPayments: 'payments/ReceivedPayments',
      WaitingCount: 'payments/WaitingCount',
      WaitingPayments: 'payments/WaitingPayments',
      CompletedCount: 'payments/CompletedCount',
      CompletedPayments: 'payments/CompletedPayments',
      user: 'user'
    }),
    activities() {
      return this.$store.state.activities.items
    }
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      console.log('common yok oluşturuldu')
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  async created() {
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'payments',
      data: {}
    })

    this.$store.dispatch('commonStore/getAllItems', {
      name: 'customers',
      data: {}
    })
  }
}
</script>

<style lang="scss" scoped></style>
