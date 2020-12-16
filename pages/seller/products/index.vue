<template>
  <div class="sellercontainer">
    <v-row no-gutters>
      <v-data-table
        :headers="headers"
        :items="storeProducts"
        :items-per-page="10"
        class="elevation-1"
        mobile-breakpoint="0"
        hide-default-footer
      >
        <template v-slot:item.action="{ item }">
          <v-row>
            <v-btn fab text x-small color="success" @click="edit(item)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <ShareNetwork
              network="facebook"
              :url="shareUrl"
              :title="item.productTitle"
              :description="item.productDescription"
              class="fb_button"
            >
              <v-btn x-small fab text color="primary" @click="url(item)"
                ><v-icon>mdi-facebook</v-icon>
              </v-btn>
            </ShareNetwork>
            <v-btn fab text x-small color="info" @click="url(item)"
              ><v-icon>mdi-link</v-icon></v-btn
            >
          </v-row>
        </template>
      </v-data-table>
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
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'productTitle',
        },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' },
      ],
      shareUrl: '',
    }
  },
  methods: {
    async url(productDetails) {
      var host = window.location.hostname
      var port = host === 'localhost' ? ':3000' : ''
      var route = '/seller/products/' + productDetails.productId
      var url = host + port + route
      this.shareUrl = url
      await navigator.clipboard.writeText(url)
    },
    edit(productDetails) {
      this.$router.push('/seller/products/' + productDetails.productId)
    },
  },
}
</script>

<style scoped>
.fb_button {
  text-decoration: none;
}
</style>
