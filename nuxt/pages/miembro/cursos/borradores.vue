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
                    text: 'Borradores',
                    disabled: true,
                    href: '/miembro/cursos/borradores',
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