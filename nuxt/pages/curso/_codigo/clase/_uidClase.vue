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

        <div class="contenido" v-else>
            <!-- Contenido de la clase -->
            <div :class="!mostrarListaClases ? 'contenidoFull container' : ''">
                <div v-if="!contenido">
                    Cargando contenido 🚀
                    <v-progress-linear
                        class="mt-1"
                        indeterminate
                        color="#683bce"
                    ></v-progress-linear>
                </div>
                <div v-else-if="tipoAccesoAlCurso === 'sin_acceso'">
                    <SinAccesoCurso :curso="datosCurso" />
                </div>
                <div v-else-if="tipoAccesoAlCurso === 'no_autenticado'">
                    <IniciarSesion />
                </div>
                <div v-else>
                    <VisualizadorVideo 
                        v-if="contenidoClasesPublicado.tipoContenido === 'video'" 
                        :options="contenido" 
                    />
                    <VisualizadorYoutube 
                        v-if="contenidoClasesPublicado.tipoContenido === 'video-youtube'" 
                        :codigoVideoYoutube="contenido" 
                        :autoPlay="true"
                    />
                    <VisualizadorArticulo 
                        v-else-if="contenidoClasesPublicado.tipoContenido === 'articulo'" 
                        :contenido="contenido" 
                    />
                </div>
            </div>
            
            <v-divider :class="!mostrarListaClases ? 'mt-10' : 'mt-6'" class="mt-5 mb-4"></v-divider>

            <!-- Información de la clase seleccionada -->
            <v-row>
                <v-col cols="12" :md="mostrarListaClases ? 12 : 8">
                    <div v-if="clasePublicado && contenidoClasesPublicado">
                        <nuxt-link class="tituloCurso" style="text-decoration: none;" :to="`/curso/${datosCurso.codigo}`" target="_blank">
                            <h3 class="mb-3">
                                {{ datosCurso.titulo }}
                            </h3>
                        </nuxt-link>
                        
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

                        <v-divider class="my-3"></v-divider>

                        <div class="">
                            <ListaContribuyentesClase 
                                :datosCursoProp="datosCurso"
                                :contribuyentes="datosContribuyentes" 
                            />
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" v-if="!mostrarListaClases" :md="mostrarListaClases ? 0 : 4">

                    <!-- Boton para agregar lista de unidades/clases al padre -->
                    <v-btn
                        class="btnAgregarListaClases mb-5"
                        outlined
                        block
                        text
                        color="#683bce"
                        v-on:click="agregarListaClases"
                    >
                        Agregar lista de clases
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
import IniciarSesion from '@/components/cursos/IniciarSesion'
import SinAccesoCurso from '@/components/cursos/SinAccesoCurso'
import VisualizadorArticulo from '@/components/cursos/VisualizadorArticulo'
import VisualizadorVideo from '@/components/cursos/VisualizadorVideo'
import VisualizadorYoutube from '@/components/cursos/VisualizadorYoutube'
import ListaUnidadesClases from '@/components/cursos-publicado/estudiante/ListaUnidadesClases'
import ListaContribuyentesClase from '@/components/usuarios/ListaContribuyentesClase'
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    
    data() {
        return {
            codigo: this.$route.params.codigo,
            uidClase: this.$route.params.uidClase,
            clasePublicado: null,
            contenidoClasesPublicado: null,
            contenido: null,
            tipoAccesoAlCurso: 'con_acceso',
            datosContribuyentes: [],
        }
    },

    props: {
        uidCurso: String,
        datosCurso: Object,
        unidades: Array,
        mostrarListaClases: Boolean,
        listaProgresos: Array,
    },

    components: {
        IniciarSesion,
        SinAccesoCurso,
        VisualizadorArticulo,
        VisualizadorVideo,
        VisualizadorYoutube,
        ListaUnidadesClases,
        ListaContribuyentesClase,
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
        async inicializacionContribuyentes () {
            
            const contribuyentesAux = []
            for (const contribuyente of this.clasePublicado.contribuyentes) {
                const ref = this.$firebase.firestore().collection('Usuarios').doc(contribuyente)
                const doc = await ref.get()
                const datosUsuario = doc.data()

                let config = {
                    headers: { 'Content-Type': 'application/json' }
                }
                const respuesta = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${contribuyente}`, config)
                const datosAuth = respuesta.resultado

                contribuyentesAux.push({
                    uid: contribuyente,
                    auth: datosAuth,
                    firestore: datosUsuario,
                })
            }

            this.datosContribuyentes = contribuyentesAux
        },
        async inicializacionDeClase () {
            this.uidClase = this.$route.params.uidClase

            this.clasePublicado = null
            this.contenidoClasesPublicado = null
            this.contenido = null

            // Get documentos clase y contenidoClase
            const snapshot = await db.collectionGroup('ClasesPublicado').where('uid', '==', this.uidClase).get()
            if (snapshot.empty) this.$router.push(`/curso/${this.codigo}`)
            this.clasePublicado = snapshot.docs[0].data()

            this.inicializacionContribuyentes()

            this.$emit('cambioClase', {
                datosClase: this.clasePublicado,
            })

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
            try {
                if (this.contenidoClasesPublicado.tipoContenido === 'video') {
                    respuesta = await this.$axios.$get(`/serviceCursoPublicado/obtenerVideo/${this.uidCurso}/${this.uidClase}`, config)
                    
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
                    respuesta = await this.$axios.$get(`/serviceCursoPublicado/obtenerArticulo/${this.uidCurso}/${this.uidClase}`, config)
                    this.contenido = respuesta.resultado ? respuesta.resultado : null
                } else if (this.contenidoClasesPublicado.tipoContenido === 'video-youtube') {
                    respuesta = await this.$axios.$get(`/serviceCursoPublicado/obtenerVideoYoutube/${this.uidCurso}/${this.uidClase}`, config)
                    this.contenido = respuesta.resultado ? respuesta.resultado.codigoVideoYoutube : null
                }
            } catch (error) {
                console.log('error.response', error.response)
                this.contenido = {}
                if (error.response.data.mensaje === 'sin_acceso_a_la_clase') {
                    this.tipoAccesoAlCurso = 'sin_acceso'
                } else if (error.response.data.mensaje === 'usuario_no_autenticado') {
                    this.tipoAccesoAlCurso = 'no_autenticado'
                }
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

.contenido .contenidoFull {
    align-items: center;
    justify-content: center;
}

.contenidoFull {
    max-width: 50em;
    padding: 0 !important;
}

.tituloCurso {
    color: #683bce;
    display: inline-block;
    transition: 400ms;
}

.tituloCurso:hover {
    color: #7a4ee1;
    transition: 400ms;
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