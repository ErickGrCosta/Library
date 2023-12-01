<template>
<div class="field">
  <label class="label">{{ title }}</label>
  <div class="control">
    <input 
      class="input" 
      :class="{ 'is-danger': !modelValue && useValidation}"
      :value="modelValue"
      @input="$emit(`update:modelValue`, $event.target.value )"
      type="text"
      >
  </div>
  <p v-show="!modelValue && useValidation" class="help is-danger">This field cannot be empty</p>
</div>
</template>

<script setup>
import { reactive} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Erick',
  },
  useValidation: {
    type: Boolean,
    default: true,
  },
  bookValue: {
    type: Number,
    default: 0,
  }
})

const emit = defineEmits(['update:modelValue'])

const state = reactive({
  hasText: false,
  color: 'is-danger'
})

</script>

<style scoped></style>
