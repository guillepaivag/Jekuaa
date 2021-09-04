export default function ({ store, redirect }) {
  if (!store.getters['modules/user/autenticado']) {
    return redirect('/auth/signin')
  }
}
