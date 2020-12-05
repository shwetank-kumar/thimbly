<template>
  <div class="px-2">
    <v-row class="px-2 d-flex justify-space-around">
      <v-checkbox
        v-for="(item, key) in shipping"
        :key="key"
        v-model="shipping[key]"
        @change="updateShippingDetails"
        :label="key"
      ></v-checkbox>
    </v-row>
    <p class="text-center error--text" v-if="!isValid">
      Please select atleast one option.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: true,
      shipping: { pickup: false, standard: false, free: false },
    }
  },
  methods: {
    updateShippingDetails() {
      this.isValid =
        this.shipping.pickup || this.shipping.standard || this.shipping.free
      var payload = {
        shippingOptions: { ...this.shipping },
      }
      this.$store.commit('SET_PRODUCT_DETAILS', payload)
    },
  },
}
</script>

<style scoped></style>
