<template>
  <div>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title> Payment Options </v-card-title>

      <payment-options-buyer />
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isRequired, isInt } from '@/plugins/validation.js'
import PaymentOptionsBuyer from './PaymentOptionsBuyer.vue'
export default {
  components: { PaymentOptionsBuyer },
  data() {
    return {
      rules: { isRequired, isInt },
    }
  },
}
</script>

<style scoped></style>
