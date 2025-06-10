<template>
  <div :class="$style.container">
    <h1 :class="$style.title">TODO LIST</h1>

    <div :class="$style.topBar">
      <input
        v-model="search"
        :class="$style.input"
        placeholder="Search note..."
      />
      <TodoFilter />
      <ThemeToggle />
    </div>

    <div v-if="store.isEmpty" :class="$style.emptyState">
      <img
        src="/assets/images/Detective-check-footprint 1.svg"
        :class="$style.emptyImage"
        alt="Empty"
      />
      <p :class="$style.emptyText">Empty...</p>
    </div>

    <ul v-else :class="$style.todoList">
      <TodoItem
        v-for="todo in filtered"
        :key="todo.id"
        :todo="todo"
        @edit="startEdit"
      />
    </ul>

    <button :class="$style.addButton" @click="showForm = true">➕</button>
    <TodoForm 
      v-if="showForm"
      :initial="editTodo?.text ?? ''"
      @submit="add"
      @cancel="cancel"cel="showForm = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '~/stores/todoStore'
import TodoItem from '@/components/TodoItem.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoFilter from '@/components/TodoFilter.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import type { Todo } from '@/types/todo'

const store = useTodoStore()
const showForm = ref(false)
const search = ref('')
const editTodo = ref<Todo | null>(null)

function add(text: string) {
  if (editTodo.value) {
    store.updateTodo(editTodo.value.id, text)
    editTodo.value = null
  } else {
    store.addTodo(text)
  }
  showForm.value = false
}

const filtered = computed(() =>
  store.filteredTodos.filter(todo =>
    todo.text.toLowerCase().includes(search.value.toLowerCase())
  )
)

function startEdit(todo: Todo) {
  editTodo.value = todo
  showForm.value = true
}

function cancel() {
  editTodo.value = null
  showForm.value = false
}
</script>

<style module>
.container {
  max-width: 640px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
  position: relative;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.topBar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.input {
  flex-grow: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #c3bdf0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

.input:focus {
  border-color: #6c63ff;
}

.emptyState {
  text-align: center;
  margin-top: 3rem;
  color: #777;
}

.emptyImage {
  width: 130px;
  margin: 0 auto 1rem;
}

.emptyText {
  font-size: 1rem;
  color: #888;
}

.todoList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.addButton {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
}

.addButton:hover {
  background-color: #584ee4;
}
</style>
