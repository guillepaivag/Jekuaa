export default function ({ store, redirect }) {
  if (store.getters['modules/usuarios/autenticado']) {
    return redirect('/centro')
  }
}
