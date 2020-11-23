<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <LoggedInMenu />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Thimbly',
    }
  },
}
</script>

<style scoped>
.preferences-menu {
  justify-content: right;
}
</style>
