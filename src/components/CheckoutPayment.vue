<template>
  <div>
    <v-card
      ><v-card-title primary-title class="d-flex justify-center">
        Payment
      </v-card-title>
      <form id="payment-form">
        <div id="card-element"><!--Stripe.js injects the Card Element--></div>
        <v-card-actions class="mt-5">
          <v-btn color="primary" width="100%" @click="buy" :disabled="disabled"
            >Buy</v-btn
          >
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>

<script>
  import {config, fireDb} from "~/plugins/firebase.js"
  import axios from "axios"
  export default {
    async mounted() {
      var style = {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          },
        },
        invalid: {
          fontFamily: "Arial, sans-serif",
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      }
      // console.log(config.stripeConfig.publicKey)
      const amount = this.$store.state.productDetails.productPricing
      const stripe_id = this.$store.state.user.stripe_id
      var res = await axios.get(config.apiUrl + "/payment", {
        params: {stripe_id, amount},
      })
      this.payment_token = res.data
      // console.log(res.data)
      this.stripe = await Stripe(config.stripeConfig.publicKey)
      let elements = this.stripe.elements()
      // card = undefined
      this.card = elements.create("card", {style: style})
      this.card.mount("#card-element")
      // check if quantity available is > 0 else disable buy button
      if (this.$store.state.productDetails.productQuantity > 0) {
        this.disabled = false
      }
    },
    data() {
      return {
        buyEnabled: true,
        card: null,
        payment_token: null,
        stripe: null,
        disabled: true,
      }
    },
    methods: {
      buy() {
        console.log("buy")
        // var form = document.getElementById("payment-form")

        // form.addEventListener("submit", function (ev) {
        // ev.preventDefault()
        this.stripe
          .confirmCardPayment(this.payment_token, {
            payment_method: {
              card: this.card,
              shipping_details: this.$store.state.order.shipping_details,
            },
          })
          .then(function (result) {
            if (result.error) {
              // Show error to your customer (e.g., insufficient funds)
              console.log(result.error.message)
            } else {
              // The payment has been processed!
              if (result.paymentIntent.status === "succeeded") {
                console.log("succeeded")
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                // 1. Create an order
                // 2. Reduce qty of product remaining in product catalog
                // 3. Send an email connecting the seller and buyer
              }
            }
          })
        // })
      },
      cancel() {
        console.log("cancel")
      },
    },
  }
</script>

<style scoped>
  form {
    /* width: 30vw;
    min-width: 500px; */
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
</style>
