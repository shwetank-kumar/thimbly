<template>
  <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-text-field
          outlined
          dense
          label="Title"
          placeholder="Beautiful red wool scarf."
          :rules="rules.isRequired"
          v-model="productDetails.title"
          @change="updateProdDetails()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-textarea
          outlined
          dense
          rows="2"
          label="Description"
          placeholder="Beautiful red wool scarf description."
          v-model="productDetails.description"
          @change="updateProdDetails()"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-around">
      <v-col class="pa-0" cols="4">
        <v-text-field
          outlined
          dense
          label="Price"
          prefix="$"
          placeholder="19.99"
          v-model="productDetails.pricing"
          :rules="rules.isRequired"
          type="number"
          @change="updateProdDetails()"
        ></v-text-field>
      </v-col>
      <v-col class="pa-0 ma-0" cols="4">
        <v-text-field
          outlined
          dense
          label="Qty"
          placeholder="25"
          type="number"
          :rules="rules.isRequired.concat(rules.isInt)"
          v-model="productDetails.quantity"
          @change="updateProdDetails()"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isRequired, isInt } from '@/plugins/validation.js'
export default {
  data() {
    return {
      rules: { isRequired, isInt },
    }
  },
  props: ['productDetails'],
  methods: {
    updateProdDetails() {
      var payload = {
        productTitle: this.productDetails.title,
        productDescription: this.productDetails.description,
        productPricing: this.productDetails.pricing,
        productQuantity: this.productDetails.quantity,
      }
      this.$store.commit('SET_PRODUCT_DETAILS', payload)
    },
  },
}
</script>

<style scoped></style>
