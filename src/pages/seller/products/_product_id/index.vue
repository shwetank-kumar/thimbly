<template>
  <div>
    <SocialHead
      :title="productDetails.productTitle"
      :description="productDetails.productDescription"
      :image="productDetails.productPhotos[0]"
    />
    <h2 class="text-center">{{ productDetails.productTitle }}</h2>
    <product-details-card />
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title class="justify-center">Sharing options</v-card-title>
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
    </v-card>
    <shipping-information-form />
    <you-pay />
    <checkout-payment />
  </div>
</template>

<script>
  import {fireDb, fireStorage, hostServer} from "~/plugins/firebase.js"

  export default {
    middleware: "router-auth",
    async asyncData(context) {
      // console.log(context)
      var doc_id = context.params.product_id
      var docRef = await fireDb.collection("products").doc(doc_id).get()
      var productDetails = {}
      if (docRef.data()) {
        productDetails = {...docRef.data()} //, productId: docId}
        context.store.commit("SET_PRODUCT_DETAILS", productDetails)
        context.store.commit("SET_PRODUCT_ID", doc_id)
      } else {
        context.router.push("/error")
        console.log("Does not exist.")
      }
      var url = hostServer + context.route.path
      return {productDetails, url}
    },
    methods: {
      async getUrl() {
        await navigator.clipboard.writeText(this.url)
      },
    },
    data() {
      return {
        title: "Home page",
      }
    },
  }
</script>

<style scoped>
  .fb_button {
    width: 100%;
  }
</style>
