//Composition Api
<script setup lang="ts">
import NoteComponent from './components/NoteComponent/NoteComponent.vue'
</script>

<template>
  <main>
    <NoteComponent />
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
