<template>
    <div class="container">

        <div>
            <formulario-blog 
                :datosBlog="datosBlog" 
                :contenidoBlog="contenidoBlog" 
                :accion="'actualizar'" 
                @actualizarBlog="actualizarBlog($event)"
            />

        </div>
    </div>
</template>

<script>
import showdown from 'showdown'
import FormularioBlog from '@/components/blogs/formulario-blog'

export default {
    name: '',
    data() {
        return {
            
        }
    },
    components: {
        'formulario-blog': FormularioBlog
    },
    methods: {
        async actualizarBlog(datos) {
            try {
                const { uidBlog, datosBlog, contenidoBlog } = datos

                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                let cambioDatosBlog = !!Object.keys(datosBlog).length
                let cambioContenidoBlog = !!Object.keys(contenidoBlog).length

                let body = {}

                if (cambioDatosBlog) {
                    body.datosBlog = datosBlog
                }

                if (cambioContenidoBlog) {
                    body.contenidoBlog = contenidoBlog.md
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/blog/miembroJekuaa/actualizarBlog/${uidBlog}`, body, config)
                
            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        }
    },
    watch: {
        
    },
    async asyncData({isDev, route, $firebase, $axios, store, env, params, query, req, res, redirect, error}) {
        // Variables
        let datosBlog = null
        let contenidoBlog = ''
        let imgBlog = ''
        
        // Obtener datos de blog desde firebase
        const db = $firebase.firestore()

        const ref = db.collection('Blogs').where('referencia', '==', params.referencia)
        const docs = await ref.get()
        
        datosBlog = docs.docs[0].data()
        
        // Obtener contenido del blog desde la api de Jekuaa
        const response = await $axios.get(`/blog/estudiante/obtenerContenido/${datosBlog.uid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let converter = new showdown.Converter()

        contenidoBlog = converter.makeHtml(response.data.resultado.contenido)
        imgBlog = response.data.resultado.imgBlog

        return {
            datosBlog,
            contenidoBlog,
            imgBlog,
        }
    },
}
</script>

<style>

</style>