<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { mocks } from '@/mocks'

const rowData = ref([])

onMounted(() => {
  rowData.value = mocks.students()
})
</script>

<template>
  <BaseTable entity="students" :rowData="rowData" />
</template>
