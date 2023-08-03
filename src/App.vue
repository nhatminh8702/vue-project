<script setup lang="ts">
import NotePage from './pages/Note/NotePage.vue'
</script>

<template>
  <main>
    <NotePage />
  </main>
</template>

<style scoped>
main {
  font-size: 16px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
}
</style>
