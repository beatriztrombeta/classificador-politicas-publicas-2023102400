import StudentButtonCellRenderer from "@/components/StudentButtonCellRenderer.vue";
import { impactColumn } from "@/utils/impactColumn";

export default {
  columns: [
    { field: 'name', headerName: 'tables.general.name', cellRenderer: 'agGroupCellRenderer' }
  ],

  subtable: {
    mode: 'masterDetail',

    detailGridOptions: {
      components: {
        StudentButtonCellRenderer
      },

      suppressRowTransform: true,
      tooltipShowDelay: 200,
      tooltipHideDelay: 2000,
      suppressColumnVirtualisation: true,

      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: false,
        filter: false,
        resizable: true
      },

      columnDefs: [
        {
          field: 'ID_ALUNO_GRADUACAO',
          headerName: 'ID',
          pinned: 'left',
          width: 120,
          cellRenderer: 'StudentButtonCellRenderer',
          rowSpan: params => params.data._rowType === 'data' ? 2 : 1,
          cellClassRules: {
            'cell-span': params => params.data._rowType === 'data'
          }
        }
        ,
        impactColumn(
          'CONCEITO',
          'Conceito',
          { headerTooltip: 'Conceito' }),
        impactColumn(
          'FREQUENCIA',
          'Frequência',
          { headerTooltip: 'Frequência' }),
        impactColumn(
          'TIPO_EFETIVACAO',
          'Tipo de Efetivação',
          { headerTooltip: 'Tipo de Efetivação' }),
        impactColumn(
          'TIPO_NOTA',
          'Tipo de Nota',
          { headerTooltip: 'Tipo de Nota' }),
        impactColumn(
          'NOTA',
          'Nota',
          { headerTooltip: 'Nota' }),
      ],
      onFirstDataRendered: params => {
        params.api.sizeColumnsToFit()
      }
    },
    getDetailRowData(params) {
      const rows = []

      params.data.children?.forEach(aluno => {
        rows.push({
          ...aluno,
          _rowType: 'data'
        })

        rows.push({
          ...aluno.impact,
          _rowType: 'impact'
        })
      })

      params.successCallback(rows)
    }
  }

}