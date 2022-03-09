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
            <h3 class="title"> Administración para miembros </h3>
        </div>

        <v-divider></v-divider>

        <v-row class="mt-5">
            <v-col cols="12" sm="6">
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
                        Blogs
                    </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Administración de blogs
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div>- Crear blog</div>
                        <div>- Ver blog</div>
                        <div>- Actualizar blog</div>
                        <div>- Habilitar/Deshabilitar blog</div>
                        <div>- Eliminar blog</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="#683bce"
                            text
                            to="/miembro/blogs"
                        >
                            Administrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
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
                        Cursos
                    </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Administración de cursos
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div>- Crear curso</div>
                        <div>- Ver curso</div>
                        <div>- Actualizar curso</div>
                        <div>- Habilitar/Deshabilitar curso</div>
                        <div>- Eliminar curso</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="#683bce"
                            text
                            to="/miembro/cursos"
                        >
                            Administrar
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
    middleware: 'esMiembro',
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
                    disabled: true,
                    href: '/miembro',
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