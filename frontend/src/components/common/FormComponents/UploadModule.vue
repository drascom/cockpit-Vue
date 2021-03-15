<template>
  <v-container fluid class="align-start pa-0">
    <DialogPicture :selectedPicture="selectedPicture" v-model="showPicture" />
    <h4 v-if="attrs.label" class="text-headline mb-2">{{ attrs.label }}</h4>
    <v-card flat>
      <!-- burası değiştir ve sil buton bölümü -->
      <v-card-actions v-if="avatar">
        <ImageInput
          v-model="avatar"
          @input="save"
          @remove="removeFile"
          :key="turnover"
        >
          <div slot="activator" class="flex justify-space-around">
            <v-btn
              v-if="attrs.editMode"
              text
              outlined
              :x-small="$vuetify.breakpoint.smAndDown"
              :small="$vuetify.breakpoint.mdAndUp"
              color=""
              class="grey--text"
              style="font-size: 0.6em"
            >
              <v-icon :left="$vuetify.breakpoint.smAndUp"
                >mdi-cloud-upload</v-icon
              >
              Change
            </v-btn>
          </div>
        </ImageInput>

        <v-btn
          text
          outlined
          v-show="attrs.editMode"
          :x-small="$vuetify.breakpoint.smAndDown"
          :small="$vuetify.breakpoint.mdAndUp"
          color="error"
          style="font-size: 0.6em"
          @click="deleteFile('image_receive', avatar)"
        >
          <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-cancel</v-icon
          ><span v-if="$vuetify.breakpoint.smAndUp"> Delete</span>
        </v-btn>
      </v-card-actions>
      <!-- burası hover view bölümü -->
      <v-card-text v-if="avatar" class="pa-0">
        <v-hover >
          <template #default="{ hover }">
            <v-slide-x-transition>
              <v-img
                max-height="200"
                contain
                v-if="avatar.path"
                :lazy-src="`${apiUrl}/storage/uploads${avatar.path}`"
                :src="`${apiUrl}/storage/uploads${avatar.path}`"
              >
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#036358">
                    <v-btn
                      small
                      color="success"
                      class="white--text"
                      @click="
                        handleOpenImage(
                          `${apiUrl}/storage/uploads${avatar.path}`
                        )
                      "
                    >
                      <v-icon>mdi-eye</v-icon> View
                    </v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </v-slide-x-transition>
          </template>
        </v-hover>
      </v-card-text>
    </v-card>
    <!-- burası input bölümü -->
    <ImageInput
      v-model="avatar"
      @input="save"
      @remove="removeFile"
      :key="turnover"
    >
      <div v-if="!avatar" slot="activator" >
        <v-slide-x-transition>
          <v-avatar
            :size="$vuetify.breakpoint.xs ? '110px' : '150px'"
            v-ripple
            v-if="!avatar"
            class="grey lighten-3 my-4"
          >
            <v-btn :loading="saving">
              UPLOAD <v-icon right dark> mdi-cloud-upload </v-icon>
            </v-btn>
          </v-avatar>
        </v-slide-x-transition>
      </div>
    </ImageInput>
  </v-container>
</template>

<script>
import ImageInput from './ImageInput.vue'

export default {
  name: 'Uploader',
  inheritAttrs: false,
  props: ['value'],
  data() {
    return {
      show: false,
      saving: false,
      turnover: 0,
      avatar: this.value || false,
      showPicture: false,
      selectedPicture: '',
      apiUrl: process.env.VUE_APP_API_URL
    }
  },
  components: {
    ImageInput
  },
  computed: {
    attrs() {
      return this.$attrs
    },
    progress() {
      return this.$store.getters['upload/uploadProgress']
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.avatar = newValue
      },
      deep: true
    }
  },
  methods: {
    handleOpenImage(url) {
      this.selectedPicture = url
      this.showPicture = true
    },
    save() {
      console.log('save calıstı')
      this.saving = true
      this.uploadFile(this.avatar)
    },
    removeFile() {
      this.saving = true
      this.deleteFile(this.avatar)
    },
    async uploadFile(file) {
      const formData = new FormData()
      formData.append('files[]', file)
      await this.$store
        .dispatch('upload/saveImage', formData)
        .then((response) => {
          this.saving = false
          this.turnover += 1
          this.avatar = response.data.assets[0]
          this.$emit('input', response.data.assets[0])
        })
    },
    async deleteFile(payload) {
      const res = await this.$confirm(
        this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
        {
          title: 'error'
        }
      )
      if (res) {
        await this.$store
          .dispatch('upload/deleteFile', payload)
          .then(
            this.$emit('input', null),
            (this.turnover += 1),
            (this.saving = false),
            (this.avatar = null)
          )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
