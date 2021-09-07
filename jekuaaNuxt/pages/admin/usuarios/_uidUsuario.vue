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
                @click="dialogEliminacion = true"
            >
                Eliminar usuario
            </v-btn>
        </div>

        <v-dialog
            v-model="dialogEliminacion"
            max-width="700px"
        >
            <v-card>
                <v-card-title class="informacionEliminacion textoInformacionEliminacion">
                    ¿Quieres borrar el usuario?
                </v-card-title>
                <v-card-text class="informacionEliminacion textoInformacionEliminacion">
                    Esta acción borrará permanentemente los datos del usuario.
                </v-card-text>
                <v-card-text class="mt-5">
                    Para confirmar que deseas borrar esta colección, escribe su UID: <b>{{ uidUsuario }}</b>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        text
                        @click="dialogEliminacion = false"
                    >
                        Cerrar
                    </v-btn>

                    <v-btn
                        color="red"
                        text
                        @click="borrarUsuario"
                    >
                        Borrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-divider class="my-3" />
        
        
    </div>
</template>

<script>
export default {
    name: 'datosUsuario',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            uidUsuario: this.$route.params.uidUsuario,
            uidUsuarioConfirmacionEliminar: '',
            dialogEliminacion: false
        }
    },
    methods: {
        borrarUsuario() {
            alert(`Usuario ${this.uidUsuario} eliminado.`)
        }
    },
    mounted() {
        this.uidUsuario = this.$route.params.uidUsuario
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
</style>