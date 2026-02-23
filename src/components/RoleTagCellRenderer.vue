<script setup>
import { computed } from 'vue'

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const role = computed(() => props.params.value)

const roleMap = {
  ADM: {
    label: 'ADM',
    class: 'adm'
  },
  REI: {
    label: 'REI',
    class: 'rei'
  },
  PROREI: {
    label: 'PROREI',
    class: 'prorei'
  },
  DEP: {
    label: 'DEP',
    class: 'dep'
  },
  COORD: {
    label: 'COORD',
    class: 'coord'
  },
  PROF: {
    label: 'PROF',
    class: 'prof'
  },
  STUDENT: {
    label: 'STUDENT',
    class: 'student'
  }
}

const current = computed(() => roleMap[role.value] || { label: role.value, class: 'default' })
</script>

<template>
  <span class="role-tag" :class="current.class">
    <span class="dot" />
    {{ current.label }}
  </span>
</template>
