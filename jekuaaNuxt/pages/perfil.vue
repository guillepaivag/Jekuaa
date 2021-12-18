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

        <div class="container">
            <nuxt-child />
        </div>

    </div>
</template>

<script>
export default {
    name: 'Perfil',
    data () {
        return {
            user: {},
            userClaims: {}
        }
    },
    async mounted () {

    },
    methods: {

    }
}
</script>

<style>

</style>
