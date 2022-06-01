import Swal from 'sweetalert2'

export function alert(type, title, text, options) {
  const {
    showConfirmButton = false,
    confirmButtonText = '',
    showCancelButton = false,
    cancelButtonText = '',
  } = options || {}
  let { timer = 1500 } = options || {}
  let timerProgressBar = true

  if (showConfirmButton) {
    timer = null
    timerProgressBar = null
  }
  return Swal.fire({
    icon: type,
    title,
    text,
    showConfirmButton,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
    timer,
    timerProgressBar,
  })
}

export function errorAlert(action) {
  alert(
    'error',
    'Erro!',
    `Não foi possível ${action}. Por favor, tente novamente em instantes.`
  )
}

export function deleteConfirmationAlert(itemName) {
  return alert(
    'warning',
    'Você tem certeza?',
    `Deseja excluir ${itemName} do banco de dados?`,
    {
      showConfirmButton: true,
      confirmButtonText: 'Sim, excluir!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }
  )
}
