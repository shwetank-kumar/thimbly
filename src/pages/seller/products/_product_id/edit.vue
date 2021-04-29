<template>
  <div>
    <h2 class="text-center">Edit listing</h2>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title>Photos</v-card-title>
      <product-photos :imgSources="productDetails.productPhotos" />
      <v-card-actions>
        <photo-actions />
      </v-card-actions>
    </v-card>

    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Product Details </v-card-title>
      <product-details-form :productDetails="productDetails" />
    </v-card>

    <!-- <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Shipping Details </v-card-title>
      <shipping-options :shippingOptionsProp="productDetails.shippingOptions" />
    </v-card> -->

    <v-row class="justify-space-around mx-2 my-5">
      <v-btn depressed color="error" @click="cancel">Cancel</v-btn>
      <v-btn
        depressed
        :disabled="!previewEnabled"
        color="primary"
        @click="publish"
        >Publish</v-btn
      >
    </v-row>
  </div>
</template>

<script>
  import {fireDb, fireStorage} from "~/plugins/firebase.js"
  import {mapGetters, mapMutations} from "vuex"
  import {v4 as uuidv4} from "uuid"
  export default {
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters({previewEnabled: "PREVIEW_ENABLED"}),
    },
    data() {
      return {
        // productDetails: {
        //   title: null,
        //   description: null,
        //   pricing: null,
        //   quantity: null,
        // },
      }
    },
    middleware: "router-auth",
    async asyncData(context) {
      // console.log(context.params.product_id)
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
      return {productDetails}
    },
    methods: {
      cancel() {
        this.$router.push("/seller/products")
      },

      async publish() {
        // console.log("publish")
        var downloadUrls = []
        for (
          var idx = 0;
          idx < this.$store.state.productDetails.productPhotos.length;
          idx++
        ) {
          const regex = /^blob:http[a-z:\/\-\.\%0-9]+$/gm;
          if(regex.test(this.$store.state.productDetails.productPhotos[idx])){

            var fname = uuidv4()
            var fileRef = fireStorage.ref().child("images/" + fname)
            let blob = await fetch(
              this.$store.state.productDetails.productPhotos[idx]
            ).then((r) => r.blob())
            const snapshot = await fileRef.put(blob)
            var tempvarUrl = await snapshot.ref.getDownloadURL()
            downloadUrls.push(tempvarUrl)
            continue
          }
          downloadUrls.push(this.$store.state.productDetails.productPhotos[idx])

        }
        var productDetails = {
          ...this.$store.state.productDetails,
          productPhotos: downloadUrls,
        }
        var product_id = this.$store.state.product_id
        var message = ""
        try {
          var docRef = fireDb.collection("products").doc(product_id)
          await docRef.set(productDetails)
          message = "Listing updated!"
        } catch (error) {
          message = "Listing update failed: " + error
        }
        // console.log(message)
        this.$router.push("/seller/products/")
        // this.$router.push("/seller/products/" + docRef.id)
      },
    },
  }
</script>

<style scoped></style>
