<template>
    <div class="ProseMirror mt-5 mb-5" v-html="contenidoBlog"></div>
</template>

<script>
export default {
    name: 'visualizador-blog',
    props: {
        contenidoBlog: String
    },
}
</script>

<style lang="scss" scoped>
// .contenedorVisualizador {
//     max-width: 1200px;
//     margin: 0 auto;
// }

// @media (min-width: 0px) and (max-width: 499px) { 
//     .contenedorVisualizador {
//         max-width: 1200px;
//         margin: 0;
//     }
// }
</style>