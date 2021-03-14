<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <v-dialog v-model="dialog" max-width="400px">
          <template #activator="{ on }">
            <v-flex text-xs-center>
              <v-btn
                color="primary"
                class="btnChangePassword"
                v-on="on"
                @click="triggerChangePassword = true"
                >{{ $t('myProfile.CHANGE_MY_PASSWORD') }}</v-btn
              >
            </v-flex>
          </template>
          <v-card>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(save)">
                <v-card-title>
                  <span class="headline">
                    {{ $t('myProfile.CHANGE_MY_PASSWORD') }}
                  </span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <template v-if="triggerChangePassword">
                        <v-flex xs12>
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required|min:5"
                          >
                            <v-text-field
                              id="oldPassword"
                              key="oldPassword"
                              v-model="oldPassword"
                              name="oldPassword"
                              type="text"
                              :label="$t('myProfile.CURRENT_PASSWORD')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="new-password"
                              :prepend-icon="
                                passwordMatches
                                  ? 'mdi-check'
                                  : 'mdi-lock-outline'
                              "
                              :hint="
                                passwordMatches
                                  ? 'Correct'
                                  : 'Wrong old password'
                              "
                            />
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required|min:5"
                            vid="newPassword"
                          >
                            <v-text-field
                              id="newPassword"
                              key="newPassword"
                              ref="password"
                              v-model="newPassword"
                              name="newPassword"
                              :label="$t('myProfile.NEW_PASSWORD')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="new-password"
                              :type="showpass ? 'text' : 'password'"
                              prepend-icon="mdi-lock-outline"
                              :disabled="!passwordMatches"
                              :append-icon="
                                showpass ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              @click:append="showpass = !showpass"
                            />
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required|min:5|confirmed:newPassword"
                          >
                            <v-text-field
                              id="confirmPassword"
                              key="confirmPassword"
                              v-model="confirmPassword"
                              name="confirmPassword"
                              :label="$t('myProfile.CONFIRM_NEW_PASSWORD')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="new-password"
                              :type="showpass ? 'text' : 'password'"
                              prepend-icon="mdi-lock-outline"
                              :disabled="!passwordMatches"
                              :append-icon="
                                showpass ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              @click:append="showpass = !showpass"
                            />
                          </ValidationProvider>
                        </v-flex>
                      </template>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="red lighten3" text @click="close">
                    {{ $t('dataTable.CANCEL') }}
                  </v-btn>
                  <SubmitButton
                    id="updatePassword"
                    text
                    :button-text="$t('dataTable.SAVE')"
                    color="success"
                  />
                </v-card-actions>
              </form>
            </ValidationObserver>
          </v-card>
        </v-dialog>
        <ValidationObserver v-slot="{ handleSubmit }">
          <v-card class="mt-5">
            <v-card-title />
            <form @submit.prevent="handleSubmit(submit)">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                    >
                      <v-text-field
                        id="email"
                        v-model="email"
                        name="email"
                        type="email"
                        :label="$t('myProfile.EMAIL')"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="new-password"
                      />
                    </ValidationProvider>
                  </v-flex>
                  <v-flex xs12>
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-text-field
                        id="name"
                        v-model="name"
                        name="name"
                        type="text"
                        :label="$t('myProfile.NAME')"
                        :error="errors.length > 0"
                        :error-messages="errors[0]"
                        autocomplete="new-password"
                      />
                    </ValidationProvider>
                  </v-flex>
                  <v-flex xs12 text-left>
                    Language
                    <v-radio-group v-model="i18n" row mandatory>
                      <v-radio label="English" value="en">
                        <template #label>
                          <div><CountryFlag country="gb" /> English</div>
                        </template>
                      </v-radio>
                      <v-radio label="Türkçe" value="tr">
                        <template #label>
                          <div><CountryFlag country="tr" /> Türkçe</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex text-xs-center mt-5 />
                </v-layout>
              </v-container>
              <v-card-actions class="justify-end">
                <v-btn type="submit" color="success" custom-class="btnSave"
                  >SAVE
                </v-btn>
              </v-card-actions>
            </form>
          </v-card>
        </ValidationObserver>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import CountryFlag from 'vue-country-flag'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('myProfile.TITLE')} - %s`
    }
  },
  components: {
    CountryFlag
  },
  data() {
    return {
      showpass: false,
      dialog: false,
      triggerChangePassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      searchInput: ''
    }
  },
  computed: {
    passwordMatches() {
      return this.oldPassword === JSON.parse(localStorage.getItem('xf'))
    },
    name: {
      get() {
        return this.$store.state.profile.profile.name
      },
      set(value) {
        const data = {
          key: 'name',
          value
        }
        this.addProfileData(data)
      }
    },
    i18n: {
      get() {
        return this.$store.state.profile.profile.i18n
      },
      set(value) {
        const data = {
          key: 'i18n',
          value
        }
        this.addProfileData(data)
      }
    },
    email: {
      get() {
        return this.$store.state.profile.profile.email
      },
      set(value) {
        const data = {
          key: 'email',
          value
        }
        this.addProfileData(data)
      }
    },
    _id() {
      return this.$store.state.profile.profile._id
    }
  },
  methods: {
    ...mapActions([
      'changeMyPassword',
      'getProfile',
      'addProfileData',
      'saveProfile'
    ]),
    async submit() {
      await this.saveProfile({
        name: this.name,
        email: this.email,
        i18n: this.i18n,
        _id: this._id
      })
    },
    close() {
      this.triggerChangePassword = false
      this.dialog = false
    },
    async save() {
      try {
        await this.changeMyPassword({
          oldPassword: this.oldPassword,
          password: this.newPassword,
          _id: this._id
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
        return
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.getProfile()
  }
}
</script>
