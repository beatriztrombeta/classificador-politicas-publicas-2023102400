export function limeColor(value, max = 1) {
  if (value == null) return null

  const v = Math.max(-max, Math.min(max, value))

  if (v > 0.66) return 'var(--red-rate-pastel)'
  if (v > 0.33) return 'var(--orange-rate-pastel)'

  if (v < -0.66) return 'var(--green-rate-pastel)'
  if (v < -0.33) return 'var(--yellow-rate-pastel)'

  return null
}
