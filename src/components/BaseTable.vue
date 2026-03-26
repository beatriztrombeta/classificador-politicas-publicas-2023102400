<script setup>
import { computed, ref, watch } from 'vue'
import { useTables } from '@/composable/useTables'
import { AgGridVue } from 'ag-grid-vue3'

import StatusTagCellRenderer from './StatusTagCellRenderer.vue'
import DocumentButtonCellRenderer from './DocumentButtonCellRenderer.vue'
import RoleTagCellRenderer from './RoleTagCellRenderer.vue'
import StudentButtonCellRenderer from './StudentButtonCellRenderer.vue'

const emit = defineEmits(['open-documents'])

const props = defineProps({
  entity: { type: String, required: true },
  rowData: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const gridApi = ref(null)

function onGridReady(params) {
  gridApi.value = params.api
  syncOverlay()
}

function syncOverlay() {
  if (!gridApi.value) return

  if (props.loading) {
    gridApi.value.showLoadingOverlay()
    return
  }

  if (!props.rowData || props.rowData.length === 0) {
    gridApi.value.showNoRowsOverlay()
    return
  }

  gridApi.value.hideOverlay()
}

watch(
  () => props.loading,
  async () => {
    await nextTick()
    syncOverlay()
  },
  { immediate: true }
)

watch(
  () => props.rowData,
  async () => {
    await nextTick()
    syncOverlay()
  },
  { deep: true, immediate: true }
)

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

const pagination = computed(() => true)
const paginationPageSize = computed(() => 25)
</script>

<template>
  <ag-grid-vue class="ag-theme-alpine grid" :columnDefs="enhancedColumnDefs" :rowData="tableRowData"
    :components="components" :defaultColDef="defaultColDef" :pagination="pagination"
    :paginationPageSize="paginationPageSize" :paginationPageSizeSelector="[25, 50, 100, 200]" v-bind="gridOptions"
    domLayout="autoHeight" theme="legacy" :getRowId="getRowId" :keepDetailRows="true" :keepDetailRowsCount="30"
    :suppressScrollOnNewData="true"
    :overlayLoadingTemplate="'<span class=&quot;ag-overlay-loading-center&quot;>Carregando dados...</span>'"
    :overlayNoRowsTemplate="'<span class=&quot;ag-overlay-no-rows-center&quot;>Nenhum registro encontrado.</span>'"
    @grid-ready="onGridReady" />
</template>
