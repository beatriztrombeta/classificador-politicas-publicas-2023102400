<script setup>
import { ref, onMounted, watch } from 'vue'
import BaseTable from '@/components/BaseTable.vue'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const rowData = ref([])
const page = ref(1)
const pageSize = ref(100)
const total = ref(0)

function buildRows(items = []) {
  const rows = []

  items.forEach(student => {
    rows.push({
      ...student,
      _rowType: 'data'
    })

    rows.push({
      ...student.impact,
      ID_ALUNO_GRADUACAO: student.ID_ALUNO_GRADUACAO,
      EVASAO: student.EVASAO,
      _rowType: 'impact'
    })
  })

  return rows
}

async function loadStudents() {
  const offset = (page.value - 1) * pageSize.value

  const res = await fetch(`${apiBase}/students?limit=${pageSize.value}&offset=${offset}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Falha ao carregar discentes. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [], total: 0 }
  const items = Array.isArray(data?.items) ? data.items : []

  total.value = data?.total ?? 0
  rowData.value = buildRows(items)
}

onMounted(() => {
  loadStudents().catch((e) => {
    rowData.value = []
  })
})

watch([page, pageSize], () => {
  loadStudents().catch((e) => {
    rowData.value = []
  })
})
</script>

<template>
    <BaseTable entity="students" :rowData="rowData" />
</template>