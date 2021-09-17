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
                    :rules="[() => !item.error]"
                    v-on:click="step = item.paso"
                    :complete="!item.requerido || (!item.error && item.existe)"
                    :step="item.paso"
                >
                    {{ item.titulo }}
                    <small v-if="item.descripcion"> {{ item.descripcion }} </small>
                </v-stepper-step>

                <v-stepper-content :step="item.paso">
                    <!-- Nombre de usuario -->
                    <v-text-field
                        v-if="item.paso === 1"
                        v-model="datosUsuario.nombreUsuario"
                        :error-messages="nombreUsuarioErrors"
                        :counter="logitudesDeTexto.nombreUsuario.max"
                        :min="logitudesDeTexto.nombreUsuario.min"
                        label="Nombre de usuario"
                        required
                        @input="$v.datosUsuario.nombreUsuario.$touch()"
                        @blur="$v.datosUsuario.nombreUsuario.$touch()"
                    ></v-text-field>

                    <!-- Correo -->
                    <v-text-field
                        v-if="item.paso === 2"
                        v-model="datosUsuario.correo"
                        :error-messages="correoErrors"
                        label="Correo"
                        required
                        @input="$v.datosUsuario.correo.$touch()"
                        @blur="$v.datosUsuario.correo.$touch()"
                    ></v-text-field>

                    <!-- Nombre completo -->
                    <v-text-field
                        v-if="item.paso === 3"
                        v-model="datosUsuario.nombreCompleto"
                        :error-messages="nombreCompletoErrors"
                        :counter="logitudesDeTexto.nombreCompleto.max"
                        label="Nombre completo"
                        @input="$v.datosUsuario.nombreCompleto.$touch()"
                        @blur="$v.datosUsuario.nombreCompleto.$touch()"
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
                                    {{ horaFechaPremium }}
                                    <v-time-picker
                                        v-model="horaFechaPremium"
                                        format="24hr"
                                        full-width
                                        use-seconds
                                    ></v-time-picker>
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
                        :counter="logitudesDeTexto.nombreCompleto.max"
                        label="Jekuaa Points"
                        type="number"
                        @input="$v.datosUsuario.nombreCompleto.$touch()"
                        @blur="$v.datosUsuario.nombreCompleto.$touch()"
                    ></v-text-field>

                    <!-- Contraseña -->
                    <v-text-field
                        v-if="item.paso === 8"
                        v-model="contrasenha"
                        :error-messages="contrasenhaErrors"
                        :counter="logitudesDeTexto.contrasenha.max"
                        :min="logitudesDeTexto.contrasenha.min"
                        label="Contraseña"
                        @input="$v.contrasenha.$touch()"
                        @blur="$v.contrasenha.$touch()"
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
import { required, minLength, maxLength, email, numeric } from 'vuelidate/lib/validators'

const logitudesDeTexto = {
    nombreUsuario: {
        max: 10,
        min: 4
    },
    nombreCompleto: {
        max: 50,
        min: 0
    },
    contrasenha: {
        max: 20,
        min: 6
    }
}

export default {
    mixins: [validationMixin],

    validations: {
        datosUsuario: {
            nombreUsuario: { required, minLength: minLength( logitudesDeTexto.nombreUsuario.min ), maxLength: maxLength( logitudesDeTexto.nombreUsuario.max ) },
            correo: { required, email },
            nombreCompleto: { maxLength: maxLength( logitudesDeTexto.nombreCompleto.max ) },
            jekuaaPoint: { numeric },
        },
        contrasenha: { required, minLength: minLength( logitudesDeTexto.contrasenha.min ), maxLength: maxLength( logitudesDeTexto.contrasenha.max ) }
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
                rol: 'estudiante',
                secciones: [],
                instructor: false
            },
            jekuaaPoint: 0,
        },
        contrasenha: '',
        logitudesDeTexto,
        planSeleccionado: { text: 'Elegir un plan', value: '' },
        planes: [
          { text: 'Elegir un plan', value: '' },
          { text: 'Básico', value: 'basico' },
          { text: 'Avanzado', value: 'avanzado' },
        ],
        rangoFechaPremium: [],
        horaFechaPremium: '',
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
                error: false,
                existe: false,
                requerido: true
            },
            {
                paso: 2,
                titulo: 'Correo',
                descripcion: 'Identificador del usuario',
                error: false,
                existe: false,
                requerido: true
            },
            {
                paso: 3,
                titulo: 'Nombre completo',
                descripcion: null,
                error: false,
            },
            {
                paso: 4,
                titulo: 'Fecha de nacimiento',
                descripcion: null,
                error: false,
            },
            {
                paso: 5,
                titulo: 'Datos Jekuaa Premium',
                descripcion: null,
                error: false,
            },
            {
                paso: 6,
                titulo: 'Datos Jekuaa Roles',
                descripcion: null,
                error: false,
            },
            {
                paso: 7,
                titulo: 'Datos Jekuaa Points',
                descripcion: null,
                error: false,
            },
            {
                paso: 8,
                titulo: 'Contraseña del usuario',
                descripcion: null,
                error: false,
                existe: false,
                requerido: true
            }
        ]
    }),

    computed: {
        nombreUsuarioErrors () {
            const errors = []
            
            if (this.$v.datosUsuario.nombreUsuario.$dirty) {
                !this.$v.datosUsuario.nombreUsuario.minLength && errors.push('El nombre de usuario es muy corto.')
                !this.$v.datosUsuario.nombreUsuario.maxLength && errors.push('El nombre de usuario es muy largo.')
                !this.$v.datosUsuario.nombreUsuario.required && errors.push('Nombre de usuario es necesario.')
            }
            
            this.infoTextoFormulario[0].error = !!errors.length
            return errors

        },
        correoErrors () {
            const errors = []
            
            if (this.$v.datosUsuario.correo.$dirty) {
                !this.$v.datosUsuario.correo.email && errors.push('El correo debe de ser valido.')
                !this.$v.datosUsuario.correo.required && errors.push('Correo del usuario es necesaio.')
            }
            
            this.infoTextoFormulario[1].error = !!errors.length
            return errors

        },
        nombreCompletoErrors () {
            const errors = []
            
            if (this.$v.datosUsuario.nombreCompleto.$dirty) {
                !this.$v.datosUsuario.nombreCompleto.maxLength && errors.push('El nombre de usuario es muy largo.')
            }
            
            this.infoTextoFormulario[2].error = !!errors.length
            return errors

        },
        jekuaaPointsErrors () {
            const errors = []
            
            if (this.$v.datosUsuario.jekuaaPoint.$dirty) {
                !this.$v.datosUsuario.jekuaaPoint.numeric && errors.push('Debe ser numerico.')
            }
            
            this.infoTextoFormulario[6].error = !!errors.length
            return errors

        },
        contrasenhaErrors () {
            const errors = []
            
            if (this.$v.contrasenha.$dirty) {
                !this.$v.contrasenha.minLength && errors.push('La contraseña es muy corta.')
                !this.$v.contrasenha.maxLength && errors.push('La contraseña es muy larga.')
                !this.$v.contrasenha.required && errors.push('La contraseña es requerida.')
            }
            
            this.infoTextoFormulario[7].error = !!errors.length
            return errors

        },
    },

    methods: {
        submit () {
            this.$v.$touch()

            const noPermitido = this.infoTextoFormulario.find( x => {
                return x.error || ( x.requerido && !x.existe )
            })

            if (noPermitido) {
                // No se puede llamar al evento "crearUsuario"
                alert("No se puede llamar al evento \"crearUsuario\".")
                return
            }

            const datosUsuario = JSON.parse( JSON.stringify( this.datosUsuario ) )

            // Nombre completo
            datosUsuario.nombreCompleto = datosUsuario.nombreCompleto ?
            datosUsuario.nombreCompleto : ''

            // Fecha de nacimiento
            datosUsuario.fechaNacimiento = datosUsuario.fechaNacimiento ? 
            new Date(`${datosUsuario.fechaNacimiento}T05:00:00.000Z`).getTime() : null

            // Jekuaa Premium
            datosUsuario.jekuaaPremium.fechaCompra = datosUsuario.jekuaaPremium.plan ? 
            new Date(`${datosUsuario.jekuaaPremium.fechaCompra}T${this.horaFechaPremium}`).getTime() : null

            datosUsuario.jekuaaPremium.fechaHasta = datosUsuario.jekuaaPremium.plan ? 
            new Date(`${datosUsuario.jekuaaPremium.fechaHasta}T${this.horaFechaPremium}`).getTime() : null

            // Jekuaa Points
            datosUsuario.jekuaaPoint = datosUsuario.jekuaaPoint ?
            Number(datosUsuario.jekuaaPoint) : 0

            this.$emit('crearUsuario', {
                datosUsuario,
                contrasenha: this.contrasenha
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
            if ( this.step === 8 ) {
                this.submit()
                return
            }
            
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

        },
        'datosUsuario.nombreUsuario': function ( nuevo, vuejo ) {
            this.infoTextoFormulario[0].existe = !!nuevo
        },
        'datosUsuario.correo': function ( nuevo, vuejo ) {
            this.infoTextoFormulario[1].existe = !!nuevo
        },
        'contrasenha': function ( nuevo, vuejo ) {
            this.infoTextoFormulario[7].existe = !!nuevo
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