<template>
    <div class="container">
        <h3 class="titulo-presentacion mt-5">
            Mis blogs
        </h3>
        <v-divider></v-divider>
        <div class="mt-10" v-if="blogs.length">
            <ListaBlogsMiembro 
                :blogs="blogs"
                :existeMasDatos="existeMasDatos"
                :buscando="buscando"
                @cargarBlogs="cargarBlogs($event)"
            />
        </div>
        <div v-else-if="buscando" class="loadingMovie">
            <Spinner />
        </div>
        <div class="mt-10" v-if="!tienePublicaciones">
            No hay datos...
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import ListaBlogsMiembro from '@/components/blogs/miembro/ListaBlogsMiembro'

const maximoPorPagina = 3

export default {
    name: 'blogs',
    layout: 'miembro',
    middleware: 'esMiembro',
    components: {
        ListaBlogsMiembro,
        Spinner,
    },
    data() {
        return {
            blogs: [],
            ultimaUID: '',
            existeMasDatos: false,
            buscando: false,
            maximoPorPagina: maximoPorPagina,
            filtros: {},
            tienePublicaciones: true,
        }
    },
    props: {
        filtrosInicializados: Object,
    },
    methods: {
        async inicializarLista () {
            try {
                this.buscando = true
                this.blogs = []
                this.ultimaUID = ''
                
                let object = {
                    ultimaUID: this.ultimaUID, 
                    filtros: this.filtros, 
                    esRutaEstudiante: false,
                }
                const result = await this.$store.dispatch('modules/blogs/paginarBlogs', object)

                if ( typeof result === 'string' && result === 'NoTieneBlogs' ) {
                    this.blogs = []
                    this.ultimaUID = ''
                    this.existeMasDatos = false
                    this.tienePublicaciones = false
                    return
                }

                const { blogs, ultimaUID, existeMasDatos, } = result

                let aux = []
                for (let i = 0; i < blogs.length; i++) {
                    const blog = blogs[i]
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
                this.ultimaUID = ultimaUID
                this.existeMasDatos = existeMasDatos

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

                const result = await this.$store.dispatch('modules/blogs/paginarBlogs', {
                    ultimaUID: this.ultimaUID, 
                    filtros: this.filtros, 
                    esRutaEstudiante: false,
                })

                if ( typeof result === 'string' && result === 'PaginacionTerminada' ) return

                const { blogs, ultimaUID, existeMasDatos, } = result

                let aux = []
                for (let i = 0; i < blogs.length; i++) {
                    const blog = blogs[i]
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
                this.ultimaUID = ultimaUID
                this.existeMasDatos = existeMasDatos
                
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
                    const response = await this.$axios.get(`/usuario/datosAuthentication/uid/${infoBlog.blog.publicador}`, config)
                    this.blogs[i].publicador.nombreUsuario = response.data.resultado.displayName
                    this.blogs[i].publicador.fotoPerfil = response.data.resultado.photoURL
                }
            }
        }
    },
    async mounted() {
        await this.inicializarLista()
    },
    created() {
        if (!this.filtrosInicializados) return

        this.filtros = {
            ...this.filtrosInicializados
        }
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