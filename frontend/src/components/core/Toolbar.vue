<template>
  <div>
    <v-navigation-drawer v-model="sideBar" absolute disable-resize-watcher>
      <v-list>
        <v-list-item>
          <v-list-item-content>{{ appTitle }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="sideBar = !sideBar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(item, index) in adminItems"
          :key="item.title + index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isTokenSet" @click="userLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ $t('adminItems.LOGOUT') }}
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-action />
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action class="ml-2">
            <v-switch id="themeSwitcher" v-model="isDark" inset />
          </v-list-item-action>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <span class="">
        <v-app-bar-nav-icon @click="sideBar = !sideBar"></v-app-bar-nav-icon>
      </span>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, index) in menuItems">
          <v-btn
            v-if="!isTokenSet"
            :key="index"
            text
            :to="{ name: item.link }"
            exact
            :class="['hidden-sm-and-down', item.class]"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            &nbsp;{{ item.title }}
          </v-btn>
        </template>
        <template v-for="(item, index) in adminItems">
          <v-menu
            v-if="item.items && item.items.length > 0"
            :key="index"
            offset-y
            class="hidden-sm-and-down"
          >
            <template v-slot:activator="{ on }">
              <v-btn text class="btnAdmin" v-on="on">
                <v-icon left>{{ item.icon }}</v-icon>
                &nbsp;{{ item.title }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in item.items"
                :key="index"
                active-class="dark blue--text"
                :to="item.link"
                :class="[item.class]"
                exact
              >
                <v-list-item-title>
                  <v-icon>{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-else
            text
            :to="{ name: item.link }"
            exact
            :class="['hidden-sm-and-down', item.class]"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            &nbsp;{{ item.title }}
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-spacer />
        <v-list-item class="hidden-sm-and-down">
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action>
            <v-switch v-model="isDark" inset />
          </v-list-item-action>
          <v-icon class="pl-2">mdi-weather-night</v-icon>
        </v-list-item>
        <LocaleChanger />
        <v-menu offset-y v-if="isTokenSet">
          <template #activator="{ on }">
            <v-btn text class="btnAdmin hidden-sm-and-down" v-on="on">
              <v-icon left>mdi-account</v-icon>
              &nbsp;{{ user.name }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in profileItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-item-icon class="mr-2">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item key="4" link @click="userLogout">
              <v-list-item-icon class="mr-2">
                <v-icon left>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('adminItems.LOGOUT') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LocaleChanger from '@/components/core/LocaleChanger'
import ResizeText from 'vue-resize-text'

export default {
  name: 'Toolbar',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        {
          name: 'msapplicationColor',
          content: '#ffc40d'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        },
        {
          name: 'apple-mobile-web-app-title',
          content: this.$store.getters.appTitle
        },
        {
          name: 'application-name',
          content: this.$store.getters.appTitle
        }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        },
        {
          rel: 'mask-icon',
          color: '#5bbad5',
          href: '/safari-pinned-tab.svg'
        },
        {
          rel: 'favicon',
          href: '/favicon.ico'
        }
      ]
    }
  },
  components: {
    LocaleChanger
  },
  directives: {
    ResizeText
  },
  data() {
    return {
      isDark: false
    }
  },
  computed: {
    sideBar: {
      get() {
        return this.$store.state.dashboard.sidebar
      },
      set(value) {
        this.$store.commit('UPDATE_SIDEBAR', value)
      }
    },
    ...mapGetters(['appTitle', 'isTokenSet', 'user']),
    admin() {
      return this.user !== null ? this.user.role === 'admin' : false
    },
    menuItems() {
      return [
        {
          title: this.$t('adminItems.LOGIN'),
          link: 'login',
          icon: 'mdi-lock',
          class: 'btnLogin'
        }
      ]
    },
    adminItems() {
      if (this.isTokenSet) {
        return [
          {
            title: this.$t('adminItems.HOME'),
            link: 'home',
            icon: 'mdi-home',
            class: 'btnHome'
          },
          {
            title: this.$t('adminItems.DEPOSITS'),
            link: 'payments',
            icon: 'mdi-bank-transfer-in'
            // items: [
            //   {
            //     title: this.$t('adminItems.DEPOSITS'),
            //     link: '/payments',
            //     icon: 'mdi-bank-transfer-in',
            //     class: 'btnHome'
            //   }
            // ]
          },
          {
            title: this.$t('adminItems.CUSTOMERS'),
            link: 'customers',
            icon: 'mdi-account'
          }
        ]
      }
      return null
    },
    profileItems() {
      if (this.isTokenSet) {
        return [
          {
            title: this.$t('adminItems.MY_PROFILE'),
            link: 'profile',
            icon: 'mdi-plus-circle-outline',
            class: 'btnAbout'
          }
        ]
      }
      return null
    }
  },
  watch: {
    isDark() {
      this.$vuetify.theme.dark = this.isDark
      localStorage.setItem('dark', this.isDark)
    }
  },
  created() {
    const dark = localStorage.getItem('dark')
    this.isDark = dark ? JSON.parse(dark) : false
  },
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>
