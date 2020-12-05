<template>
  <div class="px-2">
    <v-row>
      <v-carousel
        light
        v-model="currentPhoto"
        height="150px"
        hide-delimiter-background
        :show-arrows="false"
      >
        <v-carousel-item v-for="url in imgSources" :key="url">
          <v-img
            class="mx-1"
            max-height="150px"
            aspect-ratio="1.333"
            :src="url"
          ></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    currentPhoto: {
      get() {
        return this.$store.state.currentPhoto
      },
      set(value) {
        this.$store.commit('SET_CURRENT_PHOTO', value)
      },
    },
  },

  props: ['imgSources'],
}
</script>

<style scoped></style>
