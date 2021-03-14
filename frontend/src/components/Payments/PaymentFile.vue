<template>
  <v-card flat v-if="item">
    <DialogPicture :selectedPicture="selectedPicture" v-model="showPicture" />
    <!-- <v-app-bar fixed dark color="secondary">
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.3), rgba(128,208,199,.7)"
        />
      </template>
      <v-btn large icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{
        $t('componentModules.CONFIRM_PAYMENT')
      }}</v-toolbar-title>
      <v-spacer />
      <v-btn large icon to="/payments">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-container fluid>
          <EditPage
            v-model="editDialog"
            :edit-form="item"
            @editMode="handleEditMode($event)"
            @save-confirm="handleSaveConfirm"
            @deleteItem="handleDelete(item)"
          />
    </v-container>
  </v-card>
</template>

<script>
import commonJS from '@/store/common.js'
const EditPage = () => import('./PaymentEdit')
export default {
  name: 'Listing',
  props: ['id'],
  components: {
    EditPage
  },
  data() {
    return {
      confirmDialog: false,
      editDialog: false,
      editMode: false,
      turnover: 0,
      dialogTitle: null,
      selectedPicture: '',
      listError: [],
      showPicture: false,
      apiUrl: process.env.VUE_APP_API_URL
    }
  },
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      console.log('common yok oluşturuldu')
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  mounted() {
    this.$store.dispatch('commonStore/getAllItems', {
      name: 'payments',
      data: {}
    })
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
    item() {
      return this.$store.getters['payments/getItem'](this.id)
    },
    imageEdit: {
      get() {
        return !this.item.status
      }
    }
  },
  methods: {
    handleEditMode(mode) {
      this.editMode = mode
    },
    handleOpenConfirm() {
      this.confirmDialog = true
    },
    handleSaveConfirm(payload) {
      this.saveItem(payload).then((this.confirmDialog = false))
    },
    handleOpenImage(url) {
      this.selectedPicture = url
      this.showPicture = true
    },
    handleOpenEdit() {
      this.editDialog = true
    },
    handleDelete(item) {
      this.deleteItem(item)
    },
    receiving_date(date) {
      return this.$moment(date).format('DD,  MMM YYYY')
    },
    daysAgo(date) {
      return this.$moment(date, 'YYYY-MM-DD').fromNow()
    },
    checkRef(ref) {
      document.getElementById(ref).click()
    },
    async uploadFile(item) {
      this.saveItem(item)
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
          .dispatch('payments/deleteFile', {
            name: 'payments',
            data: payload[field]
          })
          .then(() => {
            payload[field] = null
            this.saveItem(payload)
          })
      }
    },
    async saveItem(payload) {
      payload.sending_done = !!(payload.payment_date && payload.customer_name)
      payload.receiving_done = !!(payload.net_amount && payload.received_date)
      payload.status = !!(payload.sending_done && payload.receiving_done)
      await this.$store
        .dispatch('commonStore/save', {
          name: 'payments',
          data: payload
        })
        .then(() => {
          const activityData = {
            published: true,
            related_payment: {
              _id: payload._id,
              link: 'payments',
              display: payload.customer_name
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
    },
    async deleteItem(payload) {
      const res = await this.$confirm(
        this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
        {
          title: this.$t('common.WARNING')
        }
      )
      if (res) {
        await this.$store
          .dispatch('commonStore/delete', {
            name: 'payments',
            data: payload
          })
          .then(() => {
            const activityData = {
              published: true,
              related_payment: {
                _id: payload._id,
                link: 'payments',
                display: payload.customer_name
              },
              activity: 'DELETED',
              account: this.user._id,
              _by: this.user._id
            }
            this.$store.dispatch('commonStore/save', {
              name: 'activities',
              data: activityData
            })
            this.isLoading = false
            this.$router.push('/')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
