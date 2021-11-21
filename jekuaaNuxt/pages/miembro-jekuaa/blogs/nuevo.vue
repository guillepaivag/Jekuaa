<template>
    <div>
        <div class="mb-10">
            <formulario-blog 
                :datosBlog="datosBlog" 
                :contenidoBlog="contenidoBlog" 
                :accion="'crear'" 
                @crearBlog="crearBlog($event)"
            />

        </div>
    </div>
</template>

<script>
import showdown from 'showdown'
import TurndownService from 'turndown'
import FormularioBlog from '@/components/blogs/formulario-blog'

export default {
    name: '',
    data() {
        return {
            datosBlog: {
                referencia: '',                                     // requerido
                titulo: '',                                         // requerido
                descripcion: '',                                    // requerido
                publicador: this.$store.state.modules.usuarios.uid, // requerido
                seccion: '',                                        // requerido
                categoria: '',                                      // requerido
                subCategorias: [],                                  // requerido
                publicado: true,                                    // opcional
            },
            contenidoBlog: ``,
        }
    },
    components: {
        'formulario-blog': FormularioBlog
    },
    methods: {
        
        async crearBlog (datos) {
            try {
                const { datosBlog, contenidoBlog } = datos

                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                let body = {
                    datosBlog,
                    contenidoBlog: contenidoBlog.md,
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$post(`/blog/miembroJekuaa/crearBlog`, body, config)
                
            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        }
    },
    watch: {
        
    },
    created() {
        
    },
}
</script>

<style>

</style>