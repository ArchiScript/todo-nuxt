<template>
  <select v-model="filter" :class="$style.select">
    <option value="all">ALL</option>
    <option value="completed">COMPLETED</option>
    <option value="incomplete">IN PROCESS</option>
  </select>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
const store = useTodoStore()

const filter = computed({
  get: () => store.filter,
  set: (value) => store.updateFilter(value),
})
</script>

<style module>
.select {
  appearance: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #c3bdf0;
  background-color: #fff;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
}

.select:hover,
.select:focus {
  border-color: #6c63ff;
  outline: none;
}
</style>