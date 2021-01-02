<template>
  <div class="d-flex mb-5 justify-center align-center">
    <img
      class="mt-5"
      @click="stripeConnect"
      src="~/assets/stripeConnect/blue/blue-on-dark.png"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { config } from '~/plugins/firebase.js'
export default {
  name: 'StripeSeller',
  methods: {
    async stripeConnect() {
      console.log(this.$store.state.user)
      console.log(config.apiUrl + '/thimbly-dev/us-central1/app/stripe')
      var res = await axios.get(
        config.apiUrl + '/thimbly-dev/us-central1/app/stripe'
      )
      console.log(res.data.url)
      window.location.href = res.data.url
    },
  },
}
</script>

<style lang="scss" scoped></style>
