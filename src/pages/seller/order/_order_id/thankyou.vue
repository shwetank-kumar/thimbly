<template>
  <div>
    <!-- Hi {{ buyer }}, Thanks for ordering from my store! For your reference,
      below is a summary of your order. For any questions, contact me at
      {{ seller.email }} Your order summary is as follows: Product name:
      {{ product.productTitle }}, Product Quantity:
      {{ order.product_quantity }} Total Number: {{ order_id }}

      Thanks,
      {{ seller.display_name }} -->
    <v-card outlined class="ma-2 rounded-lg">
      <v-card-title primary-title class="d-flex justify-center">
        Order Details
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-0">
        Thanks for ordering from my store! Your order summary is below. Please save a copy of this page for your records.
        If you have any questions please email me at:
        <p class="mt-3 d-flex justify-center">{{ seller.email }}</p>
        Your order details are:
        <v-row dense class="d-flex justify-left mt-2">
          <v-col class="pl-5 py-0" cols="5">
            <p class="ma-0 text-left">Product:</p>
          </v-col>
          <v-col class="pl-2 py-0" cols="7">
            <p class="ma-0">
              {{ product.productTitle }}
            </p>
          </v-col>
        </v-row>
        <v-row dense class="d-flex justify-left">
          <v-col class="pl-5 py-0" cols="5">
            <p class="ma-0 text-left">Quantity:</p>
          </v-col>
          <v-col class="pl-2 py-0" cols="7">
            <p class="ma-0">
              {{ order.quantity }}
            </p>
          </v-col>
        </v-row>
        <v-row dense class="d-flex justify-left">
          <v-col class="pl-5 py-0" cols="5">
            <p class="ma-0 text-left">Order #:</p>
          </v-col>
          <v-col class="pl-2 py-0" cols="7">
            <p class="ma-0">
              {{ order_id }}
            </p>
          </v-col>
        </v-row>
        <v-row dense class="d-flex justify-left">
          <v-col class="pl-5 py-0" cols="5">
            <p class="ma-0 text-left">Total Cost:</p>
          </v-col>
          <v-col class="pl-2 pt-0 pb-5" cols="7">
            <p class="ma-0">$ {{ total }}</p>
          </v-col>
        </v-row>
          <p>Thanks,</p>
          <p>{{ seller.display_name }}</p>
        </p>
      </v-card-text>
    </v-card>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title class="justify-center">Sharing Options</v-card-title>
      <v-card-actions>
        <v-row class="justify-space-around">
          <v-col>
            <v-btn depressed color="primary" @click="getUrl" width="100%">
              <v-icon> mdi-link</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <ShareNetwork
              network="facebook"
              :url="url"
              :title="product.productTitle"
              :description="product.productDescription"
              class="fb_button"
            >
              <v-btn color="primary" width="100%"
                ><v-icon>mdi-facebook</v-icon>
              </v-btn>
            </ShareNetwork>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import {fireDb, hostServer} from "~/plugins/firebase.js"
  export default {
    middleware: "router-auth",
    async asyncData(context) {
      var order_id = context.params.order_id
      var order_ref = await fireDb.collection("orders").doc(order_id).get()
      var order = order_ref.data()
      var buyer = order.shipping_details.name
      var seller_id = order.seller_id
      var seller_ref = await fireDb
        .collection("users")
        .where("uid", "==", seller_id)
        .get()
      var seller
      seller_ref.forEach((doc) => {
        seller = {...doc.data()}
      })
      var product_ref = await fireDb
        .collection("products")
        .doc(order.product_id)
        .get()
      var product = product_ref.data()
      var url = hostServer + "/seller/products/" + order.product_id
      return {buyer, seller, order_id, order, product, url}
    },
    methods: {
      async getUrl() {
        await navigator.clipboard.writeText(this.url)
      },
    },
    computed: {
      subTotal() {
        return Number(this.product.productPricing) * Number(this.order.quantity)
      },
      // shipping() {
      //   return Number(6)
      // },
      total() {
        return (Number(this.subTotal) + Number(this.product.shipping)).toFixed(2)
      },
    },
    data() {
      return {}
    },
  }
</script>

<style scoped></style>
