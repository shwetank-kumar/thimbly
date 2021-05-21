<template>
  <div>
    <h2 class="text-center">Payments Setup</h2>
    <div v-if="!stripe_id">
      <v-form ref="form">
        <v-container>
          <v-row>
            <h4 class="text-center pt-5 pb-5">Bank Account Information</h4>
          </v-row>
          <v-row class="pb-2">
            <v-text-field outlined dense label="Full Name of Account Holder" placeholder="" :rules="rules.isRequired"
              v-model="account_holder_name"></v-text-field>
          </v-row>

          <v-row class="pb-2">
            <v-text-field outlined dense label="Routing number" placeholder="000000000"
              :rules="rules.isRequired.concat(rules.isInt)" v-model="routing_number"></v-text-field>
          </v-row>
          <v-row class="pb-2">
            <v-text-field outlined dense label="Account number" placeholder="000000000000"
              :rules="rules.isRequired.concat(rules.isInt)" v-model="account_number"></v-text-field>
          </v-row>
          <v-row class="pb-2">
            <v-text-field outlined dense label="Confirm Account number" placeholder="000000000000"
              :rules="rules.isRequired.concat(rules.isInt).concat((v) => v == this.account_number || 'Account Number Mis-matched' )"
              v-model="confirm_account_number"></v-text-field>
          </v-row>
          <v-row class="justify-space-around mx-2 my-5">
            <!-- <v-btn depressed color="error" @click="cancel">Cancel</v-btn> -->
            <v-btn depressed color="primary pl-16 pr-16" @click="setup" :loading="isLoading">Save</v-btn>
          </v-row>

        </v-container>
      </v-form>
      <v-container class="grey--text text--darken-1">
        <v-col>
          <h4 class="text-center">Payment FAQs</h4>
        </v-col>
        <v-col>
          <b>Q: Why do we need your Bank Info ?</b>
          <br>
          A: We require your bank info to send you payments after a customer places an order
        </v-col>
        <v-col>
          <b>Q: Can I provide my bank info later?</b>
          <br>
          A: Sure, you can login again and provide this info. However, you will no be able to publish a product for
          selling until your bank info is setup. We do this to make sure we can pay you out as quickly as possible
        </v-col>
        <v-col>
          <b>Q: How quickly will I get paid ?</b>
          <br>
          A: It should take 2-3 buisness days
        </v-col>
      </v-container>
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
          <v-btn icon @click="delete_account">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <Toast />
  </div>
</template>

<script>
  import axios from "axios"
  import {
    config,
    fireDb,
    analytics
  } from "~/plugins/firebase.js"
  import {
    isRequired,
    isInt
  } from "~/plugins/validation.js"
  import moment from "moment"
  export default {
    data() {
      return {
        rules: {
          isRequired,
          isInt
        },
        account_holder_name: "",
        routing_number: null,
        account_number: null,
        confirm_account_number: null,
        isLoading: false
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
            params: {
              stripe_id
            },
          })
          bank_account_info = res.data
        } else {
          bank_account_info = null
        }
        // console.log(bank_account_info)
        return {
          stripe_id,
          bank_account_info
        }
      } else {
        return context.redirect("/")
      }
    },
    mounted() {
      analytics().logEvent('page_view', {
        referrer: document.referrer,
        page_title: 'payment_setup',
        title: 'payment_setup',
        path: location.pathname,
      })
    },
    methods: {
      async setup() {
        try {
          if (!this.$refs.form.validate()) {
            return
          }
          this.isLoading = true
          // Generate IP and date for TOS acceptance
          var date = Math.floor(Date.now() / 1000)
          // console.log(date)
          const getIpUrl = config.apiUrl + "/ip"
          var res = await axios.get(getIpUrl)
          var ip = res.data.split(",")[0]
          var tos_acceptance = {
            date,
            ip
          }

          // Generate a token for bank account
          const account_holder_type = "individual"
          // const account_holder_name =
          //   this.$store.state.stripeSetup.individual.first_name +
          //   " " +
          //   this.$store.state.stripeSetup.individual.last_name
          // const routing_number = this.$store.state.paymentSetup.routing_number
          // const account_number = this.$store.state.paymentSetup.account_number
          const account_holder_name = this.account_holder_name
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
          if (account_result.error) {
            throw Error(account_result.error.message)
          }

          // Create a Stripe account
          const type = "custom"
          const business_profile = {
            product_description: "Artists Supply and Craft Shops.",
          }
          const business_type = "individual"
          const capabilities = {
            transfers: {
              requested: true
            }
          }

          const external_account = account_result.token.id
          // const individual = {
          //   first_name: this.$store.state.stripeSetup.individual.first_name,
          //   last_name: this.$store.state.stripeSetup.individual.last_name,
          // }
          let names = this.account_holder_name.split(" ")
          const individual = {
            first_name: names[0],
            last_name: (names.length > 1) ? names[names.length -1] : '',
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
          this.isLoading = false
          this.$store.commit("SET_TOAST", {message: "Account Updated Successfully!"})
          if (this.$store.state.firstTime) {
            let that = this
            setTimeout(() => {
              that.$router.push("/seller/products/create")
            }, 2000)
            return
          }
          setTimeout(() => {
            this.$nuxt.refresh()
          }, 2000)

        } catch (err) {
          this.isLoading = false
          this.$store.commit("SET_TOAST", err)
        }
      },
      cancel() {
        this.$router.push("/")
      },
      async delete_account() {
        const stripe_id = this.$store.state.user.stripe_id
        const stripe_delete_url = config.apiUrl + "/stripe"
        await axios.delete(stripe_delete_url, {
          params: {
            stripe_id
          }
        })
        const user = {
          ...this.$store.state.user,
          stripe_id: null
        }
        // console.log(stripe_account.data.id)
        this.$store.commit("SET_USER", user)
        // Update the value of stripe_id for the user
        var query_snapshot = await fireDb
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
        var uid = query_snapshot.docs[0].id
        await fireDb.collection("users").doc(uid).set(user)
        this.routing_number = null;
        (this.account_number = null), this.$nuxt.refresh()
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