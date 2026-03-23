export default {
  defaultColDef: {
    minWidth: 140,
    sortable: true,
    filter: true,
    resizable: true
  },

  columns: [
    { field: 'id_aluno_graduacao', headerName: 'ID Aluno', width: 120 },
    { field: 'nome_disciplina', headerName: 'Disciplina', minWidth: 220 },
    { field: 'conceito', headerName: 'Conceito', width: 120 },
    { field: 'frequencia', headerName: 'Frequência', width: 130 },
    { field: 'tipo_efetivacao', headerName: 'Tipo Efetivação', minWidth: 170 },
    { field: 'tipo_nota', headerName: 'Tipo Nota', width: 130 },
    { field: 'nota', headerName: 'Nota', width: 100 }
  ]
}