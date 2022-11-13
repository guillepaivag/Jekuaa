<template>
    <div class="">
        <v-row>
            <v-col cols="12" md="8">
                <div class="contenedor_izquierdo mt-8">
                    <div class="text-center mb-7">
                        <h2>¡Hola {{ $store.state.modules.usuarios.nombreCompleto }}!</h2>
                        <p>
                            ¡Solo falta confirmar tu pedido! 🚀
                        </p>
                    </div>

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
                                    {{ data.datosPrecio.precio }} JP
                                </v-chip>
                                <div v-else>
                                    <v-chip
                                        class=""
                                        color="#683bce"
                                        outlined
                                        style="font-size: 17px;"
                                        small
                                    >
                                        {{ data.datosPrecio.descuento.precio }} JP
                                    </v-chip>

                                    <b 
                                        class="ml-1 text-decoration-line-through"
                                        style="color: #aaaaaa; font-size: 16px;"    
                                    >
                                        {{ data.datosPrecio.precio }} JP
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

                    <div class="mt-4" v-if="data">
                        <p v-if="!hayDescuento" style="margin-bottom: 0; font-size: 18px;">
                            <b>Precio unitario:</b> {{ data.datosPrecio.precio }} JP
                        </p>
                        <p v-if="hayDescuento" style="margin-bottom: 0; font-size: 18px;">
                            <b>Precio unitario con descuento:</b> {{ data.datosPrecio.descuento.precio }} JP
                            <b 
                                class="ml-1 text-decoration-line-through"
                                style="color: #ffffff; font-size: 15px;"
                            >
                                {{ data.datosPrecio.precio }} JP
                            </b>
                        </p>

                        <p v-if="esProductoDeObtencionUnica" style="margin-bottom: 0; font-size: 18px;">
                            <b>Cantidad:</b> {{cantidad}}
                        </p>
                        <p v-else :style="cantidadErrors.length ? 'margin-bottom: 0px;' : 'margin-bottom: -10px;'" style="font-size: 18px;">
                            <v-text-field
                                v-model="cantidad"
                                label="Cantidad"
                                required
                                type="number"
                                :error-messages="cantidadErrors"
                                @input="$v.cantidad.$touch()"
                                @blur="$v.cantidad.$touch()"
                            ></v-text-field>
                        </p>

                        <p style="margin-bottom: 0; font-size: 18px;" v-if="hayDescuento">
                            <b>Porcentaje de descuento:</b> {{ data.datosPrecio.descuento.porcentaje*100 }}%
                        </p>

                        <p style="margin-bottom: 0; font-size: 18px;" v-if="hayDescuento">
                            <b>Fecha fin de descuento:</b> {{ toLocaleString(data.datosPrecio.descuento.fechaFin.seconds) }}
                        </p>

                        <v-divider class="my-3"></v-divider>
                        
                        <div class="mb-10">
                            <b style="font-size: 24px;">
                                Precio total: 
                                {{ !hayDescuento ? data.datosPrecio.precio*cantidad : data.datosPrecio.descuento.precio*cantidad }} JP
                            </b>
                        </div>

                        <p style="margin-bottom: 0;" class="text-center" v-if="!tieneParaComprar">
                            ¡Ohh no! No tienes suficiente Jekuaapoints
                        </p>
                        <v-btn
                            v-if="!tieneParaComprar"
                            class="white--text mb-5"
                            block
                            color="#683bce"
                            :to="linkComprarPoints"
                        >
                            ¡Comprar Jekuaapoints!
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
                            ¿Qué son los Jekuaapoints (JP)?
                        </nuxt-link>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minValue } from 'vuelidate/lib/validators'

import { fb } from '~/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    middleware: 'accesoAutenticado',
    mixins: [validationMixin],
    validations: {
        cantidad: { required, minValue: minValue(1) },
    },
    data() {
        return {
            productosDeObtencionUnica: ['curso'],
            productosDeObtencionMultiple: [],
            tipoProducto: this.$route.params.tipoProducto,
            uidProducto: this.$route.params.uidProducto,
            cantidad: 1,
            doc: null,
            data: null,
            esGratis: false,
            hayDescuento: false,
            loading: false,
            pagado: false,
            linkVerProducto: '/',
            linkComprarPoints: '/',
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

                let listaItems = [
                    { tipoItem: this.tipoProducto, uidItem: this.uidProducto, cantidad: this.cantidad },
                ]

                let body = { listaItems }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$post(`/servicePedido/producto/generarPedido`, body, config)

                this.pagado = true

                if (this.tipoProducto === 'curso') this.linkVerProducto = `/curso/${this.data.codigo}`

                if (this.hayDescuento) this.$store.state.modules.usuarios.point -= this.data.datosPrecio.descuento.precio*this.cantidad
                else this.$store.state.modules.usuarios.point -= this.data.datosPrecio.precio*this.cantidad
                
                this.$router.push(this.linkVerProducto)
                
            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            
            } finally {
                this.loading = false
            }
        },
    },
    computed: {
        esProductoDeObtencionUnica () {
            return this.productosDeObtencionUnica.includes(this.tipoProducto)
        },
        cantidadErrors () {
            const errors = []
            if (!this.$v.cantidad.$anyError) return errors
            !this.$v.cantidad.minValue && errors.push('La cantidad mínima es 1')
            return errors
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

            // this.data.datosPrecio.descuento = {
            //     precio: 0,
            //     porcentaje: 0.6,
            //     fechaInicio: {
            //         seconds: 1657162125,
            //     },
            //     fechaFin: {
            //         seconds: 1667789325,
            //     }
            // }

            if (this.data.datosPrecio.descuento) {
                const fechaAhora = Date.now()
                const fechaInicio = this.data.datosPrecio.descuento.fechaInicio.seconds * 1000
                const fechaFin = this.data.datosPrecio.descuento.fechaFin.seconds * 1000

                this.hayDescuento = fechaAhora > fechaInicio && fechaAhora < fechaFin
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