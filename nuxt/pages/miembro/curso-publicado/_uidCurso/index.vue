<template>
    <div class="container">
        <div class="mt-0 mb-0">
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

        <div class="mt-5" v-if="datosCurso">

            <v-alert
                v-if="datosCurso.habilitado"
                dense
                text
                color="success"
            >
                <v-row align="center">
                    <v-col class="grow">
                        <v-icon color="success" class="mr-2">
                            mdi-check-circle
                        </v-icon>
                        ¡Tu curso esta publicado!
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            :disabled="!uidPrimeraClase"
                            class=""
                            outlined
                            color="success"
                            :to="`/miembro/curso-publicado/${uidCurso}/clase/${uidPrimeraClase}`"
                            icon
                            style="margin-right: -10px;"
                        >
                            <v-icon>
                                mdi-play-box-outline
                            </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            v-if="datosCurso.responsable === $store.state.modules.usuarios.uid"
                            class=""
                            outlined
                            color="success"
                            :to="`/miembro/curso-publicado/${uidCurso}/ajustes`"
                            icon
                        >
                            <v-icon>
                                mdi-cog
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

            <v-alert
                v-else
                dense
                outlined
                color="error"
            >
                <v-row align="center">
                    <v-col class="grow">
                        <v-icon color="error" class="mr-2">
                            mdi-alert-circle
                        </v-icon>
                        Tu curso fue deshabilitado por la moderación de Jekuaapy. <u class="verDeshabilitado"> ¿Por qué? </u>
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            :disabled="!uidPrimeraClase"
                            class=""
                            outlined
                            color="error"
                            :to="`/miembro/curso-publicado/${uidCurso}/clase/${uidPrimeraClase}`"
                            icon
                            style="margin-right: -10px;"
                        >
                            <v-icon>
                                mdi-play-box-outline
                            </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            v-if="datosCurso.responsable === $store.state.modules.usuarios.uid"
                            class=""
                            outlined
                            color="error"
                            :to="`/miembro/curso-publicado/${uidCurso}/ajustes`"
                            icon
                        >
                            <v-icon>
                                mdi-cog
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

            <!-- Manejo de vistas -->
            <div class="mt-7">
                <v-btn
                    class="mb-1 mr-1"
                    outlined
                    color="#683bce"
                    :disabled="vista === 'informacion'"
                    v-on:click="vista = 'informacion'"
                >
                    Información
                </v-btn>

                <v-btn
                    class="mb-1 mr-1"
                    outlined
                    color="#683bce"
                    :disabled="vista === 'fotos'"
                    v-on:click="vista = 'fotos'"
                >
                    Fotos del curso
                </v-btn>

                <v-btn
                    class="mb-1 mr-1"
                    outlined
                    color="#683bce"
                    :disabled="vista === 'precio'"
                    v-on:click="vista = 'precio'"
                >
                    Precios
                </v-btn>

                <v-btn
                    class="mb-1 mr-1"
                    outlined
                    color="#683bce"
                    :disabled="vista === 'contribuyentes&auxiliares'"
                    v-on:click="vista = 'contribuyentes&auxiliares'"
                >
                    Contribuyentes y Auxiliares
                </v-btn>
            </div>

            <v-row class="mt-7 mb-7">
                <v-col cols="12" md="9">
                    <!-- Informacion del curso -->
                    <div class="" v-if="vista === 'informacion'">
                        <h3>Información del curso:</h3>

                        <v-row class="text-center mt-3">
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="datosCurso.uid"
                                    readonly
                                    label="UID"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="datosCurso.codigo"
                                    readonly
                                    label="Código"
                                ></v-text-field>
                            </v-col>
                        </v-row>


                        <v-row class="text-center">
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="datosCurso.equipo ? 'Jekuaapy' : 'Sin equipo'"
                                    readonly
                                    label="Equipo"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :loading="!datosResponsable"
                                    :value="datosResponsable ? datosResponsable.displayName : 'Cargando..'"
                                    readonly
                                    label="Responsable"
                                ></v-text-field>
                            </v-col>
                        </v-row>


                        <v-row class="text-center">
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="datosCurso.titulo"
                                    readonly
                                    label="Titulo"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="6">
                                <v-textarea
                                    :value="datosCurso.descripcion"
                                    readonly
                                    label="Descripción"
                                ></v-textarea>
                            </v-col>
                        </v-row>


                        <v-row class="">
                            <v-col class="" cols="12" md="4">
                                <v-text-field
                                    :value="getNivel(datosCurso.nivel).nombre"
                                    readonly
                                    label="Nivel"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="4">
                                <v-text-field
                                    :value="getNombreSeccion(datosCurso.seccion)"
                                    readonly
                                    label="Seccion"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="4">
                                <h4>Categorias:</h4>
                                <ul class="mt-2">
                                    <li v-for="(categoria, index) in datosCurso.categorias" :key="index">
                                        {{ getNombreCategoriaPorSeccion(datosCurso.seccion, categoria) }}
                                    </li>
                                </ul>
                            </v-col>
                        </v-row>


                        <v-row class="text-center">
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="secondsToString(datosCurso.duracion)"
                                    readonly
                                    label="Duración"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="getIdioma(datosCurso.idioma).nombre"
                                    readonly
                                    label="Idioma"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="">
                            <v-col class="" cols="12" md="6">
                                <h4>Requisitos:</h4>
                                <ul class="mt-2">
                                    <li v-for="(requisito, index) in datosCurso.requisitos" :key="index">
                                        {{ requisito }}
                                    </li>
                                </ul>
                            </v-col>
                            <v-col class="" cols="12" md="6">
                                <h4>Objetivos:</h4>
                                <ul class="mt-2">
                                    <li v-for="(objetivo, index) in datosCurso.objetivos" :key="index">
                                        {{ objetivo }}
                                    </li>
                                </ul>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- Fotos del curso -->
                    <div class="" v-else-if="vista === 'fotos'">
                        <h3 class="">Foto del curso:</h3>
                        <v-img
                            lazy-src="https://picsum.photos/id/11/10/6"
                            max-height="300"
                            max-width="600"
                            :src="datosCurso.fotoPerfil"
                        ></v-img>

                        <h3 class="mt-5">Foto de portada:</h3>
                        <v-img
                            lazy-src="https://picsum.photos/id/11/10/6"
                            max-height="500"
                            :src="datosCurso.fotoPortada"
                        ></v-img>

                    </div>

                    <!-- Datos del precio -->
                    <div class="" v-else-if="vista === 'precio'">
                        <h3>Datos del precio:</h3>

                        <v-row class="text-center mt-3">
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="`${datosCurso.datosPrecio.precio} JP`"
                                    readonly
                                    label="Precio"
                                ></v-text-field>
                            </v-col>
                            <v-col class="" cols="12" md="6">
                                <v-text-field
                                    :value="datosCurso.datosPrecio.descuento ? `${(datosCurso.datosPrecio.descuento.porcentaje*100).toFixed()}%` : 'Sin descuento'"
                                    readonly
                                    label="Descuento"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <div v-if="datosCurso.datosPrecio.descuento">
                            <v-text-field
                                :value="(datosCurso.datosPrecio.precio * (1-datosCurso.datosPrecio.descuento.porcentaje)).toFixed()"
                                readonly
                                label="Precio con descuento"
                            ></v-text-field>
                            
                            <v-date-picker
                                :value="getDates()"
                                color="#683bce"
                                class="mt-5"
                                no-title
                                range
                                full-width
                                readonly
                            ></v-date-picker>
                        </div>

                    </div>

                    <!-- Contribuyentes y Auxiliares -->
                    <div class="" v-else-if="vista === 'contribuyentes&auxiliares'">
                        <h3 class="mb-3">Contribuyentes:</h3>
                        <div class="contenedorFlex">
                            <v-card
                                v-for="(contribuyente, index) in contribuyentes" :key="index"
                                :loading="!!contribuyente.proceso"
                                class="contenedorFlexAuxiliar"
                                :disabled="!!contribuyente.proceso"
                            >
                                <template slot="progress">
                                    <v-progress-linear
                                        :color="setColorVProgressLinear(contribuyente.proceso)"
                                        height="10"
                                        indeterminate
                                    ></v-progress-linear>
                                </template>

                                <v-img
                                    v-if="contribuyente.photoURL"
                                    height="200"
                                    :src="contribuyente.photoURL"
                                ></v-img>
                                <v-img
                                    v-else
                                    height="200"
                                    :src="require(`~/assets/img/loading1.jpg`)"
                                ></v-img>

                                <v-card-title>
                                    {{
                                        contribuyente.displayName ?
                                        contribuyente.displayName : 'Cargando...'
                                    }}
                                </v-card-title>

                                <v-card-text style="margin-top: -10px; margin-bottom: 35px;">

                                    <div class="text-subtitle-1">
                                        Contribuyente
                                    </div>

                                </v-card-text>
                            </v-card>
                        </div>

                        <h3 class="mt-10 mb-3">Auxiliares:</h3>
                        <div class="contenedorFlex">
                            <v-card
                                v-for="(auxiliar, index) in auxiliares" :key="index"
                                :loading="!!auxiliar.proceso"
                                class="contenedorFlexAuxiliar"
                                :disabled="!!auxiliar.proceso"
                            >
                                <template slot="progress">
                                    <v-progress-linear
                                        :color="setColorVProgressLinear(auxiliar.proceso)"
                                        height="10"
                                        indeterminate
                                    ></v-progress-linear>
                                </template>

                                <v-img
                                    v-if="auxiliar.photoURL"
                                    height="200"
                                    :src="auxiliar.photoURL"
                                ></v-img>
                                <v-img
                                    v-else
                                    height="200"
                                    :src="require(`~/assets/img/loading1.jpg`)"
                                ></v-img>

                                <v-card-title>
                                    {{
                                        auxiliar.displayName ?
                                        auxiliar.displayName : 'Cargando...'
                                    }}
                                </v-card-title>

                                <v-card-text style="margin-top: -10px; margin-bottom: 35px;">

                                    <div class="text-subtitle-1">
                                        Auxiliar
                                    </div>

                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                </v-col>

                <v-col cols="12" md="3">
                    <v-divider class="divider mb-5"></v-divider>

                    <p>
                        <b>Publicado:</b> 

                        <v-icon
                            v-if="datosCurso.publicado"
                            color="green darken-2"
                        >
                            mdi-check-circle
                        </v-icon>
                        <v-icon
                            v-else
                            color="red darken-2"
                        >
                            mdi-close-circle
                        </v-icon>
                    </p>

                    <p>
                        <b>Habilitado:</b> 
                        
                        <v-icon
                            v-if="datosCurso.habilitado"
                            color="green darken-2"
                        >
                            mdi-check-circle
                        </v-icon>
                        <v-icon
                            v-else
                            color="red darken-2"
                        >
                            mdi-close-circle
                        </v-icon>
                    </p>

                    <p>
                        <b>Estudiantes:</b> {{ datosCurso.cantidadEstudiantes }}
                    </p>

                    <p>
                        <b>Me gusta:</b> {{ datosCurso.cantidadMeGusta }}
                    </p>

                    <p>
                        <b>Fecha creación:</b> {{ getFecha(datosCurso.fechaCreacion.seconds) }}
                    </p>

                    <p>
                        <b>Fecha actualización:</b> {{ getFecha(datosCurso.fechaActualizacion.seconds) }}
                    </p>

                    <v-btn
                        :loading="!uidPrimeraClase"
                        class="mb-4"
                        outlined
                        color="#ff1d89"
                        :to="`/miembro/curso-publicado/${uidCurso}/clase/${uidPrimeraClase}`"
                    >
                        <v-icon left>
                            mdi-play-box-outline
                        </v-icon>
                        Contenido
                    </v-btn>
                    
                    <v-btn
                        v-if="datosCurso.responsable === $store.state.modules.usuarios.uid"
                        class="mb-4"
                        outlined
                        color="#ff1d89"
                        :to="`/miembro/curso-publicado/${uidCurso}/ajustes`"
                    >
                        <v-icon left>
                            mdi-cog
                        </v-icon>
                        Ajustes
                    </v-btn>

                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import informacionSecciones from '@/helpers/informacionSecciones'
import informacionIdiomas from '@/helpers/informacionIdiomas'
import informacionNiveles from '@/helpers/informacionNiveles'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esMiembro',

    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            datosCurso: null,
            vista: 'informacion',
            datosResponsable: null,
            contribuyentes: [],
            auxiliares: [],
            informacionSecciones: informacionSecciones,
            informacionIdiomas: informacionIdiomas,
            informacionNiveles: informacionNiveles,
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Miembro',
                    disabled: false,
                    href: '/miembro',
                },
                {
                    text: 'Cursos',
                    disabled: false,
                    href: '/miembro/cursos',
                },
                {
                    text: 'Publicados',
                    disabled: false,
                    href: '/miembro/cursos/publicados',
                },
            ],
            uidPrimeraClase: '',
        }
    },

    methods: {
        getFecha (seconds) {
            const milliseconds = seconds * 1000

            return (new Date(milliseconds - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
        getDates() {
            const milliseconds1 = this.datosCurso.datosPrecio.descuento.fechaInicio.seconds * 1000
            const milliseconds2 = this.datosCurso.datosPrecio.descuento.fechaFin.seconds * 1000

            const d1 = new Date(this.datosCurso.datosPrecio.descuento.fechaInicio.seconds * 1000)
            const d2 = new Date(this.datosCurso.datosPrecio.descuento.fechaFin.seconds * 1000)
            
            const date1 = (new Date(milliseconds1 - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            const date2 = (new Date(milliseconds2 - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

            return [date1, date2]
        },
        setColorVProgressLinear (proceso) {
            if (proceso === 'cargando') return '#683bce'
            else if (proceso === false) return ''
        },
        secondsToString(seconds) {
            var hour = Math.floor(seconds / 3600);
            hour = (hour < 10)? '0' + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return hour + ':' + minute + ':' + String(second).split('.')[0];
        },
        getNombreSeccion (uid) {
            return this.informacionSecciones[uid].nombre
        },
        getNombreCategoriaPorSeccion (seccion, uid) {
            return this.informacionSecciones[seccion].categorias[uid].nombre
        },
        getIdioma(idioma) {
            return this.informacionIdiomas[idioma]
        },
        getNivel (nivel) {
            return this.informacionNiveles[nivel]
        },
    },
    async created() {
        const db = fb.firestore()
        const doc = await db.collection('CursosPublicado').doc(this.uidCurso).get()

        if (!doc.exists) return this.$router.push('/miembro/cursos/publicados')

        this.datosCurso = doc.data()

        this.breadcrumbs.push({
            text: this.datosCurso.titulo,
            disabled: true,
            href: `/miembro/curso-publicado/${this.uidCurso}`,
        })

        const config = { headers: { 'Content-Type': 'application/json' } }
        const auth = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${this.datosCurso.instructor}`, config)
        this.datosResponsable = {
            uid: auth.resultado.uid,
            photoURL: auth.resultado.photoURL,
            displayName: auth.resultado.displayName,
        }

        // Cargando..
        for (const contribuyente of this.datosCurso.contribuyentes) {
            this.contribuyentes.push({
                uid: contribuyente,
                photoURL: '',
                displayName: '',
                proceso: 'cargando',
            })
        }

        for (const auxiliar of this.datosCurso.auxiliares) {
            this.auxiliares.push({
                uid: auxiliar,
                photoURL: '',
                displayName: '',
                proceso: 'cargando',
            })
        }

        // Asignar contribuyentes y auxiliares
        const contribuyentesAux = []
        for (const contribuyente of this.contribuyentes) {
            
            const auth = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${contribuyente.uid}`, config)
            contribuyentesAux.push({
                uid: contribuyente.uid,
                photoURL: auth.resultado.photoURL ? auth.resultado.photoURL : '',
                displayName: auth.resultado.displayName,
                proceso: false,
            })
        }
        
        const auxiliaresAux = []
        for (const auxiliar of this.auxiliares) {
            
            const auth = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${auxiliar.uid}`, config)
            auxiliaresAux.push({
                uid: auxiliar.uid,
                photoURL: auth.resultado.photoURL ? auth.resultado.photoURL : '',
                displayName: auth.resultado.displayName,
                proceso: false,
            })
        }

        this.contribuyentes = contribuyentesAux
        this.auxiliares = auxiliaresAux

        const snapshotUnidad = await db.collection('CursosPublicado').doc(this.uidCurso)
        .collection('UnidadesPublicado').where('ordenUnidad', '==', 1)
        .get()

        const snapshotClase = await snapshotUnidad.docs[0].ref
        .collection('ClasesPublicado').where('ordenClase', '==', 1)
        .get()

        this.uidPrimeraClase = snapshotClase.docs[0].id
    },
}
</script>

<style scoped>
.verDeshabilitado {
    cursor: pointer;
}

.contenedorFlex {
    display: flex;
    flex-wrap: wrap;
}

.contenedorFlexAuxiliar {
    margin-right: 6px;
    margin-bottom: 6px;
    max-width: 300px;
}

@media (min-width: 960px) {
    .divider {
        display: none;
    }
}
</style>