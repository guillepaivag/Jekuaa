export default function ({ store, redirect }) {
  console.log('state.usuarios: ', store.state.modules.usuarios)
  if (!store.getters['modules/usuarios/esMiembroJekuaa']) {
    if (!store.getters['modules/usuarios/autenticado']) {
      return redirect('/')
    }

    return redirect('/inicio')
  }
}
