import { riskColor } from "@/utils/colorScaleDroptout"

export default {
  columns: [
    { field: 'unity', headerName: 'tables.general.unity' },
    { field: 'campus', headerName: 'tables.general.campus' },
    {
      field: 'type',
      headerName: 'tables.courses.type',
      onlyFor: 'child'
    },
    {
      field: 'period',
      headerName: 'tables.courses.period',
      onlyFor: 'child'
    },
    {
      field: 'evasion',
      headerName: 'tables.general.evasion',
      cellStyle: params => {
        const value = params.value
        const color = riskColor(value)

        if (!color) return null

        return {
          backgroundColor: color,
        }
      }
    }
  ],

  subtable: {
    mode: 'tree',

    tree: {
      getPath: row => row.treePath,
      groupColumn: {
        headerName: 'tables.general.name',
        suppressCount: true
      },

      buildRows(rawRows) {
        const rows = []

        rawRows.forEach(parent => {
          rows.push({
            ...parent,
            __type: 'parent',
            treePath: [parent.name]
          })

          parent.children?.forEach(child => {
            rows.push({
              ...child,
              __type: 'child',
              treePath: [parent.name, child.name]
            })
          })
        })

        return rows
      }
    }
  }
}
