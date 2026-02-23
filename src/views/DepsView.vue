<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { mocks } from '@/mocks'

const rowData = ref([])

onMounted(() => {
  rowData.value = mocks.departments()
})
</script>

<template>
  <BaseTable entity="departments" :rowData="rowData" />
</template>
