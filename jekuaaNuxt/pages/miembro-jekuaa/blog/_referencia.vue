<template>
    <div class="container">
        
        <div class="mt-5">
            <v-btn
                depressed
                color="#683bce"
                class="white--text"
                :to="`/miembro-jekuaa/blog/actualizar/${$route.params.referencia}`"
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
        </div>

        <v-divider class="mt-5 mb-0"></v-divider>

        <div v-if="datosBlog">
            <formulario-blog 
                :datosBlog="datosBlog" 
                :contenidoBlog="contenidoBlog" 
                :accion="'leer'" 
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
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import showdown from 'showdown'
import FormularioBlog from '@/components/blogs/formulario-blog'

export default {
    name: '',
    layout: 'miembroJekuaa',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            datosBlog: null,
            contenidoBlog: '',
            estadoDialogEliminacion: false,
            uidConfirmacion: '',
            eliminando: false,
        }
    },
    components: {
        'formulario-blog': FormularioBlog,
        'spinner': Spinner,
    },
    methods: {
        async eliminarBlog () {
            try {
                this.eliminando = true
                this.estadoDialogEliminacion = false

                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$delete(`/blog/miembroJekuaa/eliminarBlog/${this.uidConfirmacion}`, config)

                this.$nuxt.$options.router.push('/miembro-jekuaa/blogs/mis-blogs')
                
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

            if (!doc.exists) this.$router.push('/miembro-jekuaa/blogs/mis-blogs')

            // Obtener contenido del blog desde la api de Jekuaa
            let usuario = this.$firebase.auth().currentUser
            let token = usuario ? await usuario.getIdToken() : ''
            this.$store.commit('modules/usuarios/setTOKEN', token)
            
            const response = await this.$axios.get(`/blog/miembroJekuaa/obtenerContenido/${doc.data().uid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            let converter = new showdown.Converter()

            this.datosBlog = doc.data()
            this.contenidoBlog = converter.makeHtml(response.data.resultado)
        } catch (error) {
            console.log('error', error)
            const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            this.$router.push('/miembro-jekuaa/blogs/mis-blogs')
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

.inputConfirmacionAccion {
    margin-left: 12px;
    margin-right: 12px;
}
</style>