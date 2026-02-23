<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { mocks } from '@/mocks'
import UserDocumentsModal from '@/components/UserDocumentsModal.vue'

const rowData = ref([])
const showModal = ref(false)
const selectedUser = ref(null)

function openDocuments(user) {
  selectedUser.value = user
  showModal.value = true
}


function closeModal() {
  showModal.value = false
  selectedUser.value = null
}

onMounted(() => {
  rowData.value = mocks.users()
})
</script>

<template>
  <BaseTable
    entity="users"
    :rowData="rowData"
    @open-documents="openDocuments"
  />

  <UserDocumentsModal
    v-if="showModal"
    :user="selectedUser"
    @close="closeModal"
  />
</template>

