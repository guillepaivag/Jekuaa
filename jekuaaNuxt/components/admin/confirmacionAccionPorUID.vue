<template>
    <v-dialog
        v-model="estadoDialogController"
        max-width="800px"
    >
        <v-card>
            <v-card-title class="informacionAccion textoInformacionAccion">
                {{ titulo }}
            </v-card-title>
            <v-card-text class="informacionAccion textoInformacionAccion">
                {{ mensaje }}
            </v-card-text>
            <v-card-text class="mt-5">
                {{ explicacion }}: <b>{{ uid }}</b>
            </v-card-text>

            <div class="container text-center" max-width="400px">
                <v-text-field
                    class="inputConfirmacionAccion"
                    v-model="uidConfirmacionAccion"
                    :counter="50"
                    :label="uid"
                    required
                ></v-text-field>
            </div>

            <v-card-actions class="d-flex flex-row-reverse pb-5 pt-5">
                <v-btn
                    class="ml-4 mr-3"
                    :disabled="uidConfirmacionAccion != uid"
                    color="red"
                    text
                    @click="realizarAccion"
                >
                    {{ textoAccion }}
                </v-btn>

                <v-btn
                    color="grey darken-2"
                    text
                    @click="estadoDialogController = false"
                >
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            estadoDialogController: false,
            uidConfirmacionAccion: '',
            textoAccion: ''
        }
    },
    props: {
        titulo: String,
        mensaje: String,
        explicacion: String,
        uid: String,
        estadoDialog: Boolean,
        accion: String
    },
    watch: {
        estadoDialog: function ( nuevo, viejo ) {
            if ( nuevo ) {
                this.estadoDialogController = nuevo
            }
        },
        estadoDialogController: function ( nuevo, viejo ) {
            if ( !nuevo ) {
                this.uidConfirmacionAccion = ''
            
                this.$emit('dialogCerrado', {
                    cerrado: !nuevo,
                })
            }
        },
    },
    methods: {
        realizarAccion () {
            this.$emit('accion', {
                uid: this.uid,
            })

            this.estadoDialogController = false
        },
        setNombreAccion () {
            if ( this.accion === 'agregar' ) {
                this.textoAccion = 'Agregar'
            } else if ( this.accion === 'actualizar' ) {
                this.textoAccion = 'Actualizar'
            } else if ( this.accion === 'eliminar' ) {
                this.textoAccion = 'Eliminar'
            } else if ( this.accion === 'leer' ) {
                this.textoAccion = 'Leer'
            } else {
                throw new Error(`No existe esta operacion.`) 
            }
        }
    },
    created() {
        this.setNombreAccion()
    },
}
</script>

<style scoped>
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