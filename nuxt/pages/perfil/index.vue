<template>
  <div>
    <div class="mt-0 mb-3">
        <v-breadcrumbs>
            <div v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <v-breadcrumbs-item
                    :href="breadcrumb.href"
                    :disabled="breadcrumb.disabled"
                    :nuxt="true"
                >
                    {{ breadcrumb.text.toUpperCase() }}
                </v-breadcrumbs-item>
                <v-breadcrumbs-divider v-if="index !== breadcrumbs.length-1">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-breadcrumbs-divider>
            </div>
        </v-breadcrumbs>
    </div>

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
            <foto-perfil />
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

    <v-dialog
        v-model="processing.value"
        persistent
        width="300"
    >
        <v-card
            color="#683bce"
            dark
        >
            <v-card-text class="pt-3">
                {{ processing.message }}
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-divider></v-divider>

    <div class="mt-10">
      <p class="text-h6 text--primary">
        Tienes {{ proveedores.length }} {{ proveedores.length !== 1 ? 'proveedores' : 'proveedor' }}:
      </p>

      <v-card
        v-for="(proveedor, index) in proveedores" :key="index"
        class="mx-auto mb-5"
        max-width="600"
        outlined
      >
        <div v-if="proveedor.providerId !== 'password'">

        </div>
        <!-- <div class="text-overline mb-4">
          OVERLINE
        </div> -->
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{ getNombreProveedor(proveedor.providerId) }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Correo: {{ proveedor.email }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Nombre: {{ proveedor.displayName }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            color="grey"
          >
            <v-img v-if="proveedor.photoURL" :src="proveedor.photoURL"></v-img>
            <v-img v-else :src="require(`~/assets/img/logo48x48.png`)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn
            :disabled="proveedores.length === 1 || (proveedor.providerId !== 'password' && !$store.state.modules.usuarios.emailVerificado)"
            outlined
            rounded
            text
            color="red"
            v-on:click="quitarProveedor(proveedor.providerId)"
          >
            Desvincular
          </v-btn>
        </v-card-actions>
      </v-card>
      
    </div>
  </div>
</template>

<script>
import FotoPerfil from '@/components/FotoPerfil'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { fb } from '@/plugins/firebase'

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
      nombreUsuario: '',
      nombreCompleto: '',
      correo: '',
      fechaNacimiento: null,
      fechaNacimientoString: '',
      breadcrumbs: [
          {
              text: 'Inicio',
              disabled: false,
              href: '/',
          },
          {
              text: 'Perfil',
              disabled: true,
              href: '/perfil',
          },
      ],
      proveedores: [],
      processing: {
          value: false,
          message: ''
      },
    }
  },

  components: {
    'foto-perfil': FotoPerfil
  },

  watch:{
    fechaNacimientoString: function (n, v) {
      if (!n) return
      this.fechaNacimiento = new Date(`${n}T05:00:00.000Z`).getTime()
    }
  },

  methods: {
    async quitarProveedor (providerId) {
      try {
        this.processing.value = true
        this.processing.message = 'Desvinculando proveedor. Favor esperar.'

        await fb.auth().currentUser.unlink(providerId)
        const index = this.proveedores.findIndex(proveedor => proveedor.providerId === providerId)
        this.proveedores.splice(index, 1)

      } catch (error) {
        
      } finally {
        this.processing.value = false
        this.processing.message = ''
      }
      
    },
    datosActualizados() {
      const usuario = this.$store.state.modules.usuarios
      let datos = {}
      let nombreCompletoAux = ''

      // -------

      this.nombreCompleto !== usuario.nombreCompleto ? 
      nombreCompletoAux = this.nombreCompleto : ''

      // -------

      this.nombreUsuario !== usuario.nombreUsuario ? 
      datos.nombreUsuario = this.nombreUsuario : ''

      this.correo !== usuario.correo ? 
      datos.correo = this.correo : ''

      const fechaNacimientoAux = usuario.fechaNacimiento ? usuario.fechaNacimiento.getTime() : null
      this.fechaNacimiento !== fechaNacimientoAux ? 
      datos.fechaNacimiento = this.fechaNacimiento : ''
      
      return {
        nombreCompleto: nombreCompletoAux,
        datosUsuario: datos,
      }
    },
    async actualizar() {
      this.processing.value = true
      this.processing.message = 'Actualizando usuario. Favor esperar.'
      
      const { nombreCompleto, datosUsuario } = this.datosActualizados()

      try {
        let token = this.$firebase.auth().currentUser
        token = token ? await token.getIdToken() : ''
        await this.$store.dispatch('modules/usuarios/setTOKEN', token)

        let body = {}
        if (nombreCompleto) body.nombreCompleto = nombreCompleto
        if (Object.keys(datosUsuario).length) body.datosUsuario = datosUsuario

        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const respuesta = await this.$axios.$put(`/serviceUsuario/actualizarUsuario`, body, config)

        if (datosUsuario && datosUsuario.correo) {
          await this.$store.dispatch('modules/usuarios/logout')
          this.$router.push('/')
        }

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
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
        
      } finally {
        this.processing.value = false
        this.processing.message = ''
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
    getNombreProveedor (id) {
      if (id === 'facebook.com') return 'Facebook'
      if (id === 'google.com') return 'Google'
      if (id === 'password') return 'Correo/Contraseña'
    }
  },

  computed: {
    erroresNombreUsuario () {
      const errors = []
      if (!this.$v.nombreUsuario.$dirty) return errors
      !this.$v.nombreUsuario.required && errors.push('Nombre de usuario es requerido.')
      !this.$v.nombreUsuario.maxLength && errors.push('La cantidad máxima es 20 caracteres.')
      !this.$v.nombreUsuario.minLength && errors.push('La cantidad mínima es 1 catacter.')
      return errors
    },
    erroresNombreCompleto () {
      const errors = []
      if (!this.$v.nombreCompleto.$dirty) return errors
      !this.$v.nombreCompleto.maxLength && errors.push('La cantidad máxima es 100 caracteres.')
      !this.$v.nombreCompleto.minLength && errors.push('La cantidad mínima es 1 caracter.')
      return errors
    },
    erroresCorreo () {
      const errors = []
      if (!this.$v.correo.$dirty) return errors
      !this.$v.correo.email && errors.push('El correo debe ser válido.')
      !this.$v.correo.required && errors.push('El correo es requerido.')
      !this.$v.correo.maxLength && errors.push('La cantidad máxima es 100 caracteres.')
      !this.$v.correo.minLength && errors.push('La cantidad mínima es 5 caracteres.')
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

    this.proveedores = this.$firebase.auth().currentUser.providerData
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