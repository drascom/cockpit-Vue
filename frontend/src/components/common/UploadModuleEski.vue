<template>
  <v-card height="160" width="100%" class="mx-auto">
    <v-card-title class="text-body-2"> {{ value.text }} </v-card-title>
    <v-hover v-if="itemSelected">
      <template #default="{ hover }">
        <v-card>
          <v-img
            height="160"
            :lazy-src="`${apiUrl}/storage/uploads${itemSelected.path}`"
            :src="`${apiUrl}/storage/uploads${itemSelected.path}`"
          />
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-card-actions>
                <v-btn
                  small
                  color="success"
                  class="white--text"
                  @click="
                    handleOpenImage(
                      `${apiUrl}/storage/uploads${itemSelected.path}`
                    )
                  "
                >
                  <v-icon>mdi-eye</v-icon> View
                </v-btn>
                <v-btn
                  small
                  color="error"
                  @click="deleteFile('image_receive', itemSelected)"
                >
                  <v-icon>mdi-cancel</v-icon> Delete
                </v-btn>
              </v-card-actions>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <v-overlay v-else absolute>
      <v-btn color="success" @click="checkRef(`havvaUpload-${itemSelected._id}`)">
        Upload
      </v-btn>
      <input
        v-show="false"
        :id="`havvaUpload-${itemSelected._id}`"
        type="file"
        @change="uploadAndReload"
      />
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  name: 'UploadModule',
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL
    }
  },
  props: ['value'],
  computed: {
    itemSelected() {
      return this.value
    }
  },
  methods: {
    checkRef(ref) {
      document.getElementById(ref).click()
    },
    uploadAndReload(payload) {
      this.uploadFile(this.value.name, this.itemSelected, payload)
    },
    async uploadFile(field, item, payload) {
      const formData = new FormData()
      formData.append('files[]', payload.target.files[0])
      await this.$store
        .dispatch('payments/saveImage', {
          name: 'payments',
          data: {
            formData
          }
        })
        .then((response) => {
          this.itemSelected = response.data.assets[0]
          this.ListUpdating(this.value.name, response.data.assets[0])
        })
    },
    async deleteFile(field, payload) {
      await this.$store
        .dispatch('payments/deleteFile', {
          name: 'payments',
          data: payload[field]
        })
        .then(this.$emit('image-deleted', true))
    },
    async saveItem(payload) {
      this.$emit('save-confirm', payload)
    },
    ListUpdating(name, value) {
      this.$nextTick(() => {
        this.$emit('FormUpdated', {
          valid: true,
          data: { [name]: value }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
