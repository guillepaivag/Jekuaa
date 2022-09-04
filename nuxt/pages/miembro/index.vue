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

        <v-row class="contenedor_dato_cantidad_padre" no-gutters>
            <v-card
                class="contenedor_dato_cantidad"
                :disabled="!habilitacion('blogger')"
            >
                <v-img
                    :src="require(`~/assets/img/books.jpg`)"
                    height="80px"
                ></v-img>

                <v-card-title>
                    Blogger
                </v-card-title>

                <v-card-subtitle>
                    <p>
                        <b>Cantidad de blgos:</b> {{ $store.state.modules.usuarios.miembro.cantidadBlogs }}
                    </p>
                </v-card-subtitle>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        color="#683bce"
                        text
                        to="/miembro/blogs"
                    >
                        Blogs
                    </v-btn>
                </v-card-actions>
            </v-card>

            <v-card
                class="contenedor_dato_cantidad"
                :disabled="!habilitacion('instructor')"
            >
                <v-img
                    :src="require(`~/assets/img/teacher.jpg`)"
                    height="80px"
                ></v-img>

                <v-card-title>
                    Instructor
                </v-card-title>

                <v-card-subtitle>
                    <p style="margin-bottom: 0px;">
                        <b>Cantidad de cursos:</b> {{ $store.state.modules.usuarios.miembro.cantidadCursos }}
                    </p>
                    
                    <p style="margin-bottom: 0px;">
                        <b>Cantidad de estudiantes:</b> {{ $store.state.modules.usuarios.miembro.cantidadEstudiantes }}
                    </p>
                </v-card-subtitle>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        color="#683bce"
                        text
                        to="/miembro/cursos"
                    >
                        Cursos
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>


        <div class="mt-12">
            <h3 class="title"> Reglas de un miembro de Jekuaapy </h3>
        </div>
        <v-divider></v-divider>

    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

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
            funcionesMiembro: {
                instructor: false,
                blogger: false
            }
        }
    },
    methods: {
        habilitacion (id) {
            if (id === 'blogger') {
                return this.$store.state.modules.usuarios.miembro.funciones.includes('blogger')
            }

            if (id === 'instructor') {
                return this.$store.state.modules.usuarios.miembro.funciones.includes('instructor') ||
                this.$store.state.modules.usuarios.miembro.funciones.includes('instructor-auxiliar')
            }
        }
    },
    async created () {
        const doc = await fb.firestore().collection('Miembros').doc(this.$store.state.modules.usuarios.uid).get()

        this.funcionesMiembro.instructor = doc.data().funciones.includes('instructor')
        this.funcionesMiembro.blogger = doc.data().funciones.includes('blogger')

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