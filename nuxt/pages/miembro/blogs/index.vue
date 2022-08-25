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
            <h3 class="title"> Administración de blogs </h3>
        </div>
        <v-divider></v-divider>

        <div class="mt-5">
            <v-alert
                outlined
                prominent
                border="left"
                color="#683bce"
            >
                <v-row align="center">
                    <v-col class="grow">
                        Crear un blog en Classfii
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#683bce"
                            to="/miembro/blogs/nuevo"
                        >
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Crear blog
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>

            <v-alert
                outlined
                prominent
                border="left"
                color="#ff1d89"
                class="mt-3"
            >
                <v-row align="center">
                    <v-col class="grow">
                        Ver mis blogs
                    </v-col>
                    <v-col class="shrink">
                        <v-btn
                            outlined
                            color="#ff1d89"
                            to="/miembro/blogs/mis-blogs"
                        >
                            <v-icon left>
                                mdi-playlist-check
                            </v-icon>
                            Mis blogs
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>


        <div class="mt-12">
            <h3 class="title"> Recomendaciones para tus blogs 🚀 </h3>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    name: '',
    layout: 'miembro',
    middleware: 'esBlogger',
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
                    text: 'Blogs',
                    disabled: true,
                    href: '/miembro/blogs',
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