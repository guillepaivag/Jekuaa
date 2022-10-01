<template>
    <div>
        <v-parallax
            dark
            class="my-v-parallax"
            :src="curso.fotoPortada"
        >
            <div class="container contenedor_presentacion">
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="contenedor_contenido">
                            <h1 class="text-h4 font-weight-thin mb-4">
                                {{curso.titulo}}
                            </h1>
                            <p class="">
                                {{curso.descripcion}}
                            </p>

                            <p class="">
                                <b>Duración:</b> {{secondsToString(curso.duracion)}}
                            </p>

                            <p class="">
                                <b>Nivel:</b> {{getNivel(curso.nivel).nombre}}
                            </p>

                            <div class="mb-4" v-if="curso.datosPrecio.precio === 0">
                                <b>Gratis</b>
                            </div>
                            <div class="mb-4" v-else>
                                <!-- Pago comun -->
                                <div v-if="!estaEnDescuento(curso.datosPrecio.descuento)">
                                    <b>Precio:</b> 
                                    <v-chip
                                        class=""
                                        color="white"
                                        outlined
                                        style="font-size: 17px;"
                                        small
                                    >
                                        {{ curso.datosPrecio.precio }} JP
                                    </v-chip>
                                </div>

                                <!-- Pago con descuento -->
                                <div v-else>
                                    <b>Precio:</b>
                                    <v-chip
                                        class=""
                                        color="white"
                                        outlined
                                        style="font-size: 17px;"
                                        small
                                    >
                                        {{ curso.datosPrecio.descuento.precio }} JP
                                    </v-chip>
                                    <b 
                                        class="ml-1 text-decoration-line-through"
                                        style="color: #ffffff; font-size: 15px;"
                                    >
                                        {{ curso.datosPrecio.precio }} JP
                                    </b>
                                </div>
                            </div>

                            <v-btn
                                v-if="!$store.state.modules.usuarios.uid"
                                outlined
                                x-large
                                color="white"
                                to="/inicioSesion"
                            >
                                Iniciar sesión
                            </v-btn>

                            <v-btn
                                v-else-if="miCurso && 
                                miCurso.tipoAcceso === 'completo' && 
                                miCurso.cantidadVisualizada < curso.cantidadClases"
                                outlined
                                x-large
                                color="white"
                                :to="`/curso/${curso.codigo}/continuar`"
                            >
                                Continuar
                            </v-btn>

                            <v-btn
                                v-else-if="miCurso && 
                                miCurso.tipoAcceso === 'completo' && 
                                miCurso.cantidadVisualizada === curso.cantidadClases"
                                outlined
                                x-large
                                readonly
                                color="white"
                            >
                                ¡Finalizado!
                            </v-btn>

                            <v-btn
                                v-else-if="curso.datosPrecio.precio === 0"
                                outlined
                                x-large
                                color="white"
                                :to="`/pedidos/nuevo/curso/${curso.uid}`"
                            >
                                Reclamar
                            </v-btn>

                            <v-btn
                                v-else-if="!estaEnDescuento(curso.datosPrecio.descuento)"
                                outlined
                                x-large
                                color="white"
                                :to="`/pedidos/nuevo/curso/${curso.uid}`"
                            >
                                Comprar
                            </v-btn>

                            <v-btn
                                v-else
                                outlined
                                x-large
                                color="white"
                                :to="`/pedidos/nuevo/curso/${curso.uid}`"
                            >
                                {{
                                    curso.datosPrecio.descuento.precio === 0 ? 
                                    'Reclamar' : 'Comprar'
                                }}
                            </v-btn>

                            <v-btn
                                class="iconoMeGusta ml-2"
                                icon
                                :color="meGustaEsteCurso ? '#ff1d89' : '#ffffff'"
                                :disabled="!$store.state.modules.usuarios.emailVerificado"
                                v-on:click="accionMeGusta"
                            >
                                <v-icon size="30">mdi-heart</v-icon>
                            </v-btn>
                            {{ curso.cantidadMeGusta }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="contenedor_contenido_derecha">
                            <img class="imagen" :src="curso.fotoPerfil" />
                        </div>
                    </v-col>
                </v-row>
            </div>
            
        </v-parallax>

        <v-progress-linear
            v-if="miCurso"
            height="22"
            :value="porcentajeProgreso"
            background-color="#ebebeb"
            color="#683bce"
        >
            <strong style="color: #44DC3F;">
                Progreso {{ porcentajeProgreso }}%
            </strong>
        </v-progress-linear>
        
        <div class="container">

            <!-- Referencias de camino recorrido -->
            <div class="mt-2 mb-0">
                <v-breadcrumbs>
                    <div v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                        <v-breadcrumbs-item
                            :href="breadcrumb.href"
                            :disabled="breadcrumb.disabled"
                            :nuxt="true"
                        >
                            {{ breadcrumb.text.toUpperCase() }}
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-divider v-if="index !== breadcrumbs.length-1">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-breadcrumbs-divider>
                    </div>
                </v-breadcrumbs>
            </div>
            
            <v-row class="contenedor_informacion_curso" no-gutters>
                <v-col class="contenedor_resumen_curso" cols="12" md="7">
                    <div class="resumen_curso">
                        <h2 class="subtitulos"> Resumen del curso 🚀 </h2>
                        <v-divider class="mb-5"/>

                        <div class="mb-12" v-for="(unidad, index) in unidades" :key="index">
                            <h4>
                                {{ index+1 }}. {{ unidad.nombreUnidad }} (<b>{{ secondsToString(unidad.duracion) }}</b>)
                                / <b> Clases: {{ unidad.cantidadClases }} </b> 
                            </h4>
                            <v-divider class="mb-5"/>

                            <div class="contenedor_clase mb-3" v-for="(clase, index2) in unidad.clases" :key="index2">
                                <v-btn
                                    class="objeto_clase"
                                    outlined
                                    rounded
                                    text
                                    color="#683bce"
                                    :to="`/curso/${codigoCurso}/clase/${clase.uid}`"
                                >
                                    <v-icon 
                                        v-if="clase.tipoClase === 'video'"
                                        color="#683bce"
                                        left
                                    >
                                        mdi-play-circle
                                    </v-icon>
                                    <v-icon 
                                        v-else-if="clase.tipoClase === 'video-youtube'"
                                        color="#683bce"
                                        left
                                    >
                                        mdi-youtube
                                    </v-icon>
                                    <v-icon 
                                        v-else-if="clase.tipoClase === 'articulo'"
                                        color="#683bce"
                                        left
                                    >
                                        mdi-file-multiple
                                    </v-icon>
                                    {{ clase.titulo }}

                                    <v-spacer />

                                    <v-icon 
                                        v-if="clase.vistaPrevia"
                                        color="#683bce"
                                        left
                                        title="Vista previa"
                                    >
                                        mdi-lock-open-alert
                                    </v-icon>

                                    {{ secondsToString(clase.duracion) }}
                                </v-btn>
                            </div>

                        </div>

                    </div>
                </v-col>

                <v-col class="contenedor_detalles_curso" cols="12" md="5">
                    <div class="mb-12">
                        <h2 class="subtitulos"> Precio </h2>
                        <v-divider class="mb-3"/>

                        <v-chip
                            v-if="curso.datosPrecio.precio === 0"
                            class="ma-1 px-3"
                            color="green"
                            outlined
                            style="font-size: 20px;"
                        >
                            {{ curso.datosPrecio.precio }} JP
                        </v-chip>

                        <!-- Pago comun -->
                        <v-chip
                            v-else-if="!estaEnDescuento(curso.datosPrecio.descuento)"
                            class="ma-1 px-3"
                            color="green"
                            outlined
                            style="font-size: 20px;"
                        >
                            {{ curso.datosPrecio.precio }} JP
                        </v-chip>

                        <!-- Pago con descuento -->
                        <v-chip
                            v-if="estaEnDescuento(curso.datosPrecio.descuento)"
                            class="ma-1 px-3"
                            color="green"
                            outlined
                            style="font-size: 20px;"
                        >
                            {{ curso.datosPrecio.descuento.precio }} JP
                        </v-chip>

                        <!-- Pago con descuento -->
                        <b 
                            v-if="estaEnDescuento(curso.datosPrecio.descuento)"
                            class="ml-1 text-decoration-line-through"
                            style="color: #8E8E8E; font-size: 15px;"
                        >
                            {{ curso.datosPrecio.precio }} JP
                        </b>

                    </div>
                    
                    <div class="mb-12">
                        <h2 class="subtitulos"> Idioma </h2>
                        <v-divider class="mb-3"/>
                        <v-chip
                            class="ma-1 px-5"
                            color="red"
                            outlined
                        >
                            <v-icon left>
                                mdi-volume-high
                            </v-icon>
                            {{ getIdioma(curso.idioma).nombre }}
                        </v-chip>
                    </div>

                    <div class="mb-12">
                        <h2 class="subtitulos"> Secciones/Categorias </h2>
                        <v-divider class="mb-3"/>

                        <v-chip
                            class="ma-1"
                            color="#683bce"
                            outlined
                        >
                            <v-icon left>
                                mdi-star
                            </v-icon>
                            {{ getNombreSeccion(curso.seccion) }}
                        </v-chip>

                        <v-chip
                            v-for="(categoria, index) in curso.categorias" :key="index"
                            class="ma-1"
                            color="#ff1d89"
                            outlined
                        >
                            <v-icon left>
                                mdi-star-circle-outline
                            </v-icon>
                            {{ getNombreCategoria(curso.seccion, categoria) }}
                        </v-chip>
                    </div>

                    <div class="mb-12">     
                        <h2 class="subtitulos"> Objetivos </h2>
                        <v-divider class="mb-1"/>

                        <ul>
                            <li class="li_color_lila" v-for="(objetivo, index) in curso.objetivos" :key="index">
                                {{ objetivo }}
                            </li>
                        </ul>
                    </div>

                    <div class="mb-12">
                        <h2 class="subtitulos"> Requisitos </h2>
                        <v-divider class="mb-1"/>

                        <ul>
                            <li class="li_color_lila" v-for="(requisito, index) in curso.requisitos" :key="index">
                                {{ requisito }}
                            </li>
                        </ul>
                    </div>

                    <div class="mb-12">
                        <h2 class="subtitulos"> Fecha creación: </h2>
                        <v-divider class="mb-3"/>
                        {{ new Date(curso.fechaCreacion.seconds * 1000).toISOString().substr(0, 10) }}
                    </div>

                    <div class="mb-5">
                        <h2 class="subtitulos"> Fecha actualización: </h2>
                        <v-divider class="mb-3"/>
                        {{ new Date(curso.fechaActualizacion.seconds * 1000).toISOString().substr(0, 10) }}
                    </div>
                </v-col>
                
            </v-row>

        </div>

        <!-- Presentación del instructor -->
        <div class="container mb-15">
            <CartaPresentacionInstructor 
                v-if="curso.contribuyentes.length === 1"
                :uidUsuario="curso.instructor"
            />
            <ListaContribuyentes 
                v-else
                :uidCurso="curso.uid"
                :datosCursoProp="curso"
                :contribuyentes="contribuyentes"
            />
        </div>

        <v-dialog
            v-model="dialogRegistro"
            width="500"
        >
            <v-card>
                <v-card-title class="text-h6 cabecera_registro">
                    Primero debes iniciar sesión
                </v-card-title>

                <v-card-text>
                    <p>Para dar <b>me gusta</b> a este blog de Jekuaapy debes registrarte o iniciar sesión.</p>
                    <v-divider class="mb-6"></v-divider>
                    <p>Si tienes una cuenta en Jekuaapy puedes iniciar sesión <nuxt-link to="/autenticacion/inicioSesion">aquí</nuxt-link>.</p>
                    <p>En caso que no tengas una cuenta en Jekuaapy puedes registrarte <nuxt-link to="/autenticacion/registro">aquí</nuxt-link></p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#683bce"
                    text
                    @click="dialogRegistro = false"
                >
                    Cerrar
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import CartaPresentacionInstructor from '@/components/usuarios/CartaPresentacionInstructor'
import ListaContribuyentes from '@/components/usuarios/ListaContribuyentes'
import informacionSecciones from '@/helpers/informacionSecciones'
import informacionIdiomas from '@/helpers/informacionIdiomas'
import informacionNiveles from '@/helpers/informacionNiveles'

export default {
    name: '',
    data() {
        return {
            meGustaEsteCurso: false,
            dialogRegistro: false,
            miCurso: null,
            unidades: [],
            informacionSecciones: informacionSecciones,
            informacionIdiomas: informacionIdiomas,
            informacionNiveles: informacionNiveles,
            porcentajeProgreso: 0,
            contribuyentes: [],
        }
    },
    components: {
        CartaPresentacionInstructor,
        ListaContribuyentes,
    },
    methods: {
        secondsToString(seconds) {
            var hour = Math.floor(seconds / 3600);
            hour = (hour < 10)? '0' + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return hour + ':' + minute + ':' + String(second).split('.')[0];
        },
        verificarSiInicioSesion () {
            return !!this.$store.state.modules.usuarios.uid
        },
        getNombreSeccion (uid) {
            return this.informacionSecciones[uid].nombre
        },
        getNombreCategoria (seccion, uid) {
            return this.informacionSecciones[seccion].categorias[uid].nombre
        },
        getIdioma(idioma) {
            return this.informacionIdiomas[idioma]
        },
        getNivel (nivel) {
            return this.informacionNiveles[nivel]
        },

        async accionMeGusta () {
            if (!this.verificarSiInicioSesion()) {
                this.dialogRegistro = true
                return
            }
            
            if (this.meGustaEsteCurso) {
                await this.quitarMeGusta()
                return
            }
            await this.darMeGusta()
        },
        async quitarMeGusta () {
            try {
                const usuario = this.$firebase.auth().currentUser
                if (!usuario) return null

                const token = await usuario.getIdToken()
                this.$store.commit('modules/usuarios/setTOKEN', token)

                let body = { meGusta: false }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.$axios.post(`/serviceCursoPublicado/meGusta/${this.curso.uid}`, body, config)

                this.meGustaEsteCurso = false
                this.curso.cantidadMeGusta--
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async darMeGusta () {
            try {
                const usuario = this.$firebase.auth().currentUser
                if (!usuario) return null

                const token = await usuario.getIdToken()
                this.$store.commit('modules/usuarios/setTOKEN', token)

                let body = { meGusta: true }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.$axios.post(`/serviceCursoPublicado/meGusta/${this.curso.uid}`, body, config)

                this.meGustaEsteCurso = true
                this.curso.cantidadMeGusta++
            } catch (error) {
                console.log('error: ', error)
            }
        },
        estaEnDescuento (descuento) {
            if (!descuento) return false

            const currentSecond = Date.now() / 1000
            return currentSecond >= descuento.fechaInicio.seconds && currentSecond < descuento.fechaFin.seconds
        },
        getDescuento (precio, descuento) {
            const descuentoNumero = Number( (precio * (1 - descuento.porcentaje )).toFixed() )
            return descuentoNumero
        },
        calcularPorcentajeProgreso (cantidadClases, cantidadVisualizada) {
            this.porcentajeProgreso = parseInt((cantidadVisualizada * 100) / cantidadClases)
        }
    },
    computed: {
        
    },
    async created() {
        const usuario = this.$store.state.modules.usuarios

        this.unidades = [] 
        const snapshotUnidades = await fb.firestore()
            .collection('CursosPublicado')
            .doc(this.curso.uid)
            .collection('UnidadesPublicado')
            .orderBy('ordenUnidad')
            .get()

        for (let i = 0; i < snapshotUnidades.docs.length; i++) {
            const docUnidad = snapshotUnidades.docs[i]
            const datosUnidad = docUnidad.data()
            datosUnidad.clases = []

            const snapshotClases = await fb.firestore()
                .collection('CursosPublicado')
                .doc(this.curso.uid)
                .collection('UnidadesPublicado')
                .doc(docUnidad.id)
                .collection('ClasesPublicado')
                .orderBy('ordenClase')
                .get()
            
            for (let j = 0; j < snapshotClases.docs.length; j++) {
                const docClase = snapshotClases.docs[j]
                
                datosUnidad.clases.push(docClase.data())
            }

            this.unidades.push(datosUnidad)
        }

        if (!usuario.uid) return

        const docMiCurso = await this.$firebase.firestore()
            .collection('Usuarios')
            .doc(usuario.uid)
            .collection('MisCursos')
            .doc(this.curso.uid)
            .get()

        if (docMiCurso.exists) {
            this.miCurso = docMiCurso.data()
            this.calcularPorcentajeProgreso(this.curso.cantidadClases, this.miCurso.cantidadVisualizada)
        } else {
            this.miCurso = null
        }

        const docCursoMG = await this.$firebase.firestore()
            .collection('Usuarios')
            .doc(usuario.uid)
            .collection('CursosMG')
            .doc(this.curso.uid)
            .get()

        this.meGustaEsteCurso = !!docCursoMG.exists

        if (this.curso.contribuyentes.length > 1) {
            const contribuyentesAux = []
            for (const contribuyente of this.curso.contribuyentes) {
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

            this.contribuyentes = contribuyentesAux
        }
    },
    async asyncData({ app, $firebase, $axios, redirect, params }) {
        // Variables
        let codigoCurso = params.codigo
        let curso = {}
        let breadcrumbs = [
            {
                text: 'Inicio',
                disabled: false,
                href: '/',
            },
            {
                text: 'Cursos',
                disabled: false,
                href: '/cursos',
            },
        ]
        
        try {
            // Obtener datos del curso
            const ref = $firebase.firestore().collection('CursosPublicado')
            .where('codigo', '==', codigoCurso)
            const docsCursos = await ref.get()
            if (docsCursos.empty) redirect('/cursos')
            const docCurso = docsCursos.docs[0]
            curso = docCurso.data()

            if (!curso.habilitado || !curso.publicado) redirect('/cursos')

            breadcrumbs.push({
                text: curso.titulo,
                disabled: true,
                href: `/curso/${curso.codigo}`,
            })

            return {
                codigoCurso,
                curso,
                breadcrumbs
            }
        } catch (err) {
            console.log('err', err)
            redirect('/cursos')
        }

    },
}
</script>

<style lang="scss">
.my-v-parallax {
    .v-parallax__image-container {
        background: rgba(0, 0, 0) !important;

        .v-parallax__image {
            opacity: 0.7 !important;
        }
    }
}
</style>

<style scoped>

/* my-v-parallax
contenedor_presentacion
contenedor_contenido
contenedor_contenido_derecha */

.my-v-parallax {
    height: 600px !important;
}

.contenedor_presentacion {
    max-width: 1200px;
    margin-top: -20px;
}

.contenedor_contenido {
    padding: 0 5px 0 0;
}

.contenedor_contenido_derecha {
    padding: 0 0 0 10px;
}

.imagen {
    width: 100%;
    border-radius: 1.8rem;
}

.iconoMeGusta:hover {
    color: #683bce !important;
}

.contenedor_informacion_curso {
    margin: 30px 0 10px 0;
}

.contenedor_resumen_curso {
    padding-right: 10px !important;
    
}

.contenedor_detalles_curso {
    padding-left: 35px !important;
}

.resumen_curso {
    width: 100%;
}

.contenedor_clase {
    
}

.objeto_clase {
    width: 100%;
    min-height: 42px;
    height: 100% !important;
}

.subtitulos {
    font-size: 22px;
    color: #683bce;
}

.contenido-l {
    padding: 10px;
}

.contenido-d {
    padding: 10px;
}

.cabecera_registro {
    background: #683bce;
    color: #ffffff;
    margin-bottom: 20px;
}

@media (min-width: 0px) and (max-width: 599px) { 
    .contenido-l {
        padding: 0;
        margin-bottom: 20px;
    }

    .contenido-d {
        padding: 0;
    }
}

@media (max-width: 959px) {
    .contenedor_contenido_derecha {
        display: none;
    }

    .contenedor_resumen_curso {
        padding-right: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contenedor_detalles_curso {
        padding-left: 0 !important;
    }
}
</style>