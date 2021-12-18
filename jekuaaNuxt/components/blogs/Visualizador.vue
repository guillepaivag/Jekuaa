<template>
    <div class="contenedor_blog_padre">
        <div class="contenedor_blog mt-5 mb-5" v-html="contenidoBlog"></div>
    </div>
</template>

<script>
export default {
    name: 'visualizador-blog',
    props: {
        contenidoBlog: String
    },
}
</script>

<style scoped>
.contenedor_blog_padre {
    margin: 30px 0 30px 0;
}

.contenedor_blog {
    margin: 0 125px 0 125px;
}

.contenedor_blog >>> h1 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 40px;
}

.contenedor_blog >>> h2 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 30px;
}

.contenedor_blog >>> h3 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 25px;
}

.contenedor_blog >>> p {
    margin-bottom: 20px;
    font-size: 20px;
}

.contenedor_blog >>> img {
    width: 100%;
}

@media (min-width: 700px) and (max-width: 899px) { 
    .contenedor_blog {
        margin: 0 100px 0 100px;
    }

    .contenedor_blog >>> p {
        margin-bottom: 20px;
        font-size: 18px;
    }
}

@media (min-width: 0) and (max-width: 699px) { 
    .contenedor_blog {
        margin: 0;
    }

    .contenedor_blog >>> p {
        margin-bottom: 20px;
        font-size: 18px;
    }
}

</style>