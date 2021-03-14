<template>
  <div>
    <v-dialog v-model="confirmation" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t('newForm.NEXT_MOVE_HEADER') }}
        </v-card-title>

        <v-card-text class="text-button">
          {{ $t('newForm.NEXT_MOVE_DESC') }}
        </v-card-text>

        <v-card-actions class="justify-space-between">
          <v-btn outlined color="green darken-1" text @click="startNew">
            {{ $t('newForm.NEXT_MOVE_NEW_RECORD') }}
          </v-btn>
          <v-spacer />
          <v-btn outlined color="blue darken-1" text @click="goToList">
            {{ $t('newForm.NEXT_MOVE_GO_TO_LIST') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-stepper v-model="currStep">
      <v-stepper-header>
        <v-stepper-step
          v-show="currStep <= 2"
          :complete="currStep > 1"
          step="1"
          :color="stepStatus(1)"
        >
          {{ $t('newForm.STEP_HEADER_1') }}
        </v-stepper-step>
        <v-divider v-show="currStep < 3"></v-divider>

        <v-stepper-step
          v-show="currStep <= 3"
          :complete="currStep > 2"
          step="2"
          :color="stepStatus(2)"
        >
          {{ $t('newForm.STEP_HEADER_2') }}
        </v-stepper-step>
        <v-divider v-show="currStep < 4"></v-divider>

        <v-stepper-step
          v-show="currStep >= 1 && currStep <= 4"
          :complete="currStep > 3"
          step="3"
          :color="stepStatus(3)"
        >
          {{ $t('newForm.STEP_HEADER_3') }}
        </v-stepper-step>
        <v-divider v-show="currStep > 2 && currStep <= 4"></v-divider>

        <v-stepper-step
          v-show="currStep >= 3 && currStep <= 5"
          :complete="currStep > 4"
          step="4"
          :color="stepStatus(4)"
        >
          {{ $t('newForm.STEP_HEADER_4') }}
        </v-stepper-step>
        <v-divider
          v-if="this.user.group !== 'acenta'"
          v-show="currStep > 3 && currStep <= 5"
        ></v-divider>

        <v-stepper-step
          v-if="this.user.group !== 'acenta'"
          v-show="currStep > 3 && currStep <= 6"
          :complete="currStep > 5"
          step="5"
          :color="stepStatus(5)"
        >
          {{ $t('newForm.STEP_HEADER_5') }}
        </v-stepper-step>
        <v-divider v-show="4 < currStep < 6"></v-divider>

        <v-stepper-step
          v-if="user.group == 'acenta'"
          v-show="currStep > 4 && currStep < 7"
          :complete="currStep > 5"
          step="6"
          :color="stepStatus(6)"
        >
          {{ $t('newForm.STEP_HEADER_6') }}
        </v-stepper-step>
        <v-divider v-show="5 > currStep > 7"></v-divider>

        <v-stepper-step
          v-show="currStep > 5"
          :complete="currStep > 6"
          step="7"
          :color="stepStatus(7)"
        >
          {{ $t('newForm.STEP_HEADER_7') }}
        </v-stepper-step>
        <v-divider v-show="currStep > 6"></v-divider>

        <v-stepper-step
          v-show="currStep == 8"
          complete
          step="8"
          color="success"
        >
          Completed
        </v-stepper-step>
        <v-divider v-show="currStep == 8"></v-divider>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          step="1"
          :class="$vuetify.breakpoint.xs ? 'pa-0' : ''"
        >
          <v-card
            flat
            class="mx-auto"
            :width="$vuetify.breakpoint.smAndUp ? '80%' : ''"
          >
            <v-slide-y-transition v-if="showWizard">
              <newCustomer @setName="setName" />
            </v-slide-y-transition>
            <v-form
              v-else
              ref="form1"
              v-model="form1"
              @submit.prevent=""
              class="mt-4"
            >
              <v-container fluid>
                <v-row
                  :no-gutters="$vuetify.breakpoint.xs"
                  justify="start"
                  align="start"
                >
                  <v-col sm="6" cols="12">
                    <BaseTextInput
                      v-model="formData.customer_name"
                      :label="$t('newForm.FORM_CUSTOMER_NAME')"
                      :rules="[validationRules.requiredField]"
                      @input="copySenderName"
                      outlined
                    />
                  </v-col>
                  <v-col sm="6" cols="12">
                    <BaseTextInput
                      v-model="formData.sender_name"
                      :label="$t('newForm.FORM_SENDER_NAME')"
                      :disabled="!customerNameStatus"
                      hint="use only sender is and different customer "
                      outlined
                    />
                    <BaseActionInput
                      :label="$t('newForm.DIFFERENT_NAME')"
                      inset
                      outlined
                      @action="handleSenderName"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-card-actions class="mt-6">
                <v-btn color="error" @click="showWizard = true">
                  {{ $t('common.CHANGE_SELECTED') }}
                </v-btn>
                <v-spacer />
                <v-btn
                  :disabled="!form1"
                  type="submit"
                  color="primary"
                  @click="currStep = 2"
                >
                  {{ $t('common.CONTINUE') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            flat
            class="mx-auto pa-2"
            :width="$vuetify.breakpoint.smAndUp ? '60%' : ''"
          >
            <v-form ref="form2" v-model="form2" @submit.prevent="" class="mt-4">
              <v-container>
                <v-row justify="start" align="start">
                  <v-col sm="6" cols="12">
                    <BaseDateInput
                      v-model="formData.surgery_date"
                      :label="$t('newForm.FORM_SURGERY_DATE')"
                      hint="it may empty"
                      outlined
                    />
                  </v-col>
                  <v-col sm="6" cols="12">
                    <BaseDateInput
                      v-model="formData.payment_date"
                      :max="new Date().toJSON().slice(0, 10)"
                      :label="$t('newForm.FORM_TRANSFER_DATE')"
                      :rules="[validationRules.requiredField]"
                      hint="Required"
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-card-actions class="mt-6">
                <v-btn @click="currStep = 1">
                  {{ $t('common.GO_BACK') }}
                </v-btn>
                <v-spacer />
                <v-btn
                  :disabled="!form2"
                  type="submit"
                  color="primary"
                  @click="currStep = 3"
                >
                  {{ $t('common.CONTINUE') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card
            flat
            class="mx-auto pa-2"
            :width="$vuetify.breakpoint.smAndUp ? '60%' : ''"
          >
            <v-form ref="form3" v-model="form3" @submit.prevent="" class="mt-4">
              <v-container>
                <v-row justify="start" align="start">
                  <v-col sm="6" cols="12">
                    <BaseNumberInput
                      v-model="formData.total_amount"
                      :label="$t('newForm.FORM_AMOUNT')"
                      :rules="[validationRules.requiredField]"
                      hint="Only Numbers"
                      outlined
                    />
                  </v-col>
                  <v-col sm="6" cols="12">
                    <BaseRadioInput
                      v-model="formData.currency"
                      :options="currencyOptions"
                      :label="$t('newForm.FORM_CURRENCY')"
                      hint="Only Numbers"
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-card-actions class="mt-6">
                <v-btn @click="currStep = 2">
                  {{ $t('common.GO_BACK') }}
                </v-btn>
                <v-spacer />
                <v-btn
                  :disabled="!form3"
                  color="primary"
                  type="submit"
                  @click="
                    user.group !== 'acenta' ? (currStep = 4) : (currStep = 6)
                  "
                >
                  {{ $t('common.CONTINUE') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card
            flat
            class="mx-auto pa-2"
            :width="$vuetify.breakpoint.smAndUp ? '60%' : ''"
          >
            <v-form ref="form4" v-model="form4" @submit.prevent="" class="mt-4">
              <v-container>
                <v-row justify="start" align="start">
                  <v-col sm="6" cols="12">
                    <BaseDateInput
                      v-model="formData.received_date"
                      :label="$t('listing.RECEIVED_DATE')"
                      :rules="[validationRules.requiredField]"
                      :max="new Date().toJSON().slice(0, 10)"
                      outlined
                    />
                  </v-col>
                  <v-col sm="6" cols="12">
                    <BaseNumberInput
                      v-model="formData.net_amount"
                      :label="$t('listing.RECEIVED_AMOUNT')"
                      :rules="[validationRules.requiredField]"
                      :hint="formData.currency"
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-card-actions class="mt-6">
                <v-btn @click="currStep = 3">
                  {{ $t('common.GO_BACK') }}
                </v-btn>
                <v-spacer />
                <v-btn
                  :disabled="!form4"
                  type="submit"
                  color="primary"
                  @click="currStep = 5"
                >
                  {{ $t('common.CONTINUE') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-card
            flat
            class="mx-auto pa-2"
            :width="$vuetify.breakpoint.smAndUp ? '60%' : ''"
          >
            <v-form ref="form5" v-model="form5" @submit.prevent="" class="mt-4">
              <BaseUploadModule
                :label="$t('listing.RECEIVED_DOCUMENT')"
                name="image_receive"
                :key="turnover"
                v-model="formData.image_receive"
              />
              <v-divider class="" />
              <v-card-actions class="mt-6">
                <v-btn @click="currStep = 4">
                  {{ $t('common.GO_BACK') }}
                </v-btn>
                <v-spacer />
                <v-btn
                  :disabled="!form5"
                  color="primary"
                  type="submit"
                  @click="
                    user.group !== 'acenta' ? (currStep = 7) : (currStep = 6)
                  "
                >
                  {{ $t('common.CONTINUE') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="6" v-if="user.group == 'acenta'">
          <v-card
            flat
            class="mx-auto pa-2"
            :width="$vuetify.breakpoint.smAndUp ? '60%' : ''"
          >
            <v-form ref="form6" v-model="form6" @submit.prevent="" class="mt-4">
              <BaseUploadModule
                :label="$t('listing.INCOMING_DOCUMENT')"
                name="image_sent"
                :key="turnover"
                v-model="formData.image_sent"
              />
            </v-form>
            <v-divider class="" />
            <v-card-actions class="mt-6">
              <v-btn
                @click="
                  user.group !== 'acenta' ? (currStep = 5) : (currStep = 3)
                "
              >
                {{ $t('common.GO_BACK') }}
              </v-btn>
              <v-spacer />
              <v-btn
                :disabled="!form6"
                type="submit"
                color="primary"
                @click="currStep = 7"
              >
                {{ $t('common.CONTINUE') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="7">
          <v-card
            flat
            class="mx-auto"
            :width="$vuetify.breakpoint.smAndUp ? '60%' : ''"
          >
            <v-card-actions>
              <v-btn outlined text @click.stop="currStep = 5">
                {{ $t('common.GO_BACK') }}
              </v-btn>
              <v-spacer />
              <v-btn color="primary" @click.stop.prevent="saveItem(formData)">
                {{ $t('common.SAVE') }}
              </v-btn>
            </v-card-actions>
            <v-list>
              <v-timeline dense>
                <v-timeline-item
                  v-for="(value, key, i) in formData"
                  :key="i"
                  :color="value ? 'success' : 'error'"
                  :icon="value ? 'mdi-check' : 'mdi-cancel'"
                >
                  <v-list-item-title class="text-capitalize text-left">
                    {{ key.replace(/[^a-zA-Z ]/g, ' ') }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-if="key == 'image_receive' || key == 'image_sent'"
                    class="text-subtitle text-left"
                    v-text="value ? value : 'Not entered..'"
                  />
                </v-timeline-item>
              </v-timeline>
            </v-list>
            <v-divider />
            <v-card-actions>
              <v-btn outlined text @click.stop="currStep = 5">
                {{ $t('common.GO_BACK') }}
              </v-btn>
              <v-spacer />
              <v-btn color="primary" @click.stop.prevent="saveItem(formData)">
                {{ $t('common.SAVE') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import validationRules from '@/utils/validationRules'
import commonJS from '@/store/common.js'

// eslint-disable-next-line func-style
function initialState() {
  return {}
}
export default {
  name: 'newPayment',
  beforeCreate() {
    if (!(this.$store && this.$store.state && this.$store.state.commonStore)) {
      this.$store.registerModule('commonStore', commonJS)
    }
  },
  data() {
    return {
      showWizard: true,
      nameType: '',
      validationRules,
      confirmation: false,
      turnover: 0,
      currStep: 1,
      form1: false,
      form2: false,
      form3: false,
      form4: false,
      form5: false,
      form6: false,
      customerNameStatus: false,
      uploadedFile: '',
      newCustomerData: initialState(),
      formData: initialState(),
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
    newCustomer: require('@/components/Customers/CustomerWizard.vue').default
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
    validate() {
      return this.$refs.form.validate()
    }
  },

  methods: {
    setName(data) {
      // wizard ile gelen veriyi al obj / str bak wizardı kapat str ise önce name save yap
      this.nameType = data.type
      this.newCustomerData = data.data
      this.formData.customer_name = this.newCustomerData.name
      this.showWizard = false
      this.copySenderName()
    },
    copySenderName() {
      this.formData.sender_name = this.formData.customer_name
    },
    stepStatus(step) {
      return this.currStep > step ? 'green' : 'blue'
    },
    handleSenderName(status) {
      this.customerNameStatus = status
      if (!status) {
        this.copySenderName()
      } else {
        this.formData.sender_name = ''
      }
    },
    handleImageUpdate(event) {
      // const key = Object.keys(event.data)[0]
      // this.uploadedFile = event.data[key]
      this.formData = Object.assign({}, this.formData, event.data)
    },
    goToList() {
      this.$router.replace({ name: 'paymentlist' })
    },
    startNew() {
      this.formData = initialState()
      this.newCustomerData = initialState()
      this.currStep = 1
      this.turnover += 1
      this.confirmation = false
      this.showWizard = true
    },
    saveCustomer(payload) {
      return this.$store
        .dispatch('commonStore/save', {
          name: 'customers',
          data: payload
        })
        .then((res) => {
          // const activityData = {
          //   published: true,
          //   related_customer: {
          //     _id: res.data._id,
          //     link: 'customers',
          //     display: res.data.name
          //   },
          //   activity: 'CUSTOMER ADDED',
          //   account: this.user._id,
          //   _by: this.user._id
          // }
          // this.$store.dispatch('commonStore/save', {
          //   name: 'activities',
          //   data: activityData
          // })
          return res
        })
    },
    async saveItem(payload) {
      console.log('saveitem payload', payload)
      if (this.nameType === 'String') {
        const responseData = await this.saveCustomer({
          ...this.newCustomerData
        })
        console.log('saveitem new data', responseData)
        payload.customer_name = {
          _id: responseData.data._id,
          link: 'customers',
          display: responseData.data.name
        }
      } else {
        payload.customer_name = {
          _id: this.newCustomerData._id,
          link: 'customers',
          display: this.newCustomerData.name
        }
      }
      console.log('saveitem new payload', payload)
      payload.sending_done = !!(payload.surgery_date && payload.customer_name)
      payload.receiving_done = !!(payload.net_amount && payload.received_date)
      await this.$store
        .dispatch('commonStore/save', {
          name: 'payments',
          data: payload
        })
        .then(() => {
          setTimeout(() => {
            this.currStep = 8
            this.confirmation = true
          }, 1000)
          const activityData = {
            published: true,
            related_payment: {
              _id: payload._id,
              link: 'payments',
              display: payload.customer_name.name
            },
            activity: 'ADDED',
            account: this.user._id,
            _by: this.user._id
          }
          this.$store.dispatch('commonStore/save', {
            name: 'activities',
            data: activityData
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
