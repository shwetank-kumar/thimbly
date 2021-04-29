const functions = require("firebase-functions")
const { Nuxt } = require("nuxt")
const express = require("express")
const cors = require("cors")
const Stripe = require("stripe")
// const { devConfig } = require('./config/devconfig')
// const {prodConfig} = require('./config/prodconfig')

// const nuxtConfig = require('../src/nuxt.config.js')
// const config = devConfig
// const config = prodConfig
const hostServer = "https://thimbly-dev.web.app"
const stripeKey = functions.config().stripe.key
// console.log("stripeKey1:", functions.config())
// console.log(hostServer, "test:", stripeKey)
// console.log(process.env)
// console.log("stripeKey2:",process.env.stripeKey)

const app = express()
const stripe = Stripe(stripeKey)
app.use(cors({origin: true}))

// Get user ip address
app.get("/ip", async (req, res) => {
  res.send(
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "127.0.0.1"
  )
})

// Get card payment intent
app.get("/payment", async (req, res) => {
  try {

    const payment_intent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: Math.round(req.query.amount * 100 * 0.95),
      application_fee_amount: Math.round(req.query.amount * 100 * 0.05),
      currency: "usd",
      transfer_data: {
        destination: req.query.stripe_id,
      },
    })
    res.send(payment_intent.client_secret)
  } catch (error) {
    res.send(error)
    throw error
  }
})

// READ Stripe account
app.get("/stripe", async (req, res) => {
  try {

    const bank_account = await stripe.accounts.listExternalAccounts(
      req.query.stripe_id,
      { object: "bank_account", limit: 1 }
    )
    bank_account_info = {
      holder_name: bank_account.data[0].account_holder_name,
      bank_name: bank_account.data[0].bank_name,
      bank_account_last4: bank_account.data[0].last4,
    }
    res.send(bank_account_info)
  } catch (error) {
    res.send(error)
    throw error
  }
})

// CREATE Stripe account
app.post("/stripe", async (req, res) => {
  try {

    const account_creation_data = req.body
    const account_links = await stripe.accounts.create(account_creation_data)
    res.send(account_links)
  } catch (error) {
    res.send(error)
    throw error
  }
})

// DELETE Stripe account
app.delete("/stripe", async (req, res) => {
  try {

    const deleted = await stripe.accounts.del(req.query.stripe_id)
    res.send(deleted)
  } catch (error) {
    res.send(error)
    throw error
  }
})

// SSR Pages
const nuxtConfig = {
  dev: false,
  buildDir: "nuxt",
  build: {
    // publicPath: '/',
  },
}
const nuxt = new Nuxt(nuxtConfig)

// SSR function
app.get("*", async (req, res) => {
  res.set("Cache-Control", "public, max-age=600, s-maxage=1200")
  await nuxt.ready()
  nuxt
    .renderRoute(req.path)
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      console.log(e), res.send(e)
    })
})

exports.app = functions.https.onRequest(app)
