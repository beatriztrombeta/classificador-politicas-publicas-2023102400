<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { mocks } from '@/mocks'

const rowData = ref([])

onMounted(() => {
  rowData.value = mocks.units()
})
</script>

<template>
  <BaseTable entity="units" :rowData="rowData" />
</template>
