<template>
    <div>
        <h3> Crear nuevo usuario </h3>

        <form class="mt-2">
            <v-text-field
                v-model="nombreUsuario"
                :error-messages="nombreUsuarioErrors"
                :counter="logitudesDeTexto.maxNombreUsuario"
                label="Nombre de usuario"
                required
                @input="$v.nombreUsuario.$touch()"
                @blur="$v.nombreUsuario.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="correo"
                :error-messages="correoErrors"
                label="Correo"
                required
                @input="$v.correo.$touch()"
                @blur="$v.correo.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="nombreCompleto"
                :error-messages="nombreCompletoErrors"
                :counter="logitudesDeTexto.maxNombreCompleto"
                label="Nombre completo"
                @input="$v.nombreCompleto.$touch()"
                @blur="$v.nombreCompleto.$touch()"
            ></v-text-field>

            <v-btn class="mr-4" @click="submit">
                Crear usuario
            </v-btn>
            <v-btn @click="clear">
                Limpiar
            </v-btn>
        </form>
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
        logitudesDeTexto: {
            maxNombreUsuario: MAX_NOMBRE_USUARIO,
            maxNombreCompleto: MAX_NOMBRE_COMPLETO
        }
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
        }
    },

    methods: {
        submit () {
            this.$v.$touch()

            this.$emit('crearUsuario', {

            })
        },
        clear () {
            this.$v.$reset()
            
            this.nombreUsuario = ''
            this.correo = ''
            this.nombreCompleto = ''
            this.fechaNacimiento = ''

            this.jekuaaPremium = {
                plan: '',
                fechaCompra: '',
                fechaHasta: '',
            }

            this.jekuaaRoles = {
                rol: 'estudiante',
                secciones: [],
                instructor: false
            }

            this.jekuaaPoint = 0

        },
    },
  }
</script>

<style>
</style>