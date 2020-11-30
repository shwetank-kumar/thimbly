<template>
  <div class="px-2">
    <h4>Shipping Options</h4>
    <v-row class="px-2 d-flex justify-space-around">
      <v-checkbox
        v-for="(item, key) in shippingOptions"
        :key="key"
        v-model="shippingOptions[key]"
        @click="updateShippingDetails"
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
      shippingOptions: { pickup: true, standard: true, free: true },
    }
  },
  methods: {
    updateShippingDetails() {
      this.isValid =
        this.shippingOptions.pickup ||
        this.shippingOptions.standard ||
        this.shippingOptions.free

      var payload = {
        shippingOptions: { ...this.shippingOptions },
      }
      this.$store.commit('SET_PRODUCT_DETAILS', payload)
    },
  },
}
</script>

<style scoped></style>
