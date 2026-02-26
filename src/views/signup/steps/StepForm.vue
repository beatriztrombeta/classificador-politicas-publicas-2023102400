<script setup>
import { computed, inject, watch, onMounted } from 'vue'
import { signupFields } from '@/schemas/signupFields'
import { resolveComponent } from '@/utils/resolveComponents'
import BaseMultiSelect from '@/components/BaseMultiSelect.vue'
import { cpfRegex, telefoneRegex, maskCPF, maskTelefone } from '@/utils/regex'

const { signup, next, sources, loading, fetchCampus, fetchDepartamentos, createUser, verification } = inject('signup')
signup.form ??= {}

const categoriaKey = computed(() => ({
  'ADMIN': 'ADMIN',
  'REITORIA': 'REI',
  'PRO-REITORIA': 'PROREI',
  'DEPARTAMENTO': 'DEP',
  'COORDENAÇÃO': 'COORD',
  'PROFESSOR': 'PROF',
  'ALUNO': 'ALUN'
}[signup.categoria] || 'ADMIN'))

const fields = computed(() => signupFields[categoriaKey.value] || [])

const resolveComponentExt = (type) => {
  if (type === 'multiselect') return BaseMultiSelect
  return resolveComponent(type)
}

const resolvedFields = computed(() =>
  fields.value.map(field => ({
    ...field,
    resolvedComponent: resolveComponentExt(field.component)
  }))
)

const isDisabled = (field) => field.disabled || (field.dependsOn && !signup.form[field.dependsOn])

watch(
  () => ({ ...signup.form }),
  (form) => {
    fields.value.forEach(field => {
      if (field.dependsOn && !form[field.dependsOn]) delete signup.form[field.name]
    })
  }
)

onMounted(async () => {
  try {
    if (!sources.campus?.length) await fetchCampus()

    if (!sources.departamentos?.length) await fetchDepartamentos({ campusId: signup.form.campus || null, unidadeId: signup.form.unidade || null })
  } catch (e) {
    console.error('Erro ao carregar fontes do formulário:', e)
  }
})

function pickFirstFileFromForm(formObj) {
  for (const v of Object.values(formObj || {})) {
    if (v instanceof File) return v
    if (Array.isArray(v) && v[0] instanceof File) return v[0]
  }
  return null
}

async function handleSubmit() {
  const cpf = (signup.form?.cpf ?? '').toString().trim()
  const telefone = (signup.form?.telefone ?? '').toString().trim()

  if (cpf && !cpfRegex.test(cpf)) throw new Error('CPF inválido.')
  if (telefone && !telefoneRegex.test(telefone)) throw new Error('Telefone inválido. Use (xx) xxxxx-xxxx.')
  try {
    if (!verification?.verified) throw new Error('Você precisa validar o código do e-mail antes de finalizar.')

    const file = pickFirstFileFromForm(signup.form)
    await createUser(file)

    next()
  } catch (e) {
    console.error(e)
    alert(e?.message ?? 'Erro ao finalizar cadastro.')
  }
}
</script>

<template>
  <main>
    <h1>Complete seus dados pessoais</h1>

    <section>
      <div class="form-grid">
        <div v-for="field in resolvedFields" :key="field.name" class="form-col"
          :style="{ gridColumn: `span ${field.col ?? 12}` }">
          <component :is="field.resolvedComponent" :modelValue="signup.form[field.name]" @update:modelValue="(val) => {
            if (field.name === 'cpf') signup.form[field.name] = maskCPF(val)
            else if (field.name === 'telefone') signup.form[field.name] = maskTelefone(val)
            else signup.form[field.name] = val
          }" :label="field.label" :required="field.required" :type="field.inputType" :source="sources[field.sourceKey]"
            :disabled="isDisabled(field)" :multiple="field.multiple" />
        </div>
      </div>

      <div id="button">
        <button class="blue-button" @click="handleSubmit" :disabled="loading.createUser">
          {{ loading.createUser ? 'Enviando...' : 'Finalizar cadastro' }}
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vw;
  padding-bottom: 3rem;
}

h1 {
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 48rem;
}

.form-col {
  display: flex;
  flex-direction: column;
}

#button {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
}
</style>
