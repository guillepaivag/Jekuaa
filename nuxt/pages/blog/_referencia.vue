<template>
    <div>
        <v-parallax
            dark
            :src="require(`~/assets/img/portada_seccion/${blog.seccion ? blog.seccion : 'sin-seccion'}.webp`)"
            height="350"
        ></v-parallax>
        
        <div class="container mb-5">

            <div class="mb-5">
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

            <div class="contenedor_contenido_padre mb-6">
                <h2 style="text-align: center;">
                    {{blog.titulo}}
                </h2>
            </div>

            <v-btn
                class="iconoMeGusta"
                icon
                :color="meGustaEsteBlog ? '#ff1d89' : ''"
                :disabled="!$store.state.modules.usuarios.emailVerificado"
                v-on:click="accionMeGusta"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            {{ blog.cantidadMeGusta }}

            <v-divider class="" />
            <div class="">
                <visualizador-blog :contenido="contenidoBlog" />
            </div>
            <v-divider class="" />

            <v-btn
                class="iconoMeGusta"
                icon
                :color="meGustaEsteBlog ? '#ff1d89' : ''"
                :disabled="!$store.state.modules.usuarios.emailVerificado"
                v-on:click="accionMeGusta"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            {{ blog.cantidadMeGusta }}

            <v-row class="mt-7 mb-0">
                <v-col cols="12" sm="6">
                    <div class="">
                        <h2 class="subtitulos"> Descripción: </h2>
                        <v-divider class="mt-3 mb-3"/>
                        {{ blog.descripcion }}
                    </div>
                </v-col>
                
                <v-col cols="12" sm="3">
                    <div class="">
                        <h2 class="subtitulos"> Fecha creación: </h2>
                        <v-divider class="mt-3 mb-3"/>
                        {{ new Date(blog.fechaCreacion.seconds * 1000).toISOString().substr(0, 10) }}
                    </div>
                </v-col>

                <v-col cols="12" sm="3">
                    <div class="">
                        <h2 class="subtitulos"> Fecha actualización: </h2>
                        <v-divider class="mt-3 mb-3"/>
                        {{ new Date(blog.fechaActualizacion.seconds * 1000).toISOString().substr(0, 10) }}
                    </div>
                </v-col>
            </v-row>
        </div>

        <ClientOnly>
            <div class="container mb-5">
                <RecomendacionPorSimilitud :uidBlog="blog.uid" />
            </div>
        </ClientOnly>

        <div class="mb-15">
            <carta-presentacion 
                :uidUsuario="blog.publicador" 
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
                    <p>Para dar <b>me gusta</b> a este blog de Classfii debes registrarte o iniciar sesión.</p>
                    <v-divider class="mb-6"></v-divider>
                    <p>Si tienes una cuenta en Classfii puedes iniciar sesión <nuxt-link to="/autenticacion/inicioSesion">aquí</nuxt-link>.</p>
                    <p>En caso que no tengas una cuenta en Classfii puedes registrarte <nuxt-link to="/autenticacion/registro">aquí</nuxt-link></p>
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
import showdown from 'showdown'
import RecomendacionPorSimilitud from '@/components/blogs/RecomendacionPorSimilitud'
import VisualizadorBlog from '@/components/blogs/Visualizador'
import CartaPresentacion from '@/components/usuarios/CartaPresentacion'

export default {
    name: '',
    data() {
        return {
            referenciaBlog: '',
            blog: {},
            contenidoBlog: '',
            meGustaEsteBlog: false,
            dialogRegistro: false,
        }
    },
    components: {
        'carta-presentacion': CartaPresentacion,
        'visualizador-blog': VisualizadorBlog,
        RecomendacionPorSimilitud,
    },
    methods: {
        async accionMeGusta () {
            if (!this.verificarSiInicioSesion()) {
                this.dialogRegistro = true
                return
            }

            if (this.meGustaEsteBlog) {
                await this.quitarMeGusta()
                return
            }
            await this.darMeGusta()
        },
        async darMeGusta () {
            try {
                const usuario = this.$firebase.auth().currentUser
                if (!usuario) {
                    return null
                }

                const token = await usuario.getIdToken()
                this.$store.commit('modules/usuarios/setTOKEN', token)

                let body = {
                    meGusta: true
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.$axios.post(`/serviceBlog/meGusta/${this.blog.uid}`, body, config)

                this.meGustaEsteBlog = true
                this.blog.cantidadMeGusta++
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async quitarMeGusta () {
            try {
                const usuario = this.$firebase.auth().currentUser
                if (!usuario) {
                    return null
                }

                const token = await usuario.getIdToken()
                this.$store.commit('modules/usuarios/setTOKEN', token)

                let body = {
                    meGusta: false
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.$axios.post(`/serviceBlog/meGusta/${this.blog.uid}`, body, config)

                this.meGustaEsteBlog = false
                this.blog.cantidadMeGusta--
            } catch (error) {
                console.log('error: ', error)
            }
        },
        verificarSiInicioSesion () {
            const usuario = this.$store.state.modules.usuarios

            return !!usuario.uid
        }
    },
    computed: {
        
    },
    async created() {
        const usuario = this.$store.state.modules.usuarios

        if (!usuario.uid) return

        const doc = await this.$firebase.firestore()
            .collection('Usuarios')
            .doc(usuario.uid)
            .collection('BlogsMG')
            .doc(this.blog.uid)
            .get()

        this.meGustaEsteBlog = !!doc.exists
        
    },
    async asyncData({ app, $firebase, $axios, redirect, params }) {
        // Variables
        let referenciaBlog = params.referencia
        let blog = {}
        let contenidoBlog = ''
        let breadcrumbs = [
            {
                text: 'Inicio',
                disabled: false,
                href: '/',
            },
            {
                text: 'Blogs',
                disabled: false,
                href: '/blogs',
            },
        ]
        
        try {
            const ref = $firebase.firestore().collection('Blogs')
            .where('referencia', '==', referenciaBlog)
            .where('habilitado', '==', true)
            .where('publicado', '==', true)
            const docsBlogs = await ref.get()

            if (docsBlogs.empty) redirect('/blogs')
            
            const docBlog = docsBlogs.docs[0]
            
            blog = docBlog.data()

            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let response = await $axios.get(`/serviceBlog/obtenerContenido/${blog.uid}`, config)

            const converter = new showdown.Converter()
            contenidoBlog = converter.makeHtml(response.data.resultado)

            breadcrumbs.push({
                text: blog.titulo,
                disabled: true,
                href: `/blog/${blog.referencia}`,
            })

            return {
                referenciaBlog,
                blog,
                contenidoBlog,
                breadcrumbs
            }
        } catch (err) {
            console.log('err', err)
            redirect('/blogs')
        }

    },
}
</script>

<style scoped>
.cabecera_registro {
    background: #683bce;
    color: #ffffff;
    margin-bottom: 20px;
}

.contenedor_contenido_padre {
    display: flex;
    justify-content: center;
    align-items: center;
}

.v-parallax {
    background: #000000;
}

.v-parallax__image-container {
    opacity: .72 !important;
}

.iconoMeGusta:hover {
    color: #683bce !important;
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

@media (min-width: 0px) and (max-width: 599px) { 
    .contenido-l {
        padding: 0;
        margin-bottom: 20px;
    }

    .contenido-d {
        padding: 0;
    }
}
</style>