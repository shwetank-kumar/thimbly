<template>
  <div>
    <v-menu class="preferences-menu" v-if="user">
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed v-bind="attrs" v-on="on">
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
import { mapGetters } from 'vuex'
export default {
  name: 'LoggediInMenu',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    loggedInMenuAction(item) {
      if (item.text == 'Preferences') {
        console.log('Go to preferences page.')
        this.$router.push('/preference')
      } else if (item.text == 'New Listing') {
        console.log('Go to createlisting page.')
        this.$router.push('/createlisting')
      } else if (item.text == 'Share') {
        console.log('Go to share page.')
        this.$router.push('/share')
      } else if (item.text == 'Store') {
        console.log('Go to store page.')
        this.$router.push('/store')
      } else if (item.text == 'Logout') {
        console.log('Logout.')
      }
    },
  },
  data() {
    return {
      items: [
        { text: 'Preferences', icon: 'mdi-account-settings' },
        { text: 'New Listing', icon: 'mdi-plus' },
        { text: 'Share', icon: 'mdi-share-variant' },
        { text: 'Store', icon: 'mdi-home' },
        { text: 'Logout', icon: 'mdi-logout' },
      ],
      closeOnClick: true,
    }
  },
}
</script>

<style scoped></style>
