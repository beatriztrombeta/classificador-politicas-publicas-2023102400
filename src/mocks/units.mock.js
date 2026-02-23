export function mockUnits() {
  return [
    {
      id: 1,
      name: 'Faculdade de Odontologia',
      campus: 'Araçatuba',
      evasion: 12,
      children: [
        {
          id: 11,
          name: 'Odontologia',
          campus: 'Araçatuba',
          type: 'Bacharelado',
          period: 'Vespertino',
          evasion: 10,
          children: []
        },
        {
          id: 12,
          name: 'Odontologia',
          campus: 'Araçatuba',
          type: 'Bacharelado',
          period: 'Integral',
          evasion: 14,
          children: []
        }
      ]
    },
    {
      id: 2,
      name: 'Faculdade de Medicina Veterinária',
      campus: 'Araçatuba',
      evasion: 12,
      children: [
        {
          id: 15,
          name: 'Medicina Veterinária',
          campus: 'Araçatuba',
          type: 'Bacharelado',
          period: 'Integral',
          evasion: 10,
          children: []
        },
      ]
    },
    {
      id: 3,
      name: 'Faculdade de Odontologia',
      campus: 'Araraquara',
      evasion: 12,
      children: [
        {
          id: 19,
          name: 'Odontologia',
          campus: 'Araraquara',
          type: 'Bacharelado',
          period: 'Integral',
          evasion: 10,
          children: []
        }
      ]
    }
  ]
}
