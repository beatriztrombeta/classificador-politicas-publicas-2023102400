export function limeColor(value, max = 0.1) {
  if (value == null) return null

  const v = Math.max(-max, Math.min(max, Number(value)))
  const ratio = v / max

  if (ratio >= 0.66) return 'var(--red-rate-pastel)'
  if (ratio >= 0.33) return 'var(--orange-rate-pastel)'

  if (ratio <= -0.66) return 'var(--green-rate-pastel)'
  if (ratio <= -0.33) return 'var(--yellow-rate-pastel)'

  return null
}