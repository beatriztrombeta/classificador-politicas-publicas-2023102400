<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const router = useRouter()

function openStudent() {
  if (props.params?.data?._rowType !== 'data') return

  const alunoId = props.params?.data?.ID_ALUNO_GRADUACAO
  if (!alunoId) return

  router.push({
    name: 'student-details',
    params: { id: String(alunoId) }
  })
}
</script>

<template>
  <button class="student-link-btn" @click="openStudent">
    {{ params.value }}
  </button>
</template>
