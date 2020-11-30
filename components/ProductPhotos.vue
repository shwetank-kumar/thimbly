<template>
  <div class="px-2">
    <v-row>
      <v-col class="pt-0" cols="8">
        <h4>Photos</h4>
      </v-col>
      <v-col class="d-flex align-center pt-2 pb-0" cols="2">
        <v-file-input
          class="ma-0 pa-0"
          type="file"
          prepend-icon="mdi-plus"
          accept="image/*"
          hide-input
          @change="addImg"
          v-model="images"
        >
        </v-file-input>
      </v-col>
      <v-col class="pt-2 pb-0" cols="2">
        <v-btn icon @click="deleteImg"><v-icon>mdi-delete</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-carousel
        light
        v-model="currentIndex"
        height="150px"
        hide-delimiter-background
        :show-arrows="false"
      >
        <v-carousel-item v-for="url in urls" :key="url">
          <v-img max-height="150px" aspect-ratio="1.333" :src="url"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: [],
      images: null,
      currentIndex: 0,
    }
  },
  methods: {
    addImg() {
      if (this.urls.length <= 2) {
        this.urls.push(URL.createObjectURL(this.images))
        this.currentIndex = this.urls.length - 1
      }
    },
    deleteImg() {
      if (this.urls.length > 0) {
        this.urls.splice(this.currentIndex, 1)
        this.currentIndex = this.currentIndex - 1
        // console.log(this.currentIndex)
      }
    },
  },
}
</script>

<style scoped></style>
