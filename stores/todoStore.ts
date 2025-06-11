import { defineStore } from 'pinia'
import type { Todo } from '@/types/todo'

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
    addTodo(text: string) {
      this.todos.push({ id: crypto.randomUUID(), text: text.toUpperCase(), completed: false })
    },
    removeTodo(id: string) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    toggleTodo(id: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.completed = !todo.completed
    },
    updateTodo(id: string, newText: string) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.text = newText.toUpperCase()
    },
    updateFilter(newFilter: 'all' | 'completed' | 'in-process') {
      this.filter = newFilter
    }
  }
})
