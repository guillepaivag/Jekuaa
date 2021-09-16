<template>
    <div>

        <h3 class="mt-3"> Crear nuevo usuario </h3>

        <v-stepper
            class="mt-5"
            v-model="step"
            vertical
        >
            <div
                v-for="(item, index) in infoTextoFormulario" :key="index"
            >
                <v-stepper-step
                    v-on:click="step = item.paso"
                    :complete="step > item.paso"
                    :step="item.paso"
                >
                    {{ item.titulo }}
                    <small v-if="item.descripcion"> {{ item.descripcion }} </small>
                </v-stepper-step>

                <v-stepper-content :step="item.paso">
                    <!-- Nombre de usuario -->
                    <v-text-field
                        v-if="item.paso === 1"
                        class="mb-5"
                        v-model="datosUsuario.nombreUsuario"
                        :error-messages="nombreUsuarioErrors"
                        :counter="logitudesDeTexto.maxNombreUsuario"
                        label="Nombre de usuario"
                        required
                        @input="$v.nombreUsuario.$touch()"
                        @blur="$v.nombreUsuario.$touch()"
                    ></v-text-field>

                    <!-- Correo -->
                    <v-text-field
                        v-if="item.paso === 2"
                        v-model="datosUsuario.correo"
                        :error-messages="correoErrors"
                        label="Correo"
                        required
                        @input="$v.correo.$touch()"
                        @blur="$v.correo.$touch()"
                    ></v-text-field>

                    <!-- Nombre completo -->
                    <v-text-field
                        v-if="item.paso === 3"
                        v-model="datosUsuario.nombreCompleto"
                        :error-messages="nombreCompletoErrors"
                        :counter="logitudesDeTexto.maxNombreCompleto"
                        label="Nombre completo"
                        @input="$v.nombreCompleto.$touch()"
                        @blur="$v.nombreCompleto.$touch()"
                    ></v-text-field>

                    <!-- Fecha de nacimiento -->
                    <v-date-picker
                        v-if="item.paso === 4"
                        color="#683bce"
                        full-width 
                        v-model="datosUsuario.fechaNacimiento"
                        locale="es-es"
                    ></v-date-picker>

                    <!-- Jekuaa Premium -->
                    <div v-if="item.paso === 5">
                        <v-select
                            class="mb-5"
                            v-model="planSeleccionado"
                            :hint="`${ planSeleccionado.value ? `Se selecciono el: ${planSeleccionado.text}` : 'No has elegido un plan todavía' }`"
                            :items="planes"
                            item-text="text"
                            item-value="value"
                            label="Plan"
                            persistent-hint
                            return-object
                            single-line
                        ></v-select>

                        <div class="fechasCompras" v-if="planSeleccionado.value">
                            <v-row justify="space-around">

                                <v-col
                                    cols="12"
                                    md="7"
                                >
                                    <v-date-picker
                                        v-model="rangoFechaPremium"
                                        full-width 
                                        range
                                    ></v-date-picker>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="5"
                                >
                                    {{ datosUsuario.jekuaaPremium.fechaCompra }} - {{ datosUsuario.jekuaaPremium.fechaHasta }}
                                </v-col>

                            </v-row>
                        </div>
                    </div>

                    <!-- Jekuaa Roles -->
                    <div v-if="item.paso === 6">
                        <v-select
                            class="mb-5"
                            v-model="rolSeleccionado"
                            :hint="`${ rolSeleccionado.value ? `Se selecciono el: ${rolSeleccionado.text}` : 'No has elegido un rol todavía' }`"
                            :items="roles"
                            item-text="text"
                            item-value="value"
                            label="Rol"
                            persistent-hint
                            return-object
                            single-line
                        ></v-select>

                        <div class="">
                            <v-row justify="space-around">
                                <v-col
                                    cols="12"
                                    md="7"
                                >
                                    <v-combobox
                                        :disabled="!esMiembroJekuaa() || !necesitaSecciones()"
                                        v-model="datosUsuario.jekuaaRoles.secciones"
                                        :items="secciones"
                                        label="Secciones"
                                        multiple
                                        chips
                                    >
                                        <template v-slot:selection="data">
                                            <v-chip
                                                :key="JSON.stringify(data.item)"
                                                v-bind="data.attrs"
                                                :input-value="data.selected"
                                                :disabled="data.disabled"
                                                @click:close="data.parent.selectItem(data.item)"
                                            >
                                                <v-avatar
                                                    class="accent white--text"
                                                    left
                                                    v-text="data.item.slice(0, 1).toUpperCase()"
                                                ></v-avatar>
                                                {{ data.item }}
                                            </v-chip>
                                        </template>
                                    </v-combobox>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="5"
                                >
                                    <v-switch
                                        :disabled="!esMiembroJekuaa()"
                                        v-model="datosUsuario.jekuaaRoles.instructor"
                                        :label="`Instructor: ${datosUsuario.jekuaaRoles.instructor.toString()}`"
                                    ></v-switch>
                                </v-col>
                                
                            </v-row>
                        </div>
                    </div>
                    
                    <!-- Jekuaa Points -->
                    <v-text-field
                        v-if="item.paso === 7"
                        v-model="datosUsuario.jekuaaPoint"
                        :error-messages="nombreCompletoErrors"
                        :counter="logitudesDeTexto.maxNombreCompleto"
                        label="Jekuaa Points"
                        type="number"
                        @input="$v.nombreCompleto.$touch()"
                        @blur="$v.nombreCompleto.$touch()"
                    ></v-text-field>

                    <!-- Nombre completo -->
                    <v-text-field
                        v-if="item.paso === 8"
                        v-model="contrasenha"
                        :error-messages="nombreCompletoErrors"
                        :counter="logitudesDeTexto.maxNombreCompleto"
                        label="Contraseña"
                        @input="$v.nombreCompleto.$touch()"
                        @blur="$v.nombreCompleto.$touch()"
                    ></v-text-field>

                    <v-btn color="primary" @click="next">
                        {{ item.paso === infoTextoFormulario.length ? 'Crear usuario' : 'Continue' }}
                    </v-btn>
                    <v-btn text>
                        Cancelar
                    </v-btn>
                </v-stepper-content>
            </div>

        </v-stepper>

    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

const MAX_NOMBRE_USUARIO = 10
const MAX_NOMBRE_COMPLETO = 55

export default {
    mixins: [validationMixin],

    validations: {
        nombreUsuario: { required, maxLength: maxLength( MAX_NOMBRE_USUARIO ) },
        correo: { required, email },
        nombreCompleto: { maxLength: maxLength( MAX_NOMBRE_COMPLETO ) }
    },
    
    data: () => ({
        datosUsuario: {
            nombreUsuario: '',
            correo: '',
            nombreCompleto: '',
            fechaNacimiento: '',
            jekuaaPremium: {
                plan: '',
                fechaCompra: '',
                fechaHasta: '',
            },
            jekuaaRoles: {
                rol: '',
                secciones: [],
                instructor: false
            },
            jekuaaPoint: 0,
        },
        contrasenha: '',
        logitudesDeTexto: {
            maxNombreUsuario: MAX_NOMBRE_USUARIO,
            maxNombreCompleto: MAX_NOMBRE_COMPLETO
        },
        planSeleccionado: { text: 'Elegir un plan', value: '' },
        planes: [
          { text: 'Elegir un plan', value: '' },
          { text: 'Básico', value: 'basico' },
          { text: 'Avanzado', value: 'avanzado' },
        ],
        rangoFechaPremium: [],
        rolSeleccionado: { text: 'Estudiante', value: 'estudiante' },
        roles: [
          { text: 'Estudiante', value: 'estudiante' },
          { text: 'MiembroJekaa', value: 'miembroJekuaa' },
          { text: 'Propietario', value: 'propietario' },
        ],
        secciones: ['informatica', 'matematica'],
        step: 1,
        infoTextoFormulario: [
            {
                paso: 1,
                titulo: 'Nombre de usuario',
                descripcion: 'Identificador del usuario', 
            },
            {
                paso: 2,
                titulo: 'Correo',
                descripcion: 'Identificador del usuario', 
            },
            {
                paso: 3,
                titulo: 'Nombre completo',
                descripcion: null, 
            },
            {
                paso: 4,
                titulo: 'Fecha de nacimiento',
                descripcion: null, 
            },
            {
                paso: 5,
                titulo: 'Datos Jekuaa Premium',
                descripcion: null, 
            },
            {
                paso: 6,
                titulo: 'Datos Jekuaa Roles',
                descripcion: null, 
            },
            {
                paso: 7,
                titulo: 'Datos Jekuaa Points',
                descripcion: null, 
            },
            {
                paso: 8,
                titulo: 'Contraseña del usuario',
                descripcion: null, 
            }
        ]
    }),

    computed: {
        nombreUsuarioErrors () {
            const errors = []
            if (!this.$v.nombreUsuario.$dirty) return errors
            !this.$v.nombreUsuario.maxLength && errors.push('El nombre de usuario es muy largo.')
            !this.$v.nombreUsuario.required && errors.push('Nombre de usuario es necesario.')
            return errors
        },
        correoErrors () {
            const errors = []
            if (!this.$v.correo.$dirty) return errors
            !this.$v.correo.email && errors.push('El correo debe de ser valido.')
            !this.$v.correo.required && errors.push('Correo del usuario es necesaio.')
            return errors
        },
        nombreCompletoErrors () {
            const errors = []
            if (!this.$v.nombreCompleto.$dirty) return errors
            !this.$v.nombreCompleto.maxLength && errors.push('El nombre de usuario es muy largo.')
            return errors
        },
    },

    methods: {
        submit () {
            this.$v.$touch()

            this.$emit('crearUsuario', {
                datosUsuario,
                contrasenha
            })
        },
        clear () {
            this.$v.$reset()
            
            this.datosUsuario.nombreUsuario = ''
            this.datosUsuario.correo = ''
            this.datosUsuario.nombreCompleto = ''
            this.datosUsuario.fechaNacimiento = ''

            this.datosUsuario.jekuaaPremium = {
                plan: '',
                fechaCompra: '',
                fechaHasta: '',
            }

            this.datosUsuario.jekuaaRoles = {
                rol: 'estudiante',
                secciones: [],
                instructor: false
            }

            this.datosUsuario.jekuaaPoint = 0

        },
        necesitaSecciones () {
            let rol = this.rolSeleccionado.value

            let datosRoles = [
                {
                    rol: 'propietario',
                    nesecitaSecciones: false,
                    esMiembroJekuaa: true,
                    nivel: 10
                },
                {
                    rol: 'miembroJekuaa',
                    nesecitaSecciones: true,
                    esMiembroJekuaa: true,
                    nivel: 5
                },
                {
                    rol: 'estudiante',
                    nesecitaSecciones: false,
                    esMiembroJekuaa: false,
                    nivel: 1
                }
            ]

            const datoRol = datosRoles.find( rolX => rolX.rol === rol )

            return datoRol.nesecitaSecciones
        },
        esMiembroJekuaa () {
            let rol = this.rolSeleccionado.value

            let datosRoles = [
                {
                    rol: 'propietario',
                    nesecitaSecciones: false,
                    esMiembroJekuaa: true,
                    nivel: 10
                },
                {
                    rol: 'miembroJekuaa',
                    nesecitaSecciones: true,
                    esMiembroJekuaa: true,
                    nivel: 5
                },
                {
                    rol: 'estudiante',
                    nesecitaSecciones: false,
                    esMiembroJekuaa: false,
                    nivel: 1
                }
            ]

            const datosRol = datosRoles.find( rolX => rolX.rol === rol )

            return datosRol.esMiembroJekuaa
        },
        next() {
            this.step++
        }
    },

    watch: {
        planSeleccionado: function ( nuevo, viejo ) {
            this.datosUsuario.jekuaaPremium.plan = nuevo.value
        },
        rangoFechaPremium: function ( nuevo, viejo ) {
            
            if ( nuevo.length < 2 ) {
                return
            }

            let fecha1 = new Date(nuevo[0])
            let fecha2 = new Date(nuevo[1])

            if ( fecha1.getTime() < fecha2.getTime() ) {
                this.datosUsuario.jekuaaPremium.fechaCompra = nuevo[0]
                this.datosUsuario.jekuaaPremium.fechaHasta = nuevo[1]
            } else if ( fecha1.getTime() > fecha2.getTime() ) {
                this.datosUsuario.jekuaaPremium.fechaCompra = nuevo[1]
                this.datosUsuario.jekuaaPremium.fechaHasta = nuevo[0]
            } else {
                this.rangoFechaPremium = []
            }

        },
        rolSeleccionado: function ( nuevo, viejo ) {
            this.datosUsuario.jekuaaRoles.rol = nuevo.value

            if ( !this.esMiembroJekuaa () ) {
                this.datosUsuario.jekuaaRoles.secciones = []
                this.datosUsuario.jekuaaRoles.instructor = false

            } else {
                if ( !this.necesitaSecciones () ) {
                    this.datosUsuario.jekuaaRoles.secciones = []
                }
            }

        }
    },


  }
</script>

<style>
.titulo_input {
    
}

.fechasCompras {
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>