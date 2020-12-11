<template>
  <div class="preferences-container">This is the preferences page!</div>
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
