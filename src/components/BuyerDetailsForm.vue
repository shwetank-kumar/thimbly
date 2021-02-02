<template>
  <div>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title primary-title class="d-flex justify-center">
        Shipping Information
      </v-card-title>
      <v-row class="d-flex mt-2 justify-space-around">
        <v-col class="pa-0" cols="10">
          <p class="h4">Contact Information</p>
          <v-text-field
            outlined
            dense
            label="First Name"
            placeholder="Jill"
            :rules="rules.isRequired"
            @change="updateBuyerDetails()"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Last Name"
            placeholder="Dane"
            :rules="rules.isRequired"
            @change="updateBuyerDetails()"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Email"
            placeholder="xyz@abc.com"
            :rules="rules.isRequired"
            @change="updateBuyerDetails()"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Phone"
            placeholder="000-000-0000"
            :rules="rules.isRequired"
            @change="updateBuyerDetails()"
          ></v-text-field>
          <p class="h4">Address</p>
          <v-text-field
            outlined
            dense
            label="Address Line 1"
            placeholder="123 Home St. "
            :rules="rules.isRequired"
            @change="updateBuyerDetails()"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Address Line 2"
            placeholder="Apt. No. 456"
            @change="updateBuyerDetails()"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="City"
            placeholder="San Francisco"
            @change="updateBuyerDetails()"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            label="State"
            placeholder=" "
            :items="states"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            dense
            label="Zip Code"
            placeholder="00000"
            @change="updateBuyerDetails()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import {mapMutations} from "vuex"
  import {isRequired, isInt} from "@/plugins/validation.js"
  export default {
    data() {
      return {
        rules: {isRequired, isInt},
        states: [
          "Alabama",
          "Alaska",
          "American Samoa",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "District of Columbia",
          "Federated States of Micronesia",
          "Florida",
          "Georgia",
          "Guam",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Marshall Islands",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Northern Mariana Islands",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Palau",
          "Pennsylvania",
          "Puerto Rico",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virgin Island",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
        ],
      }
    },
  }
</script>

<style scoped></style>
