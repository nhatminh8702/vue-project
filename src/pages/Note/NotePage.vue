<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useStore} from 'vuex'
import NoteCardItem from '@/components/NoteComponent/NoteCardItem.vue'
import {useRouter} from 'vue-router'
import SearchBar from "@/components/inputField/SearchBar.vue";
import InputSelector from "@/components/inputField/InputSelector.vue";

const listOptions = [{id: 1, label: 'All'}, {id: 2, label: 'Completed'}, {id: 3, label: 'On-Going'}]

const store = useStore()
const listNotes = computed(() => store.getters.getListNotes)
const router = useRouter()
const searchValue = ref('')
const status = ref(listOptions[0])

const filteredListNote = computed(() => {
  if (status.value.id === 2) {
    return listNotes.value.filter((note: any) => note.value.includes(searchValue.value) && note.checked)
  }
  if (status.value.id === 3) {
    return listNotes.value.filter((note: any) => note.value.includes(searchValue.value) && !note.checked)
  }
  return listNotes.value.filter((note: any) => note.value.includes(searchValue.value))
})

const handleRouting = (keyName: string, value?: any) => {
  switch (keyName) {
    case 'note-add': {
      router.push({name: 'note-add'})
      break
    }
    case 'note-detail': {
      router.push({name: 'note-detail', params: {id: value}})
      break
    }
  }
}

const handleDeleteNote = (id: number) => {
  store.dispatch('deleteNote', id)
  store.dispatch('getListNote')
}

const handleValueChange = (keyName: String, value: any) => {
  switch (keyName) {
    case 'searchValue': {
      searchValue.value = value
      break;
    }
    case 'statusValue': {
      status.value = value
      break;
    }
  }
}

const handleCheckNote = (id: number) => {
  const note = listNotes.value.find((note: any) => note.id === id)
  store.dispatch('updateNote', {...note,checked: !note.checked, })
  store.dispatch('getListNote')
}

watch(listNotes.value, () => {
  store.commit('setListNotes', listNotes.value)
})

onMounted(() => {
  store.dispatch('getListNote')
})

</script>

<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h2>Notes</h2>
        <button @click="handleRouting('note-add')">+ Add Note</button>
      </div>
      <div class="header-util">
        <SearchBar
            :value="searchValue"
            @onSearch="(value)=>handleValueChange('searchValue', value)"
        />
        <InputSelector
            @on-option-change="(value:any)=>handleValueChange('statusValue', value)"
            :place-holder="'select status...'"
            :value="status.label"
            :listOption="listOptions"
        />
      </div>
    </header>
    <div class="cards-container">
      <NoteCardItem
          v-for="note in filteredListNote"
          :value="note.value"
          :date="note.date"
          :checked="note.checked"
          :key="note.id"
          @on-delete="() => handleDeleteNote(note.id)"
          @on-detail="() => handleRouting('note-detail', note.id)"
          @on-check="() => handleCheckNote(note.id)"
      />
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
  position: relative;
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
  border-bottom: 1px var(--color-text) solid;
  padding: 4px;
}

.header-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.header-util {
  display: flex;
  flex-direction: row;
  gap: 8px;

  :first-child {
    flex: 1;
  }
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
