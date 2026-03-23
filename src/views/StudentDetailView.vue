<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseTable from '@/components/BaseTable.vue'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const route = useRoute()

const loading = ref(true)
const error = ref('')

const student = ref(null)
const xaiSummary = ref(null)

const studentRow = ref([])
const subjectsRow = ref([])

const xaiFeedback = computed(() => {
  const raw = xaiSummary.value?.groq_summary

  if (!raw) return ''

  if (typeof raw === 'object') {
    return raw.feedback || raw.mensagem || ''
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      return parsed?.feedback || parsed?.mensagem || raw
    } catch {
      return raw
    }
  }

  return ''
})

function buildStudentRows(data) {
  if (!data) return []

  return [
    {
      ID_ALUNO_GRADUACAO: data.id_aluno_graduacao,
      CIDADE_ORIGEM: data.cidade_origem,
      RACA_COR: data.raca_cor,
      SEXO: data.sexo,
      ENSINO_MEDIO: data.ensino_medio,
      COTAS: data.cotas,
      TIPO_INGRESSO: data.tipo_ingresso,
      SITUACAO: data.situacao,
      ANO_MATRICULA: data.ano_matricula,
      AVG_NOTA: data.avg_nota,
      MAX_NOTA: data.max_nota,
      MIN_NOTA: data.min_nota,
      MEDIAN_NOTA: data.median_nota,
      AVG_FREQUENCIA: data.avg_frequencia,
      MAX_FREQUENCIA: data.max_frequencia,
      MIN_FREQUENCIA: data.min_frequencia,
      MEDIAN_FREQUENCIA: data.median_frequencia,
      PERC_REPROVACAO: data.perc_reprovacao,
      PERC_EXAMES: data.perc_exames,
      QTD_DISCIPLINAS: data.unique_disciplinas,
      ANO_NASCIMENTO: data.ano_nascimento,
      MES_NASCIMENTO: null,
      IDADE_MATRICULA: data.idade_matricula,
      DISTANCIA_CAMPUS: data.distancia_campus,
      ID_PERIODO: data.id_periodo,
      EVASAO: data.evasao ?? 0,
      _rowType: 'data'
    },
    {
      ...((data.impact && typeof data.impact === 'object') ? data.impact : {}),
      ID_ALUNO_GRADUACAO: data.id_aluno_graduacao,
      EVASAO: data.evasao ?? 0,
      _rowType: 'impact'
    }
  ]
}

async function loadStudent() {
  const alunoId = route.params.id

  const res = await fetch(`${apiBase}/students/${alunoId}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Falha ao carregar aluno. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { data: null }
  student.value = data?.data ?? null
  studentRow.value = buildStudentRows(student.value)
}

async function loadXaiSummary() {
  const alunoId = route.params.id

  const res = await fetch(`${apiBase}/students/${alunoId}/xai-summary`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Falha ao carregar resumo XAI. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { data: null }
  xaiSummary.value = data?.data ?? null
}

async function loadSubjects() {
  const alunoId = route.params.id

  const res = await fetch(`${apiBase}/students/${alunoId}/subjects`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' }
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Falha ao carregar disciplinas. Status ${res.status}. Body: ${text}`)
  }

  const data = text ? JSON.parse(text) : { items: [] }
  subjectsRow.value = data?.items ?? []
}

onMounted(async () => {
  loading.value = true
  error.value = ''

  try {
    await Promise.all([
      loadStudent(),
      loadXaiSummary(),
      loadSubjects()
    ])
  } catch (e) {
    error.value = 'Não foi possível carregar os dados do aluno.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <div class="student-info-wrapper">
      <div v-if="student">
        <p><strong>Aluno:</strong> {{ student.id_aluno_graduacao }}</p>
        <p><strong>Curso:</strong> {{ student.nome_curso || '—' }}</p>
        <p><strong>Unidade:</strong> {{ student.nome_unidade || '—' }}</p>
        <p><strong>Campus:</strong> {{ student.nome_campus || '—' }}</p>
        <p><strong>Período:</strong> {{ student.nome_periodo || '—' }}</p>
      </div>
      <div class="warning-wrapper">
        <p>📋</p>
        <p v-if="xaiFeedback">
          {{ xaiFeedback }}
        </p>
        <p v-else>
          Resumo de desempenho indisponível.
        </p>
      </div>
    </div>
    <div>
      <h3>Geral</h3>
      <div class="table-wrapper">
        <BaseTable entity="studentDetailCourse" :rowData="studentRow" />
      </div>
      <h3>Disciplinas</h3>
      <div class="table-wrapper">
        <BaseTable entity="studentDetailSubject" :rowData="subjectsRow" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0rem 0rem 3rem 0rem;
}

.warning-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: solid 1px var(--color-primary);
  border-radius: 0.7rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  align-items: center;
}

.resume-wrapper {
  font-weight: 400;
}

.student-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-wrapper {
  padding-top: 1rem;
  width: 100%;
  overflow-x: auto;
}
</style>
