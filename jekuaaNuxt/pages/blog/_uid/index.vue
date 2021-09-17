<template>
    <div>
        <nav>
            <ul>
                <li v-for="link of article.toc" :key="link.id">
                    <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
                </li>
            </ul>
        </nav>

        <nuxt-content :document="article" />

        <pre> {{ article }} </pre>

        <div class="p-4 mb-4 text-white bg-blue-500">
            This is HTML inside markdown that has a class of note
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            
        }
    },
    async created() {
        // const uidBlog = this.$route.params.uid
        // const documentBlog = await this.$firebase.firestore().collection('Blog').doc(uidBlog).get()

        // if ( !documentBlog.exists ) {
        //     this.$router.push('/blog')
        // }

        // const blog = documentBlog.data()

        // if ( !blog.habilitado ) {
        //     this.$router.push('/blog')
        // }
        
    },
    async asyncData({ $content, params }) {
        const uidBlog = params.uid
        const article = await $content('articles', uidBlog).fetch()

        return { article }
    },
}
</script>

<style>
.nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
}
.nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
}
.nuxt-content p {
    margin-bottom: 20px;
}
</style>