<template>
    <div class="container">
        <div v-if="datosBlog">
            <formulario-blog 
                :datosBlog="datosBlog" 
                :contenidoBlog="contenidoBlog" 
                :accion="'actualizar'" 
                @actualizarBlog="actualizarBlog($event)"
            />

            <div v-if="datosActualizacion.visible && datosActualizacion.actualizado">
                <v-snackbar
                    v-model="datosActualizacion.visible"
                    :multi-line="multiLine"
                    :timeout="-1"
                    :value="true"
                    color="#683BCE"
                    elevation="24"
                >
                    ¡Se actualizó el blog de forma exitosa!

                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="#ff1d89"
                        v-bind="attrs"
                        @click="datosActualizacion.visible = false"
                        >
                            Cerrar
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </div>
        <div class="loadingMovie" v-else>
            <spinner />
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import showdown from 'showdown'
import FormularioBlog from '@/components/blogs/formulario-blog'

export default {
    name: '',
    layout: 'miembroJekuaa',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            datosBlog: null,
            contenidoBlog: '',
            imgBlog: '',
            datosActualizacion: {
                visible: false,
                actualizado: false,
            },
        }
    },
    components: {
        'formulario-blog': FormularioBlog,
        'spinner': Spinner,
    },
    methods: {
        async actualizarBlog(datos) {
            try {
                const { uidBlog, datosBlog, contenidoBlog } = datos

                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''
                this.$store.commit('modules/usuarios/setTOKEN', token)

                let cambioDatosBlog = !!Object.keys(datosBlog).length
                let cambioContenidoBlog = !!Object.keys(contenidoBlog).length

                let body = {}

                if (cambioDatosBlog) body.datosBlog = datosBlog

                if (cambioContenidoBlog) body.contenidoBlog = contenidoBlog.md

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/blog/miembroJekuaa/actualizarBlog/${uidBlog}`, body, config)

                this.datosActualizacion.visible = true
                this.datosActualizacion.actualizado = true
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        }
    },
    watch: {
        
    },
    async mounted() {
        try {
            // Obtener datos de blog desde firebase
            const db = this.$firebase.firestore()

            const ref = db.collection('Blogs').where('referencia', '==', this.$route.params.referencia)
            const docs = await ref.get()
            const doc = docs.docs[0]

            if (!doc.exists) this.$router.push('/miembro-jekuaa/blogs/mis-blogs')

            // Obtener contenido del blog desde la api de Jekuaa
            let usuario = this.$firebase.auth().currentUser
            let token = usuario ? await usuario.getIdToken() : ''
            this.$store.commit('modules/usuarios/setTOKEN', token)
            
            const response = await this.$axios.get(`/blog/miembroJekuaa/obtenerContenido/${doc.data().uid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            let converter = new showdown.Converter()

            this.datosBlog = doc.data()
            this.contenidoBlog = converter.makeHtml(response.data.resultado)
        } catch (error) {
            console.log('error', error)
            const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            this.$router.push('/miembro-jekuaa/blogs/mis-blogs')
        }
    },
    // async asyncData({isDev, route, $firebase, $axios, store, env, params, query, req, res, redirect, error}) {
    //     try {
    //         // Variables
    //         let datosBlog = null
    //         let contenidoBlog = ''
    //         let imgBlog = ''
            
    //         // Obtener datos de blog desde firebase
    //         const db = $firebase.firestore()

    //         const ref = db.collection('Blogs').where('referencia', '==', params.referencia)
    //         const docs = await ref.get()
    //         const doc = docs.docs[0]

    //         if (!doc.exists) {
    //             redirect('/miembro-jekuaa/blogs/mis-blogs')
    //         }
            
    //         datosBlog = doc.data()
            
    //         // Obtener contenido del blog desde la api de Jekuaa
    //         const token = store.state.modules.usuarios.token
    //         const response = await $axios.get(`/blog/miembroJekuaa/obtenerContenido/${datosBlog.uid}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })

    //         let converter = new showdown.Converter()

    //         contenidoBlog = converter.makeHtml(response.data.resultado.contenido)
    //         imgBlog = response.data.resultado.imgBlog

    //         return {
    //             datosBlog,
    //             contenidoBlog,
    //             imgBlog,
    //         }
    //     } catch (error) {
    //         console.log('err', error)
    //         redirect('/miembro-jekuaa/blogs/mis-blogs')
    //     }
    // },
}
</script>

<style scoped>
.loadingMovie {
    margin-top: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>