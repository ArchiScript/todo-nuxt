import { defineStore } from 'pinia'
import type { Todo } from '@/types/todo'
import { onMounted } from 'vue'


export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as 'all' | 'completed' | 'in-process'
  }),
  getters: {
    filteredTodos(state): Todo[] {
      if (state.filter === 'completed') return state.todos.filter(t => t.completed)
      if (state.filter === 'in-process') return state.todos.filter(t => !t.completed)
      return state.todos
    },
    isEmpty(): boolean {
      return this.filteredTodos.length === 0
    }
  },
  actions: {
    loadFromStorage() {
      if (import.meta.client) {
        try {
          const data = localStorage.getItem('todos')
          this.todos = data ? JSON.parse(data) : []
        } catch {
          this.todos = []
        }
        try {
          const filter = localStorage.getItem('todos-filter')
          this.filter =
            filter === 'all' || filter === 'completed' || filter === 'in-process'
              ? filter
              : 'all'
        } catch {
          this.filter = 'all'
        }
      }
    },
    addTodo(text: string) {
      this.todos.push({ id: crypto.randomUUID(), text: text.toUpperCase(), completed: false })
      this.saveTodos()
    },
    removeTodo(id: string) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.saveTodos()
    },
    toggleTodo(id: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.completed = !todo.completed
      this.saveTodos()
    },
    updateTodo(id: string, newText: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.text = newText.toUpperCase()
      this.saveTodos()
    },
    updateFilter(newFilter: 'all' | 'completed' | 'in-process') {
      this.filter = newFilter
      if (import.meta.client) {
        localStorage.setItem('todos-filter', newFilter)
      }
    },
     saveTodos() {
      if (import.meta.client) {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    }
  },

})
