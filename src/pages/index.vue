<template>
  <div class="login-container">
    <div class="display-1">Thimbly</div>
    <SocialHead
      :title="landing.title"
      :description="landing.description"
      :image="landing.image"
    />
    <div class="message mx-10">
      Fastest way for artists and makers to start selling their products.
    </div>
    <div class="cta-message mx-10">Login to create your product page</div>
    <client-only placeholder="Loading...">
      <firebase-ui ref="firebaseui" />
    </client-only>
  </div>
</template>

<script>
  import FirebaseUI from "../components/FirebaseUI"
  import firebase from "firebase"
  import {mapGetters} from "vuex"
  import {hostServer, fireStorage} from "~/plugins/firebase.js"
  export default {
    components: {FirebaseUI},
    middleware: "router-auth",
    async asyncData(context) {},
    data() {
      return {
        landing: {
          title: "Welcome to Thimbly",
          description:
            "Fastest way for artists and makers to start selling their products.",
          image: hostServer + "/thimbly.jpg",
        },
      }
    },
    mounted() {
      this.initClientOnlyComp()
    },
    methods: {
      initClientOnlyComp(count = 20) {
        this.$nextTick(() => {
          if (this.$refs.firebaseui) {
            //...
          } else if (count > 0) {
            this.initClientOnlyComp(count - 1)
          }
        })
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
</style>
