<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'approve', 'reject'])

const documents = computed(() => {
  return props.user?.documents ?? []
})

const isPending = computed(() => props.user.status === 'pending')
const isRejected = computed(() => props.user.status === 'rejected')

function close() {
  emit('close')
}

function approve() {
  emit('approve', props.user.id)
}

function reject() {
  emit('reject', props.user.id)
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
        <div>
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
            <p>{{ user.name }}</p>
          </div>
          <div>
            <p class="paragraph">{{ user.name }} faz parte da categoria <strong>{{ user.role }}</strong> e é do câmpus
              de <strong>{{ user.campus
              }}</strong>. Se cadastrou na plataforma no dia <strong>{{ user.signupDate }}</strong> e a útima
              atualização de seus dados se deram no dia <strong>{{ user.lastUpdate }}</strong>.</p>
            <p><strong>Status:</strong> {{ user.status }}</p>
          </div>
          <div>
            <h4>Documentos:</h4>
          </div>
        </div>
      </section>
      <hr>
      <footer class="modal-footer">
        <div class="actions">
          <template v-if="isPending">
            <button class="danger-btn button" @click="reject">
              Rejeitar
            </button>

            <button class="primary-btn button" @click="approve">
              Aprovar
            </button>
          </template>

          <template v-else-if="isRejected">
            <button class="primary-btn button" @click="approve">
              Aprovar
            </button>
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
}

.modal-header,
.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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
}

hr {
  width: 100%;
  border: 1px #dadfe4 solid;
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
