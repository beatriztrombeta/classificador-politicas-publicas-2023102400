<script setup>
defineProps({
  modelValue: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  source: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  size: { type: Number, default: 6 } // 👈 quantas linhas visíveis
})
const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  const values = Array.from(event.target.selectedOptions).map(o => String(o.value))
  emit('update:modelValue', values)
}

function norm(v) { return String(v) }
</script>

<template>
  <div class="input-wrapper">
    <label class="label-form" v-if="label">{{ label }}</label>

    <select class="input-form" multiple :disabled="disabled" @change="onChange">
      <option
        v-for="option in source"
        :key="option.id ?? option.value"
        :value="option.id ?? option.value"
        :selected="modelValue.map(norm).includes(norm(option.id ?? option.value))"
      >
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
