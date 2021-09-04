<template>
    <div class="container">
        <v-btn
        class="ma-2"
        outlined
        color="green darken-1"
        :to="`/admin/usuarios/${uidUser}/editar`"
        >
            Editar usuario
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'dataOfUserForAdmin',
    middleware: 'esUsuarioTeamJekuaa',
    data() {
        return {
            uidUser: this.$route.params.uidUser
        }
    },
    mounted() {
        this.uidUser = this.$route.params.uidUser
    }
}
</script>

<style>

</style>