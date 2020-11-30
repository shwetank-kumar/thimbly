<template>
  <div>
    <h4 class="px-2 pb-2">Product Details</h4>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col class="pa-0" cols="10">
        <v-text-field
          outlined
          dense
          label="Title"
          placeholder="Beautiful red wool scarf."
          :rules="rules.isRequired"
          v-model="title"
          @blur="updateProdDetails()"
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
          v-model="description"
          @blur="updateProdDetails()"
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
          v-model="pricing"
          :rules="rules.isRequired"
          type="number"
          @blur="updateProdDetails()"
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
          v-model="quantity"
          @blur="updateProdDetails()"
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
      title: null,
      description: null,
      pricing: null,
      quantity: null,
      rules: { isRequired, isInt },
    }
  },
  methods: {
    updateProdDetails() {
      // console.log(isRequired(''))
      var payload = {
        productTitle: this.title,
        productDescription: this.description,
        productPricing: this.pricing,
        productQuantity: this.quantity,
      }
      this.$store.commit('SET_PRODUCT_DETAILS', payload)
    },
  },
}
</script>

<style scoped></style>
