<template>
    <div class="ProseMirror" v-html="contenido"></div>
</template>

<script>
export default {
    name: 'visualizador-articulo',
    props: {
        contenido: String
    },
}
</script>

<style lang="scss" scoped>

</style>