export default function ({ store, redirect }) {
  if (!store.getters['modules/usuarios/esMiembroJekuaa']) {
    return redirect('/')
  }
}
