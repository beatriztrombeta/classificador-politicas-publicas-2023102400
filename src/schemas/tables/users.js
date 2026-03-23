export default {
  type: 'simple',
  columns: [
    { field: 'nome', headerName: 'tables.general.name', sortable: true, filter: false },
    {
      field: 'categoria',
      headerName: 'tables.simple.role',
      sortable: true,
      filter: 'agTextColumnFilter',
      cellRenderer: 'RoleTagCellRenderer'
    },
    { field: 'campus', headerName: 'tables.general.campus', sortable: true, filter: 'agTextColumnFilter' },
    { field: 'data_cadastro', headerName: 'tables.simple.signupDate', sortable: true, filter: false },
    { field: 'data_atualizacao', headerName: 'tables.simple.lastUpdate', sortable: true, filter: false },
    {
      field: 'documents',
      headerName: 'tables.simple.documents',
      cellRenderer: 'DocumentButtonCellRenderer',
      sortable: false,
      filter: false,
      cellRendererParams: {
        onOpen: null
      }
    },
    {
      field: 'status',
      headerName: 'tables.simple.status',
      filter: 'agTextColumnFilter',
      sortable: true,
      cellRenderer: 'StatusTagCellRenderer'
    }
  ]
}
