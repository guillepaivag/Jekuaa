<template>
    <div>
        <div class="container mt-0">
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

        <div class="container">
            <v-row no-gutters>
                <v-col cols="12" lg="2">
                    <v-btn
                        class="mb-2"
                        outlined
                        color="#683bce"
                        to="/miembro/curso-borrador/introduccion-1-2022"
                        exact
                    >
                        Datos del curso
                    </v-btn>

                    <v-btn
                        class="mb-2"
                        outlined
                        color="#683bce"
                        to="/miembro/curso-borrador/introduccion-1-2022/programa-estudio"
                        exact
                    >
                        Contenido
                    </v-btn>

                    <v-btn
                        class="mb-2"
                        outlined
                        color="#683bce"
                        to="/miembro/curso-borrador/introduccion-1-2022/precios"
                        exact
                    >
                        Precios
                    </v-btn>

                </v-col>

                <v-divider vertical></v-divider>
                
                <v-col cols="12" lg="10">
                    <nuxt-child />
                </v-col>
            </v-row>
            
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: '',
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
                    disabled: false,
                    href: '/miembro/cursos/mis-cursos',
                },
                {
                    text: 'Borrador',
                    disabled: false,
                    href: '/miembro/cursos/mis-cursos/borrador',
                },
            ],
        }
    },
    methods: {
        
    },
    async created() {
        const snapshotCurso = await fb.firestore()
        .collection('CursosBorrador').where('referenciaURL', '==', this.$route.params.referenciaURL).limit(1)
        .get()

        if (snapshotCurso.empty) this.$router.push('/miembro/cursos/mis-cursos/borrador')

        const doc = snapshotCurso.docs[0]

        this.breadcrumbs.push({
            text: doc.data().titulo,
            disabled: true,
            href: `/miembro/curso-borrador/${this.$route.params.referenciaURL}`,
        })
    },
}
</script>

<style>

</style>