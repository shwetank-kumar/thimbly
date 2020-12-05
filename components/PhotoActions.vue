<template>
  <v-row class="d-flex justify-center">
    <v-col class="pl-5" cols="2">
      <v-btn icon @click="deleteImg"><v-icon>mdi-delete</v-icon></v-btn>
    </v-col>
    <v-col class="d-flex align-center pa-0" cols="2">
      <v-file-input
        class="ma-0 pl-2 py-0"
        type="file"
        prepend-icon="mdi-plus"
        accept="image/*"
        hide-input
        @change="addImg"
        v-model="images"
      >
      </v-file-input>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      images: null,
      urls: [],
    }
  },
  methods: {
    addImg() {
      this.urls = this.$store.state.localPhotoPaths
      if (this.urls.length <= 2) {
        this.$store.commit('ADD_PRODUCT_PHOTOS', this.images)
      }
    },
    deleteImg() {
      this.urls = this.$store.state.localPhotoPaths
      if (this.urls.length > 0) {
        this.$store.commit('DELETE_PRODUCT_PHOTOS')
      }
    },
  },
}
</script>

<style scoped></style>
