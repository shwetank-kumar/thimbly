<template>
  <div class="pa-2">
    <h4>Photos</h4>
    <v-row class="d-flex justify-space-around">
      <v-col cols="2">
        <v-file-input
          class="d-flex justify-space-around py-0 my-0 ml-2"
          type="file"
          multiple
          prepend-icon="mdi-camera"
          accept="image/*"
          hide-input
          onchange="picChange(event)"
        ></v-file-input>
      </v-col>
      <v-col class="d-flex justify-space-around" cols="2"
        ><v-icon>mdi-panorama</v-icon></v-col
      >
      <v-col class="d-flex justify-space-around" cols="2"
        ><v-icon>mdi-panorama</v-icon></v-col
      >
      <v-col class="d-flex justify-space-around" cols="2"
        ><v-icon>mdi-panorama</v-icon></v-col
      >
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    picChange(e) {
      console.log(e)
    },
  },
}
</script>

<style scoped></style>
