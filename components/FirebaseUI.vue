<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
<script>
import { fireAuth, authProviders } from '~/plugins/firebase'
export default {
  name: 'FirebaseUI',
  mounted: function () {
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(fireAuth)
      const config = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [authProviders.Google, authProviders.Facebook],
        signInFlow: 'popup',
        tosUrl: '/tos',
        privacyPolicyUrl: '/privacy',
        callbacks: {
          signInSuccessWithAuthResult: this.signInResult,
        },
      }
      ui.disableAutoSignIn()
      if (this.$store.state.user) {
        this.openAppPage()
      } else {
        ui.start('#firebaseui-auth-container', config)
      }
    }
  },
  methods: {
    signInResult() {
      this.openAppPage()
      return false
    },
    openAppPage() {
      this.$router.push({
        path: '/createlisting',
      })
    },
  },
}
</script>
<style></style>
