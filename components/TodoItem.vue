<template>
  <div :class="$style.todoItem">
    <div :class="$style.checkboxWrapper">
      <input
      type="checkbox"
      :checked="todo.completed"
      @change="store.toggleTodo(todo.id)"
      :class="$style.todoCheckbox"
    />
    <span
      :class="[$style.todoText, todo.completed ? $style.completed : '']"
    >
      {{ todo.text }}
    </span>
    </div>
    <div :class="$style.btnWrapper">
      <button :class="$style.iconBtn" @click="emit('edit', todo)"><Pencil/></button>
    <button :class="$style.iconBtn" @click="store.removeTodo(todo.id)"><Trash/></button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import type { Todo } from '@/types/todo'
import Pencil from '@/components/svg/Pencil.vue'
import Trash from '@/components/svg/Trash.vue'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits(['edit'])
const store = useTodoStore()
</script>

<style module>
.todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #d6d6ff;
  width: 520px;
}

.btnWrapper {
  display: flex;
  gap: 0.5rem;
}

.checkboxWrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 10px
}
.todoText {
  font-weight: 500;
  font-size: 20px;
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
  color: #CDCDCD;
  padding: 0 4px;
  transition: 0.2s;
}

.iconBtn:hover {
  opacity: 0.7;
}
.todoCheckbox {
  appearance: none;
  -webkit-appearance: none;
  width: 26px;
  height: 26px;
  border: 1px solid #6c63ff;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
  outline: none;
  vertical-align: middle;
  margin-right: 8px;
}

.todoCheckbox:checked {
  background: var(--primary-color);
  border-color: #6c63ff;
}

.todoCheckbox:checked::after {
  content: '';
  position: absolute;
  left: 10px;
  top: 3px;
  width: 5px;
  height: 13px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  border-radius: 2px;
  transform: rotate(45deg);
  display: block;
}
</style>