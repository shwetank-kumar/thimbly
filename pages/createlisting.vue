<template>
  <div>
    <h2 class="pa-2 text-center">Add listing</h2>
    <v-divider class="pa-1 mx-2"></v-divider>
    <product-photos />
    <v-divider class="pa-1 mx-2"></v-divider>
    <product-details />
    <v-divider class="pa-1 mx-2"></v-divider>
    <shipping-options />
    <v-divider class="pa-1 mx-2"></v-divider>
    <payment-options />
    <v-row class="justify-space-around py-5 mx-2">
      <v-btn depressed color="error" @click="cancel">Cancel</v-btn>
      <v-btn depressed @click="save">Save Draft</v-btn>
      <v-btn depressed color="primary" @click="publish">Publish</v-btn>
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
  middleware: 'authenticate',
  methods: {
    cancel() {
      console.log('cancel')
    },
    save() {
      console.log('save')
    },
    publish() {
      console.log('publish')
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
