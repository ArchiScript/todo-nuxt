<template>
  <div :class="$style.modal">
    <div :class="[$style.dialog, isDark ? $style.dark : '']">
      <h2 :class="[$style.title, isDark ? $style.titleLight : '']">NEW NOTE</h2>
      <input
        :class="$style.input"
        type="text"
        v-model="noteText"
        placeholder="Input your note..."
      />
      <div :class="$style.btnRow">
        <button :class="[$style.btnCancel, isDark ? $style.btnCancelDark : '']" @click="$emit('cancel')">CANCEL</button>
        <button :class="$style.btnApply" @click="submitNote">APPLY</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
const isDark = computed(() => mode.value === 'dark')

const emit = defineEmits(['submit', 'cancel'])
const noteText = ref('')

function submitNote() {
  if (!noteText.value.trim()) return
  emit('submit', noteText.value.trim())
  noteText.value = ''
}
</script>

<style module>
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  
}

.dialog {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1.25rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.dark {
  background-color: #252525;
  color: #f0f0f0;
  border: 1px solid white;
}

.title {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
}
.titleLight{
  color: #f0f0f0;
}

.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease;
}

.input:focus {
  border-color: #6c63ff;
}

.btnRow {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btnCancel,
.btnApply {
  padding: 0.5rem 1.4rem;
  font-weight: 600;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.btnCancel {
  background-color: white;
  color: #6c63ff;
  border-color: #6c63ff;
}
.btnCancelDark{
  background-color: transparent;
}

.btnCancel:hover {
  background-color: #f0f0ff;
}

.btnApply {
  background-color: #6c63ff;
  color: white;
}

.btnApply:hover {
  background-color: #584ee4;
}
</style>
