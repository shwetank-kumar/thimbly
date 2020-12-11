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
import BuyNow from '~/components/BuyNow.vue'
import YouPay from '~/components/YouPay.vue'
export default {
  components: { YouPay, BuyNow },
  async created() {
    var docId = this.$route.params.product_id
    var docRef = await fireDb.collection('products').doc(docId).get()
    if (docRef.data()) {
      this.productDetails = { ...docRef.data() }
      this.$store.commit('SET_PRODUCT_DETAILS', this.productDetails)
    } else {
      this.$router.push('/error')
      console.log('Does not exist.')
    }
  },
  data() {
    return {
      productDetails: {},
    }
  },
  methods: {
    publish() {
      console.log('publish')
      this.$router.push('/seller')
    },
    cancel() {
      this.$router.push('/seller')
    },

    edit() {
      this.$router.push('/editlisting')
    },
  },
  middleware: 'router-auth',
}
</script>

<style scoped></style>
