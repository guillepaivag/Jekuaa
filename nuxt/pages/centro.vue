<template>
    <div class="">

        <v-row>
            <v-col cols="12" md="4">
                <div
                    v-if="listaMisCursos.length"
                    class="container contenedorUlitmasClasesVisualizadas"
                >
                    <h2 class="mb-5">¡Ultimos cursos visualizados!</h2>

                    <v-row dense>
                        <v-col
                            v-for="(curso, index) in listaMisCursos" :key="index"
                        >
                            <v-card>
                                <v-img
                                    :src="curso.datos.fotoPerfil"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    :height="100"
                                >
                                    <v-card-title v-text="curso.datos.titulo"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                    </v-btn>

                                    <v-btn :to="`/curso/${curso.datos.codigo}`" icon>
                                        <v-icon>mdi-eye-outline</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn
                                        outlined
                                        text
                                        color="#683bce"
                                        class=""
                                        small
                                        :to="`/curso/${curso.datos.codigo}${curso.progreso === 100 ? '' : '/continuar'}`"
                                    >
                                        <b v-if="curso.progreso === 100">¡Finalizado!</b>
                                        <b v-else>🚀 Continuar {{ curso.progreso }}%</b>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>

                </div>
                <div 
                    v-else
                    class="container contenedorUlitmasClasesVisualizadas"
                >
                    <h2 class="mb-5">¿Todavía no tienes cursos?</h2>

                    <v-row dense>
                        <v-col>
                            <v-card>
                                <v-img
                                    :src="require(`~/assets/img/tWyTbZ.webp`)"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    :height="100"
                                >
                                    <v-card-title>
                                        ¡Conoce el mundo de Jekuaapy!
                                    </v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                    </v-btn>

                                    <v-btn to="/cursos" icon>
                                        <v-icon>mdi-eye-outline</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn
                                        outlined
                                        text
                                        color="#683bce"
                                        class=""
                                        small
                                        to="/cursos"
                                    >
                                        <b> Voy a empezar </b>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col cols="12" md="8">
                <div class="container">
                    <h2>¡Hola {{$store.state.modules.usuarios.nombreCompleto}}!</h2>
                    
                    <v-divider class="mt-5 mb-5" />

                    <!-- <div v-for="(item, index) in listaMisCursos" :key="index">
                        <div v-if="cursoDisponibleParaRecomendacion(item)" class="mt-5 mb-10">
                            <RecomendacionPorqueVisteCurso  
                                :uidCurso="item.datos.uid" 
                            />
                        </div>
                    </div> -->

                    <div v-for="(item, index) in listaBlogsMG" :key="index">
                        <div v-if="blogDisponibleParaRecomendacion(item)" class="mt-5 mb-10">
                            <RecomendacionPorDarMGBlog 
                                :uidBlog="item.datos.uid" 
                            />
                        </div>
                    </div>
                    

                    <div class="mt-5 mb-10">
                        <RecomendacionPorSeccionBlog seccion="informatica" />
                    </div>

                    <div class="mt-5 mb-10">
                        <RecomendacionPorSeccionBlog seccion="" />
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
import RecomendacionPorSeccionBlog from '@/components/blogs/RecomendacionPorSeccion'
import RecomendacionPorDarMGBlog from '@/components/blogs/RecomendacionPorDarMG'
// import RecomendacionPorqueVisteCurso from '@/components/cursos/RecomendacionPorqueViste'

const db = fb.firestore()

export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            listaMisCursos: [],
            listaBlogsMG: [],
        }
    },
    components: {
        RecomendacionPorSeccionBlog,
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
            return disponibleHabilitado && this.diasDisponiblesParaRecomendacion(item.blogMG.fechaMeGusta.seconds, 1)
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
        .limit(3)
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
.contenedorUlitmasClasesVisualizadas {
    max-width: 650px;
}
</style>