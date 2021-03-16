<template>
  <v-card>
    <v-dialog
      v-model="editDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
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
            :item="item"
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
    <v-container fluid v-if="item">
      <v-row no-gutters>
        <v-col sm="3">
          <v-avatar
            size="100"
            v-ripple
            rounded
            class="grey lighten-3 mx-auto mt-12"
            elevation="8"
          >
            <v-img
              v-if="!item.avatar"
              src="http://www.ederra.com.tr/crm/yukleme/avatar/ava-256.png"
            />
            <v-img
              v-else
              cover
              :lazy-src="`${apiUrl}/storage/uploads${item.avatar.path}`"
              :src="`${apiUrl}/storage/uploads${item.avatar.path}`"
            />
          </v-avatar>
          <v-card-title class="py-0">
            <v-btn small block text>Photo Gallery</v-btn>
          </v-card-title>
          <v-card-text justify="space-around">
            <v-icon
              color="indigo"
              left
              v-for="(item, index) in socialAccounts"
              :key="item._id"
            >
              {{ item.network.icon }}
            </v-icon>
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-actions @click="show = !show" class="pa-0">
            <v-btn color="orange lighten-2" text> {{ item.name }} </v-btn>
            <v-spacer></v-spacer>
            <v-icon>mdi-heart</v-icon>
            <v-chip class="mx-2" small> {{ item.status }}</v-chip>
          </v-card-actions>
          <v-divider class="pb-6"></v-divider>
          <v-row no-gutters>
            <v-col cols="12">
              <v-list three-line dense min-width="350" class="pa-0">
                <v-list-item :key="item.title" class="text-left pa-0">
                  <v-divider vertical class="mr-2"></v-divider>
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle class="text--primary">
                      <v-icon small color="indigo">
                        mdi-map-marker-outline
                      </v-icon>
                      <span class="text-uppercase">
                        {{ item.country }} / {{ item.origin }}
                      </span>
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      <v-icon small color="indigo"> mdi-email-outline </v-icon>
                      {{ item.email }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon small color="indigo">
                        mdi-card-account-details-outline
                      </v-icon>
                      {{ item.passaport_number }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-divider vertical class="mr-2"></v-divider>
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle>
                      <v-icon small left color="indigo">
                        mdi-cellphone-basic
                      </v-icon>
                      <a :href="`tel:${item.phone_1}`">{{ item.phone_1 }}</a>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon small color="indigo"> mdi-cake-variant </v-icon>
                      {{ daysAgo(item.date_of_birth) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon small color="orange"> mdi-account </v-icon>
                      {{ member.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-divider vertical class="mr-2"></v-divider>
                  <v-list-item-content class="px-2">
                    <v-btn
                      small
                      block
                      text
                      class="grey lighten-4 ma-1"
                      color="primary lighten-2"
                      @click="editDialog = true"
                    >
                      Düzenle
                    </v-btn>
                    <v-btn
                      small
                      block
                      text
                      class="grey lighten-3 ma-1"
                      color="orange lighten-2"
                    >
                      muhasebe
                    </v-btn>
                    <v-btn
                      small
                      block
                      text
                      class="grey lighten-2 ma-1"
                      color="red lighten-2"
                    >
                      Raporlar
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card class="d-flex flex-row my-2 py-6 px-4 flex-justify-start">
        <v-card class="" min-width="350">
          <v-toolbar color="pink" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title :class="{ 'text-body-2': $vuetify.breakpoint.xs }">
              {{ visits.length }} Visit
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-printer</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list three-line>
            <v-list-item-group active-class="pink--text">
              <template v-for="(item, index) in visits">
                <v-list-item :key="item._id" class="text-left">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-badge  color="error" :content="item.status" offset-y="50"  offset-x="70">
                        <v-list-item-title
                          v-text="item.type"
                        ></v-list-item-title>
                      </v-badge>
                      <v-list-item-subtitle v-text="item.date">
                      </v-list-item-subtitle>
                      <v-list-item-content
                        v-if="!item.visitdetails.final_price"
                      >
                        <v-list-item-title>
                          Estimated Grafts :
                          <span class="font-weight-light">
                            {{
                              item.visitdetails.estimated_grafts || '--'
                            }}</span
                          >
                        </v-list-item-title>

                        <v-list-item-title
                          >Estimated Price :
                          <span class="font-weight-light">
                            {{
                              item.visitdetails.estimated_price || '--'
                            }}</span
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content v-else>
                        <v-list-item-title>
                          Final Grafts :
                          <span class="font-weight-light">
                            {{ item.visitdetails.final_grafts || '--' }}</span
                          >
                        </v-list-item-title>

                        <v-list-item-title
                          >Final Price :
                          <span class="font-weight-light">
                            {{ item.visitdetails.final_price || '--' }}</span
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < visits.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card class="pa-2" outlined> gfdgdfgd</v-card>
        <v-card class="pa-2" outlined> gfdgdfgdf</v-card>
      </v-card>

      <pre>{{ visits }}</pre>
    </v-container>
  </v-card>

  <!-- <v-container fill-height class="pa-0" v-resize="onResize" v-if="item" fluid >
    <v-row justify="center">

      <v-col
        sm="6"
        md="4"
        cols="12"
        min-width="350"
        :class="{ 'pa-0': $vuetify.breakpoint.xs }"
      >


          </v-slide-y-transition-group>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
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
  </v-container> -->
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
          status: 'Completed',
          visitdetails: {
            estimated_grafts: '3000',
            estimated_price: '3300'
          }
        },
        {
          _id: '8765432',
          date: '2020-11-11',
          type: 'saç ekimi',
          status: 'Waiting',
          visitdetails: {
            final_grafts: '2850',
            final_price: '3100'
          }
        },
        {
          _id: '65464',
          date: '2020-11-11',
          type: 'saç ekimi',
          status: 'Canceled',
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
      data: { filter: { _id: this.id } }
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
    member() {
      return this.$store.getters['user/member']
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
  watch: {
    item(value) {
      this.$store.dispatch('user/getOneItem', {
        name: 'user',
        filter: { _id: value._by }
      })
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
    daysAgo(date) {
      return this.$moment(date, 'YYYY-MM-DD').fromNow(true)
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
