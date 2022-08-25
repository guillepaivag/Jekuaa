<template>
    <div class="container mt-5">

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
                            <BuscadorCursosPublicado :configuration="configurations.configuration1" />
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
                            <BuscadorCursosPublicado :configuration="configurations.configuration2" />
                        </ClientOnly>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import BuscadorCursosPublicado from '@/components/cursos-publicado/moderador/BuscadorCursosPublicado'

export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    data() {
        return {
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
        BuscadorCursosPublicado
    },
    methods: {
        
    },
    computed: {
      
    },
}
</script>

<style>

</style>