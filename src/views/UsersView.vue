<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import UserDocumentsModal from '@/components/UserDocumentsModal.vue'
import { maskDateTime } from '@/utils/regex'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const rowData = ref([])
const showModal = ref(false)
const selectedUser = ref(null)
const loading = ref(false)

const pendingUsers = computed(() => {
  return rowData.value.filter(user => {
    const status = String(user?.status ?? '').trim().toUpperCase()
    return status === 'PENDENTE' || status === 'PENDING'
  }).length
})

const havePending = computed(() => pendingUsers.value > 0)

function openDocuments(user) {
  selectedUser.value = user
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedUser.value = null
}

async function handleUsersRefresh() {
  try {
    await loadUsers()
  } catch (e) {
    error('Erro ao atualizar usuários:', e)
  }
}

async function loadUsers() {
  loading.value = true
  try{
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
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers().catch((e) => {
    rowData.value = []
  })
})
</script>

<template>
  <section>
    <div v-if="havePending" class="warning-wrapper">
      <p>⚠️</p>
      <p>
        Existem {{ pendingUsers }} usuários pendentes de aprovação para o uso do sistema
      </p>
    </div>

    <BaseTable entity="users" :rowData="rowData" @open-documents="openDocuments" :loading="loading"/>
  </section>
  <UserDocumentsModal v-if="showModal && selectedUser" :user="selectedUser" @close="closeModal"
    @refresh="handleUsersRefresh" />
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.warning-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: solid 1px rgb(226, 44, 44);
  border-radius: 0.7rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  align-items: center;
}
</style>