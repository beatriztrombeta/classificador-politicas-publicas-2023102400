<script setup>
import { computed, inject, watch } from 'vue'
import { signupFields } from '@/schemas/signupFields'
import { resolveComponent } from '@/utils/resolveComponents'

const { signup, next, sources } = inject('signup')
signup.form ??= {}

const fields = computed(() =>
  signupFields[signup.categoria] || []
)

const resolvedFields = computed(() =>
  fields.value.map(field => ({
    ...field,
    resolvedComponent: resolveComponent(field.component)
  }))
)

const isDisabled = (field) =>
  field.disabled || (field.dependsOn && !signup.form[field.dependsOn])

watch(
  () => ({ ...signup.form }),
  (form) => {
    fields.value.forEach(field => {
      if (field.dependsOn && !form[field.dependsOn]) {
        delete signup.form[field.name]
      }
    })
  }
)
</script>

<template>
  <main>
    <h1>Complete seus dados pessoais</h1>

    <section>
      <div class="form-grid">
        <div v-for="field in resolvedFields" :key="field.name" class="form-col"
          :style="{ gridColumn: `span ${field.col ?? 12}` }">
          <component :is="field.resolvedComponent" v-model="signup.form[field.name]" :label="field.label"
            :required="field.required" :type="field.inputType" :source="sources[field.sourceKey]"
            :disabled="isDisabled(field)" :multiple="field.multiple" />
        </div>
      </div>

      <div id="button">
        <button class="blue-button" @click="next">
          Finalizar cadastro
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
