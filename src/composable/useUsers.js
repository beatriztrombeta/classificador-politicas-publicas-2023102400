import { computed, ref } from 'vue'

const users = ref([
  { id: 1, name: 'Ana', status: 'pending' },
  { id: 2, name: 'Carlos', status: 'approved' }
])

export function useUsers() {
  const usersAll = computed(() => users.value)

  const usersPending = computed(() =>
    users.value.filter(u => u.status === 'pending')
  )

  return {
    usersAll,
    usersPending
  }
}
