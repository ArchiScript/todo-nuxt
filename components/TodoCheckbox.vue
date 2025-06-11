<template>

    <div :class="$style.todoCheckbox">
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

