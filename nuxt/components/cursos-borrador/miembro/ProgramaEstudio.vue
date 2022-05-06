<template>
    <div>
        <div class="container" style="margin-top: -12px;">
            <draggable :list="datosUnidades" class="list-group" handle=".btn-move-handle">

                <v-card
                    v-for="(datoUnidad, index) in datosUnidades" :key="index"
                    class="mb-10"
                    outlined
                >
                    <v-list-item class="mt-2">
                        <v-list-item-content class="mt-2">
                            <v-text-field
                                v-model="datoUnidad.nombreUnidad"
                                :counter="60"
                                label="Nombre de la unidad"
                                outlined
                                required
                            ></v-text-field>
                            <v-card-actions style="margin-top: -15px; margin-left: -7px;">
                                <v-btn
                                    outlined
                                    color="#683bce"
                                >
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-list-item-content> 
                        
                        <!-- @mousedown="dragging = true" @mouseup="dragging = false" -->
                        <!-- btn-action -->
                        <v-card-actions style="margin-bottom: 60px;">
                            <v-btn
                                v-if="verHerramientas"
                                style="margin: 0 10px 0 20px;"
                                fab
                                dark
                                small
                                color="red"
                                v-on:click="verHerramientas = !verHerramientas"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                            <v-btn
                                v-else
                                style="margin: 0 10px 0 20px;"
                                class="my-icon"
                                fab
                                dark
                                small
                                color="#683bce"
                                v-on:click="verHerramientas = !verHerramientas"
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                            <button style="margin: 0 3px 0 5px;" class="btn-move-handle">
                                <span class="material-icons my-icon">
                                    dehaze
                                </span>
                            </button>
                        </v-card-actions>
                        
                    </v-list-item>

                    <div v-if="verHerramientas">
                        <v-divider class="mt-0 mb-4"></v-divider>

                        <div class="pl-4 pb-4">
                            <v-btn
                                small
                                color="primary"
                            >
                                Ver clases
                            </v-btn>

                            <v-btn
                                small
                                color="red"
                                class="white--text"
                            >
                                Eliminar unidad
                            </v-btn>
                        </div>
                    </div>
                </v-card>

                <v-divider class="mt-8 mb-8"></v-divider>

                <div>
                    <v-btn
                        class="mb-5"
                        outlined
                        color="#683bce"
                        v-on:click="agregarUnidad"
                    >
                        Agregar unidad
                    </v-btn>
                </div>
            </draggable>
        </div>

        <v-dialog
            v-model="processing.value"
            persistent
            width="300"
        >
            <v-card
                color="#683bce"
                dark
            >
                <v-card-text class="pt-3">
                    {{ processing.message }}
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        
        <!-- {{datosUnidades}}
        <br><br><br><br>
        {{datosContenidoClase}} -->
        
    </div>
</template>

<script>
let id = 3;
import draggable from 'vuedraggable'
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    data() {
        return {
            datosUnidades: [],
            datosContenidoClase: [],
            verHerramientas: false,
            processing: {
                value: false,
                message: ''
            }
        }
    },
    props: {
        uidCursoProp: String,
    },
    components: {
        draggable
    },
    methods: {
        removeAt(idx) {
            this.list.splice(idx, 1);
        },
        async agregarUnidad () {
            try {
                this.processing.value = true
                this.processing.message = 'Creando unidad. Favor esperar.'

                const nombreUnidad = `Unidad ${this.datosUnidades.length+1}`

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { 
                    datosUnidad: { nombreUnidad }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const respuesta = await this.$axios.$post(`/apiMiembro/curso-borrador/unidad/crear/${uidCurso}`, body, config)

                console.log('respuesta', respuesta)

                this.datosUnidades.push({
                    uid: respuesta.resultado.uid,
                    ordenUnidad: this.datosUnidades.length+1,
                    nombreUnidad: nombreUnidad,
                    datosClases: []
                })
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        }
    },
    computed: {
        
    },
    mounted () {
        
    },
    async created() {

        const snapshotUnidad = await fb.firestore()
        .collection('CursosBorrador').doc(this.uidCursoProp)
        .collection('UnidadesBorrador').get()
        const docsUnidades = snapshotUnidad.docs
        
        for (let i = 0; i < docsUnidades.length; i++) {
            const docUnidad = docsUnidades[i]

            this.datosUnidades.push({
                uid: docUnidad.data().uid,
                ordenUnidad: docUnidad.data().ordenUnidad,
                nombreUnidad: docUnidad.data().nombreUnidad,
            })
        }

        this.datosUnidades.sort((a, b) => {
            return a.ordenUnidad - b.ordenUnidad
        })

        // const snapshotContenidoClase = await fb.firestore()
        // .collection('CursosBorrador').doc(this.uidCursoProp)
        // .collection('ContenidoClasesBorrador').get()
        // const docsContenidoClase = snapshotContenidoClase.docs

        // const datosContenidoClase = []
        // for (let i = 0; i < docsContenidoClase.length; i++) {
        //     const docContenidoClase = docsContenidoClase[i]
        //     this.datosContenidoClase.push(docContenidoClase.data())
        // }
    },
}
</script>

<style scoped>
</style>

<style scoped>
.btn-action {
    margin: 0 10px 0 20px;
}

.my-icon {
    font-size: 35px;
}
</style>