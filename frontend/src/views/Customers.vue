<template>
  <div>
    <v-app-bar app>
      <v-btn text to="/" exact v-show="searchStatus">
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
      <search @searchStatus="setSearchStatus" />
    </v-app-bar>
    <v-container fluid class="mt-n16">
      <router-view :key="$route.fullPath" />
      <BottomBar :pageName="'customers'" />
    </v-container>
  </div>
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
      newcustomer: false,
      searchStatus: true
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
  methods: {
    setSearchStatus(event) {
      this.searchStatus = event
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
