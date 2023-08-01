<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  value: String,
  date: String
})
const emit = defineEmits(['onDelete', 'onEdit'])

const toggleEdit = ref(false)
const defaultValue = ref('')

const handleClickDeleteButton = () => {
  emit('onDelete')
}

const handleEdit = () => {
  emit('onEdit', defaultValue.value)
  toggleEdit.value = !toggleEdit.value
}

const handletoggleEdit = () => {
  toggleEdit.value = !toggleEdit.value
}

const handleValueChange = (event: any) => {
  defaultValue.value = event.target.value
}
</script>

<template lang="">
  <div class="card">
    <div v-if="toggleEdit">
      <textarea @input="handleValueChange" :value="value"></textarea>
    </div>
    <div v-else>
      <p class="main-text">{{ value }}</p>
    </div>
    <div class="footer">
      <p class="date">{{ date }}</p>
      <div v-if="toggleEdit" class="buttonGroups">
        <button @click="handletoggleEdit">Cancel</button>
        <button @click="handleEdit">Submit</button>
      </div>
      <div v-else class="buttonGroups">
        <button @click="handleClickDeleteButton">Delete</button>
        <button @click="handletoggleEdit">Edit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 1;
  background: #242424;
  border-radius: 4px;
  padding: 4px;
  min-width: 200px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-wrap;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
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
}
</style>
