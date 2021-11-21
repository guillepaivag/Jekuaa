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
        actualizarBlog(datos) {

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
        const response = await $axios.get(`/blog/obtenerContenido/${datosBlog.uid}`, {
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