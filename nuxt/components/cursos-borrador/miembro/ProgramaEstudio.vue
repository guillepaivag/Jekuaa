<template>
    <div>
        {{ datosUnidades }}
        <br> <br> ------------------- <br> <br>
        {{ datosClases }}
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    data() {
        return {
            datosUnidades: [],
            datosClases: []
        }
    },
    props: {
        uisCurso: String,
    },
    async created() {
        const snapshotUnidad = await fb.firestore()
        .collection('CursosBorrador').doc(this.uisCurso)
        .collection('UnidadesBorrador').get()
        const docsUnidades = snapshotUnidad.docs
        
        for (let i = 0; i < docsUnidades.length; i++) {
            const docUnidad = docsUnidades[i]
            
            const snapshotClase = await fb.firestore()
            .collection('CursosBorrador').doc(this.uisCurso)
            .collection('UnidadesBorrador').doc(docUnidad.id)
            .collection('ClasesBorrador').get()
            const docsClases = snapshotClase.docs

            for (let j = 0; j < docsClases.length; j++) {
                const docClase = docsClases[j]
                
                const docContenidoClase = await fb.firestore()
                .collection('CursosBorrador').doc(this.uisCurso)
                .collection('ContenidoClasesBorrador').doc(docClase.id)
                .get()

                this.datosClases.push({
                    datosClase: docClase.data(),
                    datosUnidad: {
                        uidUnidad: docUnidad.id,
                        ordenUnidad: docUnidad.data().ordenUnidad,
                    },
                    contenidoClase: docContenidoClase.data()
                })
            }

            this.datosUnidades.push({
                datosUnidad: docUnidad.data(),
                datosClases: this.datosClases
            })
        }
    },
}
</script>

<style>

</style>