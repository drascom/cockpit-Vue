<template>
  <v-container fill-height class="pa-0" v-resize="onResize" v-if="item">
    <v-row justify="center">
      <v-dialog
        v-model="editDialog"
        transition="dialog-bottom-transition"
        scrollable
        persistent
        max-width="600px"
      >
        <v-card>
          <v-app-bar flat>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        text
        color="error"
        @click="handleDelete()"
        class="mr-2"
        v-if="editable || user.group === 'admin'"
      >
        <v-icon left>mdi-cancel</v-icon> {{ $t('dataTable.DELETE') }}
      </v-btn>
      <v-btn
        outlined
        text
        color="primary"
        class="mr-2"
        :disabled="!valid"
        @click="handleSaveEdit()"
      >
        {{ $t('common.UPDATE') }}
      </v-btn>
      <v-btn small color="red" @click="editDialog = false">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
          <v-card-text>
            <EditPage
                :edit-form="item"
                @editMode="handleEditMode($event)"
                @save-confirm="handleSaveConfirm"
                @deleteItem="handleDelete(item)"
              />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="editDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col
        sm="6"
        md="4"
        cols="12"
        min-width="350"
        :class="{ 'pa-0': $vuetify.breakpoint.xs }"
      >
        <v-card
          class="mx-auto pa-0"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          max-width="600"
        >
          <v-hover v-slot="{ hover }" v-show="!editDialog" >
              <BaseUploadModule
                name="avatar"
                :editMode="editable"
                v-model="item.avatar"
                @input="handleSaveEdit"
                key="0"
              />
          </v-hover>
          <v-card-text style="position: relative">
            <v-btn
              absolute
              color="orange"
              class="white--text"
              fab
              :large="$vuetify.breakpoint.mdAndUp"
              right
              bottom
              @click="editDialog = !editDialog"
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <div
              class="mt-6"
              :class="$vuetify.breakpoint.xs ? 'text-body-1' : 'text-h5'"
            >
              {{ item.name }}
            </div>
          </v-card-text>
          <v-divider></v-divider>

            <v-card flat >
              <v-card-actions @click="show = !show">
                <v-btn color="orange lighten-2" text> Personal Info </v-btn>

                <v-spacer></v-spacer>

                <v-btn v-show="windowSize < 500" icon>
                  <v-icon>{{
                    showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-divider></v-divider>
              <v-expand-transition>
                <div v-show="showInfo">
                  <v-card-text class="text-left">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon color="indigo"> mdi-phone </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          {{ item.phone_1 || '--' }}
                        </v-list-item-title>
                        <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon color="indigo"> mdi-email </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          {{ item.email || '--' }}
                        </v-list-item-title>
                        <v-list-item-subtitle>e@mail</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon color="indigo"> mdi-map-marker </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="text-uppercase">
                        <v-list-item-subtitle>
                          {{ item.city || '--' }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          {{ item.country || '--' }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon color="indigo">mdi-chess-knight </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle>IT Manager</v-list-item-subtitle>
                        <v-list-item-subtitle>Job title</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn color="orange lighten-2" text>
                        Social Accounts
                      </v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-list-item v-if="socialAccounts.length < 1">
                      <v-list-item-icon>
                        <v-icon color="indigo">mdi-help-circle </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        Kayıt bulunamadı
                      </v-list-item-content>
                    </v-list-item>
                    <template v-for="(item, index) in socialAccounts">
                      <v-list-item :key="item._id">
                        <v-list-item-icon>
                          <v-icon color="brown">{{ item.network.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-subtitle>{{
                            item.nickname
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider
                        inset
                        v-if="index < socialAccounts.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                    <v-divider></v-divider>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

          </v-slide-y-transition-group>
        </v-card>
      </v-col>
      <v-col
        sm="6"
        cols="12"
        min-width="350"
        :class="{ 'pa-0': $vuetify.breakpoint.xs }"
      >
        <v-card
          class="pa-auto ma-auto"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
        >
          <v-card-actions>
            <v-btn color="orange lighten-2" text> Visits </v-btn>
          </v-card-actions>
          <v-card-text>
            <v-card v-for="visit in visits" :key="visit._id" class="pa-2 my-2">
              <v-list-item>
                <v-list-item-content class="text-left">
                  <v-list-item-title v-text="visit.type"> </v-list-item-title>
                  <v-list-item-subtitle v-text="visit.date">
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-badge inline content="completed">
                  <v-list-item-action> </v-list-item-action>
                </v-badge>
              </v-list-item>
              <v-divider></v-divider>
              <v-card color="grey lighten-3" flat class="pa-2" id="visitdetail">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-list-item v-if="!visit.visitdetails.final_price">
                      <v-list-item-content>
                        <v-list-item-title>
                          Estimated Grafts
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ visit.visitdetails.estimated_grafts || '--' }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title>Estimated Price</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ visit.visitdetails.estimated_price || '--' }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-else>
                      <v-list-item-content>
                        <v-list-item-title>Current Grafts</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ visit.visitdetails.final_grafts || '--' }}
                        </v-list-item-subtitle> </v-list-item-content
                      ><v-list-item-content>
                        <v-list-item-title>Current Price</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ visit.visitdetails.final_price || '--' }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col class="d-flex flex-justify-center align-self-center">
                    <v-btn text block color="grey darken-1"> Details </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-expressions */
import commonJS from '@/store/common.js'
const EditPage = () => import('./CustomerEdit')

export default {
  name: 'Listing',
  props: ['id'],
  components: {
    EditPage
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      show: null,
      windowSize: '',
      editable: true,
      editDialog: false,
      visits: [
        {
          _id: '23456789',
          date: '2020-01-01',
          type: 'Muayene',
          visitdetails: {
            estimated_grafts: '3000',
            estimated_price: '3300'
          }
        },
        {
          _id: '8765432',
          date: '2020-11-11',
          type: 'saç ekimi',
          visitdetails: {
            final_grafts: '2850',
            final_price: '3100'
          }
        },
        {
          _id: '65464',
          date: '2020-11-11',
          type: 'saç ekimi',
          visitdetails: {
            final_grafts: '2850',
            final_price: '3100'
          }
        }
      ]
    }
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      console.log('common yok oluşturuldu')
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  mounted() {
    this.show = !this.$vuetify.breakpoint.xs
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'customers',
      data: {}
    })
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'social',
      data: { 'customer_id._id': this.id }
    })
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
    item() {
      return this.$store.getters['customers/getItem'](this.id)
    },
    socialAccounts() {
      return this.$store.getters['social/items']
    },
    showInfo: {
      get() {
        return this.show
      },
      set(value) {
        return value
      }
    }
  },
  methods: {
    goster() {
      this.show = this.$vuetify.breakpoint.xs
    },
    onResize() {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      }
    },
    handleSaveEdit() {
      this.saveItem(this.item)
    },
    handleSaveConfirm(payload) {
      this.saveItem(payload).then((this.confirmDialog = false))
    },
    handleDelete(item) {
      this.deleteItem(item)
    },
    async deleteFile(field, payload) {
      const res = await this.$confirm(
        this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
        {
          title: 'error'
        }
      )
      if (res) {
        await this.$store
          .dispatch('customers/deleteFile', {
            name: 'customers',
            data: payload[field]
          })
          .then(() => {
            payload[field] = null
            this.saveItem(payload)
          })
      }
    },
    async saveItem(payload) {
      await this.$store
        .dispatch('commonStore/save', {
          name: 'customers',
          data: payload
        })
        .then(() => {
          const activityData = {
            published: true,
            related_customer: {
              _id: payload._id,
              link: 'customers',
              display: payload.name
            },
            activity: 'NEW_UPDATED',
            account: this.user._id,
            _by: this.user._id
          }
          this.$store.dispatch('commonStore/save', {
            name: 'activities',
            data: activityData
          })
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
