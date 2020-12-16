<template>
  <div>
    <!-- <h2 class="text-center">Share Listing</h2>
    <v-card outlined class="my-2 rounded-lg">
      <product-photos />
      <v-card-title class="justify-center">{{
        productDetails.productTitle
      }}</v-card-title>
      <v-card-text class="justify-center">{{
        productDetails.productDescription
      }}</v-card-text>
    </v-card>
    <v-row class="justify-space-around mx-2 my-5">
      <v-btn depressed color="secondary" @click="getUrl" width="100%">
        <v-icon> mdi-link</v-icon>
      </v-btn>
    </v-row>
    <v-row class="justify-space-around mx-2 my-5">
      <ShareNetwork
        network="facebook"
        url="https://news.vuejs.org/issues/180"
        title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
        quote="The hot reload is so fast it\'s near instant. - Evan You"
        hashtags="vuejs,vite"
        class="fb_button"
      >
        <v-btn color="primary" width="100%"
          ><v-icon>mdi-facebook</v-icon></v-btn
        >
      </ShareNetwork>
    </v-row> -->
  </div>
</template>

<script>
// import { fireDb, fireStorage } from '~/plugins/firebase.js'
// export default {
//   middleware: 'router-auth',
//   async asyncData(context) {
//     var docId = context.params.product_id
//     var docRef = await fireDb.collection('products').doc(docId).get()
//     var productDetails = {}
//     if (docRef.data()) {
//       productDetails = { ...docRef.data(), productId: docId }
//       context.store.commit('SET_PRODUCT_DETAILS', productDetails)
//     } else {
//       context.router.push('/error')
//       console.log('Does not exist.')
//     }
//     return { productDetails }
//   },
//   methods: {
//     edit() {
//       console.log('edit')
//     },
//     async getUrl() {
//       var host = window.location.hostname
//       var port = host === 'localhost' ? ':3000' : ''
//       var route = this.$router.currentRoute.path.split('share')[0]
//       var url = host + port + route
//       await navigator.clipboard.writeText(url)
//     },
//     async share() {
//       console.log('share')
//       var host = window.location.hostname
//       var port = host === 'localhost' ? ':3000' : ''
//       var route = this.$router.currentRoute.path.split('share')[0]
//       var url = host + port + route
//       if (navigator.share) {
//         await navigator.share({
//           title: this.productDetails.productTitle,
//           url: url,
//         })
//       } else {
//         window.open('_blank', 'www.facebook.com')
//       }
//     },
//   },
// }
</script>

<style scoped>
.fb_button {
  width: 100%;
}
</style>
