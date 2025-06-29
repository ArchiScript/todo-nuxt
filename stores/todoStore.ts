import { defineStore } from 'pinia'
import type { Todo, CreateTodo, PatchTodo } from '@/types/todo'
import { todosService } from '~/lib/feathersClient'
import { todosSocketService } from '~/lib/feathersSocket.client'
import type { ServiceMethods } from '~/types/feathersService'
import { onMounted } from 'vue'



export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    testTodos: [] as Todo[],
    filter: 'all' as 'all' | 'completed' | 'in-process',
    loading: false as boolean
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
    async fetchTodos() {
      this.loading = true
      const response = await todosSocketService.find()
      console.log('Fetched test todos:', response)
      this.todos = Array.isArray(response.data) ? response.data : [response.data]
      this.loading = false
    },
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
   async addTodo(text: string) {
    this.loading = true
      const newPaginatedTodo =  await todosService.create({ text: text.toUpperCase(), completed: false } )
      this.todos.push(newPaginatedTodo)
      this.loading = false
    },

    async removeTodo(id: string) {
      this.loading = true
      this.todos = this.todos.filter(todo => todo.id !== id)
      await todosService.remove(id)
      this.loading = false
    },

   async toggleTodo(id: string) {
      this.loading = true
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.completed = !todo.completed
     await todosService.patch(id, { completed: todo?.completed } as PatchTodo)
      this.loading = false
    },

   async updateTodo(id: string, newText: string) {
      this.loading = true
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.text = newText.toUpperCase()
     await todosService.patch(id, { text: newText.toUpperCase() } as PatchTodo)
      this.loading = false
    },

   async updateFilter(newFilter: 'all' | 'completed' | 'in-process') {
      this.filter = newFilter
      if (import.meta.client) {
        localStorage.setItem('todos-filter', newFilter)
      }
    },
     saveTodosLocal() {
      if (import.meta.client) {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    }


  },

})
