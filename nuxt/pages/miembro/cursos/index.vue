<template>
    <div class="container">

        <div class="mt-0 mb-5">
            <v-breadcrumbs>
                <div v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                    <v-breadcrumbs-item
                        :href="breadcrumb.href"
                        :disabled="breadcrumb.disabled"
                        :nuxt="true"
                    >
                        {{ breadcrumb.text.toUpperCase() }}
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider v-if="index !== breadcrumbs.length-1">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-breadcrumbs-divider>
                </div>
            </v-breadcrumbs>
        </div>

        <div class="mt-0">
            <h3 class="title"> Administración de cursos </h3>
        </div>
        <v-divider></v-divider>

        <div class="mt-5">
            <!-- <v-alert
                v-if="$store.state.modules.usuarios.miembro.funciones.includes('instructor')"
                outlined
                prominent
                border="left"
                color="#683bce"
            >
                <v-row align="center">
                    <v-col class="grow">
                        Crear un curso en Jekuaapy
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#683bce"
                            to="/miembro/cursos/nuevo"
                        >
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Crear curso
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert> -->

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
                            to="/miembro/cursos/borradores"
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
                            to="/miembro/cursos/publicados"
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

        <div class="mt-12">
            <h3 class="title"> Recomendaciones para tus cursos 🚀 </h3>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    name: '',
    layout: 'miembro',
    middleware: 'esInstructor',
    data() {
        return {
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Miembro',
                    disabled: false,
                    href: '/miembro',
                },
                {
                    text: 'Cursos',
                    disabled: true,
                    href: '/miembro/cursos',
                },
            ],
        }
    },
}
</script>

<style scoped>
.title {
    color: #683bce;
}
</style>