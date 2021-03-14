<!-- eslint-disable vue/valid-v-slot-->
<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <!-- desktop dikey  seçenek kutuları -->
        <v-col v-if="!$vuetify.breakpoint.xs" cols="3">
          <v-list>
            <v-list-item-group v-model="filter" mandatory ripple>
              <v-list-item
                v-for="(card, i) in cardData"
                :key="i"
                :class="`card-${card.class}`"
                :value="card.filter"
              >
                <v-badge
                  style="width: 100%"
                  :value="card.badge && card.count > 0"
                  bordered
                  :color="card.class"
                  :content="card.count"
                  offset-x="12"
                >
                  <v-list-item-title v-text="card.title"></v-list-item-title>
                </v-badge>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <!-- mobilde yatay seçenek kutuları -->
        <v-col :cols="$vuetify.breakpoint.xs ? '12' : '9'">
          <v-item-group
            v-if="$vuetify.breakpoint.xs"
            active-class="primary white--text"
            v-model="filter"
            class="mb-4"
          >
            <v-container class="px-0">
              <v-row>
                <v-col
                  v-for="(card, index) in cardData"
                  :key="index"
                  cols="6"
                  md="3"
                >
                  <v-item
                    v-slot="{ active, toggle }"
                    :class="`card-${card.class}`"
                    :value="card.filter"
                  >
                    <v-card
                      class="d-flex align-center"
                      height="50"
                      @click="toggle"
                    >
                      <v-badge
                        style="width: 100%"
                        :value="card.badge && card.count > 0"
                        bordered
                        :color="card.class"
                        :content="card.count"
                        offset-x="12"
                      >
                        <v-scroll-y-transition>
                          <div
                            :class="{ 'text-caption': $vuetify.breakpoint.xs }"
                            class="flex-grow-1 text-center text-uppercase"
                          >
                            {{ card.title }}
                          </div>
                        </v-scroll-y-transition>
                        <v-list-item-subtitle>{{
                          card.subtitle
                        }}</v-list-item-subtitle>
                      </v-badge>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
          <v-divider v-if="$vuetify.breakpoint.xs" class="my-4"></v-divider>
          <v-data-table
            v-if="$vuetify.breakpoint.mdAndUp"
            ref="vDataTable"
            :headers="headers"
            :items="filteredRecords"
            :search="search"
            item-key="_id"
            mobile-breakpoint="0"
            class="elevation-2 mytable"
            hide-default-footer
            fixed-header
            @click:row="handleClick"
          >
            <!-- @click:row="(item, slot) => slot.expand(!slot.isExpanded)" eğer row click gerekirse -->
            <!-- <template #top>
              <v-toolbar flat class="py-1">
                <v-toolbar-title>{{ $t('listing.TITLE') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template> -->
            <template v-slot:no-data>
              <v-alert
                class="pa-1 ma-1"
                :value="true"
                color="success lighten-4"
                icon="warning"
              >
                Very good. you dont have and job to complete !
              </v-alert>
            </template>
            <!-- <template slot="body.append">
              <tr class="pink--text">
                <th class="title">Totals</th>
                <th class="title"></th>
                <th class="title"></th>
                <th class="title"></th>
                <th class="title"></th>
                <th class="title">{{ sumField('net_amount') }}</th>
              </tr>
            </template>
            <template v-slot:body="{ items }">
              <tbody name="fade" is="transition-group">
                <tr v-for="(item, i) in items" :key="`${i}-row`">
                  <td v-for="(header, index) in headers" :key="`${index}-col`">
                    {{ item[header.value] }}
                  </td>
                </tr>
              </tbody>
            </template> -->

            <template #item.received_date="{ item }">
              {{ formatDate(item.received_date) }}
            </template>
            <template #item.payment_date="{ item }">
              {{ formatDate(item.payment_date) }}
            </template>
            <template #item.closed="{ item }">
              <v-chip small :color="checkStatusColor(item)" dark>
                {{ checkStatusMessage(item) }}
              </v-chip>
            </template>
          </v-data-table>
          <v-card v-else color="#424040d6" class="px-1">
            <v-data-iterator
              :items="filteredRecords"
              item-key="_id"
              :items-per-page="30"
              single-expand
              hide-default-footer
            >
              <template v-slot:default="{ items, isExpanded, expand }">
                <v-row>
                  <v-col
                    v-for="item in items"
                    :key="item._id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card @click.stop="handleClick(item)">
                      <v-badge
                        :value="checkStatusMessage(item)"
                        bordered
                        :color="checkStatusColor(item)"
                        :content="checkStatusMessage(item)"
                        offset-y="12"
                        offset-x="-4"
                        inline
                      >
                        <v-card-text class="text-left text-wrap">
                          {{ item.customer_name.name || item.sender_name }}
                        </v-card-text>
                      </v-badge>
                      <v-divider></v-divider>
                      <v-list class="text-body-2" dense>
                        <v-list-item>
                          <v-list-item-content
                            >{{
                              $t('listing.PAYMENT_DATE')
                            }}:</v-list-item-content
                          >
                          <v-list-item-content class="align-end">
                            {{ formatDate(item.payment_date) }}
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content
                            :class="{ 'red--text': !item.total_amount }"
                          >
                            {{ $t('listing.AMOUNT') }}:</v-list-item-content
                          >
                          <v-list-item-content class="align-end">
                            {{ item.total_amount }} {{ item.currency }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
              <!-- <template v-slot:default="props">
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
                      <v-badge
                        :value="checkStatusMessage(item)"
                        bordered
                        :color="checkStatusColor(item)"
                        :content="checkStatusMessage(item)"
                        overlap
                        inline
                        right
                      >
                        <v-card-text class="text-left text-wrap">
                          {{ item.customer_name.name || item.sender_name }}
                        </v-card-text>
                      </v-badge>
                      <v-divider></v-divider>

                      <v-list dense>
                        <template v-if="checkStatus(item)">
                          <v-list-item
                            input-value="1"
                            color="red"
                            elevation="8"
                          >
                            <v-list-item-content>
                              {{ checkStatusText(item) }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider />
                        </template>
                        <template v-for="(key, index) in headers">
                          <v-list-item
                            :key="index"
                            v-if="checkVisible(key.value)"
                            class="text-left text-body-2"
                          >
                            <v-list-item-content
                              :class="{ 'red--text': !item[key.value] }"
                            >
                              {{ key.text }}:
                            </v-list-item-content>
                            <v-list-item-content
                              class="align-end"
                              :class="{ 'blue--text': sortBy === key.value }"
                            >
                              <v-card-text class="">
                                {{ item[key.value] }}
                              </v-card-text>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </template> -->
            </v-data-iterator>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import commonJS from '@/store/common.js'
export default {
  name: 'ListPage',
  data() {
    return {
      isMobile: false,
      sortBy: 'name',
      expanded: [],
      filter: 'AllPayments'
    }
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      console.log('common yok oluşturuldu')
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  computed: {
    search() {
      return this.$store.state.search.search
    },
    headers() {
      return [
        {
          text: this.$t('listing.SENDER_NAME'),
          value: 'sender_name',
          fixed: true
        },
        {
          text: this.$t('listing.CUSTOMER_NAME'),
          value: 'customer_name.name',
          fixed: true
        },
        {
          text: this.$t('listing.PAYMENT_DATE'),
          value: 'payment_date',
          fixed: true
        },
        {
          text: this.$t('listing.RECEIVED_DATE'),
          value: 'received_date',
          fixed: true
        },
        {
          text: this.$t('listing.AMOUNT'),
          value: 'total_amount',
          fixed: true
        },
        {
          text: this.$t('listing.RECEIVED_AMOUNT'),
          value: 'net_amount',
          fixed: true
        },
        {
          text: this.$t('listing.STATUS'),
          value: 'status'
        }
      ]
    },
    cardData() {
      return [
        {
          title: this.$t('home.ALL_PAYMENTS'),
          filter: 'AllPayments',
          count: this.TotalCount,
          class: 'blue my-1',
          badge: false
        },
        {
          title: this.$t('home.RECEIVED_PAYMENTS'),
          subtitle: 'For Alex',
          filter: 'ReceivedPayments',
          count: this.ReceivedCount,
          class: 'red my-1',
          badge: true
        },
        {
          title: this.$t('home.WAITING_PAYMENTS'),
          subtitle: 'For Havva',
          filter: 'WaitingPayments',
          count: this.WaitingCount,
          class: 'orange my-1',
          badge: true
        },

        {
          title: this.$t('home.COMPLETED_PAYMENTS'),
          filter: 'CompletedPayments',
          count: this.CompletedCount,
          class: 'green my-1',
          badge: false
        }
      ]
    },
    filteredRecords: {
      get() {
        return this[this.filter]
      },
      set(value) {
        return value
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
    })
  },
  async created() {
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'payments',
      data: {}
    })
  },
  methods: {
    formatDate(date) {
      return date ? this.$moment(date).format('DD,  MMM ') : ''
    },
    checkVisible(item) {
      if (item === 'status' || item === 'customer_name.name') {
        return false
      }
      return true
    },
    checkStatus(item) {
      if (!item.receiving_done || !item.sending_done) {
        return true
      }
      return false
    },
    checkStatusMessage(item) {
      if (item.closed) {
        return this.$t('status.COMPLETED')
      }
      return !item.receiving_done
        ? this.$t('status.STATUS_WAITING_PAYMENT')
        : this.$t('status.RECEIVED')
    },
    checkStatusText(item) {
      if (item.closed) {
        return this.$t('status.COMPLETED')
      }
      return !item.receiving_done
        ? this.$t('status.STATUS_WAITING_PAYMENT')
        : this.$t('status.STATUS_WAITING_INFO')
    },
    checkStatusColor(item) {
      if (item.closed) {
        return 'success'
      }
      return !item.receiving_done ? 'error' : 'warning'
    },
    sumField(key) {
      // sum data in give key (property)
      return this.items.reduce((a, b) => Number(a) + (Number(b[key]) || 0), 0)
    },
    handleClick(item) {
      this.$router.push(`/payments/${item._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-red {
  min-width: 135px !important;
  border-left: 5px solid red !important;
}
.card-blue {
  min-width: 135px !important;
  border-left: 5px solid blue !important;
}
.card-orange {
  min-width: 135px !important;
  border-left: 5px solid orange !important;
}
.card-green {
  min-width: 135px !important;
  border-left: 5px solid green !important;
}
</style>
