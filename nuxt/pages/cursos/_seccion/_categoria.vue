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

        <div>
            <ClientOnly>
                <BuscadorCursosPublicado />
            </ClientOnly>
        </div>
    </div>
</template>

<script>
import BuscadorCursosPublicado from '@/components/cursos-publicado/estudiante/BuscadorCursosPublicado'

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
                    text: 'Cursos',
                    disabled: true,
                    href: '/cursos',
                },
            ],
        }
    },
    components: {
        BuscadorCursosPublicado,
    }
}
</script>

<style>

</style>