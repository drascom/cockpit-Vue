<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <v-card flat class="mx-auto" max-width="500" min-height="80vh">
          <v-text-field
            v-model="search"
            outlined
            clearable
            persistent-hint
            label="Type something"
            type="text"
            hint="You can type Name, email or phone mumber"
          >
            <!-- <template v-slot:append-outer class="my-auto mx-auto">
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
            </template> -->
          </v-text-field>
          <v-expand-transition>
            <div v-show="filteredItems">
              <v-card class="mx-auto" max-width="500">
                <v-toolbar color="pink" dark>
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>
                  <v-toolbar-title
                    :class="{ 'text-body-2': $vuetify.breakpoint.xs }"
                  >
                    {{ filteredItems.length }} Customers Found
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-list two-line>
                  <v-list-item-group active-class="pink--text">
                    <template v-for="(item, index) in filteredItems">
                      <v-list-item
                        :key="item.title"
                        class="text-left"
                        @click.stop="handleClick(item)"
                      >
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
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
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
    },
    filteredItems() {
      if (!this.search || this.search.length < 4) {
        return false
      }
      return this.items.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.email.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.phone_1.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
    }
  },
  created() {
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'customers',
      data: {}
    })
  },
  methods: {
    handleClick(item) {
      this.$router.push(`/customers/${item._id}`)
    },
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
