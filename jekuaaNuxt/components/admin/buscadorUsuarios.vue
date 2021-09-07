<template>
    <div>
        <div class="row mb-4">
            <div class="col-md-4">
                <v-select
                    v-model="identificador"
                    :hint="`${identificador.codigo ? `Buscar por: ${identificador.texto}` : 'No hay identificador'}`"
                    :items="opcionesIdentificadores"
                    item-text="texto"
                    item-value="codigo"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                ></v-select>
            </div>

            <div class="col-md-8" v-if="identificador.codigo">
                <form onsubmit="return false">
                    <v-text-field
                        v-if="identificador.codigo === 'uid'"
                        v-model="identificadorUsuario"
                        :error-messages="uidErrors"
                        :counter="50"
                        label="UID"
                        required
                        @input="$v.uid.$touch()"
                        @blur="$v.uid.$touch()"
                    ></v-text-field>

                    <v-text-field
                        v-if="identificador.codigo === 'correo'"
                        v-model="identificadorUsuario"
                        :error-messages="correoErrors"
                        label="E-mail"
                        required
                        @input="$v.correo.$touch()"
                        @blur="$v.correo.$touch()"
                    ></v-text-field>

                    <v-text-field
                        v-if="identificador.codigo === 'nombreUsuario'"
                        v-model="identificadorUsuario"
                        :error-messages="nombreUsuarioErrors"
                        :counter="50"
                        label="Nombre de usuario"
                        required
                        @input="$v.nombreUsuario.$touch()"
                        @blur="$v.nombreUsuario.$touch()"
                    ></v-text-field>

                    <v-btn @click="limpiar">
                        Limpiar
                    </v-btn>

                    <v-btn
                        class="ml-4"
                        @click="buscarPorIdentificador"
                    >
                        Buscar
                    </v-btn>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {

    mixins: [validationMixin],

    validations: {
      uid: { required, maxLength: maxLength(50) },
      correo: { required, email },
      nombreUsuario: { required, maxLength: maxLength(50) },
    },

    data() {
        return {
            identificadorUsuario: '',
            identificador: {
                texto: 'Todos',
                codigo: null
            },
            opcionesIdentificadores: [
                { texto: 'Todos', codigo: null },
                { texto: 'UID', codigo: 'uid' },
                { texto: 'Nombre de usuario', codigo: 'nombreUsuario' },
                { texto: 'Correo', codigo: 'correo' }
            ],
        }
    },

    computed: {
        uidErrors () {
            const errors = []
            if (!this.$v.uid.$dirty) return errors
            !this.$v.uid.maxLength && errors.push('Name must be at most 10 characters long')
            !this.$v.uid.required && errors.push('Name is required.')
            return errors
        },
        correoErrors () {
            const errors = []
            if (!this.$v.correo.$dirty) return errors
            !this.$v.correo.email && errors.push('Must be valid e-mail')
            !this.$v.correo.required && errors.push('E-mail is required')
            return errors
        },
        nombreUsuarioErrors () {
            const errors = []
            if (!this.$v.nombreUsuario.$dirty) return errors
            !this.$v.nombreUsuario.maxLength && errors.push('Name must be at most 10 characters long')
            !this.$v.nombreUsuario.required && errors.push('Name is required.')
            return errors
        },
    },

    watch: {
        identificador: function ( identificadorNuevo, identificadorViejo ) {
            if ( !identificadorNuevo.codigo ) {
                this.identificadorUsuario = ''
                this.buscarPorIdentificador()
            }
        },
    },

    methods: {
        buscarPorIdentificador(){
            // this.$v.$touch()
            this.$emit('buscar', {
                identificadorUsuario: this.identificadorUsuario,
                codigoBuscador: this.identificador.codigo
            })
        },
        limpiar () {
            this.$v.$reset()
            this.identificadorUsuario = ''
        },
    },

}
</script>

<style>

</style>