<script setup lang="ts">
import {ref} from "vue";
import iconSearch from '@/components/icons/iconSearch.vue'

const emit = defineEmits(['onSearch'])
const {value} = defineProps({
  value: String,
})

const defaultValue = ref(value)
const handleInputChange = (event: any) => {
  defaultValue.value = event.target.value
}

const handleClickSubmit = () => {
  emit('onSearch', defaultValue.value)
}

</script>
<template>
  <div class="search-bar">
    <input type="text" @input="handleInputChange" :value="defaultValue">
    <icon-search @click="handleClickSubmit"/>
  </div>
</template>
<style>
.search-bar {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

input {
  flex: 1;
  outline: none;
  border: none;
}

svg {
  cursor: pointer;
}


</style>