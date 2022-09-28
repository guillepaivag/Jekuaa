<template>
    <div class="vistaClase">

        <div class="mt-10 mb-10">
            <v-row>
                <v-col cols="12" :style="!mostrarListaClases ? 'margin-top: -15px;' : ''" :md="mostrarListaClases ? '8' : '12'">
                    <!-- Contenido de la clase -->
                    <nuxt-child 
                        v-if="!cargandoDatosCurso"
                        :uidCurso="uidCurso"
                        :datosCurso="datosCurso"
                        :unidades="unidades" 
                        :mostrarListaClases="mostrarListaClases" 
                        :listaProgresos="listaProgresos"
                        @agregarListaClases="agregarListaClases($event)"
                        @cambioClase="cambiarClase($event)"
                    />
                </v-col>
                <v-col cols="12" md="4" v-if="mostrarListaClases">

                    <v-btn
                        class="btnAgregarListaClases mb-3"
                        outlined
                        block
                        text
                        color="#683bce"
                        v-on:click="quitarListaClases"
                    >
                        Quitar lista de clases
                    </v-btn>
                    
                    <!-- Lista de unidades y clases -->
                    <ListaUnidadesClases 
                        :codigo="codigo" 
                        :unidades="unidades" 
                        :listaProgresos="listaProgresos"
                    />

                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

import ListaUnidadesClases from '@/components/cursos-publicado/estudiante/ListaUnidadesClases'

export default {
    name: '',
    
    layout: '',
    middleware: '',

    data() {
        return {
            codigo: this.$route.params.codigo,
            uidCurso: '',
            datosCurso: null,
            unidades: [],
            mostrarListaClases: true,
            cargandoDatosCurso: true,
            porcentajeProgreso: 0,
            listaClases: [],
            listaProgresos: [],
            miCurso: null,
        }
    },

    components: {
        ListaUnidadesClases,
    },
    
    methods: {
        quitarListaClases () {
            this.mostrarListaClases = false
        },

        agregarListaClases (data = {}) {
            this.mostrarListaClases = true
        },
        async cambiarClase (data) {
            console.log('data', data)
            const { datosClase } = data

            if ( this.miCurso ) {
                if ( this.miCurso.tipoAcceso === 'completo' ) {
                    if (!this.listaProgresos.find(v => v.uidClase === datosClase.uid)) {
                        this.listaProgresos.push({
                            uidCurso: this.uidCurso,
                            uidClase: datosClase.uid,
                            visualizado: true,
                        })

                        this.calcularPorcentajeProgreso(this.listaClases, this.listaProgresos)
                    }
                } else if ( this.miCurso.tipoAcceso === 'vistaPrevia' ) {
                    if (datosClase.vistaPrevia) {
                        this.listaProgresos.push({
                            uidCurso: this.uidCurso,
                            uidClase: datosClase.uid,
                            visualizado: true,
                        })

                        this.calcularPorcentajeProgreso(this.listaClases, this.listaProgresos)
                    }
                }
            } else {
                if (datosClase.vistaPrevia) {
                    this.listaProgresos.push({
                        uidCurso: this.uidCurso,
                        uidClase: datosClase.uid,
                        visualizado: true,
                    })

                    this.calcularPorcentajeProgreso(this.listaClases, this.listaProgresos)
                }
            }
        },
        calcularPorcentajeProgreso (listaClases, listaProgresos) {
            let cantidadProgresosClases = 0

            for (const clase of listaClases) {
                if (listaProgresos.find(v => v.uidClase === clase.uid)) 
                    cantidadProgresosClases++
            }

            this.porcentajeProgreso = parseInt((cantidadProgresosClases * 100) / listaClases.length)
        },
    },

    watch: {
        
    },

    async created () {
        const usuario = this.$store.state.modules.usuarios

        const snapshotCurso = await db
        .collection('CursosPublicado').where('codigo', '==', this.codigo)
        .get()

        if (snapshotCurso.empty) {
            this.$router.push('/cursos')
            return
        }

        this.uidCurso = snapshotCurso.docs[0].id
        this.datosCurso = snapshotCurso.docs[0].data()
        
        // Lista unidades/clases
        const snapshotUnidades = await db
        .collection('CursosPublicado').doc(this.uidCurso)
        .collection('UnidadesPublicado').orderBy('ordenUnidad')
        .get()

        let i = 0
        let unidades = []
        for (const doc1 of snapshotUnidades.docs) {
            unidades.push({
                data: doc1.data(),
                clases: []
            })

            const snapshot2 = await db
            .collection('CursosPublicado').doc(this.uidCurso)
            .collection('UnidadesPublicado').doc(doc1.id)
            .collection('ClasesPublicado').orderBy('ordenClase').get()

            for (const doc2 of snapshot2.docs) {
                unidades[i].clases.push({
                    data: doc2.data(),
                    contenido: null
                })
                this.listaClases.push(doc2.data())
            }

            i++
        }

        if (usuario.uid) {
            const docMiCurso = await db
            .collection('Usuarios').doc(usuario.uid)
            .collection('MisCursos').doc(this.uidCurso)
            .get()

            this.miCurso = docMiCurso.exists ? docMiCurso.data() : null
        
            const snapshotProgresoClase = await this.$firebase.firestore()
            .collection('Usuarios')
            .doc(usuario.uid)
            .collection('MisCursos')
            .doc(this.uidCurso)
            .collection('ProgresosClases')
            .get()

            this.listaProgresos = []
            for (const docProgresoClase of snapshotProgresoClase.docs) {
                this.listaProgresos.push(docProgresoClase.data())
            }

            this.calcularPorcentajeProgreso(this.listaClases, this.listaProgresos)
        }

        this.unidades = unidades

        this.cargandoDatosCurso = false
    },
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