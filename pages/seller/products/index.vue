<template>
  <div class="sellercontainer">
    <v-card
      outlined
      class="my-2 rounded-lg"
      v-for="(product, index) in storeProducts"
      :key="index"
      width="100%"
      @click="getId(index)"
    >
      <v-img :src="product.productPhotos[0]"></v-img>
      <v-card-title class="justify-center">{{
        product.productTitle
      }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
import { fireDb, fireStorage } from '~/plugins/firebase.js'
export default {
  middleware: 'router-auth',
  async asyncData(context) {
    var userId = context.store.state.user.uid
    var querySnapshot = await fireDb
      .collection('products')
      .where('ownerUid', '==', userId)
      .get()

    var storeProducts = []

    querySnapshot.forEach((doc) => {
      // console.log(doc.id)
      storeProducts.push({ ...doc.data(), productId: doc.id })
    })
    return { storeProducts }
  },
  methods: {
    getId(idx) {
      this.$router.push(
        '/seller/products/' + this.storeProducts[idx].productId + '/edit'
      )
      // console.log(this.storeProducts[idx].productId)
    },
  },
}
</script>

<style scoped>
.seller-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
