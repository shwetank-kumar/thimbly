<template>
  <div>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title primary-title class="d-flex justify-center">
        Shipping Information
      </v-card-title>
      <v-row class="d-flex mt-2 justify-space-around">
        <v-col class="pa-0" cols="10">
          <!-- <p class="h4">Contact Information</p> -->
          <v-text-field
            outlined
            dense
            label="Name"
            placeholder="Jill Dane"
            :rules="rules.isRequired"
            v-model="name"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Email"
            placeholder="buyer@thimbly.io"
            :rules="rules.isRequired"
            v-model="email"
          ></v-text-field>
          <!-- <p class="h4">Shipping Address</p> -->
          <v-text-field
            outlined
            dense
            label="Address Line 1"
            placeholder="123 Home St. "
            :rules="rules.isRequired"
            v-model="address_one"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Address Line 2"
            placeholder="Apt. No. 456"
            v-model="address_two"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="City"
            placeholder="San Francisco"
            v-model="city"
          ></v-text-field>
          <v-select
            label="State"
            placeholder=" "
            :items="states"
            dense
            outlined
            v-model="state"
          ></v-select>
          <v-text-field
            outlined
            dense
            label="Zip Code"
            placeholder="00000"
            v-model="postal_code"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex"
  import {isRequired, isInt} from "@/plugins/validation.js"
  export default {
    computed: {
      name: {
        get() {
          return this.$store.state.order.shipping_details.name
        },
        set(value) {
          this.$store.commit("SET_ORDER_SHIPPING_DETAILS_NAME", value)
        },
      },
      email: {
        get() {
          return this.$store.state.order.shipping_details.email
        },
        set(value) {
          this.$store.commit("SET_ORDER_SHIPPING_DETAILS_EMAIL", value)
        },
      },
      address_one: {
        get() {
          // console.log(this.$store.state)
          return this.$store.state.order.shipping_details.address.line1
        },
        set(value) {
          this.$store.commit(
            "SET_ORDER_SHIPPING_DETAILS_ADDRESS_LINE_ONE",
            value
          )
        },
      },
      address_two: {
        get() {
          return this.$store.state.order.shipping_details.address.line2
        },
        set(value) {
          this.$store.commit(
            "SET_ORDER_SHIPPING_DETAILS_ADDRESS_LINE_TWO",
            value
          )
        },
      },
      city: {
        get() {
          return this.$store.state.order.shipping_details.address.city
        },
        set(value) {
          this.$store.commit("SET_ORDER_SHIPPING_DETAILS_ADDRESS_CITY", value)
        },
      },
      state: {
        get() {
          return this.$store.state.order.shipping_details.address.city
        },
        set(value) {
          this.$store.commit("SET_ORDER_SHIPPING_DETAILS_ADDRESS_STATE", value)
        },
      },
      postal_code: {
        get() {
          return this.$store.state.order.shipping_details.address.postal_code
        },
        set(value) {
          this.$store.commit(
            "SET_ORDER_SHIPPING_DETAILS_ADDRESS_POSTAL_CODE",
            value
          )
        },
      },
    },
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
