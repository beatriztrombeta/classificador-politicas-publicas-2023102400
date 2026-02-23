export function riskColor(value) {
  if (value == null) return null

  if (value < 30) return 'var(--green-rate)'
  if (value < 60) return 'var(--yellow-rate)'
  if (value < 80) return 'var(--orange-rate)'
  return 'var(--red-rate)'
}
