export const signupFields = {

    ADMIN: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'campus', label: 'Câmpus', component: 'select', sourceKey: 'campus', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 12 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: true, col: 12 }
  ],

  REI: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'campus', label: 'Câmpus', component: 'select', sourceKey: 'campus', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 12 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: true, col: 12 }
  ],

  PROREI: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'campus', label: 'Câmpus', component: 'select', sourceKey: 'campus', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 6 },
    { name: 'area', label: 'Área', component: 'select', sourceKey: 'areas', required: true, col: 6 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: true, col: 12 }
  ],

  DEP: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'unidade', label: 'Unidade', component: 'select', sourceKey: 'unidade', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 6 },
    { name: 'departamento', label: 'Departamento', component: 'select', sourceKey: 'departamentos', dependsOn: 'campus', required: true, col: 6 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: true, col: 12 }
  ],

  COORD: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'unidade', label: 'Unidade', component: 'select', sourceKey: 'unidade', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 6 },
    { name: 'curso', label: 'Curso', component: 'select', sourceKey: 'cursos', dependsOn: 'departamento', required: true, col: 6 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: true, col: 12 }
  ],

  PROF: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'unidade', label: 'Unidade', component: 'select', sourceKey: 'unidade', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 6 },
    { name: 'curso', label: 'Curso', component: 'select', sourceKey: 'cursos', dependsOn: 'departamento', required: true, col: 6 },
    { name: 'disciplinas', label: 'Disciplinas', component: 'multiselect', sourceKey: 'disciplinas', dependsOn: 'curso', required: true, col: 12 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: true, col: 12 }
  ],

  ALUN: [
    { name: 'nome', label: 'Nome completo', component: 'input', inputType: 'text', required: true, col: 12 },
    { name: 'email', label: 'E-mail institucional', component: 'input', inputType: 'email', required: true, disabled: true, col: 12 },
    { name: 'telefone', label: 'Telefone', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'cpf', label: 'CPF', component: 'input', inputType: 'text', required: true, col: 6 },
    { name: 'unidade', label: 'Unidade', component: 'select', sourceKey: 'unidade', required: true, col: 12 },
    { name: 'categoria', label: 'Categoria', component: 'select', sourceKey: 'categorias', required: true, disabled: true, col: 6 },
    { name: 'RA', label: 'RA', component: 'input', inputType: 'number', required: true, col: 6 },
    { name: 'comprovante', label: 'Comprovante', component: 'file', required: true, multiple: false, col: 12 }
  ]
}
