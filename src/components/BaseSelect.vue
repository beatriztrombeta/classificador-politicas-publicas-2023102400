<script setup>
defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    source: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="input-wrapper">
        <label class="label-form" v-if="label">
            {{ label }}
            <span v-if="required">*</span>
        </label>

        <select class="input-form" :value="modelValue" @change="emit('update:modelValue', $event.target.value)">
            <option value="">Selecione</option>

            <option v-for="option in source" :key="option.id ?? option.value" :value="option.id ?? option.value">
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
