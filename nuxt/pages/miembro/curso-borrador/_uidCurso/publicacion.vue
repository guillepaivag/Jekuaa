<template>
    <div class="container" style="">
        <v-container v-if="publicando" style="height: 400px;">
            <v-row
                class="fill-height"
                align-content="center"
                justify="center"
            >
                <div style="display: block; margin-bottom: -15px;">
                    <v-icon size="70">
                        mdi-check-all
                    </v-icon>
                </div>
                <v-col
                    class="text-subtitle-1 text-center"
                    cols="12"
                    style="margin-bottom: -15px;"
                >
                    ¡Se esta publicando tu curso! 🚀
                </v-col>
                <v-col cols="6">
                    <v-progress-linear
                        color="deep-purple accent-4"
                        indeterminate
                        rounded
                        height="6"
                    ></v-progress-linear>
                </v-col>
            </v-row>
        </v-container>

        <div v-else>
            <v-alert
                v-if="!buscandoErrores"
                outlined
                prominent
                border="left"
                color="#683bce"
                class=""
                style="margin-top: -12px;"
            >
                <v-row align="center">
                    <v-col class="grow">
                        Verificar el curso para publicar.
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#683bce"
                            v-on:click="verificar"
                        >
                            <v-icon left>
                                mdi-check-all
                            </v-icon>
                            Verificar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

            <v-alert
                v-if="verificado && !existeErrores"
                outlined
                prominent
                border="left"
                color="#56C725"
                class=""
                style="margin-top: -12px;"
            >
                <v-row align="center">
                    <v-col class="grow">
                        ¡Publica tu curso! 🚀
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#56C725"
                            v-on:click="publicar"
                        >
                            <v-icon left>
                                mdi-check-decagram
                            </v-icon>
                            Publicar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

            <v-container v-if="buscandoErrores" style="height: 400px;">
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                    <v-col
                        class="text-subtitle-1 text-center"
                        cols="12"
                    >
                        Verificando...
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            color="deep-purple accent-4"
                            indeterminate
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </v-col>
                </v-row>
            </v-container>

            <div v-else>
                <div class="contenedor_noVerificado" v-if="!verificado">
                    <v-icon size="70">
                        mdi-lock
                    </v-icon>

                    <p class="mt-2" style="font-size: 25px;">
                        Falta verificar el curso para publicar
                    </p>
                </div>

                <div v-else>

                    <!-- Publicación -->
                    <div class="contenedor_publicar" v-if="!existeErrores">
                        <div style="display: block;">
                            <v-icon size="70">
                                mdi-check-all
                            </v-icon>
                        </div>

                        <p class="mt-2" style="font-size: 25px;">
                            ¡Verificado! Puedes publicar tu curso 🚀
                        </p>
                    </div>

                    <!-- Errores -->
                    <div class="contenedor_contieneErrores" v-else>
                        <v-icon color="#ff1d89" size="70">
                            mdi-exclamation-thick
                        </v-icon>

                        <p class="mt-2" style="font-size: 25px;">
                            ¡Ups! Hay cosas que mejorar
                        </p>

                        <div class="mt-8">

                            <div class="mb-8" v-if="!!errores.curso.mensajesError.length">
                                <h3>Datos del curso</h3>
                                <!-- Curso -->
                                <v-expansion-panels focusable>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>
                                            {{ errores.curso.titulo }}
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="mt-3">
                                            <p v-for="(message, index) in errores.curso.mensajesError" :key="index">
                                                {{index+1}}. {{ message }}
                                            </p>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>

                            <div class="mb-8" v-if="!!errores.unidades.length">
                                <h3>Unidades</h3>
                                <!-- Unidades -->
                                <v-expansion-panels focusable>
                                    <v-expansion-panel
                                        v-for="(error, index) in errores.unidades" :key="index"
                                    >
                                        <v-expansion-panel-header>
                                            {{ error.nombre }} (U{{error.orden}})
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <p v-for="(message, index) in error.errores" :key="index">
                                                {{index+1}}. {{ message }}
                                            </p>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>

                            <div class="mb-8" v-if="!!errores.clases.length">
                                <h3> Clases y contenidos </h3>
                                <!-- Clases y contenidos -->
                                <v-expansion-panels focusable>
                                    <v-expansion-panel
                                        v-for="(error, index) in errores.clases" :key="index"
                                    >
                                        <v-expansion-panel-header>
                                            {{ error.datosUnidad.nombreUnidad }}(U{{error.datosUnidad.ordenUnidad}})/{{ error.nombre }}(C{{error.orden}})
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            
                                            <v-row no-gutters>
                                                <v-col cols="12" sm="6">
                                                    <h3 class="mt-3 mb-1"> Clase </h3>
                                                    <p v-for="(message, index) in error.errores" :key="index">
                                                        {{index+1}}. {{ message }}
                                                    </p>
                                                </v-col>

                                                <v-col cols="12" sm="6">
                                                    <h3 class="mt-3 mb-1"> Contenido </h3>
                                                    <p v-for="(message, index) in error.datosContenido.mensajesError" :key="index">
                                                        {{index+1}}. {{ message }}
                                                    </p>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esInstructor',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            errores: {
                curso: null,
                unidades: [],
                clases: [],
            },
            existeErrores: false,
            verificado: false,
            buscandoErrores: false,
            publicando: false,
            unsubscribe: null,
        }
    },
    methods: {
        async verificar () {
            this.buscandoErrores = true
            this.verificado = false
            this.existeErrores = false

            this.errores = {
                curso: null,
                unidades: [],
                clases: [],
            }

            const db = fb.firestore()
        
            const ref = db.collection('CursosBorrador').doc(this.uidCurso)
            const doc = await ref.get()
            if (!doc.exists) return
            this.errores.curso = doc.data()

            const snapshotUnidades = await ref
            .collection('UnidadesBorrador').where('contieneErrores', '==', true)
            .get()
            const docsUnidades = snapshotUnidades.docs

            for (let i = 0; i < docsUnidades.length; i++) {
                const docUnidad = docsUnidades[i]
                this.errores.unidades.push({
                    uid: docUnidad.id,
                    orden: docUnidad.data().ordenUnidad,
                    nombre: docUnidad.data().nombreUnidad,
                    errores: docUnidad.data().mensajesError
                })

                this.errores.unidades.sort((e1, e2) => e1.orden - e2.orden)
            }
            
            let ref2 = db.collectionGroup('ClasesBorrador')
            .orderBy(fb.firestore.FieldPath.documentId())
            .startAt(ref.path)
            .endAt(ref.path + "\uf8ff")

            const snapshotClases = await ref2.get()
            const docsClases = snapshotClases.docs

            for (let i = 0; i < docsClases.length; i++) {
                const docClase = docsClases[i]
                const uidUnidad = docClase.ref.parent.parent.id

                const documentoUnidad = await ref
                .collection('UnidadesBorrador').doc(uidUnidad)
                .get()

                const documentoContenido = await ref
                .collection('ContenidoClasesBorrador').doc(docClase.id)
                .get()

                if (docClase.data().contieneErrores || documentoContenido.data().contieneErrores) {
                    this.errores.clases.push({
                        uid: docClase.id,
                        orden: docClase.data().ordenClase,
                        nombre: docClase.data().titulo,
                        errores: docClase.data().mensajesError,
                        datosUnidad: documentoUnidad.data(),
                        datosContenido: documentoContenido.data(),
                    })

                    this.errores.clases.sort((e1, e2) => {
                        if (e1.datosUnidad.ordenUnidad !== e2.datosUnidad.ordenUnidad) 
                            return e1.datosUnidad.ordenUnidad - e2.datosUnidad.ordenUnidad

                        return e1.orden - e2.orden
                    })
                }
            }

            this.existeErrores = !!this.errores.curso.mensajesError.length || 
            !!this.errores.unidades.length || 
            !!this.errores.clases.length

            this.verificado = true
            this.buscandoErrores = false
        },
        async publicar () {
            try {
                this.publicando = true

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = {}

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCurso
                await this.$axios.$put(`/serviceCursoBorrador/miembro/publicar/${uidCurso}`, body, config)

                this.errores = {
                    curso: null,
                    unidades: [],
                    clases: [],
                }

                this.existeErrores = false
                this.verificado = false
                this.buscandoErrores = false
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        }
    },
    async mounted () {
        const db = fb.firestore()

        this.unsubscribe = db.collection('CursosEstadoPublicacion').doc(this.uidCurso).onSnapshot(snapshot => {
            if (snapshot.exists) {
                this.publicando = snapshot.data().estado && !snapshot.data().fechaPublicado
                
                if (!snapshot.data().estado && snapshot.data().fechaPublicado) {
                    this.errores = {
                        curso: null,
                        unidades: [],
                        clases: [],
                    }

                    this.existeErrores = false
                    this.verificado = false
                    this.buscandoErrores = false
                }
            }
        })
    },
    destroyed () {
        this.unsubscribe()
    }
}
</script>

<style scoped>
.contenedor_noVerificado {
    margin-top: 15%;
    text-align: center;
}

.contenedor_publicar {
    margin-top: 15%;
    text-align: center;
}

.contenedor_contieneErrores {
    margin-top: 5%;
    text-align: center;
}

.cargando {
    width: 20px;
}
</style>