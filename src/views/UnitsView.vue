<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const rowData = ref([])

async function loadUnits() {
  const url = `${apiBase}/unidades?include_courses=true`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })


  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Falha ao carregar unidades. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [] }
  const items = Array.isArray(data?.items) ? data.items : []

  rowData.value = items.map(unit => ({
    id: `unidade-${unit.id_unidade}`,
    unidadeId: unit.id_unidade,
    name: unit.nome,
    campus: unit.campus,
    evasion: null,
    children: Array.isArray(unit.courses)
      ? unit.courses.map(course => ({
          id: `curso-${course.id_curso}`,
          cursoId: course.id_curso,
          unidadeId: course.id_unidade,
          name: course.nome,
          campus: course.campus,
          type: course.tipo,
          period: course.periodo,
          evasion: null
        }))
      : []
  }))

}

onMounted(() => {
  loadUnits().catch((e) => {
    rowData.value = []
  })
})
</script>

<template>
  <BaseTable entity="units" :rowData="rowData" />
</template>