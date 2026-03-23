<script setup>
import { ref } from 'vue'
import { useUserApproval } from '@/composable/useUserApproval'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['approved', 'rejected', 'refresh', 'close'])

const loadingApprove = ref(false)
const loadingReject = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const { approveUserByToken, rejectUserByToken } = useUserApproval()

async function approve() {
  errorMsg.value = ''
  successMsg.value = ''
  loadingApprove.value = true

  try {
    await approveUserByToken(props.user.approval_token)
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

async function reject() {
  errorMsg.value = ''
  successMsg.value = ''
  loadingReject.value = true

  try {
    await rejectUserByToken(props.user.approval_token)
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

          <p><strong>Status:</strong> {{ user.status || '—' }}</p>
        </div>

        <div class="documents-section">
          <h4>Documentos</h4>

          <div v-if="!documents.length" class="empty-state">
            Nenhum documento encontrado.
          </div>

          <div v-else class="documents-list">
            <div v-for="doc in documents" :key="doc.id_documento" class="document-card">
              <p><strong>Tipo:</strong> {{ doc.tipo_documento || '—' }}</p>
              <p><strong>Arquivo:</strong> {{ doc.nome_arquivo || '—' }}</p>
              <p><strong>Status:</strong> {{ doc.status_analise || '—' }}</p>
              <p><strong>Enviado em:</strong> {{ maskDateTime(doc.data_envio) || '—' }}</p>

              <a v-if="doc.download_url" class="document-link" :href="doc.download_url" target="_blank"
                rel="noopener noreferrer">
                Clique aqui para abrir os documentos
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-footer">
        <div class="actions">
          <template>
            <div>
              <p v-if="errorMsg">{{ errorMsg }}</p>
              <p v-if="successMsg">{{ successMsg }}</p>

              <button @click="handleApprove" :disabled="loadingApprove || loadingReject">
                {{ loadingApprove ? 'Aprovando...' : 'Aprovar' }}
              </button>

              <button @click="handleReject" :disabled="loadingApprove || loadingReject">
                {{ loadingReject ? 'Rejeitando...' : 'Rejeitar' }}
              </button>
            </div>
          </template>
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
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
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
  flex-direction: row;
  gap: 1rem;
}

.button {
  color: var(--white);
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
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
</style>