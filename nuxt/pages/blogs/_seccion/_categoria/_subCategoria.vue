<template>
    <div class="container">
        <ClientOnly>
            <BuscadorBlog :esMiembro="false" />
        </ClientOnly>
    </div>
</template>

<script>
import BuscadorBlog from '@/components/blogs/BuscadorBlog'
export default {
    components: {
        BuscadorBlog
    }
}
</script>

<style>

</style>