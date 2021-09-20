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
                @click="estadoDialogEliminacion = true"
            >
                Eliminar usuario
            </v-btn>
        </div>

        <confirmacionAccionPorUID 
            titulo="¿Quieres borrar el usuario?"
            mensaje="Esta acción borrará permanentemente los datos del usuario."
            explicacion="Para confirmar que deseas borrar este usuario, escribe su UID"
            :uid="uidUsuario"
            :estadoDialog="estadoDialogEliminacion"
            accion="eliminar"
            
            v-on:accion="borrarUsuario($event)"
            v-on:dialogCerrado="dialogEliminacionCerrado($event)"
        />

        <v-divider class="my-3" />
        
        <div v-if="datosUsuario">
            <formularioUsuario
                :uid="uidUsuario"
                :usuario="datosUsuario"
                accionModo="actualizar"
                v-on:actualizarUsuario="actualizarUsuario($event)"
            />
        </div>

        <v-divider class="my-3" />

    </div>
</template>

<script>
import formularioUsuario from '@/components/admin/forms/formularioUsuario'
import confirmacionAccionPorUID from '@/components/admin/confirmacionAccionPorUID'

export default {
    name: 'datosUsuario',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            uidUsuario: this.$route.params.uidUsuario,
            uidUsuarioConfirmacionEliminar: '',
            estadoDialogEliminacion: false,
            datosUsuario: null,
            datosAuth: null,
            usuarioActualizado: null
        }
    },
    components: {
        confirmacionAccionPorUID,
        formularioUsuario
    },
    methods: {
        borrarUsuario(datosUsuario) {
            const {
                uid
            } = datosUsuario

            alert(`Usuario ${uid} eliminado.`)
        },
        dialogEliminacionCerrado ( estado ) {
            const {
                cerrado
            } = estado

            this.estadoDialogEliminacion = !cerrado
        },
        async actualizarUsuario( data ) {
            console.log('data', data)
            
            const {
                datosUsuario,
                contrasenha
            } = data

            try {
                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                const auth = `Bearer ${token}`

                const respuesta = await this.$axios.$post(`/miembroJekuaa/actualizarUsuarioPorUID/${this.uidUsuario}`, {
                    auth,
                    datosActualizados: datosUsuario,
                    contrasenha
                })

                this.usuarioActualizado = respuesta.resultado

            } catch (error) {
                const accion = await this.errorHandler( error.response.data )

                if ( accion.includes('error') ) {
                    this.$nuxt.error({
                        statusCode: error.response.status
                    })
                } else if ( accion.includes('login') ) {
                    this.$router.push('/autenticacion/inicioSesion')
                }

            }
        }
    },
    async created() {
        this.uidUsuario = this.$route.params.uidUsuario

        let token = this.$firebase.auth().currentUser

        if( token ){
            token = await token.getIdToken()
        }

        const auth = `Bearer ${token}`

        const datosUsuario = await this.$axios.$post(`/miembroJekuaa/verDatosUsuarioPorUID/${this.uidUsuario}`, {
            auth
        })

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