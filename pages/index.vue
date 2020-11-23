<template>
  <div class="login-container">
    <div class="display-1">Thimbly</div>
    <div class="message mx-10">
      Fastest way for artists and makers to start selling their products.
    </div>
    <div class="cta-message mx-10">Login to create your first product page</div>
    <div class="login-buttons">
      <button type="button" @click="loginWithGoogle()">
        <img src="~/assets/btn_google_signin_light_normal_web.png" />
      </button>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Logo'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
  layout: 'loggedout_default',
  computed: {
    // Map `auth` state to a local property so we can access it locally.
    ...mapGetters(['auth']),
  },
  watch: {
    auth(value) {
      // Redirect the user to the home page once user is authenticated.
      // We know user is authenticated if `auth` contains a value, which
      // is automatically updated when user's state changes.
      // @see actions.setAuth in store/index.js
      // @see plugins/firebase.js
      //TODO: One connected to Firestore if someone has products then go to /store
      //     this.$router.push('/createlisting')
      if (value) {
        this.$router.push({
          path: '/createlisting',
        })
      }
    },
  },
  methods: {
    async loginWithGoogle() {
      var provider = new this.$firebase.auth.GoogleAuthProvider()
      // Trigger authentication when user submits the form.
      try {
        var result = await this.$firebase.auth().signInWithPopup(provider)
      } catch (error) {
        alert(error.message)
      }
    },
  },
}
</script>

<style scoped>
.message {
  text-align: center;
  padding-top: 40px;
}
.cta-message {
  text-align: center;
  padding-top: 80px;
}
.login-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-buttons {
  padding-top: 10px;
}
</style>
