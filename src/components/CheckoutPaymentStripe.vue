<template>
  <div>
    <v-card
      ><v-card-title primary-title class="d-flex justify-center">
        Payment
      </v-card-title>
      <form id="payment-form">
        <div id="card-element">
          <!--Stripe.js injects the Card Element-->
        </div>
        <v-card-actions class="mt-5">
          <v-btn color="primary" width="100%" 
          @click="buy" 
          :disabled="disabled"
          elevation="5"
            >Buy</v-btn
          >
        </v-card-actions>
        <v-row class="mx-auto pt-4 d-flex justify-center">
            <v-icon class="pr-2">mdi-lock</v-icon>
            <span class="caption pt-1">All Payments are processed and secured by Stripe</span>
        </v-row>
      
        <p class="d-flex justify-center pt-6 red--text">
          {{ message }}
        </p>
      </form>
    </v-card>
  </div>
</template>

<script>
  import {config, fireDb} from "~/plugins/firebase.js"
  import axios from "axios"
  import _ from "lodash"
  export default {
    computed: {
      disabled: {
        get() {
          var quantity_selected =
            this.$store.state.order.quantity > 0 ? true : false
          var shipping_validation = false
          var has_inventory =
            this.$store.state.productDetails.productQuantity > 0 ? true : false
          var shipping_validation = this.$store.state.order_validation
            .shipping_validation

          return !(
            has_inventory &&
            shipping_validation &&
            quantity_selected &&
            this.card_complete
          )
        },
        set() {},
      },
    },

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
      this.listenForErrors()
      // check if quantity available is > 0 else disable buy button
      if (this.$store.state.productDetails.productQuantity > 0) {
        this.disabled = false
      }
    },
    data() {
      return {
        card: null,
        payment_token: null,
        stripe: null,
        stripe_error: null,
        card_complete: false,
        message: "",
        // disabled: true,
      }
    },
    methods: {
      listenForErrors: function () {
        const vm = this
        this.card.addEventListener("change", function (event) {
          vm.toggleError(event)
          vm.card_error = ""
          vm.card_complete = event.complete ? true : false
          // console.log(vm.cardComplete)
        })
      },
      toggleError: function (event) {
        if (event.error) {
          this.stripe_error = event.error.message
        } else {
          this.stripe_error = ""
        }
      },
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
          // const shipping = this.$store.state.productDetails.shipping
          const amount =
            Number(this.$store.state.productDetails.productPricing) *
              Number(this.$store.state.order.quantity) +
            Number(this.$store.state.productDetails.shipping)

          const stripe_id = this.$store.state.seller.stripe_id
          // console.log(config.apiUrl)
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
          console.log(result)
          // var message = ""
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            this.message = result.error.message
          } else {
            if (result.paymentIntent.status === "succeeded") {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              // 1. Create an order
              // console.log(order_details)

              try {
                var order_ref = fireDb.collection("orders").doc()
                await order_ref.set(order_details)
                this.$store.commit("SET_ORDER_ID", order_ref.id)
                this.message = "Order generated!"
              } catch (error) {
                this.message = "Order generation failed: " + error
                // if order generation fails you should revert the funds back here
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
                // this.message = "Listing updated!"
              } catch (error) {
                // this.message = "Listing update failed: " + error
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
              var html = `
              <p>Hi ${order.shipping_details.name}</p>
              
              <p>Thanks for ordering from ${seller.display_name}'s store! Your order details are as follows:<br><br>
              <b>Product Title:</b> ${product_details.productTitle}<br>
              <b>Order Quantity:</b> ${order.quantity}<br>
              <b>Order Total:</b> $ ${order.total}<br>
              <b>Note to the seller:</b> '${order.special_instructions}'<br>
              If you have any questions you can reach me at: ${seller.email}.<br>
              Thanks<br>
              ${seller.display_name}
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
