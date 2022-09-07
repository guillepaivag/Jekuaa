<template>
    <div class="ProseMirror" v-html="contenido"></div>
</template>

<script>
export default {
    name: 'visualizador-articulo',
    props: {
        contenido: String
    },
    mounted () {
        const collection = document.querySelectorAll('pre code')

        for (let i = 0; i < collection.length; i++) {
            const element = collection[i]
            collection[i].innerHTML = hljs.highlightAuto(element.textContent).value
        }
    }
}
</script>

<style lang="scss" scoped>

</style>