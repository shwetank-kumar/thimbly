<template>
  <div class="login-container">
    <div class="display-1">Thimbly</div>
    <div class="message mx-10">
      Fastest way for artists and makers to start selling their products.
    </div>
    <div class="cta-message mx-10">Login to create your first product page</div>
    <firebase-ui />
  </div>
</template>

<script>
import FirebaseUI from '../components/FirebaseUI'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
  layout: 'loggedout_default',
  components: { FirebaseUI },
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
</style>
