export function mockDepartments() {
  return [
    {
      id: 1,
      name: 'Matemática e Computação',
      unity: 'FCT',
      campus: 'Presidente Prudente',
      evasion: 12,
      children: [
        {
          id: 11,
          name: 'Ciência da Computação',
          unity: 'FCT',
          campus: 'Presidente Prudente',
          type: 'Bacharelado',
          period: 'Integral',
          evasion: 10,
          children: []
        },
        {
          id: 12,
          name: 'Licenciatura em Matemática',
          unity: 'FCT',
          campus: 'Presidente Prudente',
          type: 'Licenciatura',
          period: 'Noturno',
          evasion: 14,
          children: []
        },
        {
          id: 13,
          name: 'Licenciatura em Matemática',
          unity: 'FCT',
          campus: 'Presidente Prudente',
          type: 'Licenciatura',
          period: 'Matutino',
          evasion: 14,
          children: []
        }
      ]
    },
    {
      id: 2,
      name: 'Cartografia',
      unity: 'FCT',
      campus: 'Presidente Prudente',
      evasion: 12,
      children: [
        {
          id: 14,
          name: 'Engenharia Cartográfica',
          unity: 'FCT',
          campus: 'Presidente Prudente',
          type: 'Bacharelado',
          period: 'Integral',
          evasion: 10,
          children: []
        },
      ]
    },
    {
      id: 3,
      name: 'Estatística',
      unity: 'FCT',
      campus: 'Presidente Prudente',
      evasion: 12,
      children: [
        {
          id: 15,
          name: 'Estatística',
          unity: 'FCT',
          campus: 'Presidente Prudente',
          type: 'Bacharelado',
          period: 'Integral',
          evasion: 10,
          children: []
        },
      ]
    },
  ]
}
