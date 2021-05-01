<template>
  <div>
    <v-card outlined class="ma-2 rounded-lg">
      <v-card-title primary-title class="d-flex justify-center">
        Order Details
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-4">
        Oooops! Something went wrong - likely that the seller has not product
        left. We will let them know to update their inventory.
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import {analytics} from "~/plugins/firebase.js"
  export default {
    mounted(){
      analytics()
    }
  }
</script>

<style lang="scss" scoped></style>
