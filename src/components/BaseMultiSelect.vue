<script setup>
defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  source: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  const values = Array.from(event.target.selectedOptions).map(
    option => option.value
  )
  emit('update:modelValue', values)
}
</script>

<template>
  <div class="input-wrapper">
    <label class="label-form" v-if="label">
      {{ label }}
    </label>

    <select class="input-form" multiple @change="onChange">
      <option v-for="option in source" :key="option.id ?? option.value" :value="option.id ?? option.value"
        :selected="modelValue.includes(option.id ?? option.value)">
        {{ option.label ?? option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
</style>
