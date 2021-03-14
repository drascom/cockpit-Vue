<template>
  <v-container fill-height>
    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-top-transition"
      :max-width="$vuetify.breakpoint.smAndUp ? '70%' : ''"
    >
      <v-card>
        <v-toolbar color="primary" dark>
          I found {{ foundItems.length }} similiar Customers
          <v-spacer></v-spacer>
          <v-btn smalldark text @click="resetForm()">
            <v-icon right> mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container class="py-8">
          <v-row class="align-center justify-center">
            <v-flex xs12 sm5>
              <v-card
                :height="$vuetify.breakpoint.smAndUp ? '150' : '120'"
                class="ma-2"
              >
                <v-card-text class="flex-grow-1 text-center pt-8">
                  Continue recording with
                </v-card-text>
                <v-card-text class="flex-grow-1 text-center text-uppercase">
                  <span class="text-h5 font-weight-bald">{{ search }}</span>
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-btn
                  block
                  color="blue lighten-3"
                  dark
                  large
                  @click="returnedItem(search)"
                >
                  {{ $t('common.NEW_RECORD') }}
                  <v-icon right> mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-flex>
            <v-flex xs12 sm1>
              <div class="text-h5 flex-grow-1 align-center text-center">
                - OR -
              </div>
            </v-flex>
            <v-flex xs12 sm5>
              <v-card
                :height="$vuetify.breakpoint.smAndUp ? '150' : '120'"
                class="ma-2 d-flex align-center"
              >
                <v-card-text class="flex-grow-1 text-center">
                  Select Name from <b>{{ foundItems.length }} </b> Existing
                  Customers
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-btn
                  block
                  color="blue lighten-2"
                  dark
                  large
                  @click=";(dialog = false), (searched = true)"
                >
                  {{ $t('common.GO_TO_LIST') }}
                  <v-icon right> mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-slide-y-transition
      mode="in"
      hide-on-leave
      group
      tag="v-row"
      class="align-start justify-center"
    >
      <v-flex xs12 sm6 md6 lg4 class="mx-1" key="l1" v-if="!searched">
        <p class="pt-8">{{ $t('customers.TYPE_NAME') }}</p>
        <BaseTextInput
          v-model="search"
          :label="$t('listing.CUSTOMER_NAME')"
          outlined
          autocomplete="off"
          class=""
          prepend-icon="mdi-account"
        >
          <template v-slot:append-outer> </template>
        </BaseTextInput>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading || !visible"
          color="primary"
          @click="checkNames()"
        >
          {{ $t('common.CONTINUE') }}
          <template v-slot:loader>
            <span>Loading...</span>
          </template>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 key="l2" v-else>
        <v-container>
          <v-row>
            <v-flex xs12 sm12 :class="{ 'pa-2': !$vuetify.breakpoint.xs }">
              <v-toolbar>
                <v-btn color="error" @click="resetForm()">
                  <v-icon left> mdi-arrow-left </v-icon>
                  {{ $t('common.CHANGE_SELECTED') }}
                </v-btn>
              </v-toolbar>
              <v-card>
                <v-list
                  style="max-height: 400px"
                  class="overflow-y-auto pa-0 ma-0"
                  two-line
                >
                  <v-list-item-group
                    v-model="selected"
                    active-class="blue--text"
                  >
                    <template v-for="(item, index) in foundItems">
                      <v-list-item :key="item._id" @click="returnedItem(item)">
                        <template v-slot:default="{ active }">
                          <v-list-item-content class="text-left">
                            <v-list-item-title
                              v-text="item.name"
                            ></v-list-item-title>

                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.email"
                            ></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-action-text>
                              1 surgery</v-list-item-action-text
                            >

                            {{ item.phone_1 }}
                          </v-list-item-action>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index < foundItems.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-flex>
          </v-row>
        </v-container>
      </v-flex>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: 'newCustomer',
  data: () => ({
    search: '',
    searched: false,
    selected: [],
    loading: false,
    dialog: false
  }),
  watch: {
    search(newValue, oldValue) {
      if (oldValue && oldValue.length > 0)
        if (newValue.length < oldValue.length) {
          this.searched = false
          this.$store.commit('customers/SET_ITEMS', [])
        }
    }
    // search: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     if (newValue.length < oldValue.length) {
    //       this.allItems = []
    //     }
    //   }
    // }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    visible() {
      return this.search.length >= 4
    },
    foundItems: {
      get() {
        return this.$store.state.customers.found
      },
      set(value) {
        return value
      }
    },
    totalItems() {
      return this.$store.state.customers.total
    }
    // filteredItems() {
    //   return this.allItems.filter((item) => {
    //     return (
    //       (item.name || '')
    //         .toLocaleLowerCase('tr-TR')
    //         .indexOf((this.search || '').toLocaleLowerCase('tr-TR')) > -1
    //     )
    //   })
    // }
  },
  methods: {
    resetForm() {
      this.dialog = false
      this.loading = false
      this.searched = false
      this.search = ''
    },
    checkNames() {
      if (this.search.length >= 4) {
        this.loading = true

        this.$store
          .dispatch('commonStore/getSearchedItems', {
            name: 'customers',
            data: {
              filter: { name: { $regex: this.search.toLowerCase() } },
              fields: {},
              sort: { name: 1 }
            }
            // newValue.toLocaleLowerCase('tr-TR')
          })
          .then((res) => {
            if (!res.data.entries.length > 0) {
              this.returnedItem(this.search)
            }
            this.dialog = true
          })
      }
    },
    returnedItem(item) {
      if (item._id) {
        this.$emit('setName', { type: 'Object', data: item })
      } else {
        this.$emit('setName', { type: 'String', data: { name: item } })
      }
      this.resetForm
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
