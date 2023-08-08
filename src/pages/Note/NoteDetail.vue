<script setup lang="ts">
import { useStore } from 'vuex'
import {computed, ref} from "vue";

const {id} = defineProps({id: String})

const store = useStore()
const noteValue = computed(()=> store.getters.getNoteDetail(id)).value.value
const noteDate = computed(()=> store.getters.getNoteDetail(id)).value.date
const toggleEdit = ref(false)
const textAreaValue = ref(noteValue)

const handle = (keyName: String, value?: any) => {
  switch (keyName) {
    case 'toggleEdit': {
      toggleEdit.value = !toggleEdit.value
      break
    }
    case 'textArea': {
      textAreaValue.value = value
      break
    }
    case 'onSubmit': {
      const note = {
        id: id,
        value: noteValue,
        date: noteDate
      }
      store.dispatch('updateNote',note)
      toggleEdit.value = !toggleEdit.value
      break
    }
  }
}


</script>

<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h2>Notes</h2>

      </div>
      <div class="footer">
        <div class="date">Created: {{noteDate }}</div>
        <div v-if="toggleEdit" class="buttonGroups">
          <button @click="handle('toggleEdit')">Cancel</button>
          <button @click="handle('onSubmit')">Submit</button>
        </div>
        <div v-else class="buttonGroups">
          <button @click="handle('toggleEdit')">Edit</button>
        </div>
      </div>
    </header>
    <div class="cards-container">
      <div v-if="toggleEdit">
        <textarea @input="(event)=>handle('textArea', event.target.value)" :value="noteValue"></textarea>
      </div>
      <p class="content" v-else> {{ noteValue }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  max-width: 600px;
}

header {
  border-bottom: 1px var(--color-text) solid;
  padding: 4px;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.buttonGroups button {
  cursor: pointer;
  color: var(--color-text);
  background-color: #242424;
  outline: none;
  border: 1px var(--color-text) solid;
  border-radius: 2px;
  margin-right: 4px;
}

textarea {
  resize: vertical;
  width: 100%;
  height: 150px;
  outline: none;
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 4px;
}

.cards-container {
  padding: 4px;
}
</style>