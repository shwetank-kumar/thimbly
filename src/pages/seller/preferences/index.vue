<template>
  <div>
    <h2 class="text-center">Preferences</h2>
    <v-card outlined class="my-2 rounded-lg">
      <v-card-title>Payment Details</v-card-title>
      <stripe-seller></stripe-seller>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'router-auth',
}
</script>

<style scoped>
.preferences-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
