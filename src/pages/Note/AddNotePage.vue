<script setup lang="ts">
import {ref} from "vue";
import  {useStore} from "vuex";
import {useRouter} from "vue-router";

const defaultValue = ref('')
const store = useStore()
const router = useRouter()

const handleOnInputChange = (event: any) => {
  defaultValue.value = event.target.value
}

const handleOnClickSubmit = () => {
  store.dispatch('addNote', {value: defaultValue.value, date: new Date().toLocaleDateString()})
  router.push({name: 'note'})
}

</script>

<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h2>Add Notes</h2>
      </div>
    </header>
    <textarea :value="defaultValue" @input="handleOnInputChange"></textarea>
    <div>
      <button @click="handleOnClickSubmit()">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: auto;
  width: 100%;
  max-width: 600px;
}

header {
  border-bottom: 1px var(--color-text) solid;
  padding: 4px;
}

textarea {
  resize: vertical;
  width: 100%;
  height: 150px;
  outline: none;
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 4px;
  padding: 8px;
}

button {
  cursor: pointer;
  height: 32px;
  border-radius: 4px;
  background-color: transparent;
  color: var(--color-text);
  outline: none;
  border: 1px var(--color-text) solid;
}
</style>
