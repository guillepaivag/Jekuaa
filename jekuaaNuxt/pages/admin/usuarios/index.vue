<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-7">
                * Formulario para crear un usuario *
            </div>
            <div class="col-md-5">

                <div>
                    <v-btn 
                        color="success" 
                        block
                        to="/admin/usuarios/lista-usuarios"
                    >
                        Lista de usuarios
                    </v-btn>

                    <v-btn
                        class="mt-4"
                        color="success" 
                        block
                        to="/admin/instructores/lista-instructores"
                    >
                        Lista de instructores 
                    </v-btn>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            
        }
    },
}
</script>

<style>

</style>