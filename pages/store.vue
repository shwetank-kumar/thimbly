<template>
  <div>
    <h4>Welcome {{ user.username }}!</h4>
    <div class="store-container">This is the store page!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['user']),
  },
}
</script>

<style scoped>
.store-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
