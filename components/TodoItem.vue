<template>
  <div :class="$style.todoItem">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="store.toggleTodo(todo.id)"
    />
    <span
      :class="[$style.todoText, todo.completed ? $style.completed : '']"
    >
      {{ todo.text }}
    </span>
    <button :class="$style.iconBtn" @click="emit('edit', todo)">✏️</button>
    <button :class="$style.iconBtn" @click="store.removeTodo(todo.id)">🗑️</button>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import type { Todo } from '@/types/todo'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits(['edit'])
const store = useTodoStore()
</script>

<style module>
.todoItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #d6d6ff;
}

.todoText {
  font-weight: 600;
  transition: 0.3s ease;
}

.completed {
  text-decoration: line-through;
  color: #bbb;
}

.iconBtn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #6c63ff;
  padding: 0 4px;
  transition: 0.2s;
}

.iconBtn:hover {
  opacity: 0.7;
}
</style>