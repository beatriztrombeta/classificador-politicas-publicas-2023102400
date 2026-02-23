<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { mocks } from '@/mocks'

const rowData = ref([])

onMounted(() => {
  rowData.value = mocks.subjects()
})
</script>

<template>
  <BaseTable entity="subjects" :rowData="rowData" />
</template>
