<template>
    <div class="container">
        <div class="text-center mt-2 mb-5">
            <v-btn
                class="ma-2"
                outlined
                color="#683bce"
            >
                Actualizar usuario
            </v-btn>

            <v-btn
                class="ma-2"
                outlined
                color="green darken-1"
            >
                Habilitar usuario
            </v-btn>

            <v-btn
                class="ma-2"
                outlined
                color="gray darken-1"
            >
                Deshabilitar usuario
            </v-btn>

            <v-btn
                class="ma-2"
                outlined
                color="red darken-1"
                @click="estadoDialog = true"
            >
                Eliminar usuario
            </v-btn>
        </div>

        <!-- <v-dialog v-model="estadoDialog" max-width="800px">
            <v-card>
                <v-card-title class="informacionEliminacion textoInformacionEliminacion">
                    ¿Quieres borrar el usuario?
                </v-card-title>
                <v-card-text class="informacionEliminacion textoInformacionEliminacion">
                    Esta acción borrará permanentemente los datos del usuario.
                </v-card-text>
                <v-card-text class="mt-5">
                    Para confirmar que deseas borrar este usuario, escribe su UID: <b>{{ uidUsuario }}</b>
                </v-card-text>

                <div class="container text-center" max-width="400px">
                    <v-text-field
                        class="inputConfirmacionEliminacion"
                        v-model="uidUsuarioConfirmacionEliminar"
                        :counter="50"
                        :label="uidUsuario"
                        required
                    ></v-text-field>
                </div>

                <v-card-actions class="d-flex flex-row-reverse pb-5 pt-5">
                    <v-btn
                        class="ml-4 mr-3"
                        :disabled="uidUsuarioConfirmacionEliminar != uidUsuario"
                        color="red"
                        text
                        @click="borrarUsuario({
                            uid: uidUsuarioConfirmacionEliminar
                        })"
                    >
                        Borrar
                    </v-btn>

                    <v-btn
                        color="primary"
                        text
                        @click="estadoDialog = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->

        <confirmacionEliminacion 
            titulo="¿Quieres borrar el usuario?"
            mensaje="Esta acción borrará permanentemente los datos del usuario."
            explicacion="Para confirmar que deseas borrar este usuario, escribe su UID"
            :uid="uidUsuario"
            :estadoDialog="estadoDialog"
            
            v-on:eliminar="borrarUsuario($event)"
            v-on:dialogCerrado="dialogCerrado($event)"
        />

        <v-divider class="my-3" />
        
        {{ datosUsuario }}

        <v-divider class="my-3" />

        {{ datosAuth }}
    </div>
</template>

<script>
import confirmacionEliminacion from '@/components/confirmacionEliminacion'

export default {
    name: 'datosUsuario',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            uidUsuario: this.$route.params.uidUsuario,
            uidUsuarioConfirmacionEliminar: '',
            estadoDialog: false,
            datosUsuario: {},
            datosAuth: {}
        }
    },
    components: {
        confirmacionEliminacion
    },
    methods: {
        borrarUsuario(datosUsuario) {
            const {
                uid
            } = datosUsuario

            alert(`Usuario ${uid} eliminado.`)
        },
        dialogCerrado ( estado ) {
            const {
                cerrado
            } = estado

            this.estadoDialog = !cerrado
        }
    },
    async created() {
        this.uidUsuario = this.$route.params.uidUsuario

        const datosUsuario = await this.$axios.$post(`/miembroJekuaa/verDatosDeUnUsuarioPorUID/${this.uidUsuario}`)

        this.datosUsuario = datosUsuario.resultado.firestore
        this.datosAuth = datosUsuario.resultado.auth
    }
}
</script>

<style>
.informacionEliminacion {
    background-color: rgba(230, 62, 62, 0.159);
}

.textoInformacionEliminacion {
    color: rgb(197, 52, 52);
}

.inputConfirmacionEliminacion {
    margin-left: 12px;
    margin-right: 12px;
}
</style>