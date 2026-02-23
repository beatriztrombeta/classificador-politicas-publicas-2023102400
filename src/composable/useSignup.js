import { reactive, provide, watch, computed } from 'vue'


export function useSignup() {
  const signup = reactive({
    step: 1,

    // dados coletados nos primeiros steps
    email: '',
    categoria: '',

    // dados do formulário dinâmico
    form: {
      campus: '',
      departamento: '',
      curso: '',
      disciplinas: []
    }
  })

  const attachmentText = computed(() => {
    switch (signup.categoria) {
      case 'ALUN':
        return 'Anexe seu comprovante de matrícula (em pdf).'
      case 'ADMIN':
        return 'Anexe arquivos que comprovem que você tem autorização para administrar a plataforma.'
      case 'REI':
      case 'PROREI':
      case 'DEP':
      case 'COORD':
      case 'PROF':
        return 'Anexe arquivos que comprovem seu cargo, por exemplo: Termo de posse, nomeação, portaria, declarações ou holerites (em pdf).'

      default:
        return ''
    }
  })

  // sources (mock agora, API depois)
  const sources = reactive({
    campus: [],
    categorias: [
      { value: 'ADMIN', label: 'Administrador' },
      { value: 'REI', label: 'Reitoria' },
      { value: 'PROREI', label: 'Pró-Reitoria' },
      { value: 'DEP', label: 'Departamento' },
      { value: 'COORD', label: 'Coordenação de Curso' },
      { value: 'PROF', label: 'Professor' },
      { value: 'ALUN', label: 'Aluno' }
    ],
    departamentos: [],
    cursos: [],
    disciplinas: []
  })

  const loading = reactive({
    categorias: false,
    campus: false,
    departamentos: false,
    cursos: false,
    disciplinas: false
  })

  /* ------------------------
   * MOCK DE FETCH (BACKEND FUTURO)
   * ------------------------ */

  async function fetchCategorias() {
    loading.categorias = true
    sources.categorias = [
      { value: 'ADMIN', label: 'Administrador' },
      { value: 'REI', label: 'Reitoria' },
      { value: 'PROREI', label: 'Pró-Reitoria' },
      { value: 'DEP', label: 'Departamento' },
      { value: 'COORD', label: 'Coordenação' },
      { value: 'PROF', label: 'Professor' },
      { value: 'ALUN', label: 'Aluno' }
    ]
    loading.categorias = false
  }

  async function fetchDepartamentos(campus) {
    loading.departamentos = true
    sources.departamentos = [
      { value: 'COMP', label: 'Computação', campus },
      { value: 'MAT', label: 'Matemática', campus }
    ]
    loading.departamentos = false
  }

  async function fetchCursos(departamento) {
    loading.cursos = true
    sources.cursos = [
      { value: 'BCC', label: 'Ciência da Computação', departamento }
    ]
    loading.cursos = false
  }

  async function fetchDisciplinas(curso) {
    loading.disciplinas = true
    sources.disciplinas = [
      { value: 'ALG', label: 'Algoritmos', curso },
      { value: 'ED', label: 'Estruturas de Dados', curso }
    ]
    loading.disciplinas = false
  }

  /* ------------------------
   * CASCATA REATIVA
   * ------------------------ */

  watch(() => signup.form.campus, (campus) => {
    signup.form.departamento = ''
    signup.form.curso = ''
    signup.form.disciplinas = []

    sources.departamentos = []
    sources.cursos = []
    sources.disciplinas = []

    if (campus) {
      fetchDepartamentos(campus)
    }
  })

  watch(() => signup.form.departamento, (dep) => {
    signup.form.curso = ''
    signup.form.disciplinas = []

    sources.cursos = []
    sources.disciplinas = []

    if (dep) {
      fetchCursos(dep)
    }
  })

  watch(() => signup.form.curso, (curso) => {
    signup.form.disciplinas = []
    sources.disciplinas = []

    if (curso) {
      fetchDisciplinas(curso)
    }
  })

  /* ------------------------
   * FLUXO DE STEPS
   * ------------------------ */

  function next() {
    if (signup.step === 3) {
      if (signup.email) {
        signup.form.email ??= signup.email
      }

      if (signup.categoria) {
        signup.form.categoria ??= signup.categoria
      }
    }

    signup.step++
  }

  function back() {
    if (signup.step > 1) {
      signup.step--
    }
  }

  /* ------------------------
   * PROVIDE
   * ------------------------ */

  provide('signup', {
    signup,
    next,
    back,
    sources,
    loading,
    attachmentText
  })

  return {
    signup,
    next,
    back,
    sources,
    loading,
    attachmentText
  }
}
