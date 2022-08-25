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

        <v-tabs
          v-model="modelTabs"
          centered
          slider-color="#683bce"
        >
          <v-tab
            v-for="(title, i) in titleTabs"
            :key="i"
            :href="`#tab-${i}`"
          >
            {{ title }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="modelTabs">
            <v-tab-item
                :value="`tab-0`"
            >
                <v-card flat>
                    <v-card-text>
                        <ClientOnly>
                            <BuscadorCursosPublicadoMiembro :configuration="configurations.configuration1" />
                        </ClientOnly>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            

            <v-tab-item
                :value="`tab-1`"
            >
                <v-card flat>
                    <v-card-text>
                        <ClientOnly>
                            <BuscadorCursosPublicadoMiembro :configuration="configurations.configuration2" />
                        </ClientOnly>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

    </div>
</template>

<script>
import BuscadorCursosPublicadoMiembro from '@/components/cursos-publicado/miembro/BuscadorCursosPublicado'

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
                    text: 'Publicados',
                    disabled: true,
                    href: '/miembro/cursos/publicados',
                },
            ],
            modelTabs: 'tab-0',
            titleTabs: [
                'Publicados', 
                'Ocultos',
            ],
            configurations: {
                configuration1: {
                    estado: 'publicado',
                },
                configuration2: {
                    estado: 'oculto',
                },
            },
        }
    },
    components: {
        BuscadorCursosPublicadoMiembro,
    }
}
</script>

<style>

</style>