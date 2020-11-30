<template>
  <div>
    <h2 class="text-center">Add listing</h2>
    <v-divider class="pb-1 mx-2"></v-divider>
    <product-photos />
    <v-divider class="pb-1 mx-2"></v-divider>
    <product-details />
    <v-divider class="pb-1 mx-2"></v-divider>
    <shipping-options />
    <v-divider class="pb-1 mx-2"></v-divider>
    <payment-options />
    <v-row class="justify-space-around mx-2">
      <v-btn depressed color="error" @click="cancel">Cancel</v-btn>
      <v-btn depressed :disabled="true" color="primary" @click="preview"
        >Preview</v-btn
      >
    </v-row>
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
  computed: {
    isValid() {},
  },
  data() {
    return {}
  },
  middleware: 'router-auth',
  methods: {
    cancel() {
      console.log('cancel')
    },
    preview() {
      console.log('preview')
    },
  },
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
