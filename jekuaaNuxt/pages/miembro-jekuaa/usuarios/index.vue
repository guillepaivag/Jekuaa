<template>
    <div class="container">
        <div class="row mt-3">

            <div class="col-md-5">

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

            <div class="col-md-7">
                <div class="">
                    <crearUsuario 
                        v-on:crearUsuario="crearUsuario($event)"
                    />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import crearUsuario from '@/components/admin/forms/crearUsuario'

export default {
    name: '',
    middleware: 'esMiembroJekuaa',
    components: {
        crearUsuario
    },
    data() {
        return {
            
        }
    },
    methods: {
        async crearUsuario( datosUsuario ) {
            alert(JSON.stringify(datosUsuario))
        }
    },
}
</script>

<style>

</style>