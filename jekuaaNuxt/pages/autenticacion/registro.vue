<template>
  <div class="">
    <div class="row">
      <div class="col-md-8 presentacion">

      </div>
      <div class="col-md-4">
        <authEmail
          action="r"
          :data="data"  
          v-on:process="registroEmail($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapMutations } from 'vuex'
import authEmail from '@/components/auth/authEmail'

export default {
  name: 'Registro',
  components: {
    authEmail
  },
  middleware: 'accesoNoAutenticado',
  data () {
    return {
      data: {
        title: 'Registrarme',
        btnMessage: 'Registrarme'
      }
    }
  },
  methods: {
    ...mapActions('modules/usuarios', ['firebaseRegistroUser_EmailAndPassword', 'firebaseInicioSesionUser_EmailAndPassword', 'login', 'firebaseFirestoreGetUser_UID']),
    ...mapMutations('modules/sistema', ['setLoading', 'setError']),
    async registroEmail (usuario) {

      try {
        this.setLoading(true)

        // REGISTRAMOS UN USUARIO
        const datosRegistroUsuario = await this.firebaseRegistroUser_EmailAndPassword({
          nombreUsuario: usuario.nombreUsuario,
          correo: usuario.correo,
          contrasenha: usuario.contrasenha,
          nombreCompleto: usuario.nombreCompleto
        })

        // INICIO DE SESION DEL USUARIO
        const userCredential = await this.firebaseInicioSesionUser_EmailAndPassword({
          correo: usuario.correo,
          contrasenha: usuario.contrasenha
        })

        this.$router.push(`/bienvenido-a-jekuaa/${datosRegistroUsuario.nombreUsuario}`)

      } catch (error) {
        this.setError({
          existe: true,
          titulo: 'Hubo un error al registrarse',
          mensaje: 'Hubo un error al registrarse en Jekuaa con correo.',
          error
        })

        this.setLoading(false)
      } finally {
        // this.setLoading(false)
      }
    }
  },
  
}
</script>

<style scoped>

@media (min-width: 0px) and (max-width: 959px) { 
  .presentacion {
    display: none;
  }
}

.presentacion {
  width: 50%;
  height: 100vh;
  background-color: #683bce; 
}

</style>
