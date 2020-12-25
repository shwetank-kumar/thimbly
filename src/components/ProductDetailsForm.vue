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
          v-model="productTitle"
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
          v-model="productDescription"
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
          v-model="productPricing"
          :rules="rules.isRequired"
          type="number"
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
          v-model="productQuantity"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapSetters } from 'vuex'
import { isRequired, isInt } from '@/plugins/validation.js'
export default {
  computed: {
    productTitle: {
      get() {
        return this.$store.state.productDetails.productTitle
      },
      set(value) {
        var payload = {
          productTitle: value,
        }
        this.$store.commit('SET_PRODUCT_DETAILS', payload)
      },
    },
    productDescription: {
      get() {
        return this.$store.state.productDetails.productDescription
      },
      set(value) {
        var payload = {
          productDescription: value,
        }
        this.$store.commit('SET_PRODUCT_DETAILS', payload)
      },
    },
    productPricing: {
      get() {
        return this.$store.state.productDetails.productPricing
      },
      set(value) {
        var payload = {
          productPricing: value,
        }
        this.$store.commit('SET_PRODUCT_DETAILS', payload)
      },
    },
    productQuantity: {
      get() {
        return this.$store.state.productDetails.productQuantity
      },
      set(value) {
        var payload = {
          productQuantity: value,
        }
        this.$store.commit('SET_PRODUCT_DETAILS', payload)
      },
    },
  },
  data() {
    return {
      rules: { isRequired, isInt },
    }
  },
}
</script>

<style scoped></style>
