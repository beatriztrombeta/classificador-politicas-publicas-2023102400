<script setup>
import { ref, onMounted, watch } from 'vue'
import BaseTable from '@/components/BaseTable.vue'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const rowData = ref([])
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)

async function loadSubjects() {
  const offset = (page.value - 1) * pageSize.value

  const res = await fetch(`${apiBase}/disciplinas?limit=${pageSize.value}&offset=${offset}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Falha ao carregar disciplinas. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [], total: 0 }
  const items = Array.isArray(data?.items) ? data.items : []

  total.value = data?.total ?? 0
  rowData.value = items.map(subject => ({
    id: subject.id_disciplina,
    name: subject.nome_disciplina,
    disciplineIds: Array.isArray(subject.disciplina_ids) && subject.disciplina_ids.length ? subject.disciplina_ids : [subject.id_disciplina],
    totalAlunos: subject.total_alunos ?? 0,
    children: null,
    async loadDetail() {
      if (Array.isArray(this.children)) return this.children

      const ids = this.disciplineIds.join(',')
      const res = await fetch(`${apiBase}/disciplinas/alunos?ids=${ids}`, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' }
      })

      const text = await res.text()
      if (!res.ok) {
        throw new Error(`Falha ao carregar alunos da disciplina agrupada. Status ${res.status}. Body: ${text}`)
      }

      const data = text ? JSON.parse(text) : { items: [] }
      this.children = Array.isArray(data?.items) ? data.items : []
      return this.children
    }
  }))
}

onMounted(() => {
  loadSubjects().catch((e) => {
    rowData.value = []
    total.value = 0
  })
})

watch([page, pageSize], () => {
  loadSubjects().catch((e) => {
    rowData.value = []
    total.value = 0
  })
})
</script>

<template>
  <BaseTable entity="subjects" :rowData="rowData" :page="page" :pageSize="pageSize" :total="total" @update:page="page = $event" @update:pageSize="pageSize = $event" />
</template>
