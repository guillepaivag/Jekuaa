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
                        Buscador de blogs de Jekuaapy
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

        <div class="mt-5">
            
            <div class="cabecera">
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
            </div>

            <div v-if="blogs.length">
                <lista-blogs 
                    :blogs="blogs"
                    :existeMasDatos="existeMasDatos"
                    :buscando="buscando"
                    @cargarBlogs="cargarBlogs($event)"
                />
            </div>
            <div v-else-if="buscando" class="loadingMovie">
                <spinner />
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import listaBlogs from '@/components/blogs/lista-blogs'
import buscadorInfinitoBlogs from '@/components/blogs/buscador-infinito-blogs'

const maximoPorPagina = 3

export default {
    name: 'blogs',
    components: {
        'lista-blogs': listaBlogs,
        'buscador-infinito-blogs': buscadorInfinitoBlogs,
        'spinner': Spinner,
    },
    data() {
        return {
            blogs: [],
            ultimaUID: '',
            existeMasDatos: false,
            buscando: false,
            maximoPorPagina: maximoPorPagina,
            filtros: {
                seccion: this.$route.params.seccion ? this.$route.params.seccion : '',
                categoria: this.$route.params.categoria ? this.$route.params.categoria : '',
                subCategorias: this.$route.params.subCategoria ? [this.$route.params.subCategoria] : [],
            },
            dialogBuscadorBlog: false,
        }
    },
    methods: {
        async inicializarLista () {
            try {
                this.buscando = true
                this.ultimaUID = ''

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

                this.blogs = []
                let aux = []
                for (let i = 0; i < response.data.resultado.blogs.length; i++) {
                    const blog = response.data.resultado.blogs[i]
                    aux.push({
                        blog: blog,
                        publicador: {
                            nombreUsuario: '',
                            fotoPerfil: '',
                        },
                        imgBlog: '',
                    })
                }

                this.blogs.push(...aux)
                this.ultimaUID = response.data.resultado.ultimaUID
                this.existeMasDatos = response.data.resultado.existeMasDatos

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)                
            } finally {
                this.buscando = false
            }
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

                let aux = []
                for (let i = 0; i < nuevosBlogs.length; i++) {
                    const blog = nuevosBlogs[i]
                    aux.push({
                        blog: blog,
                        publicador: {
                            nombreUsuario: '',
                            fotoPerfil: '',
                        },
                        imgBlog: '',
                    })
                }
                
                this.blogs.push(...aux)
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
    watch: {
        blogs: async function (n, v) {
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            for (let i = 0; i < n.length; i++) {
                const infoBlog = n[i]
                
                if (!infoBlog.publicador.nombreUsuario) {
                    const body = {
                        uid: infoBlog.blog.publicador
                    }
                    const response = await this.$axios.post('/usuarios/estudiante/authUsuario', body, config)
                    this.blogs[i].publicador.nombreUsuario = response.data.resultado.displayName
                    this.blogs[i].publicador.fotoPerfil = response.data.resultado.photoURL
                }
            }
        }
    },
    async created() {
        await this.inicializarLista()
    },
}
</script>

<style scoped>
.loadingMovie {
    margin-top: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cabecera {
    margin-left: 50px;
    margin-right: 50px;
}

.btnBuscador {
    margin: 0;
    transition: 600ms;
}

.btnBuscador:hover {
    padding-right: 100px !important;
    transition: 600ms;
}

@media (min-width: 0px) and (max-width: 410px) { 
    .btnBuscador {
        margin-left: 0;
        display: block;
        width: 100%;
    }
}

@media (min-width: 0px) and (max-width: 350px) { 
    .cabecera {
        margin-left: 10px;
        margin-right: 10px;
    }
}
</style>