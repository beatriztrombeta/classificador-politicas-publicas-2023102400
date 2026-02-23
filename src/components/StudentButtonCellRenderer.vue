<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const id = computed(() => props.params?.value)

function goToStudent() {
  if (!id.value) return

  router.push({
    name: 'student-details',
    params: { id: id.value }
  })
}
</script>

<template>
  <span v-if="id" class="student-link" @click="goToStudent">
    {{ id }}
  </span>
</template>

<style scoped>
.student-link {
  cursor: pointer;
  text-decoration: underline;
}
</style>
