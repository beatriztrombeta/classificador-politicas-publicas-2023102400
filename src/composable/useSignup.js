import { reactive, provide, watch, computed } from 'vue'

const API_BASE = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000'

function toQueryString(params = {}) {
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    qs.append(k, String(v))
  }
  const s = qs.toString()
  return s ? `?${s}` : ''
}

async function safeJson(res) {
  return res.json().catch(() => null)
}

function normalizeErrorMessage(res, data) {
  if (data?.detail) {
    if (typeof data.detail === 'string') return data.detail
    try { return JSON.stringify(data.detail) } catch { }
  }
  return `Erro ${res.status}`
}

async function requestJson(path, { method = 'GET', params, body, headers, credentials = 'include' } = {}) {
  const url = `${API_BASE}${path}${params ? toQueryString(params) : ''}`

  const res = await fetch(url, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(headers ?? {})
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials
  })

  const data = await safeJson(res)
  if (!res.ok) throw new Error(normalizeErrorMessage(res, data))
  return data
}

function appendIf(fd, key, value) {
  if (value === undefined || value === null || value === '') return
  fd.append(key, String(value))
}

function assertRequired(value, message) {
  if (value === undefined || value === null || String(value).trim() === '') throw new Error(message)
}

export function useSignup() {
  const signup = reactive({
    step: 1,
    email: '',
    categoria: '',
    form: {
      campus: '',
      unidade: '',
      departamento: '',
      curso: '',
      disciplinas: []
    }
  })

  const verification = reactive({
    code: '',
    emailSent: false,
    verified: false,
    sending: false,
    verifying: false,
    error: ''
  })

  const sources = reactive({
    campus: [],
    unidades: [],
    categorias: [
      { value: 'ADMIN', label: 'Administrador' },
      { value: 'REITORIA', label: 'Reitoria' },
      { value: 'PRO-REITORIA', label: 'Pró-Reitoria' },
      { value: 'DEPARTAMENTO', label: 'Departamento' },
      { value: 'COORDENAÇÃO', label: 'Coordenação de Curso' },
      { value: 'PROFESSOR', label: 'Professor' },
      { value: 'ALUNO', label: 'Aluno' }
    ],
    departamentos: [],
    cursos: [],
    disciplinas: []
  })

  const loading = reactive({
    categorias: false,
    campus: false,
    unidades: false,
    departamentos: false,
    cursos: false,
    disciplinas: false,
    createUser: false
  })

  const attachmentText = computed(() => {
    switch (signup.categoria) {
      case 'ALUNO':
        return 'Anexe seu comprovante de matrícula (em pdf).'
      case 'ADMIN':
        return 'Anexe arquivos que comprovem que você tem autorização para administrar a plataforma.'
      case 'REITORIA':
      case 'PRO-REITORIA':
      case 'DEPARTAMENTO':
      case 'COORDENAÇÃO':
      case 'PROFESSOR':
        return 'Anexe arquivos que comprovem seu cargo, por exemplo: Termo de posse, nomeação, portaria, declarações ou holerites (em pdf).'
      default:
        return ''
    }
  })


  async function sendCode() {
    verification.error = ''
    verification.sending = true
    try {
      const data = await requestJson('/users/send-code', {
        method: 'POST',
        body: { email: signup.email }
      })
      verification.emailSent = true
      return data
    } catch (e) {
      verification.error = e?.message ?? 'Falha ao enviar código'
      throw e
    } finally {
      verification.sending = false
    }
  }

  async function verifyCode(code) {
    verification.error = ''
    verification.verifying = true
    try {
      const data = await requestJson('/users/verify-code', {
        method: 'POST',
        body: { email: signup.email, code }
      })
      verification.verified = true
      return data
    } catch (e) {
      verification.error = e?.message ?? 'Falha ao verificar código'
      throw e
    } finally {
      verification.verifying = false
    }
  }

  async function fetchCampus() {
    loading.campus = true
    try {
      const data = await requestJson('/public/campus')
      sources.campus = (data?.items ?? []).map((c) => ({ value: c.id_campus, label: c.nome_campus }))
    } finally {
      loading.campus = false
    }
  }

  async function fetchUnidades(campusId) {
    loading.unidades = true
    try {
      const data = await requestJson('/public/unidades', { params: { campus_id: campusId } })
      sources.unidades = (data?.items ?? []).map((u) => ({ value: u.id_unidade, label: u.nome_unidade }))
    } finally {
      loading.unidades = false
    }
  }

  async function fetchCursos(unidadeId) {
    loading.cursos = true
    try {
      const data = await requestJson(`/public/unidades/${unidadeId}/cursos`)
      sources.cursos = (data?.items ?? []).map((c) => ({ value: c.id_curso, label: c.nome_curso }))
    } finally {
      loading.cursos = false
    }
  }

  async function fetchDisciplinas(cursoId) {
    loading.disciplinas = true
    try {
      const data = await requestJson(`/public/cursos/${cursoId}/disciplinas`)
      sources.disciplinas = (data?.items ?? []).map((d) => ({ value: d.id_disciplina, label: d.nome_disciplina }))
    } finally {
      loading.disciplinas = false
    }
  }

  async function fetchDepartamentos({ unidadeId = null, campusId = null } = {}) {
    loading.departamentos = true
    try {
      const data = await requestJson('/public/departamentos', { params: { unidade_id: unidadeId, campus_id: campusId } })
      sources.departamentos = (data?.items ?? []).map((d) => ({ value: d.id_departamento, label: d.nome_departamento }))
    } finally {
      loading.departamentos = false
    }
  }

  function buildCreateUserPayload(extra = {}) {
    return {
      email: extra.email ?? signup.email,
      categoria: extra.categoria ?? signup.categoria,

      campus_id: extra.campus_id ?? signup.form?.campus,
      unidade_id: extra.unidade_id ?? signup.form?.unidade,
      departamento_id: extra.departamento_id ?? signup.form?.departamento,
      curso_id: extra.curso_id ?? signup.form?.curso,
      disciplinas: extra.disciplinas ?? signup.form?.disciplinas,

      nome: extra.nome ?? signup.form?.nome,
      cpf: extra.cpf ?? signup.form?.cpf,
      telefone: extra.telefone ?? signup.form?.telefone,
      ra: extra.ra ?? signup.form?.ra,
      proreitoria_id: extra.proreitoria_id ?? signup.form?.proreitoria
    }
  }

  function buildCreateUserFormData(payload, file) {
    const fd = new FormData()

    assertRequired(file, 'Arquivo PDF é obrigatório (campo "file").')
    assertRequired(payload.email, 'Email é obrigatório.')
    assertRequired(payload.categoria, 'Categoria é obrigatória.')
    assertRequired(payload.nome, 'Nome é obrigatório.')
    assertRequired(payload.cpf, 'CPF é obrigatório.')
    assertRequired(payload.telefone, 'Telefone é obrigatório.')

    appendIf(fd, 'email', payload.email)
    appendIf(fd, 'categoria', payload.categoria)
    appendIf(fd, 'nome', payload.nome)
    appendIf(fd, 'cpf', payload.cpf)
    appendIf(fd, 'telefone', payload.telefone)

    appendIf(fd, 'ra', payload.ra)
    appendIf(fd, 'campus_id', payload.campus_id)
    appendIf(fd, 'unidade_id', payload.unidade_id)
    appendIf(fd, 'departamento_id', payload.departamento_id)
    appendIf(fd, 'curso_id', payload.curso_id)
    appendIf(fd, 'proreitoria_id', payload.proreitoria_id)

    if (Array.isArray(payload.disciplinas)) {
      for (const id of payload.disciplinas) appendIf(fd, 'disciplinas', id)
    }

    fd.append('file', file)
    return fd
  }

  async function createUser(file, extra = {}) {
    const payload = buildCreateUserPayload(extra)
    const fd = buildCreateUserFormData(payload, file)

    loading.createUser = true
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        body: fd,
        credentials: 'include'
      })

      const data = await safeJson(res)
      if (!res.ok) throw new Error(normalizeErrorMessage(res, data))
      return data
    } finally {
      loading.createUser = false
    }
  }

  function next() {
    if (signup.step === 3) {
      if (signup.email) signup.form.email ??= signup.email
      if (signup.categoria) signup.form.categoria ??= signup.categoria
    }
    signup.step++
  }

  function back() {
    if (signup.step > 1) signup.step--
  }

  watch(() => signup.form.campus, (campus) => {
    signup.form.unidade = ''
    signup.form.curso = ''
    signup.form.disciplinas = []

    signup.form.departamento = ''
    sources.departamentos = []

    sources.unidades = []
    sources.cursos = []
    sources.disciplinas = []

    if (campus) {
      fetchUnidades(campus)
      fetchDepartamentos({ campusId: campus, unidadeId: null })
    }
  })

  watch(() => signup.form.unidade, (unidade) => {
    signup.form.curso = ''
    signup.form.disciplinas = []
    sources.cursos = []
    sources.disciplinas = []

    if (unidade) {
      fetchDepartamentos({ unidadeId: unidade, campusId: signup.form.campus || null })
      fetchCursos(unidade)
    }
  })

  watch(() => signup.form.curso, (curso) => {
    signup.form.disciplinas = []
    sources.disciplinas = []
    if (curso) fetchDisciplinas(curso)
  })

  const api = {
    signup,
    next,
    back,
    sources,
    loading,
    attachmentText,
    createUser,
    sendCode,
    verifyCode,
    verification,
    fetchCampus,
    fetchUnidades,
    fetchCursos,
    fetchDisciplinas,
    fetchDepartamentos
  }

  provide('signup', api)
  return api
}