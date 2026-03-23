<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import UserDocumentsModal from '@/components/UserDocumentsModal.vue'
import { maskDateTime } from '@/utils/regex'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const rowData = ref([])
const showModal = ref(false)
const selectedUser = ref(null)

function openDocuments(user) {
  selectedUser.value = user
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedUser.value = null
}

async function loadUsers() {
  const url = `${apiBase}/admin/users`
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Falha ao carregar usuários. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [] }
  const items = Array.isArray(data?.items) ? data.items : []

  rowData.value = items.map(u => ({
    ...u,
    id: u.id,
    nome: u.nome,
    categoria: u.categoria,
    campus: u.campus,
    data_cadastro: maskDateTime(u.data_cadastro),
    data_atualizacao: maskDateTime(u.data_atualizacao),
    documents: u.documentos ?? [],
    status: u.status
  }))
}

onMounted(() => {
  loadUsers().catch((e) => {
    rowData.value = []
  })
})
</script>

<template>
  <BaseTable entity="users" :rowData="rowData" @open-documents="openDocuments" />
  <UserDocumentsModal v-if="showModal" :user="selectedUser" @close="closeModal" />
</template>