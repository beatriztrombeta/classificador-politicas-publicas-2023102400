<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { maskDateTime } from '@/utils/regex'
import { parseResponseSafely } from '@/utils/parseResponseSafely'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['approved', 'rejected', 'refresh', 'close'])

const loadingApprove = ref(false)
const loadingReject = ref(false)
const loadingDocuments = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const documentsError = ref('')
const documentsState = ref([])

const userId = computed(() => props.user?.id ?? props.user?.id_usuario ?? null)

const documents = computed(() => {
  if (documentsState.value.length) return documentsState.value
  return props.user?.documents ?? props.user?.documentos ?? []
})

const isPending = computed(() => {
  const status = String(props.user?.status ?? props.user?.status_cadastro ?? '').trim().toUpperCase()
  return status === 'PENDENTE' || status === 'PENDING'
})

function buildDocumentViewUrl(userId, docId) {
  return `${apiBase}/admin/users/${userId}/documents/${docId}/view`
}

async function fetchUserDocuments(userId) {
  const res = await fetch(`${apiBase}/admin/users/${userId}/documents`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await parseResponseSafely(res)

  if (!res.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      `Erro ao carregar documentos (${res.status}).`
    )
  }

  return Array.isArray(data?.items) ? data.items : []
}

async function loadDocuments() {
  documentsError.value = ''

  if (!userId.value) {
    documentsState.value = []
    return
  }

  loadingDocuments.value = true

  try {
    const items = await fetchUserDocuments(userId.value)

    documentsState.value = items.map((doc) => ({
      ...doc,
      download_url: buildDocumentViewUrl(userId.value, doc.id_documento)
    }))
  } catch (err) {
    documentsState.value = []
    documentsError.value = err?.message || 'Erro ao carregar documentos.'
  } finally {
    loadingDocuments.value = false
  }
}

async function approveUserById(userId) {
  const res = await fetch(`${apiBase}/admin/users/${userId}/approve`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await parseResponseSafely(res)

  if (!res.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      `Erro ao aprovar usuário (${res.status}).`
    )
  }

  return data
}

async function rejectUserById(userId) {
  const res = await fetch(`${apiBase}/admin/users/${userId}/reject`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await parseResponseSafely(res)

  if (!res.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      `Erro ao rejeitar usuário (${res.status}).`
    )
  }

  return data
}

async function handleApprove() {
  errorMsg.value = ''
  successMsg.value = ''
  loadingApprove.value = true

  try {
    await approveUserById(userId.value)
    successMsg.value = 'Usuário aprovado com sucesso.'
    emit('approved', props.user)
    emit('refresh')
    emit('close')
  } catch (err) {
    errorMsg.value = err?.message || 'Erro ao aprovar usuário.'
  } finally {
    loadingApprove.value = false
  }
}

async function handleReject() {
  errorMsg.value = ''
  successMsg.value = ''
  loadingReject.value = true

  try {
    await rejectUserById(userId.value)
    successMsg.value = 'Usuário rejeitado com sucesso.'
    emit('rejected', props.user)
    emit('refresh')
    emit('close')
  } catch (err) {
    errorMsg.value = err?.message || 'Erro ao rejeitar usuário.'
  } finally {
    loadingReject.value = false
  }
}

function close() {
  emit('close')
}

watch(
  () => userId.value,
  async (newValue) => {
    if (newValue) await loadDocuments()
  },
  { immediate: true }
)

onMounted(async () => {
  if (userId.value) await loadDocuments()
})
</script>

<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header class="modal-header">
        <h2>Documentação</h2>
        <button class="close-btn" @click="close">×</button>
      </header>

      <hr>

      <section class="modal-body">
        <div class="user-wrapper">
          <svg id="profile" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="profile-bg" cx="19.5" cy="19.5" r="19.5" fill="#39BFF2" />
            <mask id="mask0_80_448" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="39"
              height="39">
              <circle class="profile-user" cx="19.5" cy="19.5" r="19.5" fill="#4A4A4A" />
            </mask>
            <g mask="url(#mask0_80_448)">
              <circle class="profile-user" cx="19.8422" cy="35.579" r="13" fill="#AEE6FB" />
              <circle class="profile-user" cx="19.5" cy="14.0264" r="5.81579" fill="#AEE6FB" />
            </g>
          </svg>

          <p>{{ user.nome || 'Usuário' }}</p>
        </div>

        <div class="user-info">
          <p class="paragraph">
            <strong>{{ user.nome || 'Usuário' }}</strong>
            faz parte da categoria
            <strong>{{ user.categoria || '—' }}</strong>
            e é do câmpus de
            <strong>{{ user.campus || 'Não informado' }}</strong>.
          </p>

          <p class="paragraph">
            Cadastro em <strong>{{ user.data_cadastro || '—' }}</strong>
            <span v-if="user.data_atualizacao">
              • última atualização em <strong>{{ user.data_atualizacao }}</strong>
            </span>
          </p>

          <p><strong>Status:</strong> {{ user.status || user.status_cadastro || '—' }}</p>
        </div>

        <div class="documents-section">
          <h4>Documentos</h4>

          <div v-if="loadingDocuments" class="empty-state">
            Carregando documentos...
          </div>

          <div v-else-if="documentsError" class="error-msg">
            {{ documentsError }}
          </div>

          <div v-else-if="!documents.length" class="empty-state">
            Nenhum documento encontrado.
          </div>

          <div v-else class="documents-list">
            <div v-for="doc in documents" :key="doc.id_documento" class="document-card">
              <p><strong>ID:</strong> {{ doc.id_documento || '—' }}</p>
              <p><strong>Arquivo:</strong> {{ doc.nome_arquivo || '—' }}</p>
              <p><strong>Tipo MIME:</strong> {{ doc.mime_type || '—' }}</p>
              <p><strong>Enviado em:</strong> {{ maskDateTime(doc.data_envio || doc.data_upload) || '—' }}</p>

              <a v-if="doc.download_url" class="document-link" :href="doc.download_url" target="_blank"
                rel="noopener noreferrer">
                Abrir documento
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <div class="actions">
          <div class="messages">
            <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
            <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>

            <div v-if="isPending" class="actions-buttons">
              <button class="primary-btn button" @click="handleApprove" :disabled="loadingApprove || loadingReject">
                {{ loadingApprove ? 'Aprovando...' : 'Aprovar' }}
              </button>

              <button class="danger-btn button" @click="handleReject" :disabled="loadingApprove || loadingReject">
                {{ loadingReject ? 'Rejeitando...' : 'Rejeitar' }}
              </button>
            </div>
          </div>
        </div>

        <button class="secondary-btn button" @click="close">
          Fechar
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  display: flex;
  flex-direction: column;
  background: var(--theme-bg);
  width: 45rem;
  max-width: 90%;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1rem 2rem;
  color: var(--theme-text);
}

.modal-header,
.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

hr {
  width: 100%;
  border: 1px #dadfe4 solid;
}

.modal-footer {
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.modal-body {
  display: flex;
  flex-direction: column;
  min-height: 15rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--theme-text);
}

.paragraph {
  line-height: 1.5;
}

.user-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  font-size: larger;
  font-weight: 700;
  color: var(--theme-text);
}

.documents-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.document-card {
  border: 1px solid var(--ag-border-color, #dadfe4);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
}

.document-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 600;
  text-decoration: underline;
}

.empty-state {
  opacity: 0.8;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.actions-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.button {
  color: var(--white);
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}

.button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.primary-btn {
  background: var(--green-rate-darker);
}

.secondary-btn {
  background: var(--color-primary);
}

.danger-btn {
  background: var(--red-rate-darker);
}

.error-msg {
  color: #d32f2f;
  font-weight: 600;
}

.success-msg {
  color: #2e7d32;
  font-weight: 600;
}
</style>