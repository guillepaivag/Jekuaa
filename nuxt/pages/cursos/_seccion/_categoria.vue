<template>
    <div class="container">
        <div class="mt-0 mb-0">
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

        <div v-if="existenCursos">
            <ClientOnly>
                <BuscadorCursosPublicado />
            </ClientOnly>
        </div>

        <v-row v-else class="" style="margin-top: 15px; margin-bottom: 50px;">
            <v-col cols="12" md="4">
                <div class="">
                    <v-img 
                        class="contenido_image mb-5" 
                        max-width="400"
                        :src="require('~/assets/img/proximamente_cursos.png')"
                    ></v-img>
                </div>
            </v-col>
            <v-col class="contenido_texto" cols="12" md="8">
                <h2>¡Cursos en Classfii proximamente!</h2>
                <v-divider class="mb-2"></v-divider>
                <p>
                    ¡Estamos trabajando para impulsar tu crecimiento profesional!
                </p>

                <v-btn
                    class=""
                    outlined
                    text
                    x-large
                    color="#683bce"
                    to="/centro"
                >
                    Volver 🚀
                </v-btn>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import BuscadorCursosPublicado from '@/components/cursos-publicado/estudiante/BuscadorCursosPublicado'
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    data() {
        return {
            existenCursos: false,
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Cursos',
                    disabled: true,
                    href: '/cursos',
                },
            ],
        }
    },
    components: {
        BuscadorCursosPublicado,
    },
    async created () {
        const snapshot = await db.collection('CursosPublicado')
        .where('publicado', '==', true)
        .where('habilitado', '==', true)
        .limit(1)
        .get()

        this.existenCursos = !snapshot.empty
    }
}
</script>

<style scoped>
@media (max-width: 959px) {
    .contenido_image {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .contenido_texto {
        text-align: center;
    }
}
</style>