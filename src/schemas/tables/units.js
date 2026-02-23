import { riskColor } from "@/utils/colorScaleDroptout"

const treeLabelById = new Map()

export default {
  columns: [
    { field: 'campus', headerName: 'tables.general.campus' },
    { field: 'type', headerName: 'tables.courses.type', onlyFor: 'child' },
    { field: 'period', headerName: 'tables.courses.period', onlyFor: 'child' },
    {
      field: 'evasion',
      headerName: 'tables.general.evasion',
      cellStyle: params => {
        const value = params.value
        const color = riskColor(value)
        if (!color) return null
        return { backgroundColor: color }
      }
    }
  ],

  subtable: {
    mode: 'tree',

    tree: {
      getPath: row => row.treePath,
      groupColumn: {
        headerName: 'tables.general.name',
        suppressCount: true,
        cellRendererParams: {
          innerRenderer: params => treeLabelById.get(String(params.value)) ?? params.value
        }
      },

      buildRows(rawRows) {
        treeLabelById.clear()
        const rows = []

        rawRows.forEach(parent => {
          const parentId = String(parent.id)
          treeLabelById.set(parentId, parent.name)

          rows.push({ ...parent, __type: 'parent', treePath: [parentId] })

          parent.children?.forEach(child => {
            const childId = String(child.id)
            treeLabelById.set(childId, child.name)

            rows.push({ ...child, __type: 'child', treePath: [parentId, childId] })
          })
        })

        return rows
      }
    }
  }
}