<template>
  <div class="px-2">
    <h4>Photos</h4>
    <v-row class="d-flex justify-space-around">
      <!-- <v-col cols="2">
        <v-file-input
          class="d-flex justify-space-around py-0 my-0 ml-2"
          type="file"
          multiple
          prepend-icon="mdi-panorama"
          accept="image/*"
          hide-input
          @change="picChange(event)"
        ></v-file-input>
      </v-col>
      <v-col class="d-flex justify-space-around" cols="2">
        <v-file-input
          class="d-flex justify-space-around py-0 my-0 ml-2"
          type="file"
          multiple
          prepend-icon="mdi-panorama"
          accept="image/*"
          hide-input
          @change="picChange(event)"
        ></v-file-input
      ></v-col>
      <v-col class="d-flex justify-space-around" cols="2">
        <v-file-input
          class="d-flex justify-space-around py-0 my-0 ml-2"
          type="file"
          multiple
          prepend-icon="mdi-panorama"
          accept="image/*"
          hide-input
          @change="picChange(event)"
        ></v-file-input>
      </v-col> -->
      <file-preview />
    </v-row>
  </div>
</template>

<script>
// import filePreview from './filePreview'
import FilePreview from './filePreview.vue'
export default {
  components: {
    FilePreview,
  },
}
</script>

<style scoped></style>
