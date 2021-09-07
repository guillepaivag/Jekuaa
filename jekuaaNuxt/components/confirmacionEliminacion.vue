<template>
    <v-dialog
        v-model="estadoDialogController"
        max-width="800px"
    >
        <v-card>
            <v-card-title class="informacionEliminacion textoInformacionEliminacion">
                {{ titulo }}
            </v-card-title>
            <v-card-text class="informacionEliminacion textoInformacionEliminacion">
                {{ mensaje }}
            </v-card-text>
            <v-card-text class="mt-5">
                {{ explicacion }}: <b>{{ uid }}</b>
            </v-card-text>

            <div class="container text-center" max-width="400px">
                <v-text-field
                    class="inputConfirmacionEliminacion"
                    v-model="uidConfirmacionEliminar"
                    :counter="50"
                    :label="uid"
                    required
                ></v-text-field>
            </div>

            <v-card-actions class="d-flex flex-row-reverse pb-5 pt-5">
                <v-btn
                    class="ml-4 mr-3"
                    :disabled="uidConfirmacionEliminar != uid"
                    color="red"
                    text
                    @click="borrarUsuario"
                >
                    Borrar
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
            uidConfirmacionEliminar: ''
        }
    },
    props: {
        titulo: String,
        mensaje: String,
        explicacion: String,
        uid: String,
        estadoDialog: Boolean
    },
    watch: {
        estadoDialog: function ( nuevo, viejo ) {
            if ( nuevo ) {
                this.estadoDialogController = nuevo
            }
        },
        estadoDialogController: function ( nuevo, viejo ) {
            if ( !nuevo ) {
                this.uidConfirmacionEliminar = ''
            
                this.$emit('dialogCerrado', {
                    cerrado: !nuevo,
                })
            }
        },
    },
    methods: {
        borrarUsuario () {
            this.$emit('eliminar', {
                uid: this.uid,
            })

            this.estadoDialogController = false
        }
    },
}
</script>

<style scoped>
.informacionEliminacion {
    /* rgba(230, 62, 62, 0.159) */
    background-color: rgba(255, 29, 137, 0.159);
}

.textoInformacionEliminacion {
    color: rgb(197, 52, 52);
}

.inputConfirmacionEliminacion {
    margin-left: 12px;
    margin-right: 12px;
}
</style>