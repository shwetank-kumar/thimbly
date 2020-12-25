<template>
  <div>
    <v-row dense class="d-flex justify-left">
      <v-col class="pl-10 py-0" cols="6">
        <p class="ma-0 text-button text-left">Subtotal</p>
      </v-col>
      <v-col class="pl-10 py-0" cols="5">
        <p class="ma-0 text-button text-center">$ {{ subTotal }}</p>
      </v-col>
    </v-row>
    <v-row dense class="d-flex justify-left">
      <v-col class="pl-10 py-0" cols="6">
        <p class="ma-0 text-button text-left">Shipping</p>
      </v-col>
      <v-col class="pl-10 py-0" cols="5">
        <p class="ma-0 text-button text-center">$ {{ shipping }}</p>
      </v-col>
    </v-row>
    <v-row dense class="d-flex justify-left">
      <v-col class="pl-10 py-0" cols="6">
        <p class="ma-0 text-button font-weight-black text-left">Total</p>
      </v-col>
      <v-col class="pl-10 py-0" cols="5">
        <p class="ma-0 text-button font-weight-black text-center">
          $ {{ total }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { isRequired, isInt } from '@/plugins/validation.js'
export default {
  data() {
    return {
      rules: { isRequired, isInt },
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({ productDetails: 'GET_PRODUCT_DETAILS' }),
    subTotal() {
      return Number(this.productDetails.productPricing)
    },
    shipping() {
      return Number(6)
    },
    total() {
      return Number(this.subTotal + this.shipping).toFixed(2)
    },
  },
}
</script>

<style scoped></style>
