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

        <div>
            <ClientOnly>
                <BuscadorCursosBorradorMiembro />
            </ClientOnly>
        </div>
    </div>
</template>

<script>
import BuscadorCursosBorradorMiembro from '@/components/cursos-borrador/miembro/BuscadorCursosBorrador'

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
                    disabled: true,
                    href: '/miembro/cursos/mis-cursos/borrador',
                },
            ],
        }
    },
    components: {
        BuscadorCursosBorradorMiembro,
    }
}
</script>

<style>

</style>