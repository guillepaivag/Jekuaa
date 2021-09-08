<template>
    <div class="container">
        <div class="text-center mt-2 mb-5">
            <v-btn
                class="ma-2"
                outlined
                color="blue"
            >
                Ver Auth
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
                color="#683bce"
            >
                Actualizar usuario
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

        <confirmacionAccionPorUID 
            titulo="¿Quieres borrar el usuario?"
            mensaje="Esta acción borrará permanentemente los datos del usuario."
            explicacion="Para confirmar que deseas borrar este usuario, escribe su UID"
            :uid="uidUsuario"
            :estadoDialog="estadoDialog"
            accion="eliminar"
            
            v-on:accion="borrarUsuario($event)"
            v-on:dialogCerrado="dialogCerrado($event)"
        />

        <v-divider class="my-3" />
        
        {{ datosUsuario }}

        <v-divider class="my-3" />

    </div>
</template>

<script>
import confirmacionAccionPorUID from '@/components/confirmacionAccionPorUID'

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
        confirmacionAccionPorUID
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

        const datosUsuario = await this.$axios.$post(`/miembroJekuaa/verDatosUsuarioPorUID/${this.uidUsuario}`)

        this.datosUsuario = datosUsuario.resultado
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