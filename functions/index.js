const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
// const nuxtConfig = require('../src/nuxt.config.js')
const app = express()

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    // publicPath: '/',
  },
}
const nuxt = new Nuxt(config)

const handleRequest = async (req, res) => {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.ready()
  console.log(req.path)
  nuxt
    .renderRoute(req.path)
    .then((result) => {
      res.send(result.html)
    })
    .catch((e) => {
      console.log(e), res.send(e)
    })
}

app.get('*', handleRequest)
exports.ssrapp = functions.https.onRequest(app)
