import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.16/vuetify.min.css'
  ]
}
Vue.use(VueHtmlToPaper, options)
