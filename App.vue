<script setup lang="ts">
import Progress from './components/progress/Progress.vue';
</script>

<template>
  <div class="container">
    <Progress />
  </div>
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
