<template>
    <div class="ProseMirror contenedorVisualizador mt-5 mb-5" v-html="contenido"></div>
</template>

<script>
export default {
    name: 'visualizador-blog',
    props: {
        contenido: String
    },
}
</script>

<style lang="scss" scoped>
.contenedorVisualizador {
    padding: 0 135px 20px 135px;
}

@media (min-width: 0) and (max-width: 899px) { 
    .contenedorVisualizador {
        margin: 0;
        padding: 0 7px 20px 7px;
    }
}

@media (min-width: 700px) and (max-width: 899px) { 
    .contenedorVisualizador {
        p {
            margin-bottom: 20px;
            font-size: 18px;
        }
    }
}

@media (min-width: 0) and (max-width: 699px) { 
    .contenedorVisualizador {
        p {
            margin-bottom: 20px;
            font-size: 18px;
        }
    }
}

</style>