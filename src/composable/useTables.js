import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import * as tables from '@/schemas/tables'

export function useTables(entity, rawRows) {
  const { t } = useI18n()

  const schema = computed(() => {
    return tables[entity] ?? null
  })

  const hasSubtable = computed(() => Boolean(schema.value?.subtable))

  const rowData = computed(() => {
    if (!hasSubtable.value) return rawRows.value ?? []

    if (schema.value.subtable?.mode === 'tree') {
      return schema.value.subtable.tree.buildRows(rawRows.value ?? [])
    }

    return rawRows.value ?? []
  })

  const columnDefs = computed(() =>
    (schema.value.columns ?? []).map(col => {
      const { headerName, onlyFor, field, valueGetter, ...rest } = col

      return {
        field,
        ...rest,
        headerName: headerName ? t(headerName) : undefined,

        valueGetter: valueGetter
          ? valueGetter
          : params => {
            const data = params.data
            if (!data) return null

            if (onlyFor === 'child' && data.__type !== 'child') {
              return '---'
            }

            return data[field]
          }
      }
    })
  )

  const gridOptions = computed(() => {
    if (!hasSubtable.value) return {}

    if (schema.value.subtable?.mode === 'tree') {
      const tree = schema.value.subtable.tree

      return {
        treeData: true,
        getDataPath: tree.getPath,
        autoGroupColumnDef: {
          headerName: t(tree.groupColumn.headerName),
          cellRendererParams: {
            suppressCount: tree.groupColumn.suppressCount
          }
        }
      }
    }

    if (schema.value.subtable?.mode === 'masterDetail') {
      return {
        masterDetail: true,
        detailRowHeight: 300,
        detailCellRendererParams: schema.value.subtable
      }
    }

    return {}
  })

  return {
    schema,
    hasSubtable,
    columnDefs,
    gridOptions,
    rowData
  }
}
