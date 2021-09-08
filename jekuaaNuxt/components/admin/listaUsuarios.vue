<template>
    <div>
        
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                    UID
                    </th>
                    <th class="text-left">
                    Correo
                    </th>
                    <th class="text-left">
                    Usuario
                    </th>
                    <th class="text-left">
                    Acciones
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(usuario, index) in listaUsuarios"
                        :key="index"
                    >
                        <td>{{ usuario.uid }}</td>
                        <td>{{ usuario.correo }}</td>
                        <td>{{ usuario.nombreUsuario }}</td>
                        <td>
                            <v-btn
                                class="ma-2"
                                outlined
                                color="#683bce"
                                block
                                :to="`/miembro-jekuaa/usuarios/${usuario.uid}`"
                            >
                                Ver datos
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            listaUsuarios: []
        }
    },
    props: {
        usuarios: Array
    },
    watch: {
        usuarios: function ( nuevo, viejo ) {
            this.listaUsuarios = this.usuarios
        }
    },
    methods: {
        
    },
    created() {
        this.listaUsuarios = this.usuarios
    },
}
</script>

<style>

</style>