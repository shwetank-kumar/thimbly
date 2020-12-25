<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'loggedout_default',
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
