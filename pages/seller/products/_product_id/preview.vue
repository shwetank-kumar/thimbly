<template>
  <div>
    <product-details-card />
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Buyer Details </v-card-title>
      <buyer-details-form />
    </v-card>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> You Pay </v-card-title>
      <v-card-text><you-pay /></v-card-text>
    </v-card>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Buy Now </v-card-title>
      <v-card-text><buy-now /></v-card-text>
    </v-card>
    <v-row class="justify-space-around mx-2 my-5">
      <v-btn depressed color="error" @click="cancel">Cancel</v-btn>
      <v-btn depressed color="secondary" @click="edit">Edit</v-btn>
      <v-btn depressed color="primary" @click="publish">Publish</v-btn>
    </v-row>
  </div>
</template>

<script>
import { fireDb, fireStorage } from '~/plugins/firebase.js'
import { mapGetters, mapMutations } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
  // computed: {
  // mix the getters into computed with object spread operator
  // ...mapGetters({ previewEnabled: 'PREVIEW_ENABLED' }),
  // },
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
      console.log(docRef.data())
      productDetails = { ...docRef.data(), productId: docId }
      context.store.commit('SET_PRODUCT_DETAILS', productDetails)
    } else {
      context.router.push('/error')
      console.log('Does not exist.')
    }
    return { productDetails }
  },
  // import { fireDb, fireStorage } from '~/plugins/firebase.js'
  // import BuyNow from '../components/BuyNow.vue'
  // import YouPay from '../components/YouPay.vue'
  // export default {
  //   components: { YouPay, BuyNow },
  //   async fetch() {
  //     // var docId = this.$store.state.productId
  //     var docId = '3cPY0L9sIZN4oPz2Tvfd'
  //     var docRef = await fireDb.collection('products').doc(docId).get()
  //     this.productDetails = { ...docRef.data() }
  //     this.$store.commit('SET_PRODUCT_DETAILS', this.productDetails)
  //   },
  //   data() {
  //     return {
  //       productDetails: {},
  //     }
  //   },
  methods: {
    async publish() {
      console.log('publish')
      this.$store.commit('SET_PRODUCT_DETAILS', {
        ...this.productDetails,
        published: true,
      })
      var message = ''
      try {
        var docRef = fireDb
          .collection('products')
          .doc(this.productDetails.productId)
        await docRef.set(productDetails)
        this.$store.commit('SET_PRODUCT_ID', docRef.id)
        message = 'Listing generated!'
      } catch (error) {
        message = 'Listing generation failed: ' + error
      }
      this.$router.push('/seller/products')
    },
    cancel() {
      this.$router.push('/seller/products')
    },

    edit() {
      this.$router.push('/seller/products/edit')
    },
  },
}
</script>

<style scoped>
.privacy-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
