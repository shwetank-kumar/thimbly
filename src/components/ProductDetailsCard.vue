<template>
  <div>
    <v-card outlined class="my-2 rounded-lg">
      <product-photos :imgSources="productDetails.productPhotos" />
      <v-card-title class="justify-center">{{
        productDetails.productTitle
      }}</v-card-title>
      <v-card-text class="text-center">{{
        productDetails.productDescription
      }}</v-card-text>
      <v-row class="d-flex justify-center">
        <v-col cols="3">
          <p class="pt-2 font-weight-medium">Quantity</p>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="quantityList"
            dense
            outlined
            v-model="quantity"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex"
  import {isRequired, isInt} from "@/plugins/validation.js"
  export default {
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters({productDetails: "GET_PRODUCT_DETAILS"}),
      quantityList() {
        var list = []
        for (var i = 0; i <= this.productDetails.productQuantity; i++) {
          list.push(i)
        }
        return list
      },
      quantity: {
        get() {
          return this.$store.state.order.quantity
        },
        set(value) {
          // console.log(value)
          this.$store.commit("SET_ORDER_QUANTITY", value)
          var shipping = 6
          var payload =
            Number(this.productDetails.productPricing) * Number(this.quantity) +
            shipping
          this.$store.commit("SET_ORDER_TOTAL", payload)
        },
      },
    },
  }
</script>

<style scoped></style>
