<template>
  <div class="sellercontainer">
    <v-row no-gutters>
      <v-card
        v-for="(product, index) in storeProducts"
        :key="index"
        width="100%"
        height="300px"
      >
        <v-card-title>{{ product.productTitle }}</v-card-title>
        <v-card-text>{{ product.productDescription }}</v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn depressed color="primary" @click="edit(index)" width="100%"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              depressed
              color="primary"
              @click="getUrl(index)"
              width="100%"
            >
              <v-icon> mdi-link</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <ShareNetwork
              network="facebook"
              :url="url"
              :title="product.productTitle"
              :description="product.productDescription"
              class="fb_button"
            >
              <v-btn color="primary" width="100%" @click="getUrl(index)"
                ><v-icon>mdi-facebook</v-icon>
              </v-btn>
            </ShareNetwork>
          </v-col>
        </v-card-actions>
      </v-card>

      <!-- <v-data-table
        :headers="headers"
        :items="storeProducts"
        :items-per-page="10"
        class="elevation-1 mx-0 px-0"
        mobile-breakpoint="0"
        hide-default-footer
      >
        <template v-slot:item.action="{ item }">
          <v-row class="d-flex justify-end">
            <v-btn fab text color="success" @click="edit(item)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <ShareNetwork
              network="facebook"
              :url="shareUrl"
              :title="item.productTitle"
              :description="item.productDescription"
              class="fb_button"
            >
              <v-btn fab text color="primary" @click="url(item)"
                ><v-icon>mdi-facebook</v-icon>
              </v-btn>
            </ShareNetwork>
            <v-btn fab text color="info" @click="url(item)"
              ><v-icon>mdi-link</v-icon></v-btn
            >
          </v-row>
        </template>
      </v-data-table> -->
    </v-row>
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
      storeProducts.push({ ...doc.data(), productId: doc.id })
    })
    return { storeProducts }
  },
  data() {
    return {
      url: '',
    }
  },
  // data() {
  //   return {
  //     headers: [
  //       {
  //         text: 'Title',
  //         align: 'start',
  //         value: 'productTitle',
  //         width: '40%',
  //       },
  //       {
  //         text: 'Actions',
  //         value: 'action',
  //         align: 'center',
  //         width: '60%',
  //       },
  //     ],
  //     shareUrl: '',
  //   }
  // },
  methods: {
    // async url(productDetails) {
    //   var host = window.location.hostname
    //   var port = host === 'localhost' ? ':3000' : ''
    //   var route = '/seller/products/' + productDetails.productId
    //   var url = host + port + route
    //   this.shareUrl = url
    //   await navigator.clipboard.writeText(url)
    // },
    // edit(productDetails) {
    //   this.$router.push('/seller/products/' + productDetails.productId)
    // },

    edit(index) {
      this.$router.push(
        '/seller/products/' + this.storeProducts[index].productId
      )
      console.log(this.storeProducts[index].productId)
    },
    async getUrl(index) {
      var host = window.location.hostname
      var port = host === 'localhost' ? ':3000' : ''
      var route = '/seller/products/' + this.storeProducts[index].productId
      var url = host + port + route
      await navigator.clipboard.writeText(url)
      console.log(url)
      this.url = url
    },
  },
}
</script>

<style scoped>
.fb_button {
  text-decoration: none;
}
</style>
