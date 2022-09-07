<template>
    <div class="">

        <div class="text-center contenedor_cargando" v-if="!clasePublicado || !contenidoClasesPublicado">
            <v-progress-circular
                indeterminate
                :size="70"
                :width="7"
                color="primary"
            ></v-progress-circular>
        </div>

        <div v-else>
            <!-- Contenido de la clase -->
            <div v-if="!contenido">
                Cargando contenido 🚀
                <v-progress-linear
                class="mt-1"
                indeterminate
                color="#683bce"
                ></v-progress-linear>
            </div>
            <VisualizadorVideo 
                v-else-if="contenidoClasesPublicado.tipoContenido === 'video'" 
                :options="contenido" 
            />
            <VisualizadorYoutube 
                v-else-if="contenidoClasesPublicado.tipoContenido === 'video-youtube'"
                :codigoVideoYoutube="contenido" 
            />
            <VisualizadorArticulo 
                v-else-if="contenidoClasesPublicado.tipoContenido === 'articulo'"
                :contenido="contenido" 
            />

            <v-divider class="my-5"></v-divider>

            <!-- Información de la clase seleccionada -->
            <v-row>
                <v-col cols="12" :md="listaClases ? 12 : 8">
                    <div v-if="clasePublicado && contenidoClasesPublicado">
                        <h3 class="mb-2"> 
                            <v-icon 
                                v-if="clasePublicado.tipoClase === 'video'"
                                size="29"
                                color="#683bce"
                                class="mb-1"
                            >
                                mdi-play-circle
                            </v-icon>
                            <v-icon 
                                v-if="clasePublicado.tipoClase === 'video-youtube'"
                                size="29"
                                color="#683bce"
                                class="mb-1"
                            >
                                mdi-youtube
                            </v-icon>
                            <v-icon 
                                v-if="clasePublicado.tipoClase === 'articulo'"
                                size="29"
                                color="#683bce"
                            >
                                mdi-file-multiple
                            </v-icon>
                            {{ clasePublicado.titulo }} 
                        </h3>
                        <span> {{ clasePublicado.descripcion }} </span>
                        <v-divider class="my-3"></v-divider>
                        <h4>
                            Creación: 
                            {{ new Date(contenidoClasesPublicado.fechaCreacion.seconds * 1000).toISOString().substr(0, 10) }}
                        </h4>
                        <h4>
                            Actualización: 
                            {{ new Date(contenidoClasesPublicado.fechaActualizacion.seconds * 1000).toISOString().substr(0, 10) }}
                        </h4>
                    </div>
                </v-col>
                <v-col cols="12" v-if="!listaClases" :md="listaClases ? 0 : 4">

                    <!-- Boton para agregar lista de unidades/clases al padre -->
                    <v-btn
                        class="btnAgregarListaClases mb-3"
                        outlined
                        block
                        color="#683bce"
                        v-on:click="agregarListaClases"
                    >
                        Agregar lista de clases
                    </v-btn>

                    <!-- Lista de unidades y clases -->
                    <ListaUnidadesClases 
                        :uidCurso="uidCurso" 
                        :unidades="unidades" 
                    />

                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>
import VisualizadorArticulo from '@/components/cursos/VisualizadorArticulo'
import VisualizadorVideo from '@/components/cursos/VisualizadorVideo'
import VisualizadorYoutube from '@/components/cursos/VisualizadorYoutube'
import ListaUnidadesClases from '@/components/cursos-publicado/miembro/ListaUnidadesClases'
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            uidClase: this.$route.params.uidClase,
            clasePublicado: null,
            contenidoClasesPublicado: null,
            contenido: null,
        }
    },

    props: {
        listaClases: Boolean,
        unidades: Array,
    },

    components: {
        VisualizadorArticulo,
        VisualizadorVideo,
        VisualizadorYoutube,
        ListaUnidadesClases,
    },

    methods: {
        secondsToString (seconds) {
            var hour = Math.floor(seconds / 3600);
            hour = (hour < 10)? '0' + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return hour + ':' + minute + ':' + String(second).split('.')[0];
        },
        agregarListaClases () {
            this.$emit('agregarListaClases', {})
        },
        async inicializacionDeClase () {
            this.uidClase = this.$route.params.uidClase

            this.clasePublicado = null
            this.contenidoClasesPublicado = null
            this.contenido = null

            // Get documentos clase y contenidoClase
            const snapshot = await db.collectionGroup('ClasesPublicado').where('uid', '==', this.uidClase).get()
            const docClasePublicado = snapshot.docs[0]

            this.clasePublicado = docClasePublicado.data()

            const docContenidoClasesPublicado = await db
            .collection('CursosPublicado').doc(this.uidCurso)
            .collection('ContenidoClasesPublicado').doc(this.uidClase)
            .get()

            this.contenidoClasesPublicado = docContenidoClasesPublicado.data()

            // Get contenidoClase de Storage
            let token = this.$firebase.auth().currentUser
            token = token ? await token.getIdToken() : ''
            await this.$store.dispatch('modules/usuarios/setTOKEN', token)

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            let respuesta = {}
            if (this.contenidoClasesPublicado.tipoContenido === 'video') {
                respuesta = await this.$axios.$get(`/serviceCursoPublicado/miembro/obtenerVideo/${this.uidCurso}/${this.uidClase}`, config)
                
                this.contenido = {
                    autoplay: false,
                    controls: true,
                    sources: [
                        {
                            src: respuesta.resultado,
                            type: this.contenidoClasesPublicado.mimeType
                        }
                    ]
                }
            } else if (this.contenidoClasesPublicado.tipoContenido === 'articulo') {
                respuesta = await this.$axios.$get(`/serviceCursoPublicado/miembro/obtenerArticulo/${this.uidCurso}/${this.uidClase}`, config)
                this.contenido = respuesta.resultado ? respuesta.resultado : null
            } else if (this.contenidoClasesPublicado.tipoContenido === 'video-youtube') {
                this.contenido = this.contenidoClasesPublicado.codigoVideoYoutube
            }
        }
    },

    watch: {
        '$route.params.uidClase': async function (n, v) {
            await this.inicializacionDeClase()

            // await Axios: marcar clase como participada
        }
    },

    async mounted() {
        await this.inicializacionDeClase()
    },
}
</script>

<style scoped>
.contenedor_cargando {
    margin-top: 25vh;
}

@media (max-width: 959px) {
    .contenedor_cargando {
        margin-top: 25vh;
        margin-bottom: 25vh;
    }
    .btnAgregarListaClases {
        display: none;
    }
}
</style>