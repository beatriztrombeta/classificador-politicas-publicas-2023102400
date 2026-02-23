export default {
  type: 'simple',
  columns: [
    { field: 'name', headerName: 'tables.general.name', sortable: true, filter: false },
    {
      field: 'role',
      headerName: 'tables.simple.role',
      sortable: true,
      filter: 'agTextColumnFilter',
      cellRenderer: 'RoleTagCellRenderer'
    },
    { field: 'campus', headerName: 'tables.general.campus', sortable: true, filter: 'agTextColumnFilter' },
    { field: 'signupDate', headerName: 'tables.simple.signupDate', sortable: true, filter: false },
    { field: 'lastUpdate', headerName: 'tables.simple.lastUpdate', sortable: true, filter: false },
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
