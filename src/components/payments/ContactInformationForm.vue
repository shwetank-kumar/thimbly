<template>
  <div>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Street Address"
          placeholder="1 Main St."
          :rules="rules.isRequired"
          v-model="streetAddress"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-select
          v-model="state"
          :items="states"
          placeholder="State"
          label="State"
          dense
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Zip"
          placeholder="00000"
          :rules="rules.isRequired"
          v-model="zip"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          disabled
          label="United States"
          placeholder="United States"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex mt-2 justify-space-around">
      <v-col cols="10">
        <v-text-field
          outlined
          dense
          label="Phone number"
          placeholder="xxx-xxx-xxxx"
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
      streetAddress: "",
      state:"",
      zip: "",
      rules: { isRequired, isInt },
      states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
    // "business_profile.mcc" - hard code to store,
    // "business_profile.url" - hard code to store,
    // "business_type" - hard code to individual,
    // "external_account" - enter,
    // "individual.address.city",
    // "individual.address.line1",
    // "individual.address.postal_code",
    // "individual.address.state",
    // "individual.dob.day",
    // "individual.dob.month",
    // "individual.dob.year",
    // "individual.email",
    // "individual.first_name",
    // "individual.id_number",
    // "individual.last_name",
    // "individual.phone",
    // "tos_acceptance.date",
    // "tos_acceptance.ip"
    }
  },
}
</script>

<style lang="scss" scoped></style>
