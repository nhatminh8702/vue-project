<script setup lang="ts">
defineProps({
  title: String,
  button: String
})

const emit = defineEmits(['toggleModal', 'submit'])

const toggleModal = () => {
  emit('toggleModal')
}

const handleButtonClick = () => {
  emit('submit')
  toggleModal()
}
</script>

<template>
  <div class="formModalRoot">
    <div class="formContainer">
      <div class="title">{{ title }}</div>
      <div class="formContent"><slot></slot></div>
      <div class="formFooter">
        <button @click="handleButtonClick">{{ button }}</button>
        <button @click="toggleModal">cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formModalRoot {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
}
.formContainer {
  background-color: #242424;
  width: 500px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}
.formContent {
  flex: 1;
  padding-top: 8px;
}

.formFooter {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.title {
  border-bottom: 1px var(--color-text) solid;
}
</style>
