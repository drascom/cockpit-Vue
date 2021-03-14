<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-layout column>
              <v-flex>
                <ValidationProvider v-slot="{ errors }">
                  <v-text-field
                    id="user"
                    v-model="user"
                    name="user"
                    type="text"
                    :label="$t('login.USERNAME')"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="new-password"
                    prepend-icon="mdi-account"
                  />
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <ValidationProvider v-slot="{ errors }" rules="required|min:5">
                  <v-text-field
                    id="password"
                    v-model="password"
                    name="password"
                    :label="$t('login.PASSWORD')"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="new-password"
                    :type="showpass ? 'text' : 'password'"
                    prepend-icon="mdi-lock-outline"
                    :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showpass = !showpass"
                  />
                </ValidationProvider>
              </v-flex>
              <v-flex text-xs-center mt-5 mb-3>
                <v-btn type="submit"> {{ $t('login.LOGIN') }} </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('login.TITLE')} - %s`
    }
  },
  data() {
    return {
      showpass: false,
      user: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    async submit() {
      await this.userLogin({
        user: this.user,
        password: this.password
      })
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>
