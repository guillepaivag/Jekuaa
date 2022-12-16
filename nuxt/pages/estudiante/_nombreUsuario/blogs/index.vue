<template>
    <div class="">
        <div class="container text-center mb-15">
            <v-parallax dark :src="require(`~/assets/img/portada_usuario.png`)" height="300" class="mb-15">
                <v-row align="center" justify="center">
                    <v-col class="text-center" cols="12">
                        <h4 class="subheading">
                            {{ authUsuario.displayName }}
                        </h4>
                    </v-col>
                </v-row>
            </v-parallax>

            <div class="componente componente-d" v-if="ultimosBlogs">
                <h2 class="subtitulos colorLila"> ¡Todos los blogs! </h2>
                <v-divider class="mt-3 mb-3" />
                <v-timeline :reverse="true" :dense="$vuetify.breakpoint.smAndDown">
                    <v-timeline-item color="#683bce" v-for="(blog, index) in blogs" :key="index">
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
                <v-divider class="mt-5 mb-5" v-if="existeMasDatos" />

                <div class="text-center mb-5" v-if="existeMasDatos">
                    <v-btn rounded color="blue" class="white--text" v-on:click="paginar">
                        <v-icon left color="white">
                            mdi-plus
                        </v-icon>
                        Mostrar más
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import showdown from 'showdown'

export default {
    data() {
        return {
            MAXIMO: 2,
            pagina: 0,
            ultimoDocumento: null,
            existeMasDatos: false,
            blogsTotalesFiltrados: [],
            blogs: [],
            buscando: true,

        }
    },

    async asyncData({ isDev, route, $axios, $firebase, store, env, params, query, req, res, redirect, error }) {
        // Variables 
        let datosUsuario = null
        let authUsuario = null
        let informacionUsuario = null
        let ultimosBlogs = null
        let existeUsuario = true

        const db = $firebase.firestore()
        const nombreUsuario = params.nombreUsuario

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const snapshot = await db.collection('Usuarios').where('nombreUsuario', '==', nombreUsuario).get()
            if (snapshot.empty) redirect('/')
            const dataUser = snapshot.docs[0].data()

            delete dataUser.plan
            delete dataUser.rol
            delete dataUser.point
            delete dataUser.correo

            const doc = await db.collection('InformacionUsuarios').doc(dataUser.uid).get()
            const infoUser = doc.data()

            // Obtener blogs de usuario
            let responseAuthUsuario = await $axios.$get(`/serviceUsuario/obtenerAuthentication/nombreUsuario/${nombreUsuario}`, config)

            this.buscando = true

            db.collection('Blogs').onSnapshot(snapshot => {
                this.pagina = 0
                this.$store.state.blogs.listaBlogs = []
                this.blogsTotalFiltrados = []
                snapshot.docs.forEach(doc => {
                    this.$store.state.blogs.listaBlogs.push(doc.data())
                    this.blogsTotalFiltrados.push(doc.data())
                })
                this.paginar()
                this.buscando = false
            })

            datosUsuario = dataUser
            informacionUsuario = infoUser
            authUsuario = responseAuthUsuario.resultado

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
    methods: {
        mostrarFechaCreacionBlog(timestapm) {
            const fecha = new Date(timestapm._seconds * 1000)

            return (new Date(fecha.getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
        mostrarDescripcionBlog(texto) {
            let MAX = 70
            if (texto.length > MAX) return texto.substr(0, MAX) + '...'

            return texto
        },
        mostrarTituloBlog(texto) {
            let MAX = 20
            if (texto.length > MAX) return texto.substr(0, MAX) + '...'

            return texto
        },

        paginar() {
            this.pagina++
            let indexInicio = (this.pagina - 1) * this.MAXIMO
            let indexFin = indexInicio + (this.MAXIMO - 1)
            if (!indexInicio) {
                this.blogs = []
            }

            const cantidadBlogs = this.blogsTotalFiltrados.length
            for (let i = indexInicio; i <= indexFin && i < cantidadBlogs; i++) {
                const blog = this.blogsTotalFiltrados[i]
                this.blogs.push(blog)
            }
            this.verificarSiHayMasDatos()
        },

        async verificarSiHayMasDatos() {
            const cantidadBlogs = this.blogsTotalFiltrados.length
            let indexInicioSiguiente = this.pagina * this.MAXIMO
            this.existeMasDatos = indexInicioSiguiente <= cantidadBlogs - 1
        },
    }
}

</script>


<style scoped>
.inicialNombreUsuario {
    font-size: 80px !important;
}

.cardInformacion {
    padding-top: 10px;
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

.colorLila {
    color: #683bce;
}

.colorRosa {
    color: #FF1D89;
}

.colorBlanco {
    color: #FFFFFF;
}

.colorVerde {
    color: #6FC8BA;
}

.colorAmarillo {
    color: #FFDE59;
}

.subtitulos {
    font-size: 40px;
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
    }

}

@media only screen and (max-width: 290px) {
    .subtitulos {
        font-size: 20px;
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
