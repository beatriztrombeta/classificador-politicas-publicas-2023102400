export function mockUsers() {
  return [
    {
      id: 1,
      name: 'Ana Souza',
      role: 'ADM',
      campus: 'Marília',
      signupDate: '2024-02-10',
      lastUpdate: '2024-03-01',
      documents: true,
      status: 'active'
    },
    {
      id: 2,
      name: 'Carlos Lima',
      role: 'PROF',
      campus: 'Assis',
      signupDate: '2024-01-05',
      lastUpdate: '2024-01-20',
      documents: true,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Júlia Alves',
      role: 'DEP',
      campus: 'Assis',
      signupDate: '2024-01-05',
      lastUpdate: '2024-01-20',
      documents: true,
      status: 'rejected'
    }
  ]
}
