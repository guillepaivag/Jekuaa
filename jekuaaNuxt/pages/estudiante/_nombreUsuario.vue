<template>
    <div class="">
        <div v-if="existeUsuario">
            <v-parallax
                dark
                :src="require(`~/assets/img/portada-usuario.jpg`)"
                height="300"
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        class="text-center"
                        cols="12"
                    >
                        <v-avatar
                            color="#683bce"
                            size="150"
                            class="mb-10"
                        >
                            <v-img v-if="!!authUsuario.photoURL" :src="authUsuario.photoURL" />
                            <span v-else class="white--text headline inicialNombreUsuario">
                                {{ inicialNombreUsuario }}
                            </span>
                        </v-avatar>
                        <h4 class="subheading">
                            {{datosUsuario.nombreCompleto}}
                        </h4>
                    </v-col>
                </v-row>
            </v-parallax>

            <div class="container">
                <v-row no-gutters class="mt-2">
                    <v-col
                        cols="12"
                        md="7"
                    >
                        <v-card class="componente componente-i cardInformacion">
                            <h3><strong>{{informacionUsuario.rolDescriptivo}}</strong></h3>
                            <v-divider class="mt-3 mb-3"></v-divider>
                            <p><strong>Nombre usuario:</strong> {{datosUsuario.nombreUsuario}}</p>
                            <p v-if="datosUsuario.nombreCompleto"><strong>Nombre completo:</strong> {{datosUsuario.nombreCompleto}}</p>
                            <p v-if="datosUsuario.fechaNacimiento"><strong>Fecha de nacimiento:</strong> {{fechaNacimientoString}}</p>
                            <p><strong>Comenzó en Jekuaapy:</strong> {{authUsuario.metadata.creationTime}}</p>
                            <p><strong>Ultima vez:</strong> {{authUsuario.metadata.lastSignInTime}}</p>
                            <p v-if="datosUsuario.instructor">
                                <v-icon class="align--center mr-1 mb-3" size="35px" color="#683bce">
                                    mdi-theater
                                </v-icon>
                                Soy instructor de Jekuaapy
                            </p>
                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="5"
                    >
                        <div class="componente componente-d" v-if="informacionUsuario.redesSociales.length">
                            <div v-for="(redSocial, index) in informacionUsuario.redesSociales" :key="index">
                                <v-row no-gutters>         
                                <v-icon class="align--center ml-2 mr-2 mb-3" size="40px" color="#683bce">{{ getRedSocialPorCodigo(redSocial.redSocial).icon }}</v-icon>
                                <v-text-field
                                    readonly
                                    :value="redSocial.urlPerfil"
                                    :label="getRedSocialPorCodigo(redSocial.redSocial).texto"
                                ></v-text-field>
                                </v-row>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <v-divider></v-divider>

            <div class="container mt-4 mb-4" v-if="informacionUsuario.descripcion">
                <h2 class="subtitulos"> ¡Me presento! </h2>
                <v-divider class="mt-3 mb-3"/>
                <p v-html="toHTML(informacionUsuario.descripcion)"></p>
            </div>

            <v-divider></v-divider>
            
            <div class="container" v-if="informacionUsuario.especializaciones || informacionUsuario.intereses">
                <v-row no-gutters>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <div class="componente componente-i">
                            <div>
                                <h2 class="subtitulos" v-if="informacionUsuario.especializaciones"> ¡Mis especializaciones! </h2>
                                <v-divider class="mt-3 mb-3"/>
                                <p v-html="toHTML(informacionUsuario.especializaciones)"></p>
                            </div>
                            <div class="mt-15" v-if="ultimosBlogs.length">
                                <h2 class="subtitulos" v-if="informacionUsuario.intereses"> ¡Mis intereses! </h2>
                                <v-divider class="mt-3 mb-3"/>
                                <p v-html="toHTML(informacionUsuario.intereses)"></p>
                            </div>
                        </div>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <div class="componente componente-d" v-if="ultimosBlogs.length">
                            <h2 class="subtitulos"> ¡Ultimos blogs! </h2>
                            <v-divider class="mt-3 mb-3"/>
                            <v-timeline
                                :reverse="true"
                                :dense="$vuetify.breakpoint.smAndDown"
                            >
                                <v-timeline-item color="#683bce" v-for="(blog, index) in ultimosBlogs" :key="index">
                                    <span slot="opposite">
                                        <nuxt-link class="titulo-link" :to="`/blog/${blog.referencia}`">
                                            {{ mostrarFechaCreacionBlog(blog.fechaCreacion) }}
                                        </nuxt-link>
                                    </span>
                                    <v-card class="elevation-2">
                                        <v-card-title class="text-h6 v-card-title-color">
                                            <nuxt-link class="titulo-link" :to="`/blog/${blog.referencia}`">
                                                {{ mostrarTituloBlog(blog.titulo) }}
                                            </nuxt-link>
                                        </v-card-title>
                                        <v-card-text>
                                            {{ mostrarDescripcionBlog(blog.descripcion) }}
                                        </v-card-text>
                                    </v-card>
                                </v-timeline-item>
                            </v-timeline>
                        </div>
                        <div class="componente componente-d" v-else>
                            <div class="">
                                <h2 class="subtitulos"> ¡Mis intereses! </h2>
                                <v-divider class="mt-3 mb-3"/>
                                <p v-html="toHTML(informacionUsuario.intereses)"></p>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="container" v-else>
            No existe el usuario :(
        </div>
    </div>
</template>

<script>
import showdown from 'showdown'

export default {
    data() {
        return {
            listaRedesSociales: [
                {
                icon: 'mdi-github',
                texto: 'GitHub',
                codigo: 'github',
                },
                {
                icon: 'mdi-instagram',
                texto: 'Instagram',
                codigo: 'instagram',
                },
                {
                icon: 'mdi-facebook',
                texto: 'Facebook',
                codigo: 'facebook',
                },
                {
                icon: 'mdi-twitter',
                texto: 'Twitter',
                codigo: 'twitter',
                },
                {
                icon: 'mdi-twitch',
                texto: 'Twitch',
                codigo: 'twitch',
                },
                {
                icon: 'mdi-linkedin',
                texto: 'LinkedIn',
                codigo: 'linkedin',
                },
                {
                icon: 'mdi-web',
                texto: 'Mi sitio web',
                codigo: 'web',
                },
            ],
        }
    },

    methods: {
        getRedSocialPorCodigo (codigo) {
            return this.listaRedesSociales.find(x => x.codigo === codigo)
        },
        toHTML (texto) {
            var find = '\\n'
            var re = new RegExp(find, 'g')

            return texto.replace(re, '<br>')
        },
        mostrarTituloBlog ( texto ) {
            let MAX = 20
            if (texto.length > MAX) return texto.substr(0, MAX)+'...'

            return texto
            
        },
        mostrarDescripcionBlog ( texto ) {
            let MAX = 70
            if (texto.length > MAX) return texto.substr(0, MAX)+'...'

            return texto
        },
        mostrarFechaCreacionBlog (timestapm) {
            const fecha = new Date(timestapm._seconds * 1000)

            return (new Date(fecha.getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
    },

    computed: {
        inicialNombreUsuario () {
            return this.datosUsuario && this.datosUsuario.nombreUsuario ? this.datosUsuario.nombreUsuario[0].toUpperCase() : ''
        },
        fechaNacimientoString () {
            if (!this.datosUsuario.fechaNacimiento) return ''
            
            const fecha = new Date(this.datosUsuario.fechaNacimiento._seconds * 1000)

            return (new Date(fecha.getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
    },

    async asyncData({isDev, route, $axios, $firebase, store, env, params, query, req, res, redirect, error}) {
        // Variables 
        let datosUsuario = null
        let authUsuario = null
        let informacionUsuario = null
        let ultimosBlogs = null
        let existeUsuario = true

        const db = $firebase.firestore()
        const nombreUsuario = params.nombreUsuario

        try {
            let body = {
                nombreUsuario
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            // Obtener datos de usuario
            let response = {}
            response.datosUsuario = await $axios.$post(`/usuarios/estudiante/datosUsuario`, body, config)
            response.authUsuario = await $axios.$post(`/usuarios/estudiante/authUsuario`, body, config)
            response.informacionUsuario = await $axios.$post(`/usuarios/estudiante/informacionUsuario`, body, config)
            response.ultimosBlogs = await $axios.$get(`/blog/estudiante/ultimosBlogsPorPublicador/${response.datosUsuario.resultado.uid}`, body, config)

            datosUsuario = response.datosUsuario.resultado
            authUsuario = response.authUsuario.resultado
            informacionUsuario = response.informacionUsuario.resultado
            ultimosBlogs = response.ultimosBlogs.resultado
            
        } catch (error) {
            console.log('error - perfil usuario', error)
            const accion = await store.dispatch('modules/sistema/errorHandler', error)
            existeUsuario = false
        }

        return {
            datosUsuario,
            authUsuario,
            informacionUsuario,
            ultimosBlogs,
            existeUsuario,
        }
    },
}
</script>

<style scoped>
.inicialNombreUsuario {
    font-size: 80px !important;
}

.cardInformacion {
    padding: 10px;
}

p strong {
    color: #683bce;
}

h3 strong {
    color: #683bce;
}

.titulo-link {
    text-decoration: none;
    color: #683bce;
}

.subtitulos {
    font-size: 40px;
    color: #683bce;
}

.v-card-title-color {
    color: #683bce;
}

.componente {
    /* margin-top: 20px; */
}

.componente-i {
    padding-right: 10px;
}

.componente-d {
    padding-left: 10px;
}

@media only screen and (max-width: 380px) {
    .subtitulos {
        font-size: 30px;
        color: #683bce;
    }

}

@media only screen and (max-width: 290px) {
    .subtitulos {
        font-size: 20px;
        color: #683bce;
    }

}

@media only screen and (max-width: 959px) {
    .componente {
        margin-top: 40px;
    }
    
    .componente-i {
        padding-right: 0;
    }

    .componente-d {
        padding-left: 0;
    }
    
}

</style>