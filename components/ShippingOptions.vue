<template>
  <div class="px-2">
    <h4>Shipping Options</h4>
    <v-row class="px-2 pb-4 d-flex justify-space-around">
      <v-checkbox
        v-model="shippingOptions"
        label="pick-up"
        value="pick-up"
        hide-details
      ></v-checkbox>
      <v-checkbox
        v-model="shippingOptions"
        label="standard"
        value="standard"
        hide-details
      ></v-checkbox>
      <v-checkbox
        v-model="shippingOptions"
        label="free-shipping"
        value="free-shipping"
        hide-details
      ></v-checkbox>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shippingOptions: null,
    }
  },
}
</script>

<style scoped></style>
