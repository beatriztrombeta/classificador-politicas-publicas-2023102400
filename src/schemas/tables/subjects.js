import StudentButtonCellRenderer from "@/components/StudentButtonCellRenderer.vue";

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
        },
        { field: 'CONCEITO', headerName: 'Conceito', headerTooltip: 'Conceito' },
        { field: 'FREQUENCIA', headerName: 'Frequência', headerTooltip: 'Frequência' },
        { field: 'TIPO_EFETIVACAO', headerName: 'Tipo de Efetivação', headerTooltip: 'Tipo de Efetivação' },
        { field: 'TIPO_NOTA', headerName: 'Tipo de Nota', headerTooltip: 'Tipo de Nota' },
        { field: 'NOTA', headerName: 'Nota', headerTooltip: 'Nota' },
      ],
      onFirstDataRendered: params => {
        params.api.sizeColumnsToFit()
      }
    },

    getDetailRowData(params) {
      params.successCallback(params.data.children ?? [])
    }
  }
}