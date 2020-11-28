<template>
  <div class="createlisting-container">This is the preferences page!</div>
</template>

<script>
export default {
  middleware: 'router-auth',
}
</script>

<style scoped>
.createlisting-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
