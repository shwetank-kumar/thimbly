<template>
  <div>
    <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    ></div>

    <input ref="fileInput" type="file" @input="pickFile" />
    <input ref="fileInput" type="file" @input="pickFile" />
    <input ref="fileInput" type="file" @input="pickFile" />
    <!-- <v-file-input
      class="d-flex justify-space-around py-0 my-0 ml-2"
      type="file"
      multiple
      prepend-icon="mdi-panorama"
      accept="image/*"
      hide-input
      ref="fileInput"
      @input="pickFile"
    ></v-file-input> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewImage: null,
    }
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
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
