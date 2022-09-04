<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="470"
        >
            <v-card-text>
                <p class="text-h4 text--primary">
                    Sin acceso
                </p>
                <p>
                    Jekuaapy
                </p>
                <div class="text--primary">
                    Para ver este contenido por favor compra el curso. <br>
                    Y comienza con un mundo de aprendizaje 🚀
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    v-if="curso.datosPrecio.precio === 0"
                    outlined
                    text
                    color="#683bce"
                    :to="`/pedidos/nuevo/curso/${curso.uid}`"
                >
                    Reclamar gratis
                </v-btn>

                <v-btn
                    v-else-if="!estaEnDescuento(curso.datosPrecio.descuento)"
                    outlined
                    text
                    color="#683bce"
                    :to="`/pedidos/nuevo/curso/${curso.uid}`"
                >
                    Comprar
                </v-btn>

                <v-btn
                    v-else
                    outlined
                    text
                    color="#683bce"
                    :to="`/pedidos/nuevo/curso/${curso.uid}`"
                >
                    {{
                        curso.datosPrecio.descuento.precio === 0 ? 
                        'Reclamar gratis' : 'Comprar'
                    }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        curso: Object,
    },
    methods: {
        estaEnDescuento (descuento) {
            if (!descuento) return false

            const currentSecond = Date.now() / 1000
            return currentSecond >= descuento.fechaInicio.seconds && currentSecond < descuento.fechaFin.seconds
        },
    },
}
</script>

<style>

</style>