<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { getUnitEvasion } from '@/schemas/tables/units'
import { getCourseEvasion } from '@/schemas/tables/courses'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const rowData = ref([])
const loading = ref(false)

async function attachUnitEvasion(rows) {
  return await Promise.all(
    rows.map(async (row) => {
      try {
        const evasion = await getUnitEvasion(row.id_unidade)
        return { ...row, evasion }
      } catch {
        return { ...row, evasion: null }
      }
    })
  )
}

async function attachCoursesEvasion(courses) {
  return await Promise.all(
    courses.map(async (course) => {
      try {
        const evasion = await getCourseEvasion(course.id_curso)
        return { ...course, evasion }
      } catch {
        return { ...course, evasion: null }
      }
    })
  )
}

async function loadUnits() {
  loading.value = true
  try {
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

    const itemsWithEvasion = await attachUnitEvasion(items)

    rowData.value = await Promise.all(
      itemsWithEvasion.map(async (unit) => {
        const courses = Array.isArray(unit.courses) ? unit.courses : []
        const coursesWithEvasion = await attachCoursesEvasion(courses)

        return {
          id: `unidade-${unit.id_unidade}`,
          unidadeId: unit.id_unidade,
          name: unit.nome,
          campus: unit.campus,
          evasion: unit.evasion,
          children: coursesWithEvasion.map(course => ({
            id: `curso-${course.id_curso}`,
            cursoId: course.id_curso,
            unidadeId: course.id_unidade,
            name: course.nome,
            campus: course.campus,
            type: course.tipo,
            period: course.periodo,
            evasion: course.evasion
          }))
        }
      })
    )
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUnits().catch(() => {
    rowData.value = []
  })
})
</script>

<template>
  <BaseTable entity="units" :rowData="rowData" :loading="loading" />
</template>