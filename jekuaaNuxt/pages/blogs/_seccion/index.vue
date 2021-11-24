<template>
    <div>
        <v-dialog
            v-model="dialogBuscadorBlog"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="#683bce"
                >
                    <v-spacer></v-spacer>
                    <v-toolbar-title>
                        Buscador de blogs de Jekuaa
                    </v-toolbar-title>
                    <v-btn
                        class="ml-5 mr-1"
                        icon
                        dark
                        @click="dialogBuscadorBlog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <div class="mt-5">
                    <buscador-infinito-blogs />
                </div>
            </v-card>
        </v-dialog>

        <div class="mt-5 container">
            <v-btn
                class="btnBuscador mb-3"
                color="#683bce"
                dark
                v-on:click="dialogBuscadorBlog = true"
            >
                <v-icon
                    class="mr-2"
                    dark
                >
                    mdi-magnify
                </v-icon>
                Buscar
            </v-btn>

            <v-divider class="mt-1 mb-5"></v-divider>

            <lista-blogs 
                :blogs="blogs"
                :existeMasDatos="existeMasDatos"
                :buscando="buscando"
                @cargarBlogs="cargarBlogs($event)"
            />
        </div>
    </div>
</template>

<script>
import listaBlogs from '@/components/blogs/lista-blogs'
import buscadorBlogs from '@/components/blogs/buscador-blogs'
import buscadorInfinitoBlogs from '@/components/blogs/buscador-infinito-blogs'

const maximoPorPagina = 3

export default {
    name: 'blogs',
    components: {
        'lista-blogs': listaBlogs,
        'buscador-blogs': buscadorBlogs,
        'buscador-infinito-blogs': buscadorInfinitoBlogs,
    },
    data() {
        return {
            buscando: false,
            maximoPorPagina: maximoPorPagina,
            filtros: {
                seccion: this.$route.params.seccion,
            },
            dialogBuscadorBlog: false,
        }
    },
    methods: {
        async inicializarLista () {
            this.buscando = true

            let body = {
                ultimaUID: null, 
                maximoPorPagina: 5,
                filtros: this.filtros
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await this.$axios.post('/blog/estudiante/paginarListaBlogs', body, config)
            this.blogs = response.data.resultado.blogs
            this.ultimaUID = response.data.resultado.ultimaUID
            this.existeMasDatos = response.data.resultado.existeMasDatos

            this.buscando = false
        },
        async paginar () {
            try {
                this.buscando = true

                if (!this.existeMasDatos) {
                    this.buscando = false
                    return
                }

                let body = {
                    ultimaUID: this.ultimaUID, 
                    maximoPorPagina: 5,
                    filtros: this.filtros
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const response = await this.$axios.post('/blog/estudiante/paginarListaBlogs', body, config)
                const nuevosBlogs = response.data.resultado.blogs

                this.blogs.push(...nuevosBlogs)
                this.ultimaUID = response.data.resultado.ultimaUID
                this.existeMasDatos = response.data.resultado.existeMasDatos
            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.buscando = false
            }
        },
        async cargarBlogs (data) {
            if (!data.visible || this.buscando || !this.existeMasDatos) {
                return
            }

            await this.paginar()
        }
    },
    async asyncData({app, $axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
        let body = {
            ultimaUID: null, 
            maximoPorPagina: 5,
            filtros: {
                seccion: params.seccion
            }
        }

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await $axios.post('/blog/estudiante/paginarListaBlogs', body, config)
        let blogs = response.data.resultado.blogs
        let ultimaUID = response.data.resultado.ultimaUID
        let existeMasDatos = response.data.resultado.existeMasDatos

        return {
            blogs,
            ultimaUID,
            existeMasDatos,
        }
    },
}
</script>

<style scoped>
.btnBuscador {
    margin: 0 0 0 29px;
    transition: 600ms;
}

.btnBuscador:hover {
    padding-right: 80px !important;
    transition: 600ms;
}
</style>