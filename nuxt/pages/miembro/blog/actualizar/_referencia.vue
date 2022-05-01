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

        <div v-if="datosBlog">
            <FormularioBlogActualizar 
                :datosBlogProps="datosBlog" 
                :contenidoBlogProps="contenidoBlog" 
                @actualizarBlog="actualizarBlog($event)"
            />

            <div v-if="datosActualizacion.visible && datosActualizacion.actualizado">
                <v-snackbar
                    v-model="datosActualizacion.visible"
                    :multi-line="multiLine"
                    :timeout="-1"
                    :value="true"
                    color="#683BCE"
                    elevation="24"
                >
                    ¡Se actualizó el blog de forma exitosa!

                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="#ff1d89"
                        v-bind="attrs"
                        @click="datosActualizacion.visible = false"
                        >
                            Cerrar
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </div>
        <div class="loadingMovie" v-else>
            <spinner />
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import showdown from 'showdown'
import FormularioBlogActualizar from '@/components/blogs/miembro/formulario-blog-actualizar'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esBlogger',
    data() {
        return {
            datosBlog: null,
            contenidoBlog: '',
            imgBlog: '',
            datosActualizacion: {
                visible: false,
                actualizado: false,
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
                    text: 'Mis cursos',
                    disabled: false,
                    href: '/miembro/cursos/mis-cursos',
                },
            ],
        }
    },
    components: {
        FormularioBlogActualizar,
        'spinner': Spinner,
    },
    methods: {
        async actualizarBlog(datos) {
            try {
                const { uidBlog, datosBlog, contenidoBlog } = datos

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let cambioDatosBlog = !!Object.keys(datosBlog).length
                let cambioContenidoBlog = !!Object.keys(contenidoBlog).length

                let body = {}

                if (cambioDatosBlog) body.datosBlog = datosBlog

                if (cambioContenidoBlog) body.contenidoBlog = contenidoBlog

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/apiMiembro/blog/actualizar/${uidBlog}`, body, config)

                this.datosActualizacion.visible = true
                this.datosActualizacion.actualizado = true
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        }
    },
    watch: {
        
    },
    async mounted() {
        try {
            // Obtener datos de blog desde firebase
            const db = this.$firebase.firestore()

            const ref = db.collection('Blogs').where('referencia', '==', this.$route.params.referencia)
            const docs = await ref.get()
            const doc = docs.docs[0]

            if (!doc.exists) this.$router.push('/miembro/blogs/mis-blogs')

            // Obtener contenido del blog desde la api de Jekuaa
            let usuario = this.$firebase.auth().currentUser
            let token = usuario ? await usuario.getIdToken() : ''
            await this.$store.dispatch('modules/usuarios/setTOKEN', token)
            
            const response = await this.$axios.get(`/apiMiembro/blog/obtenerContenido/${doc.data().uid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const contenido = response.data.resultado ? response.data.resultado : ''

            let converter = new showdown.Converter()

            this.datosBlog = doc.data()
            this.contenidoBlog = converter.makeHtml(contenido)

            this.breadcrumbs.push({
                text: this.datosBlog.titulo,
                disabled: false,
                href: `/miembro/blog/${this.$route.params.referencia}`,
            })

            this.breadcrumbs.push({
                text: 'Actualizar',
                disabled: true,
                href: `/miembro/blog/actualizar/${this.$route.params.referencia}`,
            })
        } catch (error) {
            console.log('error', error)
            const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            this.$router.push('/miembro/blogs/mis-blogs')
        }
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
</style>