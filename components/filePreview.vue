<template>
  <div>
    <div class="photoOne">
      <v-file-input @change="Preview_image" v-model="image"> </v-file-input>
      <v-img max-height="200px" max-width="200px" :src="url"></v-img>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewImage: null,
      url: null,
      image: null,
    }
  },
  methods: {
    Preview_image() {
      console.log(this.image)
      this.url = URL.createObjectURL(this.image)
    },
  },
}
</script>
<style scoped>
.imagePreviewWrapper {
  width: 50px;
  height: 50px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
