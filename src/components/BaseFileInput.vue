<script setup>
import { inject } from 'vue'

const { attachmentText } = inject('signup')

const props = defineProps({
  modelValue: {
    type: [File, Array],
    default: null
  },
  required: Boolean,
  multiple: Boolean,
  accept: {
    type: String,
    default: 'application/pdf'
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  const files = Array.from(event.target.files)

  if (!props.multiple) {
    emit('update:modelValue', files[0] ?? null)
    return
  }

  const current = Array.isArray(props.modelValue)
    ? props.modelValue
    : []

  emit('update:modelValue', [...current, ...files])
  event.target.value = ''
}
</script>


<template>
  <p>{{ attachmentText }}</p>
  <div class="input-wrapper">
    <label class="file-button">
      Selecionar arquivo
      <input type="file" :required="required" :multiple="multiple" :accept="accept" @change="onChange" hidden />
    </label>

    <ul v-if="modelValue" class="file-list">
      <li v-for="(file, index) in Array.isArray(modelValue) ? modelValue : [modelValue]" :key="index" class="file-item">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>


<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.file-button {
  display: inline-block;
  background-color: var(--blue-lighter);
  color: var(theme-text);
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  border: 1px var(--normal-blue) solid;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  align-content: center;
}

.file-button:hover {
  background-color: var(--blue-light);
}

.file-list {
  margin-top: 0.6rem;
  padding-left: 1rem;
  font-size: 0.9rem;
  color: var(--theme-text);
}

.file-item {
  list-style: disc;
}

p {
  max-width: 34rem;
}
</style>
