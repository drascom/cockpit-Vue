<template>
  <v-form ref="form" v-model="valid" @submit.prevent class="mt-4">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <BaseTextInput
            v-model="formData.name"
            :label="$t('customers.CUSTOMER_NAME')"
            :rules="[validationRules.requiredField]"
            autocomplete="off"
            class="p7-5"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col cols="12">
          <BaseTextInput
            v-model="formData.email"
            :label="$t('customers.EMAIL')"
            :rules="[validationRules.requiredField]"
            autocomplete="off"
            class="p7-5"
            prepend-icon="mdi-account"
          />
        </v-col>
        <v-col ols="12">
          <BaseNumberInput
            v-model="formData.phone_1"
            :label="$t('customers.PHONE')"
            prepend-icon="mdi-calendar"
            class="p7-5"
            clearable
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <BaseDateInput
            v-model="formData.date_of_birth"
            :label="$t('customers.DATE_OF_BIRTH')"
            prepend-icon="mdi-calendar"
            class="p7-5"
            clearable
          />
        </v-col>
        <v-col cols="12" sm="">
          <BaseTextInput
            v-model="formData.origin"
            :label="$t('customers.ORIGIN')"
            hint="Only Numbers"
            autocomplete="off"
            prepend-icon="mdi-cash-check"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-between">
        <v-col cols="12">
          <BaseTextInput
            v-model="formData.job"
            :label="$t('customers.JOB')"
            prepend-icon="mdi-chess-knight"
            class="p7-5"
            clearable
          />
        </v-col>
        <v-col cols="12">
          <BaseNumberInput
            v-model="formData.net_amount"
            :label="$t('payments.RECEIVED_AMOUNT')"
            :rules="
              formData.receiving_done ? [validationRules.requiredField] : []
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
        <v-col cols="12" class="px-4"> </v-col>
        <v-col v-if="user.group != 'acenta'">
          <v-card outlined class="px-4">
            <v-card-title> {{ $t('payments.STATUS') }} </v-card-title>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="text-end">
          <v-btn color="primary" :disabled="!valid" @click="handleSaveEdit()">
            {{ $t('common.UPDATE') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validationRules from '@/utils/validationRules'

export default {
  name: 'CustomerEdit',
  data() {
    return {
      validationRules,
      valid: false,
      formData: {}
    }
  },
  props: ['item'],
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  created() {
    this.formData = this.item
  }
}
</script>

<style lang="scss" scoped></style>
