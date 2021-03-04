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
  import _ from "lodash"
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
      this.stripe = await Stripe(config.stripeConfig.publicKey)
      let elements = this.stripe.elements()
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
      async buy() {
        var product_id = this.$store.state.product_id

        var product_ref = await fireDb
          .collection("products")
          .doc(product_id)
          .get()

        var productDetails = {}
        if (product_ref.data()) {
          productDetails = {...product_ref.data()} //, productId: docId}
          // context.store.commit("SET_PRODUCT_DETAILS", productDetails)
          // context.store.commit("SET_PRODUCT_ID", product_id)
          this.$store.commit("SET_PRODUCT_DETAILS", productDetails)
          this.$store.commit("SET_PRODUCT_ID", product_id)
        } else {
          // context.router.push("/error")
          this.$router.push("/error")
          console.log("Does not exist.")
        }
        if (productDetails.productQuantity > 0) {
          // console.log("success")
          var form = document.getElementById("payment-form")
          const shipping = 6
          const amount =
            this.$store.state.productDetails.productPricing *
              this.$store.state.order.quantity +
            shipping

          const stripe_id = this.$store.state.seller.stripe_id
          // console.log(config.apiUrl)
          // console.log(stripe_id)
          var res = await axios.get(config.apiUrl + "/payment", {
            params: {stripe_id, amount},
          })
          this.payment_token = res.data
          const order = this.$store.state.order

          var seller_id = this.$store.state.productDetails.seller_id
          const order_details = {product_id, seller_id, ...order}
          let result = await this.stripe.confirmCardPayment(
            this.payment_token,
            {
              payment_method: {
                card: this.card,
              },
            }
          )
          const result_intent = {paymentIntent: {status: "succeeded"}}
          if (result_intent.error) {
            // Show error to your customer (e.g., insufficient funds)
          } else {
            if (result_intent.paymentIntent.status === "succeeded") {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              // 1. Create an order
              // console.log(order_details)
              var message = ""
              try {
                var order_ref = fireDb.collection("orders").doc()
                await order_ref.set(order_details)
                this.$store.commit("SET_ORDER_ID", order_ref.id)
                message = "Order generated!"
              } catch (error) {
                message = "Order generation failed: " + error
              }
              // 2. Reduce qty of product remaining in product catalog
              var updated_product_quantity =
                this.$store.state.productDetails.productQuantity -
                order_details.quantity
              this.$store.commit("SET_PRODUCT_DETAILS", {
                ...this.$store.state.productDetails,
                productQuantity: updated_product_quantity,
              })
              try {
                var product_details = this.$store.state.productDetails
                var doc_ref = fireDb.collection("products").doc(product_id)
                await doc_ref.set(product_details)
                message = "Listing updated!"
              } catch (error) {
                message = "Listing update failed: " + error
              }
              // 3. Send email out to buyer and seller - just involves writing to mail datastore
              var seller_ref = await fireDb
                .collection("users")
                .where("uid", "==", seller_id)
                .get()
              var seller
              seller_ref.forEach((doc) => {
                seller = {...doc.data()}
              })
              var to = [order.shipping_details.email, seller.email]
              var subject =
                "Order Confirmation from Thimbly: Order # " + order_ref.id
              var html = `<p>Thanks for ordering from ${seller.display_name}'s store! Your order details are as follows:<br>
              Product Title: ${product_details.productTitle},<br>
              Order Quantity: ${order.quantity},<br>
              Order Total: $ ${order.total},<br>
              Here are your special instructions we have received:<br>
              '${order.special_instructions}'<br>
              If you have any questions you can reach me at: ${seller.email}.<br>
              Thanks,<br>
              </p>`
              var message = {subject, html}
              var mail = {to, message}
              var mail_ref = fireDb.collection("mail").doc()
              await mail_ref.set(mail)

              // 4. Route to thank you page
              this.$router.push("/seller/order/" + order_ref.id + "/thankyou")
            }
          }
        } else {
          this.$router.push("/seller/order/unsuccessful")
        }
      },
    },
  }
</script>

<style scoped>
  form {
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
</style>
