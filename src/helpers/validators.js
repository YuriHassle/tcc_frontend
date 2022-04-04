import { isValidCPF } from './utils'

export class Validator {
  static required(msg) {
    return (v) => !!v || msg || 'Este campo é obrigatório'
  }

  static email() {
    return (v) => /.+@.+/.test(v) || 'E-mail precisa ter um formato válido'
  }

  static maxLen(n) {
    return (v) => !v || v.length <= n || `O número máximo de caracteres é ${n}`
  }

  static minLen(n) {
    return (v) => !v || v.length >= n || `O número mínimo de caracteres é ${n}`
  }

  static min(n) {
    return (v) => !v || v >= n || `O valor mínimo é ${n}`
  }

  static len(n) {
    return (v) => !v || v.length === n || `O número de caracteres deve ser ${n}`
  }

  static confirm(match, field) {
    return (v) =>
      !v ||
      v === match ||
      `O valor informado deve ser idêntico ao campo ${field}`
  }
  static cpf() {
    return (v) => !v || isValidCPF(v) || 'Número de CPF inválido'
  }
}
