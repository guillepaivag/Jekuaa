<template>
  <div>
    <form>
      <v-row>
        <v-col cols="12">
          <h1>Mi perfil</h1>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            class="mt-5 mb-5"
            v-model="nombreUsuario"
            :error-messages="erroresNombreUsuario"
            :counter="20"
            label="Nombre usuario"
            required
            @input="$v.nombreUsuario.$touch()"
            @blur="$v.nombreUsuario.$touch()"
          ></v-text-field>

          <v-text-field
            class="mt-5 mb-5"
            v-model="nombreCompleto"
            :error-messages="erroresNombreCompleto"
            :counter="100"
            label="Nombre completo"
            required
            @input="$v.nombreCompleto.$touch()"
            @blur="$v.nombreCompleto.$touch()"
          ></v-text-field>

          <v-text-field
            class="mt-5 mb-5"
            v-model="correo"
            :error-messages="erroresCorreo"
            label="Correo"
            :counter="100"
            required
            @input="$v.correo.$touch()"
            @blur="$v.correo.$touch()"
          ></v-text-field>

          <v-menu
            v-model="menuFechaNacimiento"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="fechaNacimiento"
                clearable
                label="Fecha de nacimiento"
                v-bind="attrs"
                v-on="on"
                @click:clear="fechaNacimiento = null"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              v-model="fechaNacimiento"
              @change="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        
        <div class="botones">
          <v-btn
            class="mr-4"
            @click="actualizar"
          >
            Actualizar
          </v-btn>
          <v-btn @click="reiniciar">
            Reiniciar
          </v-btn>
        </div>
      </v-row>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    nombreUsuario: { required, minLength: minLength(1), maxLength: maxLength(20) },
    nombreCompleto: { minLength: minLength(1), maxLength: maxLength(100) },
    correo: { required, email, minLength: minLength(5), maxLength: maxLength(100) },
    fechaNacimiento: {  },
  },

  data() {
    return {
      nombreUsuario: '',
      nombreCompleto: '',
      correo: '',
      fechaNacimiento: '',
      menuFechaNacimiento: false,
    }
  },

  methods: {
    actualizar() {

    },

    reiniciar () {

    }
  },

  computed: {
    erroresNombreUsuario () {
      const errors = []
      if (!this.$v.nombreUsuario.$dirty) return errors
      !this.$v.nombreUsuario.required && errors.push('You must agree to continue!')
      !this.$v.nombreUsuario.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.nombreUsuario.minLength && errors.push('Name must be at most 10 characters long')
      return errors
    },
    erroresNombreCompleto () {
      const errors = []
      if (!this.$v.nombreCompleto.$dirty) return errors
      !this.$v.nombreCompleto.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.nombreCompleto.minLength && errors.push('Name must be at most 10 characters long')
      return errors
    },
    erroresCorreo () {
      const errors = []
      if (!this.$v.correo.$dirty) return errors
      !this.$v.correo.email && errors.push('Must be valid e-mail')
      !this.$v.correo.required && errors.push('E-mail is required')
      !this.$v.correo.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.correo.minLength && errors.push('Name must be at most 10 characters long')
      return errors
    },
    erroresFechaNacimiento () {
      const errors = []
      if (!this.$v.fechaNacimiento.$dirty) return errors
      return errors
    },
  },
}
</script>

<style>

</style>