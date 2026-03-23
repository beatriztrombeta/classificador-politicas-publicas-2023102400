<script setup>
import { computed } from 'vue'

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const rawRole = computed(() => props.params?.value ?? '')

const normalizedRole = computed(() =>
  String(rawRole.value).trim().toUpperCase()
)

const roleMap = {
  ADM: { label: 'ADM', class: 'adm' },
  ADMIN: { label: 'ADM', class: 'adm' },
  ADMINISTRADOR: { label: 'ADM', class: 'adm' },

  REI: { label: 'REI', class: 'rei' },
  REITOR: { label: 'REI', class: 'rei' },

  PROREI: { label: 'PRO-REI', class: 'prorei' },
  PROREITOR: { label: 'PRO-REI', class: 'prorei' },
  'PRO-REITOR': { label: 'PRO-REI', class: 'prorei' },

  DEP: { label: 'DEP', class: 'dep' },
  DEPARTAMENTO: { label: 'DEP', class: 'dep' },

  COORD: { label: 'COORD', class: 'coord' },
  COORDENADOR: { label: 'COORD', class: 'coord' },

  PROF: { label: 'PROF', class: 'prof' },
  PROFESSOR: { label: 'PROF', class: 'prof' },

  STUDENT: { label: 'ALUNO', class: 'student' },
  ALUNO: { label: 'ALUNO', class: 'student' }
}

const current = computed(() =>
  roleMap[normalizedRole.value] || {
    label: rawRole.value || '—',
    class: 'default'
  }
)
</script>

<template>
  <span class="role-tag" :class="current.class">
    <span class="dot" />
    {{ current.label }}
  </span>
</template>