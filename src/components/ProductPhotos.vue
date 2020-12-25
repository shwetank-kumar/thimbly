<template>
  <div class="px-2">
    <v-row>
      <v-carousel
        light
        v-model="currentPhoto"
        hide-delimiter-background
        :show-arrows="false"
      >
        <v-carousel-item
          v-for="url in imgSources"
          :key="url"
          :src="url"
          class="mx-1"
        >
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    imgSources: {
      get() {
        var productDetails = this.$store.state.productDetails
        return productDetails.productPhotos
      },
    },
    currentPhoto: {
      get() {
        return this.$store.state.currentPhoto
      },
      set(value) {
        this.$store.commit('SET_CURRENT_PHOTO', value)
      },
    },
  },
}
</script>

<style scoped></style>
