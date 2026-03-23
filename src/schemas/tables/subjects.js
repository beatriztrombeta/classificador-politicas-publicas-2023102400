export default {
  columns: [
    { field: 'name', headerName: 'Nome da disciplina', cellRenderer: 'agGroupCellRenderer' }
  ],

  subtable: {
    mode: 'masterDetail',

    detailGridOptions: {
      defaultColDef: {
        flex: 1,
        minWidth: 140,
        sortable: true,
        filter: true,
        resizable: true
      },
      columnDefs: [
        { field: 'id_aluno_graduacao', headerName: 'ID Aluno' },
        { field: 'nome_disciplina', headerName: 'Disciplina' },
        { field: 'conceito', headerName: 'Conceito' },
        { field: 'frequencia', headerName: 'Frequência' },
        { field: 'tipo_efetivacao', headerName: 'Tipo Efetivação' },
        { field: 'tipo_nota', headerName: 'Tipo Nota' },
        { field: 'nota', headerName: 'Nota' }
      ]
    },

    async getDetailRowData(params) {
      try {
        if (Array.isArray(params.data.children)) {
          params.successCallback(params.data.children)
          return
        }

        if (typeof params.data.loadDetail === 'function') {
          const children = await params.data.loadDetail()
          params.successCallback(children)
          return
        }

        params.successCallback([])
      } catch (error) {
        params.successCallback([])
      }
    }
  }
}