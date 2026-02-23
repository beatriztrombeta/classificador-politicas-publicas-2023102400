<script setup>
import { computed } from 'vue'
import { useTables } from '@/composable/useTables'
import { AgGridVue } from 'ag-grid-vue3'

import StatusTagCellRenderer from './StatusTagCellRenderer.vue'
import DocumentButtonCellRenderer from './DocumentButtonCellRenderer.vue'
import RoleTagCellRenderer from './RoleTagCellRenderer.vue'
import StudentButtonCellRenderer from './StudentButtonCellRenderer.vue'

const emit = defineEmits(['open-documents'])

const props = defineProps({
  entity: String,
  rowData: {
    type: Array,
    default: () => []
  }
})

const components = {
  StatusTagCellRenderer,
  DocumentButtonCellRenderer,
  StudentButtonCellRenderer,
  RoleTagCellRenderer
}

const {
  columnDefs,
  gridOptions,
  rowData
} = useTables(props.entity, computed(() => props.rowData))

const defaultColDef = computed(() => ({
  sortable: true,
  filter: true,
  resizable: true,
  ...(props.entity === 'students' ? {} : { flex: 1 })
}))

const enhancedColumnDefs = computed(() =>
  columnDefs.value.map(col => {
    if (col.field === 'documents') {
      return {
        ...col,
        cellRendererParams: {
          onOpen: user => emit('open-documents', user)
        }
      }
    }
    return col
  })
)
</script>

<template>
  <ag-grid-vue
    class="ag-theme-alpine grid"
    :columnDefs="enhancedColumnDefs"
    :rowData="rowData"
    :components="components"
    :defaultColDef="defaultColDef"
    v-bind="gridOptions"
    domLayout="autoHeight"
    theme="legacy"
  />
</template>
