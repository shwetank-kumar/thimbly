<template>
  <div>
    <h2 class="pa-2 text-center">Add listing</h2>
    <v-divider class="mx-2"></v-divider>
    <product-photos />
    <v-divider class="mx-2"></v-divider>
    <product-details />
    <v-divider class="mx-2"></v-divider>
    <shipping-options />
    <v-divider class="mx-2"></v-divider>
    <payment-options />
  </div>
</template>

<script>
import PaymentOptions from '../components/PaymentOptions.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ProductPhotos from '../components/ProductPhotos.vue'
import ShippingOptions from '../components/ShippingOptions.vue'
export default {
  components: {
    ProductDetails,
    ProductPhotos,
    ShippingOptions,
    PaymentOptions,
  },
  middleware: 'authenticate',
}
</script>

<style scoped>
.createlisting-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
