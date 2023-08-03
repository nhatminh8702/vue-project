<script setup lang="ts">
import { ref, watch } from 'vue'
import store from '../../store/index'
import NoteCardItem from '@/components/NoteComponent/NoteCardItem.vue'
import FormModal from '@/components/Modal/FormModal.vue'
import router from '@/router'

const showModal = ref(false)
const newNote = ref('')
const listNotes = ref(store.state.listNotes)
const uid = ref(listNotes.value.length + 1)

const handleClickAddNote = () => {
  router.push('note/add')
  //showModal.value = !showModal.value
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
  const index = listNotes.value.findIndex((note: any) => note.id === id)
  listNotes.value.splice(index, 1)
}

const handleEditNote = (id: number, value: string) => {
  const tempListNote = listNotes.value.map((note: any) => {
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

watch(listNotes.value, () => {
  store.commit('setListNotes', listNotes.value)
})
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
        @on-edit="(value: any) => handleEditNote(note.id, value)"
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
  max-width: 600px;
}

.cards-container {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
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
