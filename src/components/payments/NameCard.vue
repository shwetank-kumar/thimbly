<template>
  <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="First Name"
          placeholder="Jonathan"
          :rules="rules.isRequired"
          v-model="fname"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Last Name"
          placeholder="Smith"
          :rules="rules.isRequired"
          v-model="lname"
        ></v-text-field>
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
    fname: {
      get() {
        return this.$store.state.stripeSetup.firstName
      },
      set(value) {
        this.$store.commit('SET_INDIVIDUAL_FIRST_NAME', value)
      }
    },
    lname: {
      get() {
        return this.$store.state.stripeSetup.lastName
      },
      set(value) {
        this.$store.commit('SET_INDIVIDUAL_LAST_NAME', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
