import { fb } from '@/plugins/firebase'

export default async function ({ store, redirect }) {
    const doc = await fb.firestore().collection('Miembros').doc(store.getters['modules/usuarios/uid']).get()
    if (!doc.exists) return redirect('/')
    if (doc.data().funciones && !doc.data().funciones.includes('instructor')) return redirect('/')
}