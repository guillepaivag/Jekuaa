<template>
    <div class="container">

        <div class="mt-0">
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
            <h3 class="title"> Mis cursos - Administración de cursos </h3>
        </div>

        <v-divider></v-divider>

        <v-row class="mt-5">
            <v-col cols="12" sm="6">
                <!-- BORRADOR -->
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    <v-card-title>
                        Cursos en Borrador
                    </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Cursos en borrador
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries.
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="#683bce"
                            text
                            to="/miembro/cursos/mis-cursos/borrador"
                        >
                            Ver lista
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <!-- PUBLICADO -->
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    <v-card-title>
                        Cursos publicados
                    </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Cursos publicados
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries.
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="#683bce"
                            text
                            to="/miembro/cursos/mis-cursos/publicado"
                        >
                            Ver lista
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
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
                    disabled: false,
                    href: '/miembro/cursos',
                },
                {
                    text: 'Mis cursos',
                    disabled: true,
                    href: '/miembro/cursos/mis-cursos',
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