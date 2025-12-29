<script setup>
defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="input-wrapper">
        <label v-if="label" class="label-form">
            {{ label }}
            <span v-if="required">*</span>
        </label>

        <input class="input-form" :type="type" :required="required" :disabled="disabled" :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<style scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
</style>
