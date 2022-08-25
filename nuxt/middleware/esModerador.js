export default function ({ store, redirect }) {
    if (!store.getters['modules/usuarios/autenticado']) return redirect('/')
    if (!store.getters['modules/usuarios/esModerador']) return redirect('/')
}
  