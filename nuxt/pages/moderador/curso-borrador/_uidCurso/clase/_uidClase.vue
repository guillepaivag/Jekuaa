<template>
    <div class="">

        <div class="text-center contenedor_cargando" v-if="!claseBorrador || !contenidoClasesBorrador">
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
                v-else-if="contenidoClasesBorrador.tipoContenido === 'video'" 
                :options="contenido" 
            />
            <VisualizadorArticulo 
                v-else-if="contenidoClasesBorrador.tipoContenido === 'articulo'" 
                :contenido="contenido" 
            />
            <VisualizadorYoutube 
                v-else-if="contenidoClasesBorrador.tipoContenido === 'video-youtube'"
                :codigoVideoYoutube="contenido"
            />
            <div v-else>
                <h3>
                    Sin contenido :(
                </h3>
            </div>

            <v-divider class="my-5"></v-divider>

            <!-- Información de la clase seleccionada -->
            <v-row>
                <v-col cols="12" :md="listaClases ? 12 : 8">
                    <div v-if="claseBorrador && contenidoClasesBorrador">
                        <h3 class="mb-2"> 
                            <v-icon 
                                v-if="claseBorrador.tipoClase === 'video'"
                                size="29"
                                color="#683bce"
                                class="mb-1"
                            >
                                mdi-play-circle
                            </v-icon>
                            <v-icon 
                                v-else-if="claseBorrador.tipoClase === 'video-youtube'"
                                size="29"
                                color="#683bce"
                                class="mb-1"
                            >
                                mdi-youtube
                            </v-icon>
                            <v-icon 
                                v-else-if="claseBorrador.tipoClase === 'articulo'"
                                size="29"
                                color="#683bce"
                            >
                                mdi-file-multiple
                            </v-icon>
                            <v-icon 
                                v-else
                                size="29"
                                color="red"
                            >
                                mdi-alert-octagon
                            </v-icon>
                            {{ claseBorrador.titulo }} 
                        </h3>
                        <span> {{ claseBorrador.descripcion }} </span>
                        <v-divider class="my-3"></v-divider>
                        
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
import ListaUnidadesClases from '@/components/cursos-borrador/moderador/ListaUnidadesClases'
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            uidClase: this.$route.params.uidClase,
            claseBorrador: null,
            contenidoClasesBorrador: null,
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

            this.claseBorrador = null
            this.contenidoClasesBorrador = null
            this.contenido = null

            // Get documentos clase y contenidoClase
            const snapshot = await db.collectionGroup('ClasesBorrador').where('uid', '==', this.uidClase).get()
            const docClaseBorrador = snapshot.docs[0]

            this.claseBorrador = docClaseBorrador.data()

            const docContenidoClasesBorrador = await db
            .collection('CursosBorrador').doc(this.uidCurso)
            .collection('ContenidoClasesBorrador').doc(this.uidClase)
            .get()

            this.contenidoClasesBorrador = docContenidoClasesBorrador.data()

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
            if (this.contenidoClasesBorrador.tipoContenido === 'video') {
                respuesta = await this.$axios.$get(`/serviceCursoBorrador/moderador/obtenerVideo/${this.uidCurso}/${this.uidClase}`, config)
                
                this.contenido = {
                    autoplay: false,
                    controls: true,
                    sources: [
                        {
                            src: respuesta.resultado,
                            type: this.contenidoClasesBorrador.mimeType
                        }
                    ]
                }
            } else if (this.contenidoClasesBorrador.tipoContenido === 'video-youtube') {
                this.contenido = this.contenidoClasesBorrador.codigoVideoYoutube
            } else if (this.contenidoClasesBorrador.tipoContenido === 'articulo') {
                respuesta = await this.$axios.$get(`/serviceCursoBorrador/moderador/obtenerArticulo/${this.uidCurso}/${this.uidClase}`, config)
                this.contenido = respuesta.resultado ? respuesta.resultado : null
            } else {
                // Sin contenido
                this.contenido = {}
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