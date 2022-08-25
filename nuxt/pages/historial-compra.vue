<template>
    <div>
        <div class="text-center mt-5">
            <v-btn
                class="ma-2"
                outlined
                large
                text
                color="#683bce"
                to="/historial-compra/productos"
            >
                <v-icon left>
                    mdi-cart
                </v-icon>
                Productos
            </v-btn>
            <!-- <v-btn
                class="ma-2"
                outlined
                large
                text
                color="#ff1d89"
                to="/historial-compra/monedas"
            >
                <v-icon left>
                    mdi-cash
                </v-icon>
                Monedas
            </v-btn> -->
        </div>

        <nuxt-child />
    </div>
</template>

<script>
export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    },
}
</script>

<style scoped>

</style>