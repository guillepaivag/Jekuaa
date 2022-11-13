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

        const usuario = store.state.modules.usuarios
        
        /**
         * ########################################################################################
         * ########################################################################################
         */
        
        function obtenerUidClaseParaRedireccionar (unidades, listaProgresos) {
            for (const unidad of unidades) {
                for (const clase of unidad.clases) {
                    const datosClase = clase.data

                    const existe = listaProgresos.find(v => v === datosClase.uid)

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
        let miCurso = null

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
        console.log('1')
        if (usuario.uid) {
            const docMiCurso = await db
            .collection('Usuarios').doc(usuario.uid)
            .collection('MisCursos').doc(uidCurso)
            .get()

            miCurso = docMiCurso.exists ? docMiCurso.data() : null
        }
        console.log('2')

        if (!miCurso) return redirect(`/cursos`)

        console.log('3')
        const listaProgresos = []
        for (const uidClase of miCurso.clasesVisualizadas) 
            listaProgresos.push(uidClase)
            console.log('4')

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