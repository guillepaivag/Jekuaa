<template>
  <div>
    <form>
      <v-row class="mb-10">
        <v-col cols="12">
          <h1 class="titulo">Mi perfil</h1>
          <v-btn
            class="ml-4 mb-3"
            outlined
            color="#683bce"
            :to="`/estudiante/${$store.state.modules.usuarios.nombreUsuario}`"
          >
            Ver mi perfil
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          lg="4"
        >
          <div class="container imagenAvatar mt-5">
            <image-input v-model="avatar" />

            <div class="mt-5">
              <v-btn 
                v-if="avatar.formData"
                block
                text
                class="mt-1 mb-1"
                color="#683bce"
                @click="actualizarFotoPerfil" 
                :loading="saving"
                :disabled="!avatar.formData"
              >Actualizar foto de perfil</v-btn>

              <v-btn 
                v-if="avatar.formData"
                block
                :disabled="saving"
                class="mt-1 mb-1"
                text
                color="#ff1d89"
                @click="reiniciarImagen" 
              >Reiniciar</v-btn>

              <v-btn 
                v-if="!avatar.formData && avatar.imageURL"
                block
                :disabled="saving"
                class="mt-1 mb-1"
                text
                color="red"
                @click="eliminarFotoPerfil" 
              >Borrar foto de perfil</v-btn>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          lg="8"
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
                :value="fechaNacimientoString"
                clearable
                label="Fecha de nacimiento"
                v-bind="attrs"
                v-on="on"
                @click:clear="fechaNacimientoString = ''"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              v-model="fechaNacimientoString"
              @change="menu1 = false"
            ></v-date-picker>
          </v-menu>

          <div class="botones mt-5">
            <v-btn
              
              text
              color="#683bce"
              class="mr-4"
              @click="actualizar"
              :disabled="$v.$anyError"
            >
              Actualizar mis datos
            </v-btn>
            <v-btn 
              text
              color="#ff1d89"
              @click="reiniciar"
            >
              Reiniciar
            </v-btn>
          </div>

        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import ImageInput from '@/components/ImageInput'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    nombreUsuario: { required, minLength: minLength(1), maxLength: maxLength(20) },
    nombreCompleto: { minLength: minLength(1), maxLength: maxLength(100) },
    correo: { required, email, minLength: minLength(5), maxLength: maxLength(100) },
    fechaNacimientoString: {  },
  },

  data() {
    return {
      menuFechaNacimiento: false,
      saving: false,
      saved: false,
      nombreUsuario: '',
      nombreCompleto: '',
      correo: '',
      fechaNacimiento: null,
      fechaNacimientoString: '',
      avatar: null,
    }
  },

  components: {
    'image-input': ImageInput
  },

  watch:{
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    },
    fechaNacimientoString: function (n, v) {
      if (!n) return

      this.fechaNacimiento = new Date(`${n}T05:00:00.000Z`).getTime()
    }
  },

  methods: {
    datosActualizados() {
      const usuario = this.$store.state.modules.usuarios
      let datos = {}

      this.nombreUsuario !== usuario.nombreUsuario ? 
      datos.nombreUsuario = this.nombreUsuario : ''
      
      this.nombreCompleto !== usuario.nombreCompleto ? 
      datos.nombreCompleto = this.nombreCompleto : ''

      this.correo !== usuario.correo ? 
      datos.correo = this.correo : ''

      const fechaNacimientoAux = usuario.fechaNacimiento ? usuario.fechaNacimiento.getTime() : null
      this.fechaNacimiento !== fechaNacimientoAux ? 
      datos.fechaNacimiento = this.fechaNacimiento : ''
      
      return datos
    },
    async actualizar() {
      
      const datos = this.datosActualizados()

      try {
        let token = this.$firebase.auth().currentUser

        token = token ? await token.getIdToken() : ''

        let body = {
          datosUsuario: datos
        }

        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const respuesta = await this.$axios.$put(`/usuarios/estudiante/actualizarUsuario`, body, config)

        const usuario = this.$store.state.modules.usuarios

        this.nombreUsuario !== usuario.nombreUsuario ? 
        this.$store.commit('modules/usuarios/setNombreUsuario', this.nombreUsuario) : ''

        this.nombreCompleto !== usuario.nombreCompleto ? 
        this.$store.commit('modules/usuarios/setNombreCompleto', this.nombreCompleto) : ''

        this.correo !== usuario.correo ? 
        this.$store.commit('modules/usuarios/setCorreo', this.correo) : ''

        const fechaNacimientoAux = usuario.fechaNacimiento ? usuario.fechaNacimiento.getTime() : null
        const fechaNacimientoDate = this.fechaNacimiento ? new Date(`${this.fechaNacimientoString}T05:00:00.000Z`) : null

        this.fechaNacimiento !== fechaNacimientoAux ? 
        this.$store.commit('modules/usuarios/setFechaNacimiento', fechaNacimientoDate) : ''

      } catch (error) {
        console.log('error', error)

        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
      }
    },

    reiniciar () {
      const usuario = this.$store.state.modules.usuarios

      this.nombreUsuario = usuario.nombreUsuario
      this.nombreCompleto = usuario.nombreCompleto
      this.correo = usuario.correo 
      this.fechaNacimiento = usuario.fechaNacimiento ? usuario.fechaNacimiento.getTime() : null
      this.fechaNacimientoString = usuario.fechaNacimiento ? 
      (new Date(this.fechaNacimiento - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : ''
    },
    reiniciarImagen() {
      if (this.saving) return

      const usuario = this.$store.state.modules.usuarios

      this.avatar = {
        formData: null,
        imageURL: usuario.fotoPerfil ? usuario.fotoPerfil : ''
      }
    },
    async actualizarFotoPerfil() {
      if (!this.avatar.formData) return

      this.saving = true

      try {
        let token = this.$firebase.auth().currentUser

        token = token ? await token.getIdToken() : ''

        let body = this.avatar.formData

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }

        const respuesta = await this.$axios.$put(`/usuarios/estudiante/actualizarFotoPerfil`, body, config)

        this.$store.commit('modules/usuarios/setFotoPerfil', respuesta.resultado)
        this.saved = true
      } catch (error) {
        console.log('error', error)

        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
      } finally {
        this.saving = false
        this.reiniciarImagen()
      }
    },
    async eliminarFotoPerfil () {
      const condicion = !this.avatar.formData && this.avatar.imageURL
      if (!condicion) return

      this.saving = true

      try {
        let token = this.$firebase.auth().currentUser

        token = token ? await token.getIdToken() : ''

        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        await this.$axios.$delete(`/usuarios/estudiante/eliminarFotoPerfil`, config)

        this.$store.commit('modules/usuarios/setFotoPerfil', null)
        this.saved = true
      } catch (error) {
        console.log('error', error)
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
      } finally {
        this.saving = false
        this.reiniciarImagen()
      }
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
    erroresFechaNacimientoString () {
      const errors = []
      if (!this.$v.fechaNacimientoString.$dirty) return errors
      return errors
    },
  },

  created() {
    this.reiniciar()
    this.reiniciarImagen()
  },
}
</script>

<style scoped>
.imagenAvatar {
  text-align: center;
}

.titulo {
  display: inline;
}
</style>