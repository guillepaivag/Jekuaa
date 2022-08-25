<template>
    <div class="containerCardPoint mt-5">

        <div class="text-center text-h3 font-weight-bold mt-13 mb-13">
            ¡Consigue Fiipoints!
        </div>

        <v-divider class="mt-5 mb-9"></v-divider>

        <v-row class="mb-10">
            <v-col cols="12" md="7">
                <v-card 
                    v-for="(pack, index) in packs" :key="index"
                    outlined 
                    max-width="600"
                    class="pa-3 mb-6"
                >
                    <v-row>
                        <v-col cols="12" md="10" style="padding: 0;">
                            <v-card
                                class="cardPoint"
                                :color="pack.color"
                                outlined
                            >

                                <div 
                                    class="text-center font-weight-bold mt-3 mb-3"
                                    :class="pack.color === '#ffffff' ? 'black--text' : 'white--text'"
                                >
                                    <v-icon
                                        left
                                        :color="pack.color === '#ffffff' ? '#000000' : '#ffffff'"
                                    >
                                        mdi-alpha-p-box
                                    </v-icon>
                                    {{ pack.titulo }}
                                </div>

                                <div 
                                    class="text-center font-weight-bold mb-2 pl-0"
                                    :class="pack.color === '#ffffff' ? 'black--text' : 'white--text'"    
                                >
                                    ${{ pack.precioMoney }}

                                    <v-icon
                                        :color="pack.color === '#ffffff' ? '#000000' : '#ffffff'"
                                    >
                                        mdi-arrow-right
                                    </v-icon>

                                    <v-chip
                                        class=""
                                        :color="pack.color === '#ffffff' ? '#000000' : '#ffffff'"
                                        outlined
                                        style="font-size: 15px;"
                                        small
                                    >
                                        {{ pack.precioPointTotal }} FP
                                    </v-chip>

                                    <span
                                        class="ml-1 text-decoration-line-through"
                                        style="font-size: 15px; display: inline;"
                                    >
                                        {{ pack.precioPoint }} FP
                                    </span>
                                </div>

                                <!-- <div class="text-center mb-2" :class="pack.color === '#ffffff' ? 'black--text' : 'white--text'" v-if="pack.uid !== 'pack1'">
                                    <b 
                                        class="ml-1 text-decoration-line-through"
                                        style="font-size: 15px;"
                                    >
                                        {{ pack.precioPoint }} FP
                                    </b>
                                </div> -->

                            </v-card>
                        </v-col>

                        <v-col cols="12" md="2" style="padding-left: 10px; padding-right: 10px;">
                            <v-text-field
                                v-model="pack.cantidadParaComprar"
                                type="number"
                                min="0"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="12" md="5" class="text-center">
                <div class="mb-5">
                    <h3>Cantidad de packs:</h3>
                    <v-divider class="mb-1"></v-divider>
                    <p style="display: inline;">
                        {{ totalPacks }}
                    </p>
                </div>

                <div class="mb-5">
                    <h3>Total a pagar:</h3>
                    <v-divider class="mb-1"></v-divider>
                    <p style="display: inline;">
                        ${{ totalMoney }}
                    </p>
                </div>

                <div class="mb-10">
                    <h3>Total de points:</h3>
                    <v-divider class="mb-1"></v-divider>
                    <p style="display: inline;">
                        {{ totalPoints }} FP
                    </p>
                </div>

                <!-- <v-divider class="my-7"></v-divider> -->

                <v-btn
                    outlined
                    text
                    block
                    color="#683bce"
                >
                    Realizar pedido
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { deserializePayload } from 'instantsearch.js/es/lib/utils'
export default {
    data() {
        return {
            packs: [
                { uid: 'pack1', titulo: 'Pack 1', precioMoney: 3.99, precioPoint: 50, precioPointTotal: 50, color: '#ffffff', cantidadParaComprar: 0 },
                { uid: 'pack2', titulo: 'Pack 2', precioMoney: 7.99, precioPoint: 100, precioPointTotal: 102, color: '#ffffff', cantidadParaComprar: 0 },
                { uid: 'pack3', titulo: 'Pack 3', precioMoney: 15.99, precioPoint: 200, precioPointTotal: 210, color: '#FF1D89', cantidadParaComprar: 0 },
                { uid: 'pack4', titulo: 'Pack 4', precioMoney: 23.99, precioPoint: 300, precioPointTotal: 327, color: '#683bce', cantidadParaComprar: 0 },
                { uid: 'pack5', titulo: 'Pack 5', precioMoney: 29.99, precioPoint: 375, precioPointTotal: 428, color: '#FF1D89', cantidadParaComprar: 0 },
                { uid: 'pack6', titulo: 'Pack 6', precioMoney: 49.99, precioPoint: 625, precioPointTotal: 769, color: '#ffffff', cantidadParaComprar: 0 },
                { uid: 'pack7', titulo: 'Pack 7', precioMoney: 99.99, precioPoint: 1250, precioPointTotal: 1625, color: '#ffffff', cantidadParaComprar: 0 },
            ],
            totalPacks: 0,
            totalMoney: 0,
            totalPoints: 0,
        }
    },

    watch: {
        'packs': {
            handler: function (n, v) {
                let totalPacks = 0
                let totalMoney = 0
                let totalPoints = 0

                let i = 0
                for (const pack of this.packs) {
                    const cantidadParaComprar = Number(pack.cantidadParaComprar)
                    if (cantidadParaComprar === 0) continue

                    totalPacks += cantidadParaComprar
                    totalMoney += (cantidadParaComprar * pack.precioMoney)
                    totalPoints += (cantidadParaComprar * pack.precioPointTotal)

                    i++
                }

                this.totalPacks = Number(totalPacks)
                this.totalMoney = Number(totalMoney).toFixed(2)
                this.totalPoints = Number(totalPoints)
            },
            deep: true
        },
    }
}
</script>

<style scoped>
.containerCardPoint {
    margin: 0 10%;
    
}

.cardPoint {
    height: 100%;
}
</style>