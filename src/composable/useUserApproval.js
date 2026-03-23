const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useUserApproval() {
  async function approveUserByToken(token) {
    if (!token) throw new Error('Token de aprovação não informado.')

    const url = new URL(`${apiBase}/notify/admin/approval/approve`)
    url.searchParams.set('token', token)

    const res = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include'
    })

    const body = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(body?.detail || body?.message || 'Erro ao aprovar usuário.')
    }

    return body
  }

  async function rejectUserByToken(token) {
    if (!token) throw new Error('Token de rejeição não informado.')

    const url = new URL(`${apiBase}/notify/admin/approval/reject`)
    url.searchParams.set('token', token)

    const res = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include'
    })

    const body = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(body?.detail || body?.message || 'Erro ao rejeitar usuário.')
    }

    return body
  }

  return {
    approveUserByToken,
    rejectUserByToken
  }
}