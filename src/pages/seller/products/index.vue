<template>
  <div class="sellercontainer">
    <v-row no-gutters>
      <v-card
        v-for="(product, index) in storeProducts"
        :key="index"
        width="100%"
        height="200px"
        outlined
        class="my-2 rounded-lg"
      >
        <v-card-title>{{ product.productTitle }}</v-card-title>
        <v-card-text>{{ product.productDescription }}</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-col>
            <v-btn depressed color="primary" @click="edit(index)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn depressed color="primary" @click="view(index)"
              ><v-icon>mdi-subdirectory-arrow-right</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn depressed color="primary" @click="getUrl(index)">
              <v-icon> mdi-link</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn depressed color="primary" @click="getPost(index)"
              ><v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
  import {fireDb, fireStorage, hostServer} from "~/plugins/firebase.js"
  import axios from "axios"
  export default {
    middleware: "router-auth",
    async asyncData(context) {
      if (context.store.state.user) {
        var userId = context.store.state.user.uid
        var querySnapshot = await fireDb
          .collection("products")
          .where("ownerUid", "==", userId)
          .get()

        var storeProducts = []

        querySnapshot.forEach((doc) => {
          var route = "/seller/products/" + doc.id
          var productUrl = hostServer + route
          storeProducts.push({
            ...doc.data(),
            productId: doc.id,
            productUrl: productUrl,
          })
        })

        return {storeProducts}
      } else {
        return context.redirect("/")
      }
    },
    data() {
      return {
        url: "",
        product: {productDescription: "This is the description."},
      }
    },
    methods: {
      edit(index) {
        this.$router.push(
          "/seller/products/" + this.storeProducts[index].productId + "/edit"
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
        const shareData = {title, text, url} //, files }
        try {
          await navigator.share(shareData)
        } catch (err) {
          window.open(url)
        }
      },
      view(index) {
        this.$router.push(
          "/seller/products/" + this.storeProducts[index].productId
        )
      },
    },
  }
</script>

<style scoped>
  .fb_button {
    text-decoration: none;
  }
</style>
