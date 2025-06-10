<template>
    <button
      :class="$style.toggleBtn"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleTheme"
    >
      <span v-if="isDark">🌞</span>
      <span v-else>🌜</span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { useColorMode } from '@vueuse/core'
  
  const mode = useColorMode()
  const isDark = computed(() => mode.value === 'dark')
  
  function toggleTheme() {
    mode.value = isDark.value ? 'light' : 'dark'
  }
  </script>
  
  <style module>
  .toggleBtn {
    background: #6c63ff;
    border: none;
    border-radius: 8px;
    padding: 0.4rem 0.6rem;
    font-size: 1.2rem;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s;
  }
  
  .toggleBtn:hover {
    background-color: #5a52e0;
  }
  </style>