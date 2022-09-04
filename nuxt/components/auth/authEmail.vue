<template>
  <div class="">
    <v-container class="auth text-center">
      <v-responsive>
        <div class="title">
          <v-row row align-center>
            <v-col text-xs-center>

              <v-avatar
                size="100"
                tile
              >
                <v-img
                  contain
                  max-height="60%"
                  :src="require(`~/assets/img/logo48x48.png`)"
                />
              </v-avatar>
              
              <h3 class="display-1">
                {{ data.title }}
              </h3>
            </v-col>
          </v-row>
        </div>

        <v-form id="nativeForm" v-model="valid">
          <v-text-field
            v-if="action === 'r'"
            v-model="nombreUsuario"
            :error-messages="nombreUsuarioError"
            :counter="20"
            :loading="cargando"
            label="Nombre de usuario"
            name="nombreUsuario"
            :required="action === 'r'"
            @input="$v.nombreUsuario.$touch()"
            @blur="$v.nombreUsuario.$touch()"
          />

          <v-text-field
            v-if="action === 'r'"
            v-model="nombreCompleto"
            :error-messages="nombreCompletoError"
            :counter="100"
            :loading="cargando"
            label="Nombre completo"
            name="nombreCompleto"
            @input="$v.nombreCompleto.$touch()"
            @blur="$v.nombreCompleto.$touch()"
          />

          <v-text-field
            v-model="correo"
            :error-messages="correoError"
            :counter="100"
            :loading="cargando"
            label="Correo"
            name="correo"
            :required="action === 'r'"
            @input="$v.correo.$touch()"
            @blur="$v.correo.$touch()"
          />

          <v-text-field
            v-model="contrasenha"
            :error-messages="contrasenhaError"
            :counter="20"
            :loading="cargando"
            label="Contraseña"
            name="contrasenha"
            type="password"
            :required="action === 'r'"
            @input="$v.contrasenha.$touch()"
            @blur="$v.contrasenha.$touch()"
          />

          <v-text-field
            v-if="action === 'r'"
            v-model="confirmacionContrasenha"
            :error-messages="confirmacionContrasenhaError"
            :counter="20"
            :loading="cargando"
            label="Confirmar contraseña"
            name="confirmacionContrasenha"
            type="password"
            :required="action === 'r'"
            @input="$v.confirmacionContrasenha.$touch()"
            @blur="$v.confirmacionContrasenha.$touch()"
          />

          <div class="mt-4">
            <v-btn class="" outlined color="#683bce" :disabled="!valid || $v.$anyError" @click="submit">
              {{ data.btnMessage }}
            </v-btn>

            <v-divider class="mt-7 mb-7"></v-divider>

            <v-btn
              class=""
              outlined
              color="red"
              v-on:click="loginWithGoogle"
            >
              <v-icon left>
                mdi-google
              </v-icon>
              Google
            </v-btn>

            <v-btn
              disabled
              class=""
              outlined
              color="blue"
            >
              <v-icon left>
                mdi-facebook
              </v-icon>
              Facebook
            </v-btn>
          </div>
        </v-form>
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: '',
  mixins: [validationMixin],

  validations: {
    nombreUsuario: { required, minLength: minLength(1), maxLength: maxLength(20) },
    nombreCompleto: { minLength: minLength(1), maxLength: maxLength(100) },
    correo: { required, email, minLength: minLength(5), maxLength: maxLength(100) },
    contrasenha: { required, minLength: minLength(6), maxLength: maxLength(20) },
    confirmacionContrasenha: { required, minLength: minLength(6), maxLength: maxLength(20) },
  },

  props: {
    action: String,
    data: Object,
    cargando: Boolean,
  },
  data () {
    return {
      valid: false,
      nombreUsuario: '',
      nombreCompleto: '',
      correo: '',
      contrasenha: '',
      confirmacionContrasenha: '',
    }
  },
  methods: {
    submit () {
      let data = {}

      if (this.action == 'r') {
        data = {
          nombreUsuario: this.nombreUsuario,
          nombreCompleto: this.nombreCompleto,
          correo: this.correo,
          contrasenha: this.contrasenha,
          confirmacionContrasenha: this.confirmacionContrasenha,
        }

      } else {
        data = {
          correo: this.correo,
          contrasenha: this.contrasenha,
        }
      }

      this.$emit('process', data)
    },
    async loginWithGoogle () {
      
      try {
        this.$store.commit('modules/sistema/setLoading', true)

        const provider = new fb.auth.GoogleAuthProvider()
        const result = await fb.auth().signInWithPopup(provider)
        console.log('result', result)

        const inicioSesionPorPrimeraVez = result.user.metadata.creationTime === result.user.metadata.lastSignInTime
        if (inicioSesionPorPrimeraVez) {
          const nombreUsuario = result.user.email.split('@')[0] + new Date(result.user.metadata.creationTime).getTime()
          const token = await fb.auth().currentUser.getIdToken()

          await this.$store.dispatch('modules/usuarios/setDatosUsuario', {
            token: token,
            emailVerificado: result.user.emailVerified,
            fotoPerfil: result.user.photoURL,
            uid: result.user.uid,
            correo: result.user.email,
            nombreCompleto: result.user.displayName,
            nombreUsuario: nombreUsuario,
            fechaNacimiento: null,
            plan: 'gratis',
            rol: 'estudiante',
            point: 0,
          })

          this.$router.push(`/bienvenido-a-jekuaapy/${nombreUsuario}`)
        } else {

          await this.$store.dispatch('modules/usuarios/setDatosUsuarioPorUID', result.user.uid)

          if (result.user.emailVerified) this.$router.push('/centro')
          else this.$router.push(`/verificacion-email/${result.user.uid}`)
        }

      } catch (error) {
        console.log('ERROR WITH GOOGLE', error)

        if (error.code === 'auth/popup-closed-by-user') {
          this.$store.commit('modules/sistema/setLoading', false)
        } else {
          this.$store.commit('modules/sistema/setLoading', false)
        }
        
      }

    },
    async loginWithFacebook () {

      try {
        this.$store.commit('modules/sistema/setLoading', true)

        const provider = new fb.auth.FacebookAuthProvider()
        const result = await fb.auth().signInWithPopup(provider)

        const inicioSesionPorPrimeraVez = result.user.metadata.creationTime === result.user.metadata.lastSignInTime
        if (inicioSesionPorPrimeraVez) {
          const nombreUsuario = result.user.email.split('@')[0] + new Date(result.user.metadata.creationTime).getTime()
          const token = await fb.auth().currentUser.getIdToken()

          await this.$store.dispatch('modules/usuarios/setDatosUsuario', {
            token: token,
            emailVerificado: result.user.emailVerified,
            fotoPerfil: result.user.photoURL,
            uid: result.user.uid,
            correo: result.user.email,
            nombreCompleto: result.user.displayName,
            nombreUsuario: nombreUsuario,
            fechaNacimiento: null,
            plan: 'gratis',
            rol: 'estudiante',
            point: 0,
          })

          this.$router.push(`/bienvenido-a-jekuaapy/${nombreUsuario}`)
        } else {

          await this.$store.dispatch('modules/usuarios/setDatosUsuarioPorUID', result.user.uid)

          if (result.user.emailVerified) this.$router.push('/centro')
          else this.$router.push(`/verificacion-email/${result.user.uid}`)
        }

      } catch (error) {
        console.log('ERROR WITH FACEBOOK', error)

        if (error.code === 'auth/popup-closed-by-user') {
          this.$store.commit('modules/sistema/setLoading', false)
        } else {
          this.$store.commit('modules/sistema/setLoading', false)
        }

      }

    }
  },
  computed: {
    nombreUsuarioError () {
      const errors = []
      if (!this.$v.nombreUsuario.$dirty) return errors
      !this.$v.nombreUsuario.minLength && errors.push('La mínima cantidad de caracteres es 1.')
      !this.$v.nombreUsuario.maxLength && errors.push('No puede exceder a 20 carácteres.')
      !this.$v.nombreUsuario.required && errors.push('El nombre de usuario es requerido.')
      return errors
    },
    nombreCompletoError () {
      const errors = []
      if (!this.$v.nombreCompleto.$dirty) return errors
      !this.$v.nombreCompleto.minLength && errors.push('La mínima cantidad de caracteres es 1.')
      !this.$v.nombreCompleto.maxLength && errors.push('No puede exceder a 100 carácteres.')
      return errors
    },
    correoError () {
      const errors = []
      if (!this.$v.correo.$dirty) return errors
      !this.$v.correo.minLength && errors.push('La mínima cantidad de caracteres es 5.')
      !this.$v.correo.maxLength && errors.push('No puede exceder a 100 carácteres.')
      !this.$v.correo.email && errors.push('El correo debe ser válido.')
      !this.$v.correo.required && errors.push('El correo es requerido.')
      return errors
    },
    contrasenhaError () {
      const errors = []
      if (!this.$v.contrasenha.$dirty) return errors
      !this.$v.contrasenha.minLength && errors.push('La mínima cantidad de caracteres es 6.')
      !this.$v.contrasenha.maxLength && errors.push('No puede exceder a 20 carácteres.')
      !this.$v.contrasenha.required && errors.push('La contraseña es requerida.')
      return errors
    },
    confirmacionContrasenhaError () {
      const errors = []
      if (!this.$v.confirmacionContrasenha.$dirty) return errors
      !this.$v.confirmacionContrasenha.minLength && errors.push('La mínima cantidad de caracteres es 6.')
      !this.$v.confirmacionContrasenha.maxLength && errors.push('No puede exceder a 20 carácteres.')
      !this.$v.confirmacionContrasenha.required && errors.push('La contraseña es requerida.')
      return errors
    },
  }
}
</script>

<style scoped>
.auth {
  margin-top: 20px;
  margin-bottom: 35px;
}

.title {
  margin-bottom: 20px;
}
</style>