import { limeColor } from "./colorScaleLime"

export function impactColumn(field, headerName, extra = {}) {
  return {
    field,
    headerName,
    width: 150,
    cellStyle: params => {
      if (params.data._rowType !== 'impact') return null

      return {
        backgroundColor: limeColor(params.value),
      }
    },
    valueFormatter: params =>
      params.data._rowType === 'impact' && params.value != null
        ? `${params.value.toFixed(2)}`
        : params.value ?? '---',
    ...extra
  }
}