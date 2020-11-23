<template>
  <div class="login-container">
    <span class="message mx-10"
      >Fastest way for artists and makers to start selling their products.</span
    >
    <span class="cta-message mx-10">
      Login to create your first product page</span
    >
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
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    // ...mapMutations({
    //   loginUser: 'loginUser',
    // }),

    async loginWithGoogle() {
      var provider = new this.$fireModule.auth.GoogleAuthProvider()
      try {
        // var result = await firebase.auth().signInWithPopup(provider)
        var result = await this.$fire.auth.signInWithPopup(provider)
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        this.$store.commit('loginUser', user)
        //TODO: One connected to Firestore if someone has products then go to /store
        this.$router.push('/createlisting')
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // console.log(errorCode, errorMessage, email, credential)
      }
    },
  },
}
</script>

<style scoped>
.message {
  text-align: center;
}
.cta-message {
  text-align: center;
  padding-top: 100px;
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
