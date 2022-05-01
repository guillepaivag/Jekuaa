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
            <h3 class="title"> Administración de blogs </h3>
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
                        Crear blog
                    </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Administración de blogs
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
                            to="/miembro/blogs/nuevo"
                        >
                            Crear blog
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
                        Lista de mis blogs
                    </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        Administración de blogs
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
                            to="/miembro/blogs/mis-blogs"
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