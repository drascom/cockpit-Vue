<!-- eslint-disable vue/valid-v-slot-->
<template>
  <v-card flat class="mt-n12 mx-auto">
    <v-layout fill-height column fluid class="mt-4">
      <v-data-table
        v-if="$vuetify.breakpoint.mdAndUp"
        ref="vDataTable"
        :headers="headers"
        :items="items"
        :search="search"
        item-key="_id"
        mobile-breakpoint="0"
        class="elevation-2 mx-8 mytable"
        hide-default-footer
        @click:row="handleClick"
      >
        <!-- @click:row="(item, slot) => slot.expand(!slot.isExpanded)" eğer row click gerekirse -->
        <template #top>
          <v-toolbar flat class="py-1">
            <v-toolbar-title>{{ $t('listing.TITLE') }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template #item.surgery_date="{ item }">
          {{ formatDate(item.surgery_date) }}
        </template>
        <template #item.payment_date="{ item }">
          {{ formatDate(item.payment_date) }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip small :color="checkStatusColor(item)" dark>
            {{ checkStatusMessage(item) }}
          </v-chip>
        </template>
      </v-data-table>
      <v-data-iterator
        v-else
        :items="items"
        item-key="_id"
        :items-per-page="30"
        single-expand
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card @click.stop="handleClick(item)">
                <v-card-text class="subheading font-weight-bold">
                  {{ item.customer_name || item.sender_name }}
                </v-card-text>
                <v-spacer />
                <v-chip :color="checkStatusColor(item)">
                  {{ item }}
                </v-chip>
                <v-divider></v-divider>

                <v-list dense>
                  <template v-if="checkStatus(item)">
                    <v-list-item input-value="1" color="red" elevation="8">
                      <v-list-item-content>
                        {{ checkStatusText(item) }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                  </template>
                  <template v-for="(key, index) in headers">
                    <v-list-item :key="index" v-if="key.value !== 'status'">
                      <v-list-item-content
                        :class="{ 'red--text': !item[key.value] }"
                      >
                        {{ key.text }}:
                      </v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                        :class="{ 'blue--text': sortBy === key.value }"
                      >
                        {{ item[key.value] }}
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-layout>
  </v-card>
</template>

<script>
import commonJS from '@/store/common.js'
export default {
  name: 'Customers',
  data() {
    return {
      isMobile: false,
      sortBy: 'name',
      expanded: []
    }
  },
  components: {
    search: require('@/components/common/Search.vue').default
  },
  computed: {
    search() {
      return this.$store.state.search.search
    },
    sideBar: {
      get() {
        return this.$store.state.dashboard.sidebar
      },
      set(value) {
        this.$store.commit('UPDATE_SIDEBAR', value)
      }
    },
    items() {
      return this.$store.state.customers.items
    },
    headers() {
      return [
        {
          text: this.$t('listing.SENDER_NAME'),
          value: 'avatar'
        },
        {
          text: this.$t('listing.SENDER_NAME'),
          value: 'name'
        },
        {
          text: this.$t('listing.SENDER_NAME'),
          value: 'email'
        },
        {
          text: this.$t('listing.CUSTOMER_NAME'),
          value: 'date_of_birth'
        },
        {
          text: this.$t('listing.PAYMENT_DATE'),
          value: 'origin'
        },
        {
          text: this.$t('listing.SURGERY_DATE'),
          value: 'country'
        },
        {
          text: this.$t('listing.AMOUNT'),
          value: 'passaport_number'
        },
        {
          text: this.$t('listing.RECEIVED_AMOUNT'),
          value: 'phone_1'
        },
        {
          text: this.$t('listing.STATUS'),
          value: 'phone_2'
        }
      ]
    }
  },
  methods: {
    formatDate(date) {
      return date ? this.$moment(date).format('DD,  MMM ') : ''
    },
    checkStatus(item) {
      if (!item.receiving_done || !item.sending_done) {
        return true
      }
      return false
    },
    checkStatusText(item) {
      if (item.status) {
        return this.$t('status.COMPLETED')
      }
      return !item.receiving_done
        ? this.$t('status.STATUS_WAITING_PAYMENT')
        : this.$t('status.STATUS_WAITING_INFO')
    },
    checkStatusColor(item) {
      if (item.status) {
        return 'success'
      }
      return !item.receiving_done ? 'error' : 'warning'
    },
    handleClick(item) {
      this.$router.push(`/customers/${item._id}`)
    }
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  created() {
    if (!this.home) {
      this.$store.dispatch('commonStore/getAllItems', {
        name: 'customers',
        data: {}
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
