<template>
  <!-- <div class="px-2">
    <v-row class="px-2 d-flex justify-space-around">
      <v-checkbox v-model="selected" label="pickup" value="pickup"></v-checkbox>
      <v-checkbox
        v-model="selected"
        label="standard"
        value="standard"
      ></v-checkbox>
      <v-checkbox v-model="selected" label="free" value="free"></v-checkbox>
    </v-row>

    <p class="text-center error--text" v-if="!isValid">
      Please select atleast one option.
    </p>
  </div> -->
</template>

<script>
  // export default {
  //   data() {
  //     return {
  //       isValid: true,
  //       options: ["free", "standard", "pickup"],
  //     }
  //   },
  //   computed: {
  //     selected: {
  //       get() {
  //         return this.$store.state.productDetails.shippingOptions
  //       },
  //       set(value) {
  //         this.$store.commit("SET_PRODUCT_DETAILS", {
  //           shippingOptions: value,
  //         })
  //       },
  //     },
  //   },
  //   props: ["shippingOptionsProp"],
  // }
</script>

<style scoped></style>
