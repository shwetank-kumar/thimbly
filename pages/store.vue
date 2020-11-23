<template>
  <div class="createlisting-container">This is the store page!</div>
</template>

<script>
export default {
  middleware: 'authenticate',
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
