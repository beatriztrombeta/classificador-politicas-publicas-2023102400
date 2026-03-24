export async function parseResponseSafely(res) {
  const contentType = res.headers.get('content-type') || ''
  const rawText = await res.text()

  if (!rawText) return {}

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(rawText)
    } catch {
      throw new Error('A API respondeu JSON inválido.')
    }
  }

  const trimmed = rawText.trim()

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      return JSON.parse(trimmed)
    } catch {
    }
  }

  return {
    message: trimmed
  }
}