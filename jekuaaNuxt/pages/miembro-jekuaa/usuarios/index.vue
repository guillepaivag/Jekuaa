<template>
    <div class="container">

        <div class="row mt-3">

            <div class="col-md-3">

                <div class="mt-3">
                    <v-btn
                        class="mt-4 white--text"
                        color="#683bce" 
                        block
                        to="/miembro-jekuaa/usuarios/lista-usuarios"
                    >
                        Lista de usuarios
                    </v-btn>
                </div>
                
            </div>

            <div class="col-md-9">
                <div class="">
                    <formularioUsuario
                        accionModo="crear"
                        v-on:crearUsuario="crearUsuario($event)"
                    />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import formularioUsuario from '@/components/admin/forms/formularioUsuario'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: '',
    middleware: 'esMiembroJekuaa',
    components: {
        formularioUsuario
    },
    data() {
        return {
            usuarioNuevo: {
                nombreUsuario: '',
                correo: '',
                nombreCompleto: '',
                fechaNacimiento: '',
                jekuaaPremium: {
                    plan: '',
                    fechaCompra: '',
                    fechaHasta: '',
                },
                jekuaaRoles: {
                    rol: 'estudiante',
                    secciones: [],
                    instructor: false
                },
                jekuaaPoint: 0,
            },
        }
    },
    methods: {
        ...mapActions({
            errorHandler: 'modules/system/errorHandler',
        }),
        async crearUsuario( data ) {
            const {
                datosUsuario,
                contrasenha
            } = data

            try {
                let token = this.$firebase.auth().currentUser

                token = token ? await token.getIdToken() : ''

                const auth = `Bearer ${token}`

                const usuarioNuevo = await this.$axios.$post(`/miembroJekuaa/crearUsuario`, {
                    auth,
                    datosUsuario,
                    contrasenha
                })

                this.usuarioNuevo = usuarioNuevo.resultado

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
    computed: {
        
    },
    mounted() {
        console.log('this.$nuxt', this.$nuxt)
    }
}
</script>

<style>

</style>