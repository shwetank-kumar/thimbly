<template>
  <div>
    <h2 class="text-center">{{ productDetails.productTitle }}</h2>
    <v-card outlined class="my-2 rounded-lg">
      <product-photos />
      <v-card-text class="justify-center">{{
        productDetails.productDescription
      }}</v-card-text>
    </v-card>
    <v-card>
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
    var host = window.location.hostname
    var port = host === 'localhost' ? ':3000' : ''
    var route = context.route.path.split('share')[0]
    var url = host + port + route
    return { productDetails, url }
  },
  methods: {
    edit() {
      console.log('edit')
    },
    async getUrl() {
      await navigator.clipboard.writeText(this.url)
    },
  },
}
</script>

<style scoped>
.fb_button {
  width: 100%;
}
</style>
