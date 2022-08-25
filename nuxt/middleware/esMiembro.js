export default function ({ store, redirect }) {
  if (!store.getters['modules/usuarios/esMiembro']) {
    if (!store.getters['modules/usuarios/autenticado']) {
      return redirect('/')
    }

    return redirect('/')
  }
}
