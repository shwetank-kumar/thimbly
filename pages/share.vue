<template>
  <div class="share-container">This is the share page!</div>
</template>

<script>
export default {
  middleware: 'router-auth',
}
</script>

<style scoped>
.share-container {
  margin: 0 auto;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
