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

        <ClientOnly>
            <BuscadorBlog />
        </ClientOnly>
    </div>
</template>

<script>
import BuscadorBlog from '@/components/blogs/BuscadorBlog'
export default {
    data() {
        return {
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Blogs',
                    disabled: true,
                    href: '/blogs',
                },
            ],
        }
    },
    components: {
        BuscadorBlog
    }
}
</script>

<style scoped>

</style>