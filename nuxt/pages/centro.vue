<template>
    <div class="">

        <div class="container">
            <h2>¡Hola {{$store.state.modules.usuarios.nombreCompleto}}!</h2>
            
            <v-divider class="mt-5 mb-5" />

            <div class="mb-10">
                <v-alert
                    v-if="$store.state.modules.usuarios.emailVerificado"
                    dense
                    text
                    type="success"
                    color="#683bce"
                >
                    ¡Correo verificado con exito!
                </v-alert>
                <v-alert
                    v-else
                    dense
                    text
                    type="error"
                >
                    <v-row align="center">
                        <v-col class="grow">
                            <p style="margin-bottom: 5px;">Falta verificar el correo: <b>{{ $store.state.modules.usuarios.correo }}</b></p>
                            <p style="margin-bottom: 0;">
                                <a href="/cuentas-jekuaapy-sin-verificar">Más información</a> sobre cuentas de Jekuaapy sin verificar.
                            </p>
                        </v-col>
                        <v-col class="shrink">
                            <v-btn
                                v-if="estadoCorreoVerificacion !== 'reenviando'"
                                depressed
                                small
                                color="error"
                                v-on:click="reeviarCorreoVerificacion"
                            >
                                <div v-if="estadoCorreoVerificacion === 'reenviado'">
                                    <v-icon left>
                                        mdi-checkbox-marked-circle-outline
                                    </v-icon>

                                    Volver a enviar verificación
                                </div>

                                <div v-if="estadoCorreoVerificacion === ''">
                                    Reenviar correo de verificación
                                </div>
                                
                            </v-btn>
                            <div v-else>
                                <v-progress-circular 
                                    color="red"
                                    class="mr-1"
                                    indeterminate
                                    :size="20"
                                ></v-progress-circular>
                            </div>
                        </v-col>
                    </v-row>
                    
                </v-alert>
            </div>
            
            <div class="mb-10">
                <UltimosCursosVisualizados :listaMisCursos="listaMisCursos" />
            </div>

            <div class="mb-10" v-for="(item, index) in listaBlogsMG" :key="index">
                <RecomendacionPorDarMGBlog 
                    v-if="blogDisponibleParaRecomendacion(item)"
                    :uidBlog="item.datos.uid" 
                />
            </div>

            <div class="contenedor_contenidos_destacados mb-1">
                <ContenidosDestacados />
            </div>
            
        </div>
        
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
import ContenidosDestacados from '@/components/ContenidosDestacados'
import UltimosCursosVisualizados from '@/components/cursos-publicado/estudiante/UltimosCursosVisualizados'
import RecomendacionPorDarMGBlog from '@/components/blogs/RecomendacionPorDarMG'
// import RecomendacionPorqueVisteCurso from '@/components/cursos/RecomendacionPorqueViste'

const db = fb.firestore()

export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            estadoCorreoVerificacion: '',
            listaMisCursos: [],
            listaBlogsMG: [],
        }
    },
    components: {
        UltimosCursosVisualizados,
        ContenidosDestacados,
        RecomendacionPorDarMGBlog,
        // RecomendacionPorqueVisteCurso,
    },
    methods: {
        getWidth (i) {
            return i % 3 === 0 ? '400' : '233'
        },
        diasDisponiblesParaRecomendacion (seconds, cantidadDiasDisponibles) {
            const diasValidos = 60 * 60 * 24 * 1000 * cantidadDiasDisponibles
            const fechaUltimaActividad = seconds * 1000

            return Date.now() <= fechaUltimaActividad+diasValidos
        },
        blogDisponibleParaRecomendacion (item) {
            // Esta habilitado y publicado
            const disponibleHabilitado = item.datos.habilitado && item.datos.publicado

            // Dias disponibles del me gusta
            return disponibleHabilitado && this.diasDisponiblesParaRecomendacion(item.blogMG.fechaMeGusta.seconds, 3)
        },
        cursoDisponibleParaRecomendacion (item) {
            // Esta habilitado y publicado
            const disponibleHabilitado = item.datos.habilitado && item.datos.publicado

            // Dias disponibles del me gusta
            return disponibleHabilitado && this.diasDisponiblesParaRecomendacion(item.miCurso.ultimaActividad.seconds, 5)
        },
        calcularPorcentajeProgreso (miCurso, refMiCurso) {
            const cantidadVisualizada = miCurso.cantidadVisualizada
            const cantidadClases = refMiCurso.datos.cantidadClases

            const porcentajeProgreso = parseInt((cantidadVisualizada * 100) / cantidadClases)

            refMiCurso.progreso = porcentajeProgreso
        },

        async reeviarCorreoVerificacion () {
            try {
                this.estadoCorreoVerificacion = 'reenviando'

                // await new Promise(res => {
                //     setTimeout(() => {
                //         res()
                //     }, 2000)
                // })

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                await this.$axios.$get(`/serviceUsuario/reeviarCorreoVerificacion`, config)

                this.estadoCorreoVerificacion = 'reenviado'

            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
            
        }
    },
    async created () {
        const usuario = this.$store.state.modules.usuarios

        const snapshotMisCursos = await db
        .collection('Usuarios').doc(usuario.uid)
        .collection('MisCursos')
        .orderBy('ultimaActividad', 'desc')
        .limit(3)
        .get()

        const listaMisCursos = []
        for (const doc of snapshotMisCursos.docs) {
            const miCurso = doc.data()

            // Referencia del curso publicado
            const refCurso = db.collection('CursosPublicado').doc(miCurso.uid)

            // Obtener datos del curso
            const docCurso = await refCurso.get()
            const curso = docCurso.data()

            // Settear datos y progreso del curso
            listaMisCursos.push({
                miCurso: miCurso,
                datos: curso,
                progreso: 0,
            })

            // Calcular progreso del curso
            const refMiCurso = listaMisCursos[listaMisCursos.length-1]
            this.calcularPorcentajeProgreso(miCurso, refMiCurso)
        }
        this.listaMisCursos = listaMisCursos

        const snapshotBlogsMG = await db
        .collection('Usuarios').doc(usuario.uid)
        .collection('BlogsMG')
        .orderBy('fechaMeGusta', 'desc')
        .limit(1)
        .get()

        const listaBlogsMG = []
        for (const doc of snapshotBlogsMG.docs) {
            const blogMG = doc.data()

            // Referencia del blog
            const refBlog = db.collection('Blogs').doc(blogMG.uid)

            // Obtener datos del blog
            const docBlog = await refBlog.get()
            const blog = docBlog.data()

            listaBlogsMG.push({
                blogMG: blogMG,
                datos: blog,
            })
        }

        this.listaBlogsMG = listaBlogsMG

    },
}
</script>

<style scoped>
.contenedor_contenidos_destacados {
    /* max-width: 1080px; */
}
</style>