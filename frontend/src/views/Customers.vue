<template>
  <v-card class="mt-n12 mx-auto">
    <v-app-bar app>
      <v-btn text to="/" exact>
        <v-icon>mdi-home</v-icon> {{ $t('adminItems.HOME') }}
      </v-btn>
      <v-toolbar-items>
        <!-- :to="{ name: 'createcustomer', params: {options: AllCustomers } }" -->
        <v-btn
          text
          exact
          class="hidden-sm-and-down"
          :to="{ name: 'customersnew' }"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ this.$t('adminItems.NEW') }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn x-small disabled text>
        We have {{ TotalCount }} recorded customers
      </v-btn>
      <search />
      <v-btn small icon class="ml-4 mr-4">
        <v-icon dark>mdi-printer</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid grid-list-md>
      <router-view :key="$route.fullPath" />
    </v-container>
    <BottomBar :pageName="'customers'" />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import commonJS from '@/store/common.js'

export default {
  name: 'Customers',
  data() {
    return {
      filter: 'AllCustomers',
      watchTable: 0,
      newcustomer: false
    }
  },
  components: {
    search: require('@/components/common/Search.vue').default,
    newCustomer: require('@/components/Customers/CustomerWizard.vue').default,
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
      AllCustomers: 'customers/AllCustomers',
      ActiveCustomers: 'customers/ActiveCustomers',
      DeactiveCustomers: 'customers/DeactiveCustomers',
      TotalCount: 'customers/TotalCount',
      ActiveCount: 'customers/ActiveCount',
      PassiveCount: 'customers/PassiveCount',
      user: 'user'
    })
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      console.log('common yok oluşturuldu')
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  async created() {
    // this.$store.dispatch('commonStore/getAllItems', {
    //   name: 'customers',
    //   data: {}
    // })
  }
}
</script>

<style lang="scss" scoped></style>
