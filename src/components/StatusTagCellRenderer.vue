<script setup>
import { computed } from 'vue'

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const rawStatus = computed(() => props.params?.value ?? '')

const normalizedStatus = computed(() =>
  String(rawStatus.value).trim().toUpperCase()
)

const statusMap = {
  PENDENTE: { label: 'Pendente', class: 'pending' },
  PENDING: { label: 'Pendente', class: 'pending' },
  APROVADO: { label: 'Aprovado', class: 'active' },
  ACTIVE: { label: 'Aprovado', class: 'active' },
  REJEITADO: { label: 'Rejeitado', class: 'rejected' },
  REJECTED: { label: 'Rejeitado', class: 'rejected' }
}

const current = computed(() => statusMap[normalizedStatus.value] || {
  label: rawStatus.value,
  class: 'pending'
})
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

