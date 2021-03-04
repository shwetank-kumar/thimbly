<template>
  <div class="login-container">
    <div class="display-2 mt-5">Thimbly</div>
    <SocialHead
      :title="landing.title"
      :description="landing.description"
      :image="landing.image"
    />
    <div class="text-body-1 mt-5 text-center">
      Sell online quickly. No website needed.
    </div>
    <div class="text-body-1 mt-5 mx-3 text-center">
      Share your product and collect payments in 3 easy steps.
    </div>
    <div class="text-body-1 mt-9">We are in beta. Request an invite link.</div>
    <v-col cols="12">
      <v-form v-model="enabled" ref="form">
        <v-text-field
          outlined
          dense
          name="Email"
          label="Email"
          placeholder="seller@thimbly.io"
          :rules="rules.isRequired.concat(rules.isEmail)"
          v-model="beta_request_email"
        ></v-text-field>
      </v-form>
      <v-btn color="primary" width="100%" @click="submit" :disabled="!enabled"
        >Request an invite</v-btn
      >
    </v-col>
    <p class="text-center">{{ this.message }}</p>
    <v-img class="mt-3" :src="landing.image"></v-img>
  </div>
</template>

<script>
  import FirebaseUI from "../components/FirebaseUI"
  import firebase from "firebase"
  import {mapGetters} from "vuex"
  import {hostServer, fireStorage} from "~/plugins/firebase.js"
  import {isRequired, isEmail} from "@/plugins/validation.js"
  import {fireDb} from "~/plugins/firebase.js"
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
          image: hostServer + "/landing.jpg",
        },
        beta_request_email: null,
        enabled: false,
        rules: {isRequired, isEmail},
        message: null,
      }
    },
    methods: {
      async submit() {
        fireDb.collection("beta_requests")
        var invite_exists = await fireDb
          .collection("beta_requests")
          .where("email", "==", this.beta_request_email)
          .get()
        if (invite_exists.docs.length < 1) {
          try {
            var beta_request = {email: this.beta_request_email, enabled: false}
            var beta_requests_ref = fireDb.collection("beta_requests").doc()
            await beta_requests_ref.set(beta_request)
          } catch (error) {
            this.message =
              "Something went wrong please email us at hello@thimbly.io."
          }
        }
        this.beta_request_email = null
        this.$refs.form.resetValidation()
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
