<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <v-card flat class="mx-auto" max-width="500">
          <v-text-field
            v-model="search"
            outlined
            clearable
            label="Type something"
            type="text"
          >
            <template v-slot:append-outer class="my-auto mx-auto">
              <v-btn
                :small="$vuetify.breakpoint.xs"
                text
                color="primary"
                @click="checkNames"
                type="submit"
                class="my-auto mx-auto"
                offset-y
              >
                <v-icon left> mdi-magnify </v-icon>
                <span v-show="!$vuetify.breakpoint.xs">Search</span>
              </v-btn>
            </template>
          </v-text-field>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <v-data-iterator
          :items="foundItems"
          item-key="_id"
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
                <v-card>
                  <v-badge
                    value="rerwrwe"
                    bordered
                    color="red"
                    content="rewrewrwe"
                    offset-y="12"
                    offset-x="-4"
                    inline
                  >
                    <v-card-text class="text-left text-wrap">
                      {{ item.name }}
                    </v-card-text>
                  </v-badge>
                  <v-divider></v-divider>
                  <v-list class="text-body-2" dense>
                    <v-list-item>
                      <v-list-item-content
                        >{{ $t('listing.PAYMENT_DATE') }}:
                      </v-list-item-content>
                      <v-list-item-content class="align-end">
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        {{ $t('listing.AMOUNT') }}:</v-list-item-content
                      >
                      <v-list-item-content class="align-end">
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator> -->
        <template>
          <v-card class="mx-auto" max-width="500">
            <v-toolbar color="pink" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Inbox</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list two-line>
              <v-list-item-group active-class="pink--text">
                <template v-for="(item, index) in foundItems">
                  <v-list-item :key="item.title">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="item.country"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle
                          v-text="item.email"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.phone_1"
                        ></v-list-item-action-text>

                        <v-icon v-if="!active" color="grey lighten-1">
                          mdi-star-outline
                        </v-icon>

                        <v-icon v-else color="yellow darken-3">
                          mdi-star
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      foundItems: []
    }
  },
  computed: {
    items() {
      return this.$store.state.customers.items
    }
  },
  created() {
    // this.checkNames()
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'customers',
      data: {}
    })
  },
  methods: {
    checkNames() {
      this.foundItems = []
      this.$store
        .dispatch('commonStore/getSearchedItems', {
          name: 'customers',
          data: {
            filter: {
              $or: [
                { name: { $regex: this.search.toLowerCase() } },
                { email: { $regex: this.search.toLowerCase() } },
                { country: { $regex: this.search.toLowerCase() } },
                { phone_1: { $regex: this.search.toLowerCase() } }
              ]
            }
          }
          // newValue.toLocaleLowerCase('tr-TR')
        })
        .then((res) => {
          console.log(res.data.total)
          if (res.data.total > 0) {
            this.foundItems = res.data.entries
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
