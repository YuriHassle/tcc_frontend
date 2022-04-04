import Swal from 'sweetalert2'

export default function alert(
  type,
  title,
  text,
  showConfirmButton = false,
  confirmButtonText = '',
  showCancelButton = false,
  cancelButtonText = '',
  timer = 1500
) {
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
