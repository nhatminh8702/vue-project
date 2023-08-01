//Option Api
<!-- <script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount() {
      this.count = this.count + 1
    },
    subtractFormCount() {
      this.count = this.count - 1
    }
  },
}
</script> -->
//Composition Api
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const addToCount = () => {
  count.value = count.value + 1
}

const subtractFormCount = () => {
  count.value = count.value - 1
}
</script>
<template>
  <div>
    <h4>The current count is...</h4>
    <div>{{ count }}</div>
    <button @click="subtractFormCount">-</button>
    <button @click="addToCount">+</button>
  </div>
</template>

<style lang="en"></style>
