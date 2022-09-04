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
            <h3 class="title"> ¡Hola {{ $store.state.modules.usuarios.nombreCompleto }}! </h3>
        </div>
        <v-divider></v-divider>

        <v-row class="contenedor_dato_cantidad_padre">
            <!-- Usuarios -->
            <v-card
                class="contenedor_dato_cantidad"
                :disabled="!$store.state.modules.usuarios.moderador.funciones.includes('moderador-usuarios')"
            >
                <v-img
                    :src="require(`~/assets/img/books.jpg`)"
                    height="80px"
                ></v-img>

                <v-card-title>
                    Moderación de usuarios
                </v-card-title>

                <v-card-subtitle>
                    <p>
                        Usuarios
                    </p>
                </v-card-subtitle>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        color="#683bce"
                        text
                        to="/moderador/usuarios"
                    >
                        Usuarios
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-- Blogs -->
            <v-card
                class="contenedor_dato_cantidad"
                :disabled="!$store.state.modules.usuarios.moderador.funciones.includes('moderador-blogs')"
            >
                <v-img
                    :src="require(`~/assets/img/books.jpg`)"
                    height="80px"
                ></v-img>

                <v-card-title>
                    Moderación de blogs
                </v-card-title>

                <v-card-subtitle>
                    <p>
                        Blogs
                    </p>
                </v-card-subtitle>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        color="#683bce"
                        text
                        to="/moderador/blogs"
                    >
                        Blogs
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-- Cursos -->
            <v-card
                class="contenedor_dato_cantidad"
                :disabled="!$store.state.modules.usuarios.moderador.funciones.includes('moderador-cursos')"
            >
                <v-img
                    :src="require(`~/assets/img/teacher.jpg`)"
                    height="80px"
                ></v-img>

                <v-card-title>
                    Moderación de cursos
                </v-card-title>

                <v-card-subtitle>
                    <p style="margin-bottom: 0px;">
                        Cursos
                    </p>
                </v-card-subtitle>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        color="#683bce"
                        text
                        to="/moderador/cursos"
                    >
                        Cursos
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>


        <div class="mt-12">
            <h3 class="title"> Reglas de un moderador de Jekuaapy </h3>
        </div>
        <v-divider></v-divider>

    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    data() {
        return {
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Moderador',
                    disabled: true,
                    href: '/moderador',
                },
            ],
            funciones: {
                'moderadorUsuarios': false,
                'moderadorBlogs': false,
                'moderadorCursos': false,
            }
        }
    },
    async created () {
        const doc = await fb.firestore().collection('Moderadores').doc(this.$store.state.modules.usuarios.uid).get()

        this.funciones.moderadorUsuarios = doc.data().funciones.includes('moderador-usuarios')
        this.funciones.moderadorBlogs = doc.data().funciones.includes('moderador-blogs')
        this.funciones.moderadorCursos = doc.data().funciones.includes('moderador-cursos')
    },
}
</script>

<style scoped>
.title {
    color: #683bce;
}

.contenedor_dato_cantidad {
    padding-bottom: 50px;
}

@media (min-width: 601px) {
    .contenedor_dato_cantidad_padre {
        margin-top: 30px;
    }

    .contenedor_dato_cantidad {
        margin-right: 20px;
        max-width: 260px;
    }
}

@media (max-width: 600px) {
    .contenedor_dato_cantidad_padre {
        margin-top: 30px;
    }

    .contenedor_dato_cantidad {
        margin-bottom: 20px;
        width: 100% !important;
    }
}

</style>