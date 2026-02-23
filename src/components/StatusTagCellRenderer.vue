<script setup>
import { computed } from 'vue'

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const status = computed(() => props.params.value)

const statusMap = {
  pending: {
    label: 'Pendente',
    class: 'pending'
  },
  active: {
    label: 'Ativo',
    class: 'active'
  },
  rejected: {
    label: 'Rejeitado',
    class: 'rejected'
  }
}

const current = computed(() => statusMap[status.value] || null)
</script>

<template>
  <span
    v-if="current"
    class="status-tag"
    :class="current.class"
  >
    {{ current.label }}
  </span>
</template>

<style>

</style>

