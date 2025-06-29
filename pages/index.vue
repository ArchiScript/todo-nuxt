<template>
  <div v-if="store.loading"  :class="$style.loaderWrapper">
    <Loader v-if="store.loading" :class="$style.loader" />
  </div>
  <div :class="$style.container">
    <h1 :class="$style.title">TODO LIST</h1>

    <div :class="$style.topBar">
      <div :class="$style.inputWrapper">
      <input
        v-model="search"
        :class="$style.input"
        placeholder="Search note..."
      />
      <Search :class="[$style.searchIcon, isDark ? $style.dark : '']" />
      
      </div>
      <!-- <TodoFilter /> -->
       <TodoFilter
          v-model="store.filter"
          :options="[
            { value: 'all', label: 'ALL' },
            { value: 'completed', label: 'COMPLETED' },
            { value: 'in-process', label: 'IN PROCESS' }
          ]"
        />
      <ThemeToggle />
    </div>

    <div v-if="store.isEmpty" :class="$style.emptyState">
      <EmptyImage v-if="!isDark" :class="$style.emptyImage" />
      <EmptyImageDark v-else :class="$style.emptyImage" />
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
    <div :class="$style.addButtonContainer">
       <button :class="$style.addButton" @click="showForm = true"><span :class="$style.addIcon"></span></button>
    </div>
   
    
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
import  Loader  from '@/components/Loader.vue'
import type { Todo } from '@/types/todo'
import EmptyImage from '@/components/svg/EmptyImage.vue'
import EmptyImageDark from '@/components/svg/EmptyImageDark.vue'
import Search from '@/components/svg/Search.vue'
import { useColorMode } from '@vueuse/core'

const store = useTodoStore()


onMounted(() => {
  store.fetchTodos()
})
const showForm = ref(false)
const search = ref('')
const editTodo = ref<Todo | null>(null)

const mode = useColorMode()
const isDark = computed(() => mode.value === 'dark')


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
  todo?.text.toLowerCase().includes((search?.value ?? '').toLowerCase())
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
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 750px;
  margin: 2rem auto;
  font-family: 'Kanit', 'Inter', Arial;
  position: relative;
  height: 100px;
  min-height: 100vh;
}
.loaderWrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
}
.title {
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 1rem;
}

.topBar {
  display: flex;
  max-width: 100%;
  gap: 16px;
  align-items: center;
  margin-bottom: 1.5rem;
}

.input {
  flex-grow: 1;
  padding: 11px 40px 11px 16px;
  border: 1px solid #c3bdf0;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  position: relative;
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
  width: 221px;
  margin: 0 auto 1rem;
}

.emptyText {
  font-size: 20px;
  color: #888;
}

.todoList {
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.addButtonContainer{
  width: 750px;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
}
.addButton {
  position: absolute;
  bottom: 2rem;
  right: 0;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
.inputWrapper {
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
}
.searchIcon {
  height: 20px;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  color:var(--primary-color);
}
.searchIcon.dark {
  color: #fff;
}
.addIcon{
  position: relative;
  width: 3px;
  height: 24px;
 background-color: #fff;
 border-radius: 2px;
}
.addIcon::before{
  content: '';
  position: absolute;
  width: 24px;
  height: 3px;
  background-color: #fff;
  top: 50%;
  left: -11px;
  transform: translateY(-50%);
  border-radius: 2px;
}

</style>
