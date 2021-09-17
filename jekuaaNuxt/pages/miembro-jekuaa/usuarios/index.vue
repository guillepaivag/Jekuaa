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

                    <v-btn
                        class="mt-4 white--text"
                        color="#683bce" 
                        block
                        to="/miembro-jekuaa/instructores/lista-instructores"
                    >
                        Lista de instructores 
                    </v-btn>
                </div>
                
            </div>

            <div class="col-md-9">
                <div class="">
                    <formularioUsuario 
                        v-on:crearUsuario="crearUsuario($event)"
                    />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import formularioUsuario from '@/components/admin/forms/formularioUsuario'
import { mapMutations, mapGetters } from 'vuex'

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
        async crearUsuario( data ) {
            const {
                datosUsuario,
                contrasenha
            } = data

            try {
                let token = this.$firebase.auth().currentUser

                if( !token ){
                    return
                }

                token = await token.getIdToken()

                const auth = `Bearer ${token}`

                const usuarioNuevo = await this.$axios.$post(`/miembroJekuaa/crearUsuario`, {
                    auth,
                    datosUsuario,
                    contrasenha
                })

                this.usuarioNuevo = usuarioNuevo.resultado

            } catch (error) {
                console.log('error', error)
                console.log('error', error.codigo)
                console.log('error', error.mensaje)
                console.log('error', error.resultado)

                this.setError(error)
            }
        }
    },
    computed: {
        ...mapMutations('modules/system', ['setError'])
    }
}
</script>

<style>

</style>