export const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/
export const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/

const onlyDigits = (v = "") => String(v).replace(/\D/g, "")

export function maskCPF(value) {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

export function maskTelefone(value) {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length === 0) return ""
  if (d.length <= 2) return `(${d}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function maskDateTime(value) {
  if (!value) return ""

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  const pad = (n) => String(n).padStart(2, "0")

  const dia = pad(date.getDate())
  const mes = pad(date.getMonth() + 1)
  const ano = date.getFullYear()
  const hora = pad(date.getHours())
  const minuto = pad(date.getMinutes())

  return `${dia}/${mes}/${ano} ${hora}:${minuto}`
}