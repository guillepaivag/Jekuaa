export default function ({ store, redirect }) {
  if (!store.getters['modules/user/user/autenticado']) {
    return redirect('/auth/signin')
  }
}
