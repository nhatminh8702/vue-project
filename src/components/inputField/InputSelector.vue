<script setup lang="ts">
import {computed, ref} from 'vue'
import IconDropDown from "@/components/icons/iconDropDown.vue";

const {listOption, value, placeHolder} = defineProps({listOption: [], value: String, placeHolder: String})
const emit = defineEmits(['on-option-change'])

const defaultValue = ref(value)
const toggleOption = ref(false)

const listOptionFiltered = computed(() => {
  return listOption.filter((option: any) => option.label !== defaultValue.value)
})

const handleToggleDropDown = () => {
  toggleOption.value = !toggleOption.value
}

const handleClickOption = (id: number) => {
  const _option = listOption.find((option: any) => option.id === id)
  defaultValue.value = _option.label
  emit('on-option-change', _option)
  handleToggleDropDown()
}
</script>

<template>
  <div class="input-selector">
    <div class="selector-display"
         @click="handleToggleDropDown"
         :style="[!toggleOption?'border-radius: 4px 4px 4px 4px;':'']">
      <p class="place-holder" v-if="!defaultValue">{{ placeHolder }}</p>
      {{ defaultValue }}
      <icon-drop-down/>
    </div>
    <div v-if="toggleOption" class="selector-list-option">
      <div class="option" v-for="option in listOptionFiltered" @click="handleClickOption(option.id)">{{
          option.label
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-selector {
  position: relative;
  outline: none;
  border: none;
  color: #222222;
}

.place-holder {
  color: grey;
}

.selector-display {
  min-width: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  background-color: white;
  color: #222222;
  padding: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.selector-list-option {
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 0 0 4px 4px;
}

.option:last-child {
  border-radius: 0 0 4px 4px;
}

.option {
  cursor: pointer;
  padding: 4px;
}

.option:hover {
  color: var(--color-text);
  background-color: #2c3e50;
}

</style>