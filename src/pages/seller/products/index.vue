<template>
  <div>
    <h2 class="text-center pb-5">My Products</h2>
    <div class="sellercontainer">
      <v-row no-gutters>
        <v-card v-if="storeProducts.length" v-for="(product, index) in storeProducts" :key="index" width="100%"
          height="200px" outlined class="my-2 rounded-lg"  @click="edit(index)">
          <v-card-title>{{ product.productTitle }}</v-card-title>
          <v-card-text>{{ product.productDescription }}</v-card-text>
          <v-card-actions class="d-flex justify-center">
            <!-- <v-col>
              <v-btn depressed color="primary" @click="edit(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col> -->
            <v-col>
              <v-btn depressed color="primary" @click="view(index)">
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn depressed color="primary" @click="getUrl(index)">
                <v-icon> mdi-link</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn depressed color="primary" @click="getPost(index)">
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn depressed color="primary" @click="publishProduct(index)">
                <v-icon>{{ (product.published) ? 'mdi-eye-outline': 'mdi-eye-off-outline'}}</v-icon>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>
    <div class="d-flex flex-column justify-center align-center full-height">
      <div v-if="storeProducts.length == 0" class="text-center text-color mt-16 mb-16">
        Hey there, glad you found us!
        <br /><br />
        Now let's get you on your way.<br />
        Go ahead and create your first product listing.
      </div>
      <div class="mt-5 mb-5">
        <v-btn color="primary" elevation="2" to="/seller/products/create">Create Product Listing </v-btn>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
  import { fireDb, fireStorage, hostServer, analytics } from "~/plugins/firebase.js"
  import axios from "axios"
  export default {
    middleware: "router-auth",
    async asyncData(context) {
      if (context.store.state.user) {
        var user_id = context.store.state.user.uid
        var querySnapshot = await fireDb
          .collection("products")
          .where("seller_id", "==", user_id)
          .get()

        var storeProducts = []

        querySnapshot.forEach((doc) => {
          // console.log(doc.id)
          var route = "/seller/products/" + doc.id
          var productUrl = hostServer + route
          storeProducts.push({
            ...doc.data(),
            product_id: doc.id,
            productUrl: productUrl,
          })
        })
        return { storeProducts }
      } else {
        return context.redirect("/")
      }
    },
    data() {
      return {
        url: "",
        product: { productDescription: "This is the description." },
      }
    },
    mounted() {
      analytics().logEvent('page_view', {
        referrer: document.referrer,
        page_title: 'product_listing',
        title: 'product_listing',
        path: location.pathname,
      })
    },
    methods: {
      async publishProduct(index) {
        let published = (this.storeProducts[index].published) ? "unpublished" : "published";
        await fireDb
          .collection("products").doc(this.storeProducts[index].product_id).update({published: !this.storeProducts[index].published}).then(() => {
          this.$store.commit("SET_TOAST", {message: `Product ${published}`})
          this.$nuxt.refresh()
        }).catch((error) => {
          this.$store.commit("SET_TOAST", {message: "Product Deleted Failed!"})
          console.error("Error removing document: ", error);
        });

      },
      edit(index) {
        this.$router.push(
          "/seller/products/" + this.storeProducts[index].product_id + "/edit"
        )
      },
      async getUrl(index) {
        await navigator.clipboard.writeText(
          this.storeProducts[index].productUrl
        )
      },
      async getPost(index) {
        var title = this.storeProducts[index].productTitle
        var text = this.storeProducts[index].productDescription
        var url = this.storeProducts[index].productUrl
        const shareData = { title, text, url } //, files }
        try {
          await navigator.share(shareData)
        } catch (err) {
          window.open(url)
        }
      },
      view(index) {
        this.$router.push(
          "/seller/products/" + this.storeProducts[index].product_id
        )
      },
    },
  }
</script>

<style scoped>
  .fb_button {
    text-decoration: none;
  }

  .full-height {}

  .text-color {
    color: #b9b9b9
  }
</style>