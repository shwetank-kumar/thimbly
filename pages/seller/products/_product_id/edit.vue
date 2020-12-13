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

    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Shipping Details </v-card-title>
      <shipping-options :shippingOptionsProp="productDetails.shippingOptions" />
    </v-card>

    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Payment Options (Placeholder)</v-card-title>
      <payment-options-seller />
    </v-card>

    <v-row class="justify-space-around mx-2 my-5">
      <v-btn depressed color="error" @click="cancel">Cancel</v-btn>
      <v-btn
        depressed
        :disabled="!previewEnabled"
        color="primary"
        @click="preview"
        >Preview</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { fireDb, fireStorage } from '~/plugins/firebase.js'
import { mapGetters, mapMutations } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({ previewEnabled: 'PREVIEW_ENABLED' }),
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
  middleware: 'router-auth',
  async asyncData(context) {
    // console.log(context.params.product_id)
    var docId = context.params.product_id
    var docRef = await fireDb.collection('products').doc(docId).get()
    var productDetails = {}
    if (docRef.data()) {
      productDetails = { ...docRef.data(), productId: docId }
      context.store.commit('SET_PRODUCT_DETAILS', productDetails)
    } else {
      context.router.push('/error')
      console.log('Does not exist.')
    }
    return { productDetails }
  },
  methods: {
    // async created() {
    //   console.log('edit')
    //   var docId = this.$route.params.product_id
    //   var docRef = await fireDb.collection('products').doc(docId).get()
    //   if (docRef.data()) {
    //     this.productDetails = { ...docRef.data(), productId: docId }
    //     this.$store.commit('SET_PRODUCT_DETAILS', this.productDetails)
    //   } else {
    //     this.$router.push('/error')
    //     console.log('Does not exist.')
    //   }
    // console.log(this.productDetails)
    // },
    cancel() {
      this.$router.push('/seller/products')
    },
    async preview() {
      // update instead of creating a document here...

      var downloadUrls = []
      // Upload images to storage after replacing their location with FireStorage location
      for (var idx = 0; idx < this.$store.state.localPhotoPaths.length; idx++) {
        var fname = uuidv4()
        var fileRef = fireStorage.child('images/' + fname)

        let blob = await fetch(
          this.$store.state.localPhotoPaths[idx]
        ).then((r) => r.blob())
        const snapshot = await fileRef.put(blob)
        var tempvarUrl = await snapshot.ref.getDownloadURL()
        downloadUrls.push(tempvarUrl)
      }

      var productDetails = {
        ...this.$store.state.productDetails,
        productPhotos: downloadUrls,
      }
      var message = ''
      var docId
      try {
        var docRef = fireDb.collection('products').doc()
        await docRef.set(productDetails)
        this.$store.commit('SET_PRODUCT_ID', docRef.id)
        message = 'Listing generated!'
      } catch (error) {
        message = 'Listing generation failed: ' + error
      }
      this.$router.push('/seller/products/' + docRef.id + '/preview')
    },
  },
}
</script>

<style scoped></style>
