<template>
    <div class="container">

        Referencia del blog: {{referenciaBlog}}

        <br><br><br><br>
        Blog: {{blog}}

        <br><br><br><br>
        <div v-html="contenidoBlog"></div>

    </div>
</template>

<script>
import showdown from 'showdown'

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
    async asyncData({ app, $content, redirect, params }) {
        try {
            const referenciaBlog = params.referencia
            
            const ref = app.$firebase.firestore().collection('Blogs').where('referencia', '==', referenciaBlog)
            const docsBlogs = await ref.get()

            if (docsBlogs.empty) {
                redirect('/blog')
            }
            
            const docBlog = docsBlogs.docs[0]
            
            const blog = docBlog.data()
            if (!blog.habilitado || !blog.publicado) {
                redirect('/blog')
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let response = await app.$axios.get(`/blog/obtenerContenido/${blog.uid}`, config)

            const converter = new showdown.Converter()
            let contenidoBlog = converter.makeHtml(response.data)

            return {
                referenciaBlog,
                blog,
                contenidoBlog,
            }
        } catch (err) {
            console.log('err', err)
            redirect('/blog')
        }
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