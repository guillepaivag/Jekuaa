<template>
    <div class="container">

        <v-card
            class="mx-auto text-center mt-10"
            max-width="500"
        >
            <v-card-text>
                <p class="text-h6 text--primary">
                    ¡Solo falta un paso para despegar! 🚀
                </p>
                
                <v-divider></v-divider>

                <div class="letra mt-5">¡Tu cuenta ha sido creada! Pero aún tu correo no a sido verificado.</div>
                <div class="text--primary mt-3">
                    <p class="letra">Muchas gracias por formar parte de Jekuaapy. Esperamos que tengas una buena experiencia.</p>
                    <p class="letra">Solo falta verificar tu correo para acceder a Jekuaapy y poder utilizar los servicios.</p>
                    <p style="font-size: 17px;">¡Te esperamos {{email}}!</p>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    block
                    color="deep-purple accent-4"
                    v-on:click="reeviarCorreoVerificacion"
                >
                    <div v-if="estadoCorreoVerificacion === 'reenviando'">
                        <v-icon left>
                            mdi-loading
                        </v-icon>

                        Reenviando
                    </div>

                    <div v-if="estadoCorreoVerificacion === 'reenviado'">
                        <v-icon left>
                            mdi-checkbox-marked-circle-outline
                        </v-icon>

                        Reenviado
                    </div>

                    <div v-if="estadoCorreoVerificacion === ''">
                        Reenviar correo de verificación
                    </div>
                </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            estadoCorreoVerificacion: '',
        }
    },
    methods: {
        async reeviarCorreoVerificacion () {
            try {
                this.estadoCorreoVerificacion = 'reenviando'

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
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
            
        }
    },
    async asyncData({isDev, $firebase, $axios, route, store, env, params, query, req, res, redirect, error}) {
        let uidUsuario = params.uidUsuario

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response = await $axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${uidUsuario}`, config)

        if (response.resultado.emailVerified) redirect('/')

        return {
            uid: response.resultado.uid,
            email: response.resultado.email,
            emailVerified: response.resultado.emailVerified,
        }
    },
}
</script>

<style scoped>
.letra {
    font-size: 20px !important;
}
</style>