<template>
  <!-- <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Routing number"
          placeholder="000000000"
          :rules="rules.isRequired.concat(rules.isInt)"
          v-model="routingNumber"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Account number"
          placeholder="000000000000"
          :rules="rules.isRequired.concat(rules.isInt)"
          v-model="accountNumber"
        ></v-text-field>
      </v-col>
    </v-row>
  </div> -->
</template>

<script>
// import { isRequired, isInt } from "@/plugins/validation.js";
// export default {
//   data() {
//     return {
//       rules: { isRequired, isInt },
//     };
//   },
//   computed: {
//     routingNumber: {
//       get() {
//         return this.$store.state.paymentSetup.routingNumber;
//       },
//       set(value) {
//         this.$store.commit("SET_PAYMENTSETUP_ROUTINGNUMBER", value);
//       },
//     },
//     accountNumber: {
//       get() {
//         return this.$store.state.paymentSetup.accountNumber;
//       },
//       set(value) {
//         this.$store.commit("SET_PAYMENTSETUP_ACCOUNTNUMBER", value);
//       },
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>
