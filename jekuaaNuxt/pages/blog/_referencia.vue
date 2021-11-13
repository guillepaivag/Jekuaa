<template>
    <div>
        <v-parallax
            dark
            :src="imgBlog"
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
                    <h1 class="text-h4 font-weight-thin mb-4">
                        Jekuaa
                    </h1>
                    <h4 class="subheading">
                        {{blog.titulo}}
                    </h4>
                </v-col>
            </v-row>
        </v-parallax>
        
        <div class="container mt-10 mb-5">
            <v-btn
                class="iconoMeGusta"
                icon
                :color="meGustaEsteBlog ? '#ff1d89' : ''"
                v-on:click="accionMeGusta"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            {{ blog.cantidadMeGusta }}

            <v-divider class="" />
            <div class="mt-5 mb-5" v-html="contenidoBlog"></div>
            <v-divider class="" />

            <v-btn
                class="iconoMeGusta"
                icon
                :color="meGustaEsteBlog ? '#ff1d89' : ''"
                v-on:click="accionMeGusta"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            {{ blog.cantidadMeGusta }}
        </div>

        <div class="mb-15">
            <carta-presentacion 
                :uidUsuario="blog.publicador" 
            />
        </div>
    </div>
</template>

<script>
import showdown from 'showdown'

import CartaPresentacion from '@/components/usuarios/CartaPresentacion'

export default {
    name: '',
    data() {
        return {
            meGustaEsteBlog: false
        }
    },
    components: {
        'carta-presentacion': CartaPresentacion
    },
    methods: {
        async accionMeGusta () {
            if (!this.verificarSiInicioSesion()) {
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

                this.$axios.post(`/blog/estudiante/meGusta/${this.blog.uid}`, body, config)

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

                this.$axios.post(`/blog/estudiante/meGusta/${this.blog.uid}`, body, config)

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
    async created() {

        const usuario = this.$store.state.modules.usuarios

        if (!usuario.uid) {
            return
        }

        const doc = await this.$firebase.firestore()
            .collection('Usuarios')
            .doc(usuario.uid)
            .collection('BlogsMG')
            .doc(this.blog.uid)
            .get()

        this.meGustaEsteBlog = !!doc.exists
        
    },
    async asyncData({ app, $firebase, redirect, params }) {
        try {
            // Variables
            let referenciaBlog
            let blog
            let contenidoBlog
            let imgBlog

            referenciaBlog = params.referencia
            const ref = $firebase.firestore().collection('Blogs').where('referencia', '==', referenciaBlog)
            const docsBlogs = await ref.get()

            if (docsBlogs.empty) {
                redirect('/blog')
            }
            
            const docBlog = docsBlogs.docs[0]
            
            blog = docBlog.data()
            if (!blog.habilitado || !blog.publicado) {
                redirect('/blog')
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let response = await app.$axios.get(`/blog/obtenerContenido/${blog.uid}`, config)

            const converter = new showdown.Converter()
            contenidoBlog = converter.makeHtml(response.data.contenido)
            imgBlog = response.data.imgBlog

            return {
                referenciaBlog,
                blog,
                contenidoBlog,
                imgBlog,
            }
        } catch (err) {
            console.log('err', err)
            redirect('/blog')
        }
    },
}
</script>

<style>
.nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
}
.nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
}
.nuxt-content p {
    margin-bottom: 20px;
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

</style>