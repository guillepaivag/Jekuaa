<template>
    <div>

        <h3 class="mt-3"> {{ titulo }} </h3>

        <v-stepper
            class="mt-5"
            v-model="step"
            vertical
        > 
            <div
                v-for="(item, index) in infoTextoFormulario" :key="index"
            >
                <v-stepper-step
                    color="#683bce"
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
                        :disabled="soloLectura"
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
                        :disabled="soloLectura"
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
                        :disabled="soloLectura"
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
                        :disabled="soloLectura"
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
                            :disabled="soloLectura"
                        ></v-select>

                        <div class="fechasCompras" v-if="planSeleccionado.value">
                            <v-row justify="space-around">

                                <v-col
                                    cols="12"
                                    md="7"
                                >
                                    <v-date-picker
                                        color="#683bce"
                                        v-model="rangoFechaPremium"
                                        full-width 
                                        range
                                        :disabled="soloLectura"
                                    ></v-date-picker>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="5"
                                >
                                    {{ horaFechaPremium }}
                                    <v-time-picker
                                        color="#683bce"
                                        v-model="horaFechaPremium"
                                        format="24hr"
                                        full-width
                                        use-seconds
                                        :disabled="soloLectura"
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
                            :disabled="soloLectura"
                        ></v-select>

                        <div class="">
                            <v-row justify="space-around">
                                <v-col
                                    cols="12"
                                    md="7"
                                >
                                    <v-combobox
                                        :disabled="soloLectura || !esMiembroJekuaa() || !necesitaSecciones()"
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
                                        :disabled="soloLectura || !esMiembroJekuaa()"
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
                        :disabled="soloLectura"
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
                        :disabled="soloLectura"
                        @input="$v.contrasenha.$touch()"
                        @blur="$v.contrasenha.$touch()"
                    ></v-text-field>

                    <v-btn v-if="!(soloLectura && item.paso === infoTextoFormulario.length)" color="#683bce" class="white--text" @click="next">
                        {{
                            item.paso === infoTextoFormulario.length ?
                            `${modo} usuario` : 'Continue' 
                        }}
                    </v-btn>
                    <v-btn text v-if="!soloLectura">
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
        max: 15,
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
        planSeleccionado: { text: 'Elegir un plan', value: '' },
        rangoFechaPremium: [],
        horaFechaPremium: '',
        rolSeleccionado: { text: 'Estudiante', value: 'estudiante' },
        step: 1,
        modo: 'lectura',
        planes: [
          { text: 'Elegir un plan', value: '' },
          { text: 'Básico', value: 'basico' },
          { text: 'Avanzado', value: 'avanzado' },
        ],
        roles: [
          { text: 'Estudiante', value: 'estudiante' },
          { text: 'MiembroJekaa', value: 'miembroJekuaa' },
          { text: 'Propietario', value: 'propietario' },
        ],
        secciones: ['informatica', 'matematica'],
        logitudesDeTexto,
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
                existe: false,
                requerido: false
            },
            {
                paso: 4,
                titulo: 'Fecha de nacimiento',
                descripcion: null,
                error: false,
                existe: false,
                requerido: false
            },
            {
                paso: 5,
                titulo: 'Datos Jekuaa Premium',
                descripcion: null,
                error: false,
                existe: true,
                requerido: false
            },
            {
                paso: 6,
                titulo: 'Datos Jekuaa Roles',
                descripcion: null,
                error: false,
                existe: true,
                requerido: false
            },
            {
                paso: 7,
                titulo: 'Datos Jekuaa Points',
                descripcion: null,
                error: false,
                existe: false,
                requerido: false
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

    props: {
        uid: String,
        accionModo: String,
        usuario: Object
    },

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
                if ( this.modo === 'crear' ) {
                    !this.$v.contrasenha.required && errors.push('La contraseña es requerida.')
                }
            }
            
            this.infoTextoFormulario[7].error = !!errors.length
            return errors

        },
        soloLectura () {
            return this.modo === 'leer'
        },
        titulo () {
            if ( this.modo === 'leer' ) {
                return `Datos del usuario: ${this.uid}`
            } else if ( this.modo === 'crear' ) {
                return 'Crear nuevo usuario'
            } else if ( this.modo === 'actualizar' ) {
                return `Actualizar al usuario: ${this.uid}`
            }
        } 
    },

    methods: {
        stringFechaPorSegundos ( seconds ) {
            return (new Date(new Date(seconds * 1000).getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 19)
        },
        submit () {
            this.$v.$touch()

            console.log('this.datosUsuario', this.datosUsuario)

            const noPermitido = this.infoTextoFormulario.find( x => {
                return x.error || ( x.requerido && !x.existe )
            })

            if (noPermitido) {
                // No se puede crear el usuario
                alert("No se puede crear el usuario, verifique los campos.")
                return
            }

            const datosUsuario = JSON.parse( JSON.stringify( this.datosUsuario ) )
            console.log('datosUsuario', datosUsuario)

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

            if ( this.modo === 'crear' ) {
                this.$emit('crearUsuario', {
                    datosUsuario,
                    contrasenha: this.contrasenha
                })

            } else if ( this.modo === 'actualizar' ) {
                const datosUsuarioActualizado = this.filtrarDatosActualizados( datosUsuario )

                let body = {}

                if ( Object.keys( datosUsuarioActualizado ).length ) {
                    body = Object.assign(body, {
                        datosUsuario: datosUsuarioActualizado
                    })
                }

                if ( this.contrasenha ) {
                    body = Object.assign(body, {
                        contrasenha: this.contrasenha
                    })
                }

                this.$emit('actualizarUsuario', body)
            }
            
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
        },
        filtrarDatosActualizados ( datosUsuario ) {
            // Datos nuevos: this.datosUsuario
            // Datos viejos: this.usuario

            let datosActualizados = {}

            datosUsuario.nombreUsuario != this.usuario.nombreUsuario ? 
            Object.assign( datosActualizados, { nombreUsuario: datosUsuario.nombreUsuario } ) : ''

            datosUsuario.correo != this.usuario.correo ? 
            Object.assign( datosActualizados, { correo: datosUsuario.correo } ) : ''

            datosUsuario.nombreCompleto != this.usuario.nombreCompleto ? 
            Object.assign( datosActualizados, { nombreCompleto: datosUsuario.nombreCompleto } ) : ''

            if ( this.usuario.fechaNacimiento ) {
                datosUsuario.fechaNacimiento != this.usuario.fechaNacimiento._seconds * 1000 ? 
                Object.assign( datosActualizados, { fechaNacimiento: datosUsuario.fechaNacimiento } ) : ''
            } else {
                datosUsuario.fechaNacimiento != this.usuario.fechaNacimiento ? 
                Object.assign( datosActualizados, { fechaNacimiento: datosUsuario.fechaNacimiento } ) : ''
            }
            
            if ( this.usuario.jekuaaPremium.plan ) {
                datosUsuario.jekuaaPremium.plan != this.usuario.jekuaaPremium.plan ||
                datosUsuario.jekuaaPremium.fechaCompra != this.usuario.jekuaaPremium.fechaCompra._seconds * 1000 ||
                datosUsuario.jekuaaPremium.fechaHasta != this.usuario.jekuaaPremium.fechaHasta._seconds * 1000 ? 
                Object.assign( datosActualizados, { jekuaaPremium: datosUsuario.jekuaaPremium } ) : ''
            } else {
                datosUsuario.jekuaaPremium.plan != this.usuario.jekuaaPremium.plan ||
                datosUsuario.jekuaaPremium.fechaCompra != this.usuario.jekuaaPremium.fechaCompra ||
                datosUsuario.jekuaaPremium.fechaHasta != this.usuario.jekuaaPremium.fechaHasta ? 
                Object.assign( datosActualizados, { jekuaaPremium: datosUsuario.jekuaaPremium } ) : ''
            }

            let seccionesNuevas = datosUsuario.jekuaaRoles.secciones.sort()
            let seccionesViejas = this.usuario.jekuaaRoles.secciones.sort()

            datosUsuario.jekuaaRoles.rol != this.usuario.jekuaaRoles.rol ||
            JSON.stringify ( seccionesNuevas ) != JSON.stringify ( seccionesViejas ) ||
            datosUsuario.jekuaaRoles.instructor != this.usuario.jekuaaRoles.instructor ? 
            Object.assign( datosActualizados, { jekuaaRoles: datosUsuario.jekuaaRoles } ) : ''

            datosUsuario.jekuaaPoint != this.usuario.jekuaaPoint ? 
            Object.assign( datosActualizados, { jekuaaPoint: datosUsuario.jekuaaPoint } ) : ''

            return datosActualizados
        }
    },

    watch: {
        planSeleccionado: function ( nuevo, viejo ) {
            this.datosUsuario.jekuaaPremium.plan = nuevo.value

            if ( !nuevo.value ) {
                this.rangoFechaPremium = []
                this.horaFechaPremium = ''
                this.infoTextoFormulario[4].error = false
                return
            }

            if ( this.rangoFechaPremium.length < 2 || !this.horaFechaPremium ) {
                this.infoTextoFormulario[4].error = true
            }
        },
        rangoFechaPremium: function ( nuevo, viejo ) {

            if ( this.planSeleccionado.value ) {
                console.log('this.planSeleccionado.value', this.planSeleccionado.value)
                console.log('nuevo', nuevo)

                if ( nuevo.length < 2 ) {
                    this.infoTextoFormulario[4].error = true
                    return
                }

                this.infoTextoFormulario[4].error = false

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

                console.log('this.datosUsuario.jekuaaPremium', this.datosUsuario.jekuaaPremium)

                if ( !this.horaFechaPremium ) {
                    this.infoTextoFormulario[4].error = true
                }
            }

        },
        horaFechaPremium: function ( nuevo, viejo ) {
            if ( this.planSeleccionado.value ) {
                if ( this.rangoFechaPremium.length < 2 || !nuevo ) {
                    this.infoTextoFormulario[4].error = true
                } else {
                    this.infoTextoFormulario[4].error = false
                }
            }
        },
        rolSeleccionado: function ( nuevo, viejo ) {
            this.datosUsuario.jekuaaRoles.rol = nuevo.value

            if ( !this.esMiembroJekuaa () ) {
                this.datosUsuario.jekuaaRoles.secciones = []
                this.datosUsuario.jekuaaRoles.instructor = false
                this.infoTextoFormulario[5].error = false

            } else {
                if ( !this.necesitaSecciones () ) {
                    this.datosUsuario.jekuaaRoles.secciones = []
                    this.infoTextoFormulario[5].error = false
                } else {
                    if ( !this.datosUsuario.jekuaaRoles.secciones.length ) {
                        this.infoTextoFormulario[5].error = true
                    } else {
                        this.infoTextoFormulario[5].error = false
                    }
                }
            }

        },
        'datosUsuario.jekuaaRoles.secciones': function ( nuevo, viejo ) {
            if ( this.necesitaSecciones () ) {
                if ( !nuevo.length ) {
                    this.infoTextoFormulario[5].error = true
                } else {
                    this.infoTextoFormulario[5].error = false
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

    mounted() {
        this.modo = this.accionModo
        if ( this.modo === 'crear' ) {
            /*
                SOLO PARA CREACIÓN
            */
            this.datosUsuario = {
                nombreUsuario: 'Estudiante4',
                correo: 'estudiante4@gmail.com',
                nombreCompleto: 'Estudiante4 De Jekuaa',
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
            }
            
            this.contrasenha = '123456'

            this.planSeleccionado = { text: 'Elegir un plan', value: '' }
            this.rangoFechaPremium = []
            this.horaFechaPremium = ''
            this.rolSeleccionado = { text: 'Estudiante', value: 'estudiante' }
        } else {
            /* 
                PARA LECTURA Y ACTUALIZACIÓN
            */

            // Para actualizar un usuario no se requiere una contraseña
            this.infoTextoFormulario[7].requerido = false
            
            this.datosUsuario = JSON.parse( JSON.stringify( this.usuario ) )

            // Fecha de nacimiento
            this.datosUsuario.fechaNacimiento = this.usuario.fechaNacimiento ? 
            this.stringFechaPorSegundos( this.usuario.fechaNacimiento._seconds ).substr(0, 10) : ''

            // Jekuaa Premiun: Plan, fecha de compra y hora
            this.planSeleccionado = this.planes.find( plan => plan.value === this.usuario.jekuaaPremium.plan )

            if ( this.planSeleccionado.value ) {
                let fechaCompra = this.stringFechaPorSegundos( this.usuario.jekuaaPremium.fechaCompra._seconds )
                let fechaHasta = this.stringFechaPorSegundos( this.usuario.jekuaaPremium.fechaHasta._seconds )
                
                this.rangoFechaPremium[0] = fechaCompra.substr(0, 10)
                this.rangoFechaPremium[1] = fechaHasta.substr(0, 10)
                this.datosUsuario.jekuaaPremium.fechaCompra = fechaCompra.substr(0, 10)
                this.datosUsuario.jekuaaPremium.fechaHasta = fechaHasta.substr(0, 10)
            
                this.horaFechaPremium = fechaCompra.substr(11, fechaCompra.length)
            }

            this.rolSeleccionado = this.roles.find( rol => rol.value === this.usuario.jekuaaRoles.rol )
        }

        console.log('this.datosUsuario', this.datosUsuario)
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