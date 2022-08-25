<template>
    <div class="vistaClase">
        Cargando..
    </div>
</template>

<script>

export default {
    name: '',
    
    layout: '',
    middleware: '',

    async asyncData ({ app, store, $firebase, $axios, redirect, params }) {
        
        /**
         * ########################################################################################
         * ########################################################################################
         */
        
        function obtenerUidClaseParaRedireccionar (unidades, listaProgresos) {
            for (const unidad of unidades) {
                for (const clase of unidad.clases) {
                    const datosClase = clase.data

                    const existe = listaProgresos.find(v => v.uidClase === datosClase.uid)

                    if (!existe) return datosClase.uid
                }
            }
        }

        /**
         * ########################################################################################
         * ########################################################################################
         */

        const db = $firebase.firestore()
        const codigo = params.codigo

        const snapshotCurso = await db
        .collection('CursosPublicado').where('codigo', '==', codigo)
        .get()

        if (snapshotCurso.empty) return redirect('/cursos')

        const uidCurso = snapshotCurso.docs[0].id
        
        // Lista unidades/clases
        const snapshotUnidades = await db
        .collection('CursosPublicado').doc(uidCurso)
        .collection('UnidadesPublicado').orderBy('ordenUnidad')
        .get()

        let i = 0
        const unidades = []
        for (const doc1 of snapshotUnidades.docs) {
            unidades.push({
                data: doc1.data(),
                clases: []
            })

            const snapshot2 = await db
            .collection('CursosPublicado').doc(uidCurso)
            .collection('UnidadesPublicado').doc(doc1.id)
            .collection('ClasesPublicado').orderBy('ordenClase').get()

            for (const doc2 of snapshot2.docs) {
                unidades[i].clases.push({
                    data: doc2.data(),
                    contenido: null
                })
            }

            i++
        }

        const usuario = store.state.modules.usuarios

        const snapshotProgresoClase = await db
        .collection('Usuarios')
        .doc(usuario.uid)
        .collection('MisCursos')
        .doc(uidCurso)
        .collection('ProgresosClases')
        .get()

        const listaProgresos = []
        for (const docProgresoClase of snapshotProgresoClase.docs) {
            listaProgresos.push(docProgresoClase.data())
        }

        const uidClase = obtenerUidClaseParaRedireccionar(unidades, listaProgresos)
        return redirect(`/curso/${codigo}/clase/${uidClase}`)
    }
}
</script>

<style scoped>
.vistaClase {
    margin: 0 30px;
}

.tituloUnidad {
    
}

.tituloClase {
    font-size: 13px;
}

@media (max-width: 959px) {
    .btnAgregarListaClases {
        display: none;
    }
}

@media (max-width: 599px) {
    .vistaClase {
        margin: 0 5px;
    }
}
</style>