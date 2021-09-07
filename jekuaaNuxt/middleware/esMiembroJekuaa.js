export default function ({ store, redirect }) {
  if (!store.getters['modules/user/user/esMiembroJekuaa']) {
    return redirect('/')
  }
}
