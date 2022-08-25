<template>
    <div class="container mt-8">

        <div class="mt-0">
            <h3 class="title">
                Administración de cursos
            </h3>
        </div>
        <v-divider></v-divider>

        <div class="mt-5">

            <v-alert
                outlined
                prominent
                border="left"
                color="#56C725"
                class="mt-2"
            >
                <v-row align="center">
                    <v-col class="grow">
                        Ver cursos en borrador
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#56C725"
                            to="/moderador/cursos/borradores"
                        >
                            <v-icon left>
                                mdi-playlist-check
                            </v-icon>
                            Borradores
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

            <v-alert
                outlined
                prominent
                border="left"
                color="#ff1d89"
                class="mt-2"
            >
                <v-row align="center">
                    <v-col class="grow">
                        Ver cursos publicados
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#ff1d89"
                            to="/moderador/cursos/publicados"
                        >
                            <v-icon left>
                                mdi-playlist-check
                            </v-icon>
                            Publicados
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

        </div>

    </div>
</template>

<script>
export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
.title {
    color: #683bce;
}
</style>