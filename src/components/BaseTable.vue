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

const getRowId = (params) => {
  const d = params.data || {}

  return String(
    d.id ??
    d.ID_ALUNO_GRADUACAO ??
    d.id_disciplina ??
    d.id_curso ??
    d.id_unidade ??
    d.disciplineId ??
    d.courseId ??
    d.unidadeId ??
    d.treePath?.join('/') ??
    JSON.stringify([d.name, d.nome, d._rowType])
  )
}

const components = {
  StatusTagCellRenderer,
  DocumentButtonCellRenderer,
  StudentButtonCellRenderer,
  RoleTagCellRenderer
}

const {
  columnDefs,
  gridOptions,
  rowData: tableRowData
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

const pagination = computed(() => props.entity === 'students')
const paginationPageSize = computed(() => props.entity === 'students' ? 50 : undefined)
</script>

<template>
  <ag-grid-vue
    class="ag-theme-alpine grid"
    :columnDefs="enhancedColumnDefs"
    :rowData="tableRowData"
    :components="components"
    :defaultColDef="defaultColDef"
    :pagination="pagination"
    :paginationPageSize="paginationPageSize"
    :paginationPageSizeSelector="pagination ? [25, 50, 100, 200] : undefined"
    v-bind="gridOptions"
    domLayout="autoHeight"
    theme="legacy"
    :getRowId="getRowId"
    :keepDetailRows="true"
    :keepDetailRowsCount="30"
    :suppressScrollOnNewData="true"
  />
</template>
