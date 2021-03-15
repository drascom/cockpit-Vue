<template>
  <v-card class="elevation-8" flat>
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
      <v-btn small color="red" to="/payments">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row class="mt-2 align-start justify-center">
      <v-flex xs12 sm12 md5 lg4 class="px-2 align-start" key="l1">
        <v-layout row wrap child-flex style="position: relative">
          <v-flex xs6 class="pa-4">
            <BaseUploadModule
              :label="$t('payments.INCOMING_DOCUMENT')"
              name="image_sent"
              :editMode="editable"
              v-model="formData.image_sent"
              @input="handleSaveEdit()"
              key="0"
            />
          </v-flex>
          <v-flex xs6 class="pa-4">
            <BaseUploadModule
              :label="$t('payments.RECEIVED_DOCUMENT')"
              name="image_receive"
              :editMode="editable"
              v-model="formData.image_receive"
              @input="handleSaveEdit()"
              key="1"
            />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md7 lg8 class="px-2" key="l2">
        <v-form ref="form" v-model="valid" @submit.prevent class="mt-4">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6">
                <BaseSelectList
                  v-model="formData.customer_name"
                  :label="$t('payments.CUSTOMER_NAME')"
                  :rules="[validationRules.requiredField]"
                  :options="customerNameOptions"
                  autocomplete="off"
                  class="p7-5"
                  prepend-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <BaseTextInput
                  v-model="formData.sender_name"
                  :label="$t('payments.SENDER_NAME')"
                  :rules="[validationRules.requiredField]"
                  autocomplete="off"
                  class="p7-5"
                  prepend-icon="mdi-account"
                />
              </v-col>
              <v-col ols="12" sm="6">
                <BaseDateInput
                  v-model="formData.surgery_date"
                  :label="$t('payments.SURGERY_DATE')"
                  prepend-icon="mdi-calendar"
                  class="p7-5"
                  :clearable="mode"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" :sm="user.group != 'acenta' ? '6' : '12'">
                <BaseDateInput
                  v-model="formData.payment_date"
                  :label="$t('payments.PAYMENT_DATE')"
                  prepend-icon="mdi-calendar"
                  class="p7-5"
                  :clearable="mode"
                />
              </v-col>
              <v-col cols="12" sm="">
                <BaseNumberInput
                  v-model="formData.total_amount"
                  :label="$t('payments.AMOUNT')"
                  hint="Only Numbers"
                  autocomplete="off"
                  prepend-icon="mdi-cash-check"
                />
              </v-col>
            </v-row>
            <v-row class="d-flex justify-space-between">
              <v-col cols="12" sm="6">
                <BaseDateInput
                  v-model="formData.received_date"
                  :label="$t('payments.RECEIVED_DATE')"
                  :rules="
                    formData.receiving_done
                      ? [validationRules.requiredField]
                      : []
                  "
                  :disabled="user.group == 'acenta'"
                  prepend-icon="mdi-calendar"
                  class="p7-5"
                  :clearable="mode"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <BaseNumberInput
                  v-model="formData.net_amount"
                  :label="$t('payments.RECEIVED_AMOUNT')"
                  :rules="
                    formData.receiving_done
                      ? [validationRules.requiredField]
                      : []
                  "
                  hint="Only Numbers"
                  :disabled="user.group == 'acenta'"
                  autocomplete="off"
                  prepend-icon="mdi-cash-check"
                  @input="setStatus($event)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" class="px-4">
                <BaseRadioInput
                  v-model="formData.currency"
                  :options="currencyOptions"
                  :label="$t('payments.CURRENCY')"
                  hint="Only Numbers"
                  :row="$vuetify.breakpoint.xs"
                  outlined
                />
              </v-col>
              <v-col v-if="user.group != 'acenta'">
                <v-card outlined class="px-4">
                  <v-card-title> {{ $t('payments.STATUS') }} </v-card-title>
                  <v-card-text>
                    <v-switch
                      v-model="formData.receiving_done"
                      :label="formData.receiving_done ? 'Ödendi' : 'Bekleniyor'"
                      @change="checkSwitch"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-end">
                <v-btn
                  v-if="mode"
                  color="primary"
                  :disabled="!valid"
                  @click="handleSaveEdit()"
                >
                  {{ $t('common.UPDATE') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-flex>
    </v-row>
  </v-card>
</template>
<script>
import validationRules from '@/utils/validationRules'

export default {
  name: 'CreateEdit',
  props: {
    value: Boolean,
    editForm: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      mode: false,
      validationRules,
      searched: true,
      surgery_date: false,
      payment_date: false,
      received_date: false,
      rules: [(v) => !!v || 'Required.'],
      valid: false,
      formData: {},
      senderName: false,
      currencyOptions: [
        {
          label: 'Euro',
          value: 'euro',
          icon: 'mdi-currency-eur'
        },
        {
          label: 'Usd',
          value: 'usd',
          icon: 'mdi-currency-usd'
        },
        {
          label: 'TL',
          value: 'tl',
          icon: 'mdi-currency-try'
        }
      ]
    }
  },
  components: {
    searchList: require('@/components/Customers/customerSeachList.vue').default
  },
  computed: {
    editable: {
      get() {
        return !this.formData.closed
      }
    },
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    customerNameOptions() {
      return this.$store.state.customers.items
    },
    validated() {
      return this.$refs.form.validate()
    },
    user() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted() {
    this.formData = Object.assign({}, this.formData, this.editForm)
  },
  methods: {
    editMode() {
      this.mode = !this.mode
      this.$emit('editMode', this.mode)
    },
    handleDelete() {
      this.$emit('deleteItem', true)
    },
    formatted_date(date) {
      return this.$moment(date).format('DD,  MMM YYYY')
    },
    daysAgo(date) {
      return this.$moment(date, 'YYYY-MM-DD').fromNow()
    },
    checkRef(ref) {
      document.getElementById(ref).click()
    },
    checkSwitch(value) {
      if (!value) {
        this.formData.net_amount = ''
        this.formData.received_date = ''
        this.formData.closed = false
      }
    },
    setStatus(v) {
      if (v && v > 0) {
        this.formData.receiving_done = true
      } else {
        this.formData.receiving_done = false
      }
    },
    handleSaveEdit() {
      this.$emit('save-confirm', this.formData)
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-green input {
  color: green !important;
}
</style>
