<template>
    <div>
        {{nombreUsuario}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            nombreUsuario: this.$route.params.nombreUsuario
        }
    },
}
</script>

<style>

</style>