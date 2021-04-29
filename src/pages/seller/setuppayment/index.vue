<template>
  <div>
    <h2 class="text-center">Payments Setup</h2>
    <div v-if="!stripe_id">
      <v-card outlined class="my-2 rounded-lg">
        <v-card-title>Name on Bank Account</v-card-title>
        <name-form></name-form>
      </v-card>

      <v-card outlined class="my-2 rounded-lg">
        <v-card-title>Contact Information</v-card-title>
        <contact-information-form></contact-information-form>
      </v-card>
      <!-- <v-card outlined class="my-2 rounded-lg">
      <v-card-title>Identity Verification</v-card-title>
      <id-verification-form></id-verification-form>
    </v-card> -->
      <v-card outlined class="my-2 rounded-lg">
        <v-card-title>Banking Information</v-card-title>
        <v-row class="d-flex mt-2 justify-space-around">
          <v-col cols="10">
            <v-text-field
              outlined
              dense
              label="Routing number"
              placeholder="000000000"
              :rules="rules.isRequired.concat(rules.isInt)"
              v-model="routing_number"
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
              v-model="account_number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <!-- <v-card outlined class="my-2 rounded-lg">
      <v-card-title>Business Description</v-card-title>
      <business-description-form></business-description-form>
    </v-card> -->
      <v-row class="justify-space-around mx-2 my-5">
        <v-btn depressed color="error" @click="cancel">Cancel</v-btn>
        <v-btn depressed color="primary" @click="setup">Setup</v-btn>
      </v-row>
    </div>
    <div v-else>
      <v-card outlined class="my-2 rounded-lg">
        <v-card-title>Banking Information</v-card-title>
        <v-card-text>
          <p>Account holder name: {{ bank_account_info.holder_name }}</p>
          <p>Bank name: {{ bank_account_info.bank_name }}</p>
          <p>
            Account number (last 4 digits):
            {{ bank_account_info.bank_account_last4 }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn icon @click="delete_account"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {config, fireDb} from "~/plugins/firebase.js"
  import {isRequired, isInt} from "~/plugins/validation.js"
  import moment from "moment"
  export default {
    data() {
      return {
        rules: {isRequired, isInt},
        routing_number: null,
        account_number: null,
      }
    },
    middleware: "router-auth",
    async asyncData(context) {
      if (context.store.state.user) {
        const stripe_id = context.store.state.user.stripe_id
        // console.log(stripe_id)
        let bank_account_info
        if (stripe_id) {
          const stripe_get_account_url = config.apiUrl + "/stripe"
          // console.log(stripe_get_account_url)
          const res = await axios.get(stripe_get_account_url, {
            params: {stripe_id},
          })
          bank_account_info = res.data
        } else {
          bank_account_info = null
        }
        // console.log(bank_account_info)
        return {stripe_id, bank_account_info}
      } else {
        return context.redirect("/")
      }
    },
    methods: {
      async setup() {
        // Generate IP and date for TOS acceptance
        var date = Math.floor(Date.now() / 1000)
        // console.log(date)
        const getIpUrl = config.apiUrl + "/ip"
        var res = await axios.get(getIpUrl)
        var ip = res.data.split(",")[0]
        var tos_acceptance = {date, ip}

        // Generate a token for bank account
        const account_holder_type = "individual"
        const account_holder_name =
          this.$store.state.stripeSetup.individual.first_name +
          " " +
          this.$store.state.stripeSetup.individual.last_name
        // const routing_number = this.$store.state.paymentSetup.routing_number
        // const account_number = this.$store.state.paymentSetup.account_number
        const routing_number = this.routing_number
        const account_number = this.account_number
        const country = "US"
        const currency = "usd"
        const bank_account_params = {
          type,
          country,
          currency,
          account_holder_name,
          account_holder_type,
          routing_number,
          account_number,
        }
        // console.log(bank_account_params)
        const stripe = await Stripe(config.stripeConfig.publicKey)
        const account_result = await stripe.createToken(
          "bank_account",
          bank_account_params
        )
        // console.log(account_result)

        // Create a Stripe account
        const type = "custom"
        const business_profile = {
          product_description: "Artists Supply and Craft Shops.",
        }
        const business_type = "individual"
        const capabilities = {transfers: {requested: true}}

        const external_account = account_result.token.id
        const individual = {
          first_name: this.$store.state.stripeSetup.individual.first_name,
          last_name: this.$store.state.stripeSetup.individual.last_name,
        }
        // const tos_acceptance = {date:1547923073, ip:"172.18.80.19"}
        const stripe_setup_url = config.apiUrl + "/stripe"
        const stripe_account = await axios.post(stripe_setup_url, {
          type,
          country,
          business_profile,
          business_type,
          capabilities,
          external_account,
          individual,
          tos_acceptance,
        })

          const user = {
          ...this.$store.state.user,
          stripe_id: stripe_account.data.id,
        }
        // console.log("response",stripe_account)
        this.$store.commit("SET_USER", user)

        // Update the value of stripe_id for the user
        var query_snapshot = await fireDb
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
        var uid = query_snapshot.docs[0].id
        await fireDb.collection("users").doc(uid).set(user)
        this.$nuxt.refresh()
      },
      cancel() {
        this.$router.push("/")
      },
      async delete_account() {
        const stripe_id = this.$store.state.user.stripe_id
        const stripe_delete_url = config.apiUrl + "/stripe"
        await axios.delete(stripe_delete_url, {params: {stripe_id}})
        const user = {...this.$store.state.user, stripe_id: null}
        // console.log(stripe_account.data.id)
        this.$store.commit("SET_USER", user)
        // Update the value of stripe_id for the user
        var query_snapshot = await fireDb
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
        var uid = query_snapshot.docs[0].id
        await fireDb.collection("users").doc(uid).set(user)
        this.routing_number = null
        ;(this.account_number = null), this.$nuxt.refresh()
      },
    },
  }
</script>

<style scoped>
  .preferences-container {
    margin: 0 auto;
    min-height: 100vh;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
