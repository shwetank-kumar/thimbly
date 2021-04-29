<template>
  <div>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title primary-title class="d-flex justify-center">
        Special Instructions
      </v-card-title>
      <v-row class="d-flex mt-2 justify-space-around">
        <v-col class="pa-0" cols="10">
          <!-- <p class="h4">Contact Information</p> -->
          <v-textarea
            outlined
            dense
            label="Instructions to Seller (Optional)"
            placeholder="These are some special instructions for the seller."
            v-model="special_instructions"
          ></v-textarea>
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
      special_instructions: {
        get() {
          return this.$store.state.order.special_instructions
        },
        set(value) {
          if (!value) {
            value = "No special instructions."
          }
          this.$store.commit("SET_ORDER_SPECIAL_INSTRUCTIONS", value)
        },
      },
    },
    data() {
      return {
        rules: {isRequired, isInt},
      }
    },
  }
</script>

<style scoped></style>
