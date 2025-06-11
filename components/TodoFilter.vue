<template>
  <div :class="$style.wrapper" @click="toggle">
    <div :class="$style.selected">
      <span :class="$style.text"> {{ selectedLabel }}</span>
     
      <span :class="$style.arrow" :data-open="open"></span>
    </div>
    <ul v-if="open" :class="$style.dropdown">
      <li
        v-for="option in options"
        :key="option.value"
        :class="[$style.option, { [$style.active]: option.value === modelValue }]"
        @click.stop="select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {onClickOutside} from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: { value: string; label: string }[]
}>(), {
  modelValue: 'all',
  options: () => []
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const wrapper = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}
function select(value: string) {
  emit('update:modelValue', value)
  open.value = false
}
const selectedLabel = computed(() => {
  const found = props.options.find(opt => opt.value === props.modelValue)
  return found ? found.label : ''
})

// Закрытие по клику вне
onClickOutside(wrapper, () => (open.value = false))
</script>

<style module>
.wrapper {
  position: relative;
  min-width: 100px;
  user-select: none;
}
.selected {
  background: var(--primary-color, #6c63ff);
  color: #fff;
  padding: 7px 7px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
}
.arrow {
  margin:10px;
  transition: transform 0.2s; 
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
}
/* .arrow::before{
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
} */
.arrow[data-open="true"] {
  transform: rotate(225deg);
}
.dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: var(--dropdown-bg, #fff);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  z-index: 10;
  margin: 0;
  padding: 4px 0;
  list-style: none;
}
.option {
  padding: 10px 16px;
  position: relative;
  cursor: pointer;
  color: var(--primary-color, #6c63ff);
  border-radius: 5px;
  transition: background 0.15s;
  font-size: 12px;
}
.dropdown>li:not(.dropdown>li:last-child):after{
  content: '';
  position: absolute;
  bottom:0;
  height: 1px;
  width: 80%;
  background-color:rgba(21, 21, 21, 0.102);
  left: 10%;
}
.option:hover,
.active {
  background: var(--primary-color, #6c63ff);
  color: #fff;
}
</style>