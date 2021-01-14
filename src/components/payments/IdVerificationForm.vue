<template>
  <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dob"
              label="Date Of Birth"
              readonly
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="dob"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Last 4 of SSN"
          placeholder="xxxx"
          :rules="rules.isRequired"
          v-model="ssnLastFour"
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
      menu: false,
    }
  },
  computed: {
    dob: {
      get() {
        return this.$store.state.paymentSetup.dob
      },
      set(value) {
        this.$store.commit('SET_PAYMENTSETUP_DOB', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
