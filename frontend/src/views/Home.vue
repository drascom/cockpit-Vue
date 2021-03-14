<template>
  <v-container fill-height fluid> home </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import commonJS from '@/store/common.js'
const Datatable = () => import('@/components/Payments/PaymentList')

export default {
  name: 'Dashboard',
  data() {
    return {
      filter: 'AllPayments',
      watchTable: 0,
      filters: false
    }
  },
  components: {
    Datatable
  },
  computed: {
    filteredRecords() {
      return this[this.filter]
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
    // ReceivedPayments() {
    //   return this.AllPayments.filter((item) => {
    //     return item.receiving_done === true && item.status === false
    //   })
    // },
    // WaitingPayments() {
    //   return this.AllPayments.filter((item) => {
    //     return item.sending_done === true && item.status === false
    //   })
    // },
    // completed() {
    //   return this.AllPayments.filter((item) => {
    //     return item.status === true
    //   })
    // }
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      console.log('common yok oluşturuldu')
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  async created() {
    if (this.AllPayments.length < 1) {
      this.$store.dispatch('commonStore/getAllItems', {
        name: 'payments',
        data: {}
      })
    }
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'activities',
      data: {}
    })
  },
  mounted() {
    // this.$watch(
    //   'payments',
    //   (i) => {
    //     this.filteredRecords = i
    //   },
    //   { immediate: true }
    // )
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card-red {
  min-width: 150px !important;
  border-left: 5px solid red !important;
}
.card-blue {
  min-width: 150px !important;
  border-left: 5px solid blue !important;
}
.card-orange {
  min-width: 150px !important;
  border-left: 5px solid orange !important;
}
.card-green {
  min-width: 150px !important;
  border-left: 5px solid green !important;
}
</style>
