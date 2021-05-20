<template>
  <div>
    <div v-if="productDetails.published">
      <SocialHead :title="productDetails.productTitle" :description="productDetails.productDescription"
        :image="productDetails.productPhotos[0]" />
      <h2 class="text-center">{{ productDetails.productTitle }}</h2>
      <product-details-card />
      <!-- <v-card outlined class="my-2 rounded-lg">
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
              :title="productDetails.productTitle"
              :description="productDetails.productDescription"
              class="fb_button"
            >
              <v-btn color="primary" width="100%"
                ><v-icon>mdi-facebook</v-icon>
              </v-btn>
            </ShareNetwork>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card> -->
      <shipping-information-form />
      <seller-special-instructions />
      <you-pay />
      <checkout-payment-stripe />
    </div>
    <div v-else class="text-center">
      The product is no longer available for sale
    </div>
  </div>
</template>

<script>
  import { fireDb, fireStorage, hostServer, analytics } from "~/plugins/firebase.js"

  export default {
    middleware: "router-auth",
    async asyncData(context) {
      // console.log(context)
      var product_id = context.params.product_id
      var product_ref = await fireDb
        .collection("products")
        .doc(product_id)
        .get()

      var productDetails = {}
      if (product_ref.data()) {
        productDetails = { ...product_ref.data() } //, productId: docId}
        context.store.commit("SET_PRODUCT_DETAILS", productDetails)
        context.store.commit("SET_PRODUCT_ID", product_id)
      } else {
        context.router.push("/error")
        console.log("Does not exist.")
      }

      var seller_ref = await fireDb
        .collection("users")
        .where("uid", "==", productDetails.seller_id)
        .get()

      var seller
      seller_ref.forEach((doc) => {
        seller = { ...doc.data() }
      })
      //This code should be refactored to set seller (will require changing user to seller everywhere)
      context.store.commit("SET_SELLER", seller)
      // console.log(seller)

      var url = hostServer + context.route.path
      return { product_id, productDetails, url }
    },
    mounted() {
      analytics().logEvent('seller_view', {
        seller_id: this.$store.state.productDetails.seller_id,
        product_id: this.$store.state.product_id
      })

      analytics().logEvent('page_view', {
        referrer: document.referrer,
        page_title: location.pathname,
        title: location.pathname,
        path: location.pathname,
      })
    },
    methods: {
      async getUrl() {
        await navigator.clipboard.writeText(this.url)
      },
    },
    data() {
      return {
        title: "Home page",
        seller_id: "",
        product_id: ""
      }
    },
  }
</script>

<style scoped>
  .fb_button {
    width: 100%;
  }
</style>