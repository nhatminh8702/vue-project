<script setup lang="ts">
import {ref} from 'vue'

const {value, checked, date} = defineProps({
  value: String,
  checked: Boolean,
  date: String
})

const emit = defineEmits(['onDelete', 'onEdit', 'onDetail'])

const toggleEdit = ref(false)
const defaultValue = ref(value)

const handleToggleEdit = () => {
  toggleEdit.value = !toggleEdit.value
}

const handleValueChange = (event: any) => {
  defaultValue.value = event.target.value
}

const handle = (keyName: string) => {
  switch (keyName) {
    case 'onDetail': {
      emit('onDetail')
      break
    }
    case 'onDelete': {
      emit('onDelete')
      break
    }
    case 'onEdit': {
      emit('onEdit', defaultValue.value)
      toggleEdit.value = !toggleEdit.value
      break
    }
  }
}

</script>

<template>
  <div class="card">
    <div class="body-content">
      <div class="checked">
        <input type="checkbox" :checked="checked">
      </div>
      <div v-if="toggleEdit">
        <textarea @input="handleValueChange" :value="defaultValue"></textarea>
      </div>
      <div @click="handle('onDetail')" v-else>
        <p class="main-text">{{ value }}</p>
      </div>
    </div>
    <div class="footer">
      <p class="date">{{ date }}</p>
      <div v-if="toggleEdit" class="buttonGroups">
        <button @click="handleToggleEdit">Cancel</button>
        <button @click="handle('onEdit')">Submit</button>
      </div>
      <div v-else class="buttonGroups">
        <button @click="handle('onDelete')">Delete</button>
        <button @click="handleToggleEdit">Edit</button>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-wrap;
  cursor: pointer;
}

.body-content {
  display: flex;
  flex-direction: row;
  gap: 8px;
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
  -webkit-line-clamp: 2;
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
