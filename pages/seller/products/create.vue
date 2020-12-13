<template>
  <div>
    <h2 class="text-center">New listing</h2>

    <v-card outlined class="my-2 rounded-lg">
      <v-card-title>Photos</v-card-title>
      <product-photos />
      <v-card-actions>
        <photo-actions />
      </v-card-actions>
    </v-card>

    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Product Details </v-card-title>
      <product-details-form />
    </v-card>

    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Shipping Details </v-card-title>
      <shipping-options />
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
        @click="publish"
        >Publish</v-btn
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

  middleware: 'router-auth',
  methods: {
    cancel() {
      this.$router.push('/seller/products')
    },
    async publish() {
      var downloadUrls = []
      // Upload images to storage after replacing their location with FireStorage location
      for (
        var idx = 0;
        idx < this.$store.state.productDetails.productPhotos.length;
        idx++
      ) {
        var fname = uuidv4()
        var fileRef = fireStorage.child('images/' + fname)

        let blob = await fetch(
          this.$store.state.productDetails.productPhotos[idx]
        ).then((r) => r.blob())
        const snapshot = await fileRef.put(blob)
        var tempvarUrl = await snapshot.ref.getDownloadURL()
        downloadUrls.push(tempvarUrl)
      }

      var productDetails = {
        ...this.$store.state.productDetails,
        productPhotos: downloadUrls,
        ownerUid: this.$store.state.user.uid,
        published: true,
      }
      this.$store.commit('SET_PRODUCT_DETAILS', productDetails)
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
      this.$router.push('/seller/products/' + docRef.id + '/share')
    },
  },
}
</script>

<style scoped></style>
