<template>
  <v-container fill-height>
    <v-row class="align-start justify-center">
      <v-flex xs12 sm6 md6 lg4 class="mx-1" key="l1">
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
          color="primary"
          @click="checkNames()"
        >
          {{ $t('common.CONTINUE') }}
          <template v-slot:loader>
            <span>Loading...</span>
          </template>
        </v-btn>
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
    </v-row>
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
      if (this.search.length > 5) {
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
