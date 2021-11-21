<template>
    <div>
        <div>
            <formulario-blog 
                :datosBlog="datosBlog" 
                :contenidoBlog="contenidoBlog" 
                :accion="'crear'" 
                @crearBlog="crearBlog($event)"
            />

            <v-divider class="mt-5 mb-5"></v-divider>

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
                referencia: 'hola-mundo-1',     // requerido
                titulo: 'Hola mundo 1',         // requerido
                descripcion: 'Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',    // requerido
                seccion: 'informatica',        // requerido
                categoria: 'redes',      // requerido
                subCategorias: ['tcp'],  // requerido
                publicado: true,    // opcional
            },
            contenidoBlog: `<blockquote><h1>Comenzando con la lógica</h1></blockquote><ul><li><p><em>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock</em>, a Latin professor at Hampden-Sydney College in Virginia, <s>looked up one of the more obscure Latin words, consectetur</s>, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li><li><p><u>ontrary to popular belief, Lorem Ipsum is not simply random text.</u> It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br><hr></li></ul><blockquote><h1>Comenzando con los algoritmos</h1></blockquote><ol><li><p><strong>ontrary to popular belief, Lorem Ipsum is not simply random text.</strong> <a href="https://es.wikipedia.org/wiki/Literatura_en_lat%C3%ADn" rel="noopener noreferrer nofollow">It has roots in a piece of classical Latin literature from 45 BC</a>, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li><li><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></li></ol><br><hr><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br><p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><br>`,
        }
    },
    components: {
        'formulario-blog': FormularioBlog
    },
    methods: {
        htmlToMD (HTML) {
            var options = {
                emDelimiter: '*',
                linkReferenceStyle: 'full',
                linkStyle: 'referenced',
            }

            let turndownService = new TurndownService()
            let markdown = turndownService.turndown(HTML)

            return markdown
        },
        async crearBlog (datos) {
            try {
                const { datosBlog, contenidoBlog } = datos
            
                const datosBlogProduccion = datosBlog
                const contenidoBlogProduccion = this.htmlToMD(contenidoBlog)

                const datosToApi = {
                    datosBlog: datosBlog,
                    contenidoBlog: contenidoBlogProduccion,
                }

                
            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }

            // const strDatos = JSON.stringify(datosToApi)
            // console.log('strDatos', strDatos)
            // const jsonDatos = JSON.parse(strDatos)
            // console.log('jsonDatos', jsonDatos)

            // console.log('datosBlogProduccion', datosBlogProduccion)
            // console.log('contenidoBlogProduccion', contenidoBlogProduccion)
        }
    },
    watch: {
        
    }
}
</script>

<style>

</style>