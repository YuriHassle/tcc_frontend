export function serializeParams(obj) {
  let queryString = '?'
  for (let key in obj) {
    queryString += `${key}=${obj[key]}&`
  }
  return queryString
}

export function isValidCPF(cpf) {
  if (!cpf) return false

  let sum = 0
  let rest = 0

  cpf = cpf.replace(/[^0-9]/g, '')

  if (
    cpf.length !== 11 ||
    !Array.from(cpf).filter((e) => e !== cpf[0]).length
  ) {
    return false
  }

  for (let i = 1; i <= 9; i += 1) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i)
  }

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return false
  }

  sum = 0

  for (let i = 1; i <= 10; i += 1) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i)
  }

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return false
  }

  return true
}
