<template>
  <div>
    <h2 class="text-center">Share Listing</h2>
    <v-card outlined class="my-2 rounded-lg">
      <product-photos />
      <v-card-title class="justify-center">{{
        productDetails.productTitle
      }}</v-card-title>
    </v-card>
    <v-row class="justify-space-around mx-2 my-5">
      <v-btn depressed color="error" @click="edit">
        <v-icon> mdi-pencil</v-icon>
      </v-btn>

      <v-btn depressed color="secondary" @click="getUrl">
        <v-icon> mdi-link</v-icon>
      </v-btn>

      <v-btn depressed color="primary" @click="share">
        <v-icon> mdi-share-variant</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { fireDb, fireStorage } from '~/plugins/firebase.js'
export default {
  middleware: 'router-auth',
  async asyncData(context) {
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
    edit() {
      console.log('edit')
    },
    async getUrl() {
      var host = window.location.hostname
      var port = host === 'localhost' ? ':3000' : ''
      var route = this.$router.currentRoute.path.split('share')[0]
      var url = host + port + route
      await navigator.clipboard.writeText(url)
    },
    share() {
      console.log('share')
    },
  },
}
</script>

<style scoped></style>
