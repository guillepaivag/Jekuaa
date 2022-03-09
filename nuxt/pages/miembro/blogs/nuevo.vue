<template>
    <div class="container">
        <div class="mt-0">
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

        <div class="mb-10">
            <formulario-blog 
                :datosBlog="datosBlog" 
                :contenidoBlog="contenidoBlog" 
                :accion="'crear'" 
                @crearBlog="crearBlog($event)"
            />
        </div>

        <div v-if="datosCreacion.visible && datosCreacion.creado">
            <v-snackbar
                v-model="datosCreacion.visible"
                :multi-line="multiLine"
                :timeout="-1"
                :value="true"
                color="#683BCE"
                elevation="24"
            >
                ¡Se creo el blog de forma exitosa!

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="#ff1d89"
                    v-bind="attrs"
                    @click="datosCreacion.visible = false"
                    >
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>

<script>
import showdown from 'showdown'
import TurndownService from 'turndown'
import FormularioBlog from '@/components/blogs/formulario-blog'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esMiembro',
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
            datosCreacion: {
                visible: false,
                creado: false,
            },
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
                    text: 'Blogs',
                    disabled: false,
                    href: '/miembro/blogs',
                },
                {
                    text: 'Nuevo',
                    disabled: true,
                    href: '/miembro/blogs/nuevo',
                },
            ],
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
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = {
                    datosBlog,
                    contenidoBlog: contenidoBlog,
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$post(`/apiMiembro/blog/crearBlog`, body, config)

                this.datosCreacion.visible = true
                this.datosCreacion.creado = true
                
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

<style scoped>

</style>