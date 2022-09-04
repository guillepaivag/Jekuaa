<template>
    <div class="container">
        <v-row style="margin-top: -17px;" no-gutters>
            <v-col cols="12" md="8">
                <v-form :disabled="actualizandoPrecio" class="contenedor_izquierdo">

                    <!-- Estado -->
                    <h3 class="mb-5"> 
                        El curso es de tipo: 
                        {{ precio !== 0 ? 'Pago' : 'Gratis' }} 
                    </h3>

                    <!-- Precio -->
                    <div class="mb-3">
                        <v-row>
                            <v-col cols="9">
                                <v-text-field
                                    v-model="computedPrecio"
                                    class="mt-0 pt-0"
                                    type="number"
                                    label="Jekuaapoints:"
                                    placeholder="Jekuaapoints"
                                    @input="$v.precio.$touch()"
                                    @blur="$v.precio.$touch()"
                                    :error-messages="errorsPrecio"
                                    color="#683bce"
                                    max="2700"
                                    min="0"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                ${{JP_to_dolar(precio)}}
                            </v-col>
                        </v-row>
                    </div>
                    
                    <!-- <v-slider
                        v-model.number="precio"
                        :error-messages="errorsPrecio"
                        label="Precio:"
                        required
                        color="#683bce"
                        @input="$v.precio.$touch()"
                        @blur="$v.precio.$touch()"
                        thumb-color="#683bce"
                        max="300"
                        min="0"
                    >
                        <template v-slot:append>
                            <v-text-field
                                v-model="precio"
                                class="mt-0 pt-0"
                                hide-details
                                single-line
                                type="number"
                                style="width: 70px"
                            ></v-text-field>
                        </template>
                    </v-slider> -->

                    <!-- Existe descuento -->
                    <v-checkbox
                        v-model="conDescuento"
                        class=""
                        :disabled="!precio || precio < 250"
                        color="#683bce"
                        label="¿Quieres agregar descuento?"
                        style="margin-top: 0;"
                    ></v-checkbox>

                    <div class="contenedor_descuento mt-3" v-if="conDescuento && precio && precio >= 10">
                        <!-- Porcentaje descuento -->
                        <v-slider
                            v-model="descuento.porcentaje"
                            :error-messages="errorsPorcetajeDescuento"
                            label="Porcentaje:"
                            class="mb-3"
                            color="#683bce"
                            @input="$v.descuento.porcentaje.$touch()"
                            @blur="$v.descuento.porcentaje.$touch()"
                            thumb-color="#683bce"
                            max="100"
                            min="3"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="descuento.porcentaje"
                                    class="mt-0 pt-0"
                                    hide-details
                                    single-line
                                    type="number"
                                    style="width: 70px"
                                    max="100"
                                    min="3"
                                ></v-text-field>
                            </template>
                        </v-slider>

                        <!-- Fecha hasta de descuento -->
                        <div class="mb-5">
                            <v-date-picker
                                v-model="descuento.fechas"
                                color="#683bce"
                                no-title
                                scrollable
                                full-width
                                range
                                :allowed-dates="allowedDates"
                                :disabled="actualizandoPrecio"
                            >
                            </v-date-picker>
                        </div>

                        <!-- Precio actualizado -->
                        <div class="mb-3">
                            <p>
                                <b>Precio con descuento:</b> 
                                {{ getDescuento(precio, descuento) }} JP
                            </p>
                            <p>
                                <b>Precio con descuento:</b> 
                                ${{ JP_to_dolar_descuento(precio, descuento) }}
                            </p>
                        </div>

                    </div>

                    <v-divider class="mb-7"></v-divider>

                    <v-btn
                        :loading="actualizandoPrecio"
                        :disabled="$v.$anyError || (conDescuento && descuento.fechas.length !== 2)"
                        class=""
                        outlined
                        color="#683bce"
                        v-on:click="actualizarPrecio"
                    >
                        Actualizar precio
                    </v-btn>
                </v-form>
            </v-col>

            <v-col cols="12" md="4">
                <div class="contenedor_derecho">
                    <h3>Reglas</h3>
                    <v-divider class="mb-5"></v-divider>

                    <ul>
                        <li v-for="(regla, index) in reglas" :key="index">
                            {{ regla }}
                        </li>
                    </ul>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, numeric, minValue, maxValue } from 'vuelidate/lib/validators'

import { fb } from '@/plugins/firebase'

export default {
    layout: 'miembro',
    middleware: 'esInstructor',

    mixins: [validationMixin],

    validations: {
        precio: { required, numeric, minValue: minValue(0), maxValue: maxValue(2700) },
        descuento: {
            porcentaje: { required, numeric, minValue: minValue(3), maxValue: maxValue(100) },
            fechaInicio: {},
            fechaFin: {},
        },
    },

    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            precio: 0,
            descuento: {
                porcentaje: 3,
                fechaInicio: 0,
                fechaFin: 0,
                fechas: [],
            },
            conDescuento: false,
            reglas: [
                '1JP = $0.0798',
                'El precio se maneja en Jekuaapoints (JP).',
                'El precio de un curso debe estar en un rango de 0JP a 2700JP.',
                'Para aplicar descuentos al curso, el curso debe costar mínimo 250JP.',
                'El % de descuento un curso debe estar en un rango de 3% a 100%.',
                'Son requeridas las fechas desde/hasta de descuento para un curso en descuento.'
            ],
            actualizandoPrecio: false,
        }
    },

    methods: {
        getDescuento (precio, descuento) {
            let precioDescuento = precio - ( precio * (descuento.porcentaje / 100) )
            return Number(precioDescuento.toFixed())
        },
        JP_to_dolar (JP) {
            let dolar = 0.0798 * JP
            return dolar.toFixed(2)
        },
        JP_to_dolar_descuento (JP, descuento) {
            let dolar = 0.0798 * JP
            let result = dolar - ( dolar *  (descuento.porcentaje / 100) )
            return result.toFixed(2)
        },
        middleware () {
            // Vuelidate
            this.$v.$touch()

            // Precio

            // Porcentaje descuento

            // Fechas

            // Fecha inicio

            // Fecha fin

            return {
                precio: this.precio,
                descuento: this.conDescuento ? {
                    porcentaje: this.descuento.porcentaje / 100,
                    fechaInicio: this.descuento.fechaInicio,
                    fechaFin: this.descuento.fechaFin,
                } : null
            }
        },
        async actualizarPrecio () {
            try {
                const datosPrecio = this.middleware()
                this.actualizandoPrecio = true
                
                // Axios                
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { datosPrecio }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCurso
                await this.$axios.$put(`/serviceCursoBorrador/miembro/actualizar-precio/${uidCurso}`, body, config)

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.actualizandoPrecio = false
            }
        },
        allowedDates (date) {
            // Disponible solo los 30 primeros días
            const todayDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

            const getTimeDate = new Date(date).getTime()
            const getTimeTodayDate = new Date(todayDate).getTime()

            return getTimeTodayDate <= getTimeDate
        },
        sumarDias(fecha, dias){
            fecha.setDate(fecha.getDate() + dias)
            return fecha
        },
    },

    watch: {
        precio: function (n, v) {
            if (this.precio < 250) this.conDescuento = false
        },
        conDescuento: function (n, v) {
            if (!this.conDescuento) {
                this.descuento = {
                    porcentaje: 3,
                    fechaInicio: 0,
                    fechaFin: 0,
                    fechas: [],
                }
            }
        },
        'descuento.fechas': function (n, v) {
            if (this.descuento.fechas.length !== 2) return

            if (new Date(this.descuento.fechas[0]).getTime() > new Date(this.descuento.fechas[1]).getTime()) {
                const aux = this.descuento.fechas[0]
                this.descuento.fechas[0] = this.descuento.fechas[1]
                this.descuento.fechas[1] = aux
            }

            this.descuento.fechaInicio = new Date(`${this.descuento.fechas[0]}T00:00:00Z`).getTime()
            this.descuento.fechaFin = new Date(`${this.descuento.fechas[1]}T23:59:59Z`).getTime()
        }
    },

    computed: {
        computedPrecio: {
            get: function() {
                return this.precio
            },
            set: function(newValue) {
                let isDecimal = newValue.includes(',')
                this.precio = isDecimal ? 0 : Number(parseInt(newValue))
                return Number(parseInt(newValue))
            }
        },
        errorsPrecio () {
            const errors = []
            if (!this.$v.precio.$dirty) return errors
            !this.$v.precio.required && errors.push('El precio debe existir.')
            !this.$v.precio.numeric && errors.push('El precio debe ser numérico.')
            !this.$v.precio.minValue && errors.push('El mínimo precio es 0JP.')
            !this.$v.precio.maxValue && errors.push('El máximo precio es 2700JP.')
            
            return errors
        },
        errorsPorcetajeDescuento () {
            const errors = []
            if (!this.$v.descuento.porcentaje.$dirty) return errors
            !this.$v.descuento.porcentaje.required && errors.push('El precio debe existir.')
            !this.$v.descuento.porcentaje.numeric && errors.push('El descuento debe ser numérico.')
            !this.$v.descuento.porcentaje.minValue && errors.push('El mínimo descuento es 3%.')
            !this.$v.descuento.porcentaje.maxValue && errors.push('El máximo descuento es 100%.')
            
            return errors
        },
    },

    async created() {
        const db = fb.firestore()

        const docCursoPublicado = await db.collection('CursosPublicado').doc(this.uidCurso).get()

        if (docCursoPublicado.exists) {
            this.precio = docCursoPublicado.data().datosPrecio.precio

            if ( docCursoPublicado.data().datosPrecio.descuento ) {
                const milliseconds = {
                    inicio: docCursoPublicado.data().datosPrecio.descuento.fechaInicio.seconds * 1000,
                    fin: docCursoPublicado.data().datosPrecio.descuento.fechaFin.seconds * 1000
                }

                const dateString = {
                    inicio: (new Date(milliseconds.inicio - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    fin: (new Date(milliseconds.fin - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                }

                this.descuento = {
                    porcentaje: docCursoPublicado.data().datosPrecio.descuento.porcentaje * 100,
                    fechaInicio: milliseconds.inicio,
                    fechaFin: milliseconds.fin,
                    fechas: [dateString.inicio, dateString.fin],
                }
            } else {
                this.descuento = {
                    porcentaje: 3,
                    fechaInicio: 0,
                    fechaFin: 0,
                    fechas: [],
                }
            }

            this.conDescuento = !!docCursoPublicado.data().datosPrecio.descuento
        
        } else {
            const docCursoBorrador = await db.collection('CursosBorrador').doc(this.uidCurso).get()

            if (docCursoBorrador.exists) {
                this.precio = docCursoBorrador.data().datosPrecio.precio
                
                if ( docCursoBorrador.data().datosPrecio.descuento ) {
                    const milliseconds = {
                        inicio: docCursoBorrador.data().datosPrecio.descuento.fechaInicio.seconds * 1000,
                        fin: docCursoBorrador.data().datosPrecio.descuento.fechaFin.seconds * 1000
                    }

                    const dateString = {
                        inicio: (new Date(milliseconds.inicio - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                        fin: (new Date(milliseconds.fin - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    }

                    this.descuento = {
                        porcentaje: docCursoBorrador.data().datosPrecio.descuento.porcentaje * 100,
                        fechaInicio: milliseconds.inicio,
                        fechaFin: milliseconds.fin,
                        fechas: [dateString.inicio, dateString.fin],
                    }
                } else {
                    this.descuento = {
                        porcentaje: 3,
                        fechaInicio: 0,
                        fechaFin: 0,
                        fechas: [],
                    }
                }

                this.conDescuento = !!docCursoBorrador.data().datosPrecio.descuento
            
            } else {
                this.$router.push(`/miembro/curso-borrador/${this.uidCurso}`)
            }
        }
    },
}
</script>

<style scoped>
.contenedor_izquierdo {
    padding-right: 20px !important;
}

.contenedor_derecho {
    padding-left: 5px !important;
}

@media (max-width: 959px) {
    .contenedor_izquierdo {
        padding-right: 0 !important;
        margin-bottom: 50px;
    }

    .contenedor_derecho {
        padding-left: 0 !important;
    }
}
</style>