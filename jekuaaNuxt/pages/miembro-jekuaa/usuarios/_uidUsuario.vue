<template>
    <div class="container">
        <div class="text-center mt-2 mb-5" v-if="datosUsuario && datosAuth">
            <v-btn
                class="ma-2"
                outlined
                color="#683bce"
                @click="authVisible = true"
            >
                Ver Auth
            </v-btn>

            <v-btn
                v-if="datosAuth && datosAuth.disabled"
                class="ma-2"
                outlined
                color="green darken-1"
                v-on:click="habilitar"
            >
                Habilitar usuario
            </v-btn>

            <v-btn
                v-else
                class="ma-2"
                outlined
                color="gray darken-1"
                v-on:click="deshabilitar"
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

        <div class="text-center mt-2 mb-5" v-else>
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>

        <v-divider class="my-3" />
        
        <div v-if="datosUsuario && datosAuth">
            <formularioUsuario
                :habilitado="!datosAuth.disabled"
                :uid="uidUsuario"
                :usuario="datosUsuario"
                accionModo="actualizar"
                v-on:actualizarUsuario="actualizarUsuario($event)"
            />
        </div>

        <v-divider class="my-3" v-if="datosUsuario && datosAuth" />

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

        <v-dialog
            v-model="authVisible"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Datos Authentication
                </v-card-title>
            <v-card-text>
                <v-divider class="mb-3" />
                    <div v-if="datosAuth">
                        <p> <b> UID: </b> {{ datosAuth.uid }} </p>
                        <p> <b> Correo: </b> {{ datosAuth.email }} </p>
                        <p> <b> Correo verificado: </b> {{ datosAuth.emailVerified }} </p>
                        <p> <b> Nombre de usuario: </b> {{ datosAuth.displayName }} </p>
                        <p> <b> Habilitado: </b> {{ !datosAuth.disabled }} </p>
                        <p> <b> Creado: </b> {{ datosAuth.metadata.creationTime }} </p>
                        <p> <b> Ultima vez iniciado sesión: </b> {{ datosAuth.metadata.lastSignInTime }} </p>
                        <p> <b> Premium: </b> {{ datosAuth.customClaims.jekuaaPremium }} </p>
                        <p> <b> Rol: </b> {{ datosAuth.customClaims.rol }} </p>
                    </div>
                    <div v-else>
                        Cargando...
                    </div>
                <v-divider class="mt-3" />
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="#683bce"
                    text
                    @click="authVisible = false"
                >
                    Cerrar
                </v-btn>

                <v-btn
                    class="white--text"
                    color="#683bce"
                    @click="verDatosAuth"
                >
                    Recargar
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import formularioUsuario from '@/components/admin/forms/formularioUsuario'
import confirmacionAccionPorUID from '@/components/admin/confirmacionAccionPorUID'
import { mapActions, mapGetters } from 'vuex'

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
            usuarioActualizado: null,
            authVisible: false
        }
    },
    components: {
        confirmacionAccionPorUID,
        formularioUsuario
    },
    methods: {
        ...mapActions({
            errorHandler: 'modules/system/errorHandler',
        }),
        async verDatosAuth () {
            try {
                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                const auth = `Bearer ${token}`

                const datosAuth = await this.$axios.$post(`/miembroJekuaa/verDatosAuthPorUID/${this.uidUsuario}`, {
                    auth
                })

                this.datosAuth = datosAuth.resultado
                
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
        },
        async borrarUsuario(datosUsuario) {
            const {
                uid
            } = datosUsuario

            try {
                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                const auth = `Bearer ${token}`

                const respuesta = await this.$axios.$post(`/miembroJekuaa/eliminarUsuarioPorUID/${this.uidUsuario}`, {
                    auth
                })

                this.$router.push('/miembro-jekuaa/usuarios/lista-usuarios')

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
        },
        dialogEliminacionCerrado ( estado ) {
            const {
                cerrado
            } = estado

            this.estadoDialogEliminacion = !cerrado
        },
        async actualizarUsuario( data ) {
            
            const {
                datosUsuario,
                contrasenha
            } = data

            console.log('data', data)

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
        },
        async habilitar (  ) {
            try {
                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                const auth = `Bearer ${token}`

                const respuesta = await this.$axios.$post(`/miembroJekuaa/habilitarUsuarioPorUID/${this.uidUsuario}`, {
                    auth,
                    habilitar: true
                })

                this.datosAuth = respuesta.resultado

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
        },
        async deshabilitar (  ) {
            try {
                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                const auth = `Bearer ${token}`

                const respuesta = await this.$axios.$post(`/miembroJekuaa/habilitarUsuarioPorUID/${this.uidUsuario}`, {
                    auth,
                    habilitar: false
                })

                this.datosAuth = respuesta.resultado

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
        try {
            this.uidUsuario = this.$route.params.uidUsuario

            let token = this.$firebase.auth().currentUser

            if( token ){
                token = await token.getIdToken()
            }

            const auth = `Bearer ${token}`

            const datosUsuario = await this.$axios.$post(`/miembroJekuaa/verDatosUsuarioPorUID/${this.uidUsuario}`, {
                auth
            })

            const datosAuth = await this.$axios.$post(`/miembroJekuaa/verDatosAuthPorUID/${this.uidUsuario}`, {
                auth
            })

            this.datosUsuario = datosUsuario.resultado
            this.datosAuth = datosAuth.resultado
            
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