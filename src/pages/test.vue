<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  // page properties go here
  data() {
    return {
      name: 'Shwetank',
    }
  },
}
</script>

<style>
.red {
  color: red;
}
</style>
