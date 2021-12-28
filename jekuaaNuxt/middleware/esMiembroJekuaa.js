export default function ({ store, redirect }) {
  if (!store.getters['modules/usuarios/esMiembroJekuaa']) {
    if (!store.getters['modules/usuarios/autenticado']) {
      return redirect('/')
    }

    return redirect('/inicio')
  }
}
