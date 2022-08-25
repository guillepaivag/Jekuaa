<template>
    <div>
        <v-bottom-navigation
            color="#683bce"
            grow
        >
            <v-btn to="/perfil" exact>
                <span>Perfil</span>

                <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn to="/perfil/informacion" exact>
                <span>Mi información</span>

                <v-icon>mdi-bookshelf</v-icon>
            </v-btn>

            <v-btn to="/perfil/seguridad" exact>
                <span>Seguridad</span>

                <v-icon>mdi-key</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <div style="margin-bottom: -15px;">
            <v-alert
                v-if="$store.state.modules.usuarios.emailVerificado"
                dense
                text
                type="success"
            >
                ¡Correo verificado con exito!
            </v-alert>
            <v-alert
                v-else
                dense
                text
                type="error"
            >
                <v-row align="center">
                    <v-col class="grow">
                        <p style="margin-bottom: 5px;">Falta verificar el correo: <b>{{ $store.state.modules.usuarios.correo }}</b></p>
                        <p style="margin-bottom: 0;">
                            <a href="/cuentas-classfii-sin-verificar">Más información</a> sobre cuentas de Classfii sin verificar.
                        </p>
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            v-if="estadoCorreoVerificacion !== 'reenviando'"
                            depressed
                            small
                            color="error"
                            v-on:click="reeviarCorreoVerificacion"
                        >
                            <div v-if="estadoCorreoVerificacion === 'reenviado'">
                                <v-icon left>
                                    mdi-checkbox-marked-circle-outline
                                </v-icon>

                                Volver a enviar verificación
                            </div>

                            <div v-if="estadoCorreoVerificacion === ''">
                                Reenviar correo de verificación
                            </div>
                            
                        </v-btn>
                        <div v-else>
                            <v-progress-circular 
                                color="red"
                                class="mr-1"
                                indeterminate
                                :size="20"
                            ></v-progress-circular>
                        </div>
                    </v-col>
                </v-row>
                
            </v-alert>
        </div>

        <div class="container">
            <nuxt-child />
        </div>

    </div>
</template>

<script>
export default {
    name: 'Perfil',
    middleware: 'accesoAutenticado',
    data () {
        return {
            estadoCorreoVerificacion: '',
        }
    },
    methods: {
        async reeviarCorreoVerificacion () {
            try {
                this.estadoCorreoVerificacion = 'reenviando'

                // await new Promise(res => {
                //     setTimeout(() => {
                //         res()
                //     }, 2000)
                // })

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$get(`/serviceUsuario/reeviarCorreoVerificacion`, config)

                this.estadoCorreoVerificacion = 'reenviado'

            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
            
        }
    },
    async mounted () {

    },
}
</script>

<style scoped>

</style>
