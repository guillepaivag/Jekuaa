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
                            <BuscadorBlog :modoMiembro="true" :configuration="configurations.configuration1" />
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
                            <BuscadorBlog :modoMiembro="true" :configuration="configurations.configuration2" />
                        </ClientOnly>
                    </v-card-text>
                </v-card>
            </v-tab-item>


            <v-tab-item
                :value="`tab-2`"
            >
                <v-card flat>
                    <v-card-text>
                        <ClientOnly>
                            <BuscadorBlog :modoMiembro="true" :configuration="configurations.configuration3" />
                        </ClientOnly>
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
            configurations: {
                configuration1: {
                    soloPublicados: true,
                    soloHabilitados: true,
                },
                configuration2: {
                    soloPublicados: false,
                },
                configuration3: {
                    soloHabilitados: false,
                },
            },
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
                    text: 'Blogs',
                    disabled: false,
                    href: '/miembro/blogs',
                },
                {
                    text: 'Mis blogs',
                    disabled: true,
                    href: '/miembro/blogs/mis-blogs',
                },
            ],
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