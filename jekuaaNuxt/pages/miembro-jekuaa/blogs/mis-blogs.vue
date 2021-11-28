<template>
    <div class="mt-5">
        <div class="container">
            <h2>Mis blogs</h2>
            <v-divider class="mt-3 mb-5"></v-divider>
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

const maximoPorPagina = 3

export default {
    name: 'blogs',
    components: {
        'lista-blogs': listaBlogs,
    },
    data() {
        return {
            blogs: [],
            ultimaUID: null,
            existeMasDatos: false,
            buscando: false,
            maximoPorPagina: maximoPorPagina,
            filtros: {
                seccion: '',
                categoria: '',
                subCategorias: '',
                publicador: '',
            },
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
            this.buscando = true

            if (!this.existeMasDatos) {
                this.buscando = false
                return
            }

            let token = this.$firebase.auth().currentUser
            token = token ? await token.getIdToken() : ''
            this.$store.commit('modules/usuarios/setTOKEN', token)

            let body = {
                ultimaUID: this.ultimaUID, 
                maximoPorPagina: 5,
                filtros: {
                    ...this.filtros,
                    publicador: this.$store.state.modules.usuarios.uid,
                }
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }

            const response = await this.$axios.post('/blog/miembroJekuaa/paginarListaBlogs', body, config)
            const nuevosBlogs = response.data.resultado.blogs

            this.blogs.push(...nuevosBlogs)
            this.ultimaUID = response.data.resultado.ultimaUID
            this.existeMasDatos = response.data.resultado.existeMasDatos

            this.buscando = false
        },
        async cargarBlogs (data) {
            if (!data.visible || this.buscando || !this.existeMasDatos) {
                return
            }

            await this.paginar()
        }
    },
    async created() {
        try {
            let token = this.$firebase.auth().currentUser
            token = token ? await token.getIdToken() : ''
            this.$store.commit('modules/usuarios/setTOKEN', token)

            let body = {
                ultimaUID: null, 
                maximoPorPagina: 5,
                filtros: {
                    publicador: this.$store.state.modules.usuarios.uid,
                }
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }

            const response = await this.$axios.post('/blog/miembroJekuaa/paginarListaBlogs', body, config)
            let blogs = response.data.resultado.blogs
            let ultimaUID = response.data.resultado.ultimaUID
            let existeMasDatos = response.data.resultado.existeMasDatos

            this.blogs = blogs
            this.ultimaUID = ultimaUID
            this.existeMasDatos = existeMasDatos
        } catch (error) {
            console.log('error', error)
            const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            this.$router.push('/miembro-jekuaa/blogs/mis-blogs')
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