<template>
    <div>
        <div v-if="contieneErroresProps">
            <ul>
                <li v-for="(item, index) in mensajesErrorProps" :key="index">
                    {{ item }}
                </li>
            </ul>
        </div>

        <div v-else>
            Siuuu ¡no hay errores!
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
    props: {
        contieneErroresProps: Boolean,
        mensajesErrorProps: Array
    }
}
</script>

<style>

</style>