<template>
    <div class="">
        <v-row>
            <v-col cols="12" md="8">
                <div class="contenedor_izquierdo mt-8">
                    <h2>¡Hola {{ $store.state.modules.usuarios.nombreCompleto }}!</h2>
                    <p class="mb-12">
                        ¡Solo falta confirmar tu pedido! 🚀
                    </p>

                    <h2>Pedido:</h2>
                    <v-divider></v-divider>

                    <v-card v-if="data" class="mt-5 pa-3">

                        <v-row>
                            <v-col cols="12" sm="5">
                                <v-img
                                    class=""
                                    max-height="250"
                                    max-width="400"
                                    :src="data.fotoPerfil"
                                ></v-img>
                            </v-col>
                            <v-col cols="12" sm="7">
                                <h2 class="mt-2"> {{ data.titulo }} </h2>
                                
                                <v-divider class="my-3"></v-divider>

                                <v-chip
                                    v-if="esGratis"
                                    class=""
                                    color="#683bce"
                                    outlined
                                    style="font-size: 17px;"
                                    small
                                >
                                    ¡Gratis!
                                </v-chip>

                                <v-chip
                                    v-else-if="!hayDescuento"
                                    class=""
                                    color="#683bce"
                                    outlined
                                    style="font-size: 17px;"
                                    small
                                >
                                    {{ data.datosPrecio.precio }} FP
                                </v-chip>
                                <div v-else>
                                    <v-chip
                                        class=""
                                        color="#683bce"
                                        outlined
                                        style="font-size: 17px;"
                                        small
                                    >
                                        {{ data.datosPrecio.descuento.precio }} FP
                                    </v-chip>

                                    <b 
                                        class="ml-1 text-decoration-line-through"
                                        style="color: #aaaaaa; font-size: 16px;"    
                                    >
                                        {{ data.datosPrecio.precio }} FP
                                    </b>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </div>
            </v-col>
            <v-col class="resumen white--text" cols="12" md="4">
                <div class="contenedor_derecho mt-5">
                    <h2 class="" style="font-size: 28px;">Resumen:</h2>
                    <v-divider></v-divider>

                    <div class="mt-7" v-if="data">
                        <p style="margin-bottom: 0; font-size: 18px;">
                            <b>Precio original:</b> {{ data.datosPrecio.precio }} FP
                        </p>

                        <p style="margin-bottom: 0; font-size: 18px;" v-if="hayDescuento">
                            <b>Porcentaje de descuento:</b> {{ data.datosPrecio.descuento.porcentaje*100 }}%
                        </p>

                        <p style="margin-bottom: 0; font-size: 18px;" v-if="hayDescuento">
                            <b>Precio con descuento:</b> {{ data.datosPrecio.descuento.precio }} FP
                        </p>

                        <p style="margin-bottom: 0; font-size: 18px;" v-if="hayDescuento">
                            <b>Fecha fin de descuento:</b> {{ toLocaleString(data.datosPrecio.descuento.fechaFin.seconds) }}
                        </p>

                        <v-divider class="my-3"></v-divider>
                        
                        <div class="mb-10">
                            <b style="font-size: 24px;">
                                Precio total: 
                                {{ !hayDescuento ? data.datosPrecio.precio : data.datosPrecio.descuento.precio }} FP
                            </b>
                        </div>

                        <p style="margin-bottom: 0;" class="text-center" v-if="!tieneParaComprar">
                            ¡Ohh no! No tienes suficiente FiiPoints
                        </p>
                        <v-btn
                            v-if="!tieneParaComprar"
                            class="white--text mb-5"
                            block
                            color="#683bce"
                            :to="linkComprarFiiPoints"
                        >
                            ¡Comprar FiiPoints!
                        </v-btn>

                        <v-btn
                            v-if="tieneParaComprar && !pagado"
                            class="white--text mb-5"
                            block
                            :loading="loading"
                            :disabled="loading"
                            color="#683bce"
                            v-on:click="pagar"
                        >
                            Pagar e inscribirme
                        </v-btn>
                        
                        <v-btn
                            v-else-if="tieneParaComprar && pagado"
                            class="white--text mb-5"
                            block
                            color="#683bce"
                            :to="linkVerProducto"
                        >
                            Ver producto
                        </v-btn>

                        <p class="" style="font-size: 16px; margin-top: -5px;">
                            Al inscribirte aceptas estas <nuxt-link style="color: #683bce;" to="/" target="_blank">Condiciones de uso.</nuxt-link>
                        </p>

                        <nuxt-link style="color: #ffffff;" to="/" target="_blank">
                            ¿Qué son los FiiPoints (FP)?
                        </nuxt-link>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            tipoProducto: this.$route.params.tipoProducto,
            uidProducto: this.$route.params.uidProducto,
            doc: null,
            data: null,
            hayDescuento: false,
            esGratis: false,
            loading: false,
            pagado: false,
            linkVerProducto: '/',
            linkComprarFiiPoints: '/',
            tieneParaComprar: false,
        }
    },
    methods: {
        toLocaleString (seconds) {
            let d = new Date(seconds*1000)
            return d.toLocaleString()
        },
        async pagar () {
            try {
                this.loading = true

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let pedidos = [
                    { tipoItem: this.tipoProducto, uidItem: this.uidProducto },
                ]

                let body = { pedidos }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$post(`/servicePedido/generarPedidoProducto`, body, config)

                this.pagado = true

                if (this.tipoProducto === 'curso') this.linkVerProducto = `/curso/${this.data.codigo}`

                if (this.hayDescuento) this.$store.state.modules.usuarios.point -= this.data.datosPrecio.descuento.precio
                else this.$store.state.modules.usuarios.point -= this.data.datosPrecio.precio
                
                this.$router.push(this.linkVerProducto)
                
            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            
            } finally {
                this.loading = false
            }
        },
    },
    async created() {
        let precio = 0

        if (this.tipoProducto === 'curso') {
            this.doc = await db.collection('CursosPublicado').doc(this.uidProducto).get()

            if (!this.doc.exists) {
                this.$router.push('/cursos')
                return
            }
        
            this.data = this.doc.data()
            this.esGratis = this.data.datosPrecio.precio === 0
            precio = this.data.datosPrecio.precio

            if (this.data.datosPrecio.descuento) {
                const fechaInicio = this.data.datosPrecio.descuento.fechaInicio.seconds * 1000
                const fechaFin = this.data.datosPrecio.descuento.fechaFin.seconds * 1000

                this.hayDescuento = Date.now() > fechaInicio && Date.now() < fechaFin
                if (this.hayDescuento) precio = this.data.datosPrecio.descuento.precio
            }
        } else {
            this.$router.push('/')
        }

        this.tieneParaComprar = this.$store.state.modules.usuarios.point >= precio
    },
}
</script>

<style scoped>
.resumen {
    background-color: #6FC8BA !important;
    height: 100vh !important;
}

.contenedor_izquierdo {
    margin-left: 120px;
}

.contenedor_derecho {
    margin: 0 20px;
}

@media (max-width: 959px) {
    .contenedor_izquierdo {
        margin: 20px;
    }

    .contenedor_derecho {
        margin: 0 20px;
    }
}
</style>