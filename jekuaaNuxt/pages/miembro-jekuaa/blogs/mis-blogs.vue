<template>
    <div class="container">
        <h3 class="titulo-presentacion mt-5">
            Mis blogs
        </h3>
        <v-divider></v-divider>
        <div class="mt-10" v-if="blogs.length">
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
</template>

<script>
import Spinner from '@/components/Spinner'
import listaBlogs from '@/components/blogs/lista-blogs'
import buscadorInfinitoBlogs from '@/components/blogs/buscador-infinito-blogs'

const maximoPorPagina = 3

export default {
    name: 'blogs',
    layout: 'miembroJekuaa',
    middleware: 'esMiembroJekuaa',
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
            noTienePublicaciones: true,
        }
    },
    methods: {
        async inicializarLista () {
            try {
                this.buscando = true
                this.ultimaUID = ''

                let usuario = this.$firebase.auth().currentUser
                let token = await usuario.getIdToken()
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = {
                    ultimaUID: this.ultimaUID, 
                    maximoPorPagina: 5,
                    filtros: this.filtros
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }

                const response = await this.$axios.post('/blog/miembroJekuaa/paginarListaBlogs', body, config)

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

                let usuario = this.$firebase.auth().currentUser
                let token = usuario ? await usuario.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = {
                    ultimaUID: this.ultimaUID, 
                    maximoPorPagina: 5,
                    filtros: this.filtros
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }

                const response = await this.$axios.post('/blog/miembroJekuaa/paginarListaBlogs', body, config)
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
            console.log({
                visible: !data.visible, buscando: this.buscando, existeMasDatos: !this.existeMasDatos
            })
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
    async mounted() {
        await this.inicializarLista()
    },
}
</script>

<style scoped>
.titulo-presentacion {
    color: #683bce;
    font-size: 25px;
    margin-bottom: 10px;
}

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