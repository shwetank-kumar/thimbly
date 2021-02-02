<template>
  <div> 
    <v-menu right class="preferences-menu">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="loggedIn" depressed v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="loggedInMenuAction(item)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Header',
  // computed: {
  //   loggedIn () {
  //     return Boolean(this.$store.state.user)
  //   }
  // },
  // Should ideally be done through a computed property but thats causing an error in DOM mismatching
  // between server and client in SSR
  mounted() {
    this.loggedIn = Boolean(this.$store.state.user)
  },
  methods: {
    loggedInMenuAction(item) {
      if (item.text == 'Setup Payments') {
        // console.log('Go to preferences page.')
        this.$router.push('/seller/setuppayment')
      } else if (item.text == 'Create Product') {
        // console.log('Go to new product page.')
        this.$router.push('/seller/products/create')
      } else if (item.text == 'Store') {
        // console.log('Go to store page.')
        this.$router.push('/seller/products')
      } else if (item.text == 'Logout') {
        this.$store.dispatch('SIGNOUT')
        this.$router.push('/')
      }
    },
  },
  data() {
    return {
      loggedIn: true,
      items: [
        { text: 'Create Product', icon: 'mdi-plus' },
        { text: 'Store', icon: 'mdi-home' },
        { text: 'Setup Payments', icon: 'mdi-currency-usd' },
        { text: 'Logout', icon: 'mdi-logout' },
      ],
      closeOnClick: true,
    }
  },
}
</script>

<style scoped></style>
