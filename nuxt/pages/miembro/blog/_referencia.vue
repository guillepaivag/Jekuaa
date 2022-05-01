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
        
        <div class="mt-5">
            <v-btn
                depressed
                color="#683bce"
                class="white--text"
                :to="`/miembro/blog/actualizar/${$route.params.referencia}`"
            >
                Actualizar
            </v-btn>
            <v-btn
                depressed
                color="red"
                class="white--text"
                v-on:click="estadoDialogEliminacion = !estadoDialogEliminacion"
            >
                Eliminar
            </v-btn>
            <v-btn
                v-if="datosBlog"
                :disabled="!datosBlog.contieneErrores"
                depressed
                color="blue"
                class="white--text"
                v-on:click="mostrarErrores"
            >
                Errores
            </v-btn>
        </div>

        <v-divider class="mt-5 mb-0"></v-divider>

        <div v-if="datosBlog">
            <FormularioBlogLeer 
                :datosBlogProps="datosBlog" 
                :contenidoBlogProps="contenidoBlog" 
            />
        </div>
        <div class="loadingMovie" v-else>
            <spinner />
        </div>

        <v-dialog
            v-if="datosBlog"
            v-model="estadoDialogEliminacion"
            max-width="800px"
        >
            <v-card>
                <v-card-title class="informacionAccion textoInformacionAccion">
                    ¿Quieres borrar este blog?
                </v-card-title>
                <v-card-text class="informacionAccion textoInformacionAccion">
                    Esta acción borrará permanentemente el blog, y no se podrá recuperar los datos eliminados.
                </v-card-text>
                <v-card-text class="mt-5">
                    Para confirmar que deseas borrar este blog, escribe su ID: <b>{{ datosBlog.uid }}</b>
                </v-card-text>

                <div class="container text-center" max-width="400px">
                    <v-text-field
                        class="inputConfirmacionAccion"
                        v-model="uidConfirmacion"
                        :label="datosBlog.uid"
                        required
                    ></v-text-field>
                </div>

                <v-card-actions class="d-flex flex-row-reverse pb-5 pt-5">
                    <v-btn
                        class="ml-4 mr-3"
                        :disabled="uidConfirmacion != datosBlog.uid || eliminando"
                        color="red"
                        text
                        @click="eliminarBlog"
                    >
                        Eliminar blog
                    </v-btn>

                    <v-btn
                        color="grey darken-2"
                        text
                        @click="estadoDialogEliminacion = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-if="datosBlog"
            v-model="verErroresBlog"
            max-width="400px"
        >
            <v-card>
                <v-card-title class="backgroundErrores textoErrores">
                    Errores en este blog
                </v-card-title>

                <v-card-text class="mt-5">
                    <ErroresBlog :contieneErroresProps="datosBlog.contieneErrores" :mensajesErrorProps="datosBlog.mensajesError" />
                </v-card-text>

                <v-card-actions class="d-flex flex-row-reverse pb-5 pt-2">
                    <v-btn
                        class="white--text"
                        color="blue"
                        @click="verErroresBlog = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import showdown from 'showdown'
import FormularioBlogLeer from '@/components/blogs/miembro/formulario-blog-leer'
import ErroresBlog from '@/components/blogs/miembro/ErroresBlog'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esBlogger',
    data() {
        return {
            datosBlog: null,
            contenidoBlog: '',
            estadoDialogEliminacion: false,
            uidConfirmacion: '',
            eliminando: false,
            verErroresBlog: false,
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
        FormularioBlogLeer,
        ErroresBlog,
        'spinner': Spinner,
    },
    methods: {
        mostrarErrores () {
            this.verErroresBlog = !this.verErroresBlog
        },
        async eliminarBlog () {
            try {
                this.eliminando = true
                this.estadoDialogEliminacion = false

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$delete(`/apiMiembro/blog/eliminar/${this.uidConfirmacion}`, config)

                this.$nuxt.$options.router.push('/miembro/blogs/mis-blogs')
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            
            } finally {
                this.eliminando = false
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

            let converter = new showdown.Converter()

            // Asignar valores
            this.datosBlog = doc.data()
            this.contenidoBlog = converter.makeHtml(response.data.resultado)

            this.breadcrumbs.push({
                text: this.datosBlog.titulo,
                disabled: true,
                href: `/miembro/blog/${this.$route.params.referencia}`,
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

.informacionAccion {
    /* rgba(230, 62, 62, 0.159) */
    background-color: rgba(255, 29, 137, 0.159);
}

.textoInformacionAccion {
    color: rgb(197, 52, 52);
}

.backgroundErrores {
    background-color: rgb(52, 100, 197);
}

.textoErrores {
    color: rgb(255, 255, 255)
}

.inputConfirmacionAccion {
    margin-left: 12px;
    margin-right: 12px;
}
</style>