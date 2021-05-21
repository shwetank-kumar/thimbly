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



    <v-row class="justify-space-around mx-2 my-5">
      <v-col>
        <v-btn plain color="primary" @click="cancel">Cancel</v-btn>
      </v-col>

      <v-btn v-if="user && user.stripe_id" :loading="isLoading" depressed :disabled="!previewEnabled" color="primary"
        @click="publish">Publish</v-btn>
      <v-col class="justify-center" v-if="user && user.stripe_id == null">
        <v-btn :disabled="!previewEnabled" :loading="isLoading" depressed color="primary" @click="publish">
          Next: Add Bank info</v-btn>
        <v-subheader class="caption pt-10">
          We need your bank information to send you payments for purchased items.
        </v-subheader>
      </v-col>
    </v-row>
    <Toast />
  </div>
</template>

<script>
  import { fireDb, fireStorage, analytics } from "~/plugins/firebase.js"
  import { mapGetters, mapMutations } from "vuex"
  import { v4 as uuidv4 } from "uuid"
  export default {
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters({ previewEnabled: "PREVIEW_ENABLED", user: "GET_USER" }),
    },
    middleware: "router-auth",
    data() {
      return {
        isLoading: false,
      }
    },
    mounted() {
      analytics().logEvent('page_view', {
        referrer: document.referrer,
        page_title: 'product_create',
        title: 'product_create',
        path: location.pathname,
      })
      if (!this.$store.state.firstTime && this.user.stripe_id != null) {
        this.$store.commit("RESET_PRODUCT_DETAILS")
      } else if (this.user.stripe_id == null) {
        this.$store.commit("SET_FIRST_TIME_USER", true)
      } else if (this.$store.state.firstTime && this.user.stripe_id != null) {
        this.$store.commit("SET_FIRST_TIME_USER", false)
      }
    },
    methods: {
      cancel() {
        this.$router.push("/seller/products")
      },
      async publish() {
        try {
          this.isLoading = true
          //TODO: Dont let it publish twice - grey out the publish button
          var downloadUrls = []
          // Upload images to storage after replacing their location with FireStorage location
          for (
            var idx = 0;
            idx < this.$store.state.productDetails.productPhotos.length;
            idx++
          ) {

            const regex = /^blob:http[a-z:\/\-\.\%0-9]+$/gm;
            if (regex.test(this.$store.state.productDetails.productPhotos[idx])) {
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
            seller_id: this.$store.state.user.uid,
            published: true,
          }
          this.$store.commit("SET_PRODUCT_DETAILS", productDetails)
          var docId
          if (this.$store.state.firstTime) {
            this.$router.push("/seller/setuppayment")
            return;
          }
          var docRef = fireDb.collection("products").doc()
          await docRef.set(productDetails)
          this.$store.commit("SET_PRODUCT_ID", docRef.id)
          this.$store.commit("SET_TOAST", { message: "The product has been published. Now go ahead and share it with the world!" })
          let that = this
          setTimeout(() => {
            that.$router.push("/seller/products")
          }, 3000)
        } catch (err) {
          this.isLoading = false
          this.$store.commit("SET_TOAST", { message: err.mesage })
        }
        // this.$router.push("/seller/products/" + docRef.id)
      },
    },
  }
</script>

<style scoped></style>