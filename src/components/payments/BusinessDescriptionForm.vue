<template>
  <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-textarea
          outlined
          dense
          label="Business description"
          placeholder="We sell spectacular eco-friendly scarves!"
          rows="2"
          :rules="rules.isRequired"
          v-model="businessDescription"
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { isRequired, isInt } from '@/plugins/validation.js'
export default {
  data() {
    return {
    rules: { isRequired, isInt },
    }
  },
  computed: {
    businessDescription: {
      get() {
        return this.$store.state.paymentSetup.businessDescription
      },
      set(value) {
        this.$store.commit('SET_PAYMENTSETUP_BUSINESSDESCRIPTION', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
