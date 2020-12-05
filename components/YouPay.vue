<template>
  <div>
    <v-row dense class="d-flex justify-left">
      <v-col class="pl-10 py-0" cols="6">
        <p class="ma-0 text-button text-left">Subtotal</p>
      </v-col>
      <v-col class="pl-10 py-0" cols="4">
        <p class="ma-0 text-button text-center">$25</p>
      </v-col>
    </v-row>
    <v-row dense class="d-flex justify-left">
      <v-col class="pl-10 py-0" cols="6">
        <p class="ma-0 text-button text-left">Shipping</p>
      </v-col>
      <v-col class="pl-10 py-0" cols="4">
        <p class="ma-0 text-button text-center">$6</p>
      </v-col>
    </v-row>
    <v-row dense class="d-flex justify-left">
      <v-col class="pl-10 py-0" cols="6">
        <p class="ma-0 text-button font-weight-black text-left">Total</p>
      </v-col>
      <v-col class="pl-10 py-0" cols="4">
        <p class="ma-0 text-button font-weight-black text-center">$31</p>
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
}
</script>

<style scoped></style>
