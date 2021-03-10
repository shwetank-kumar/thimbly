<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-btn v-show="loggedIn" depressed v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="loggedInMenuAction(item)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import firebase from "firebase"
  export default {
    name: "Header",
    computed: {
      loggedIn() {
        return Boolean(this.$store.state.user)
      },
    },

    methods: {
      loggedInMenuAction(item) {
        if (item.text == "Setup Payments") {
          // console.log('Go to preferences page.')
          this.$router.push("/seller/setuppayment")
        } else if (item.text == "Create Product") {
          // console.log('Go to new product page.')
          this.$router.push("/seller/products/create")
        } else if (item.text == "Store") {
          // console.log('Go to store page.')
          this.$router.push("/seller/products")
        } else if (item.text == "Logout") {
          this.$store.dispatch("SIGNOUT")
          this.$router.push("/")
        }
      },
    },
    data() {
      return {
        // loggedIn: true,
        items: [
          {text: "Create Product", icon: "mdi-plus"},
          {text: "Store", icon: "mdi-home"},
          {text: "Setup Payments", icon: "mdi-currency-usd"},
          {text: "Logout", icon: "mdi-logout"},
        ],
        // closeOnClick: true,
      }
    },
  }
</script>

<style scoped></style>
