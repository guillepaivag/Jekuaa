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
                            <BuscadorBlog :esMiembro="true" />
                        </ClientOnly>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            

            <v-tab-item
                :value="`tab-1`"
            >
                <v-card flat>
                    <v-card-text>
                        <BlogsNoPublicados 
                            :filtrosInicializados="filtrosInicializados.noPublicados"
                        />
                    </v-card-text>
                </v-card>
            </v-tab-item>


            <v-tab-item
                :value="`tab-2`"
            >
                <v-card flat>
                    <v-card-text>
                        <BlogsNoPublicados 
                            :filtrosInicializados="filtrosInicializados.deshabilitados" 
                        />
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import BuscadorBlog from '@/components/blogs/BuscadorBlog'
import BlogsNoPublicados from '@/components/blogs/miembro/BlogsNoPublicados'

export default {
    data() {
        return {
            modelTabs: 'tab-0',
            titleTabs: [
                'Publicados', 
                'No publicados', 
                'Deshabilitados'
            ],
            filtrosInicializados: {
                noPublicados: {     
                    publicador: this.$store.state.modules.usuarios.uid,
                    publicado: false,
                },
                deshabilitados: {
                    publicador: this.$store.state.modules.usuarios.uid,
                    habilitado: false,
                }
            }
        }
    },
    components: {
        BuscadorBlog,
        BlogsNoPublicados
    }
}
</script>

<style>

</style>