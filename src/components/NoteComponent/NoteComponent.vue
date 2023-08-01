<script setup lang="ts">
import { ref } from 'vue'
import NoteCardItem from './NoteCardItem.vue'
import FormModal from '../Modal/FormModal.vue'

const showModal = ref(false)
const newNote = ref('')
const listNotes = ref([
  { id: 1, value: 'asdasdassadsdasdasdasdsadsda', date: '9/7/2022' },
  { id: 2, value: 'asdasdassadsdasdasdasdsadsda', date: '9/7/2022' }
])
const uid = ref(listNotes.value.length + 1)

const handleClickAddNote = () => {
  showModal.value = !showModal.value
}

const handleAddNotes = () => {
  listNotes.value.push({
    id: uid.value,
    value: newNote.value,
    date: new Date().toLocaleDateString()
  })
  uid.value = uid.value + 1
  newNote.value = ''
}

const handleNewNoteChange = (event: any) => {
  newNote.value = event.target.value
}

const handleDeleteNote = (id: number) => {
  listNotes.value = listNotes.value.filter((note) => note.id !== id)
}

const handleEditNote = (id: number, value: string) => {
  const tempListNote = listNotes.value.map((note) => {
    if (note.id === id) {
      return {
        id: note.id,
        value,
        date: new Date().toLocaleDateString()
      }
    } else {
      return note
    }
  })
  listNotes.value = tempListNote
}
</script>

<template>
  <div class="container">
    <header>
      <h2>Notes</h2>
      <button @click="handleClickAddNote">+ Add Note</button>
    </header>
    <div class="cards-container">
      <NoteCardItem
        v-for="note in listNotes"
        :value="note.value"
        :date="note.date"
        :key="note.id"
        @on-delete="() => handleDeleteNote(note.id)"
        @on-edit="(value) => handleEditNote(note.id, value)"
      />
    </div>
    <div v-if="showModal">
      <FormModal
        title="Add New Note"
        button="submit"
        @toggle-modal="handleClickAddNote"
        @submit="handleAddNotes"
      >
        <textarea @input="handleNewNoteChange" :value="newNote"></textarea>
      </FormModal>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
}

.cards-container {
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
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

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  border-bottom: 1px var(--color-text) solid;
  padding: 4px;
}

h2 {
  flex: 1;
}
textarea {
  resize: vertical;
  width: 100%;
  height: 200px;
  outline: none;
}
</style>
