<script setup lang="ts">
import {ref} from 'vue'

const {value, checked, date} = defineProps({
  value: String,
  checked: Boolean,
  date: String
})

const emit = defineEmits(['onDelete', 'onEdit', 'onDetail', 'onCheck'])
const defaultValue = ref(value)

const handleValueChange = (keyName: String, event: any) => {
  if (keyName === 'value') {
    defaultValue.value = event.target.value
  }
  if (keyName === 'checked') {
    emit('onCheck', !checked)
  }
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
    case 'onCheck': {
      emit('onCheck', !checked)
      break
    }
  }
}

</script>

<template>
  <div class="card">
    <div class="body-content">
      <div class="checked">
        <input type="checkbox" @input="handleValueChange('checked')" :checked="checked">
      </div>
      <div class="main-text" @click="handle('onDetail')" >
        {{ value }}
      </div>
    </div>
    <div class="footer">
      <p class="date">{{ date }}</p>
      <div class="buttonGroups">
        <button @click="handle('onDelete')">Delete</button>
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
}

.body-content {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.main-text {
  flex: 1;
  cursor: pointer;
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
