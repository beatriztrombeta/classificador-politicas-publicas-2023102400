<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const rowData = ref([])

async function fetchCourseStudents(cursoId) {
  const url = `${apiBase}/cursos/${cursoId}/alunos`
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Falha ao carregar alunos do curso ${cursoId}. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [] }
  return Array.isArray(data?.items) ? data.items : []
}

async function loadCourses() {
  const url = `${apiBase}/cursos`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })


  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Falha ao carregar cursos. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [] }
  const items = Array.isArray(data?.items) ? data.items : []

  rowData.value = items.map(course => ({
    id: course.id_curso,
    courseId: course.id_curso,
    name: course.nome_curso,
    unity: course.nome_unidade,
    campus: course.nome_campus,
    type: course.modalidade,
    period: course.nome_periodo,
    evasion: null,
    children: null,
    async loadDetail() {
      if (Array.isArray(this.children)) {
        return this.children
      }

      const students = await fetchCourseStudents(this.courseId)
      this.children = students.map(student => ({
        ...student,
        impact: student.impact ?? {}
      }))

      return this.children
    }
  }))

}

onMounted(() => {
  loadCourses().catch((e) => {
    rowData.value = []
  })
})
</script>

<template>
  <BaseTable entity="courses" :rowData="rowData" />
</template>