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
        // REGISTRAMOS UN USUARIO
        const datosUsuario = await this.firebaseRegistroUser_EmailAndPassword({
          nombreUsuario: usuario.nombreUsuario,
          correo: usuario.correo,
          nombreCompleto: usuario.nombreCompleto,
          contrasenha: usuario.contrasenha,
          confirmacionContrasenha: usuario.confirmacionContrasenha,
        })

        // INICIO DE SESION DEL USUARIO
        const userCredential = await this.firebaseInicioSesionUser_EmailAndPassword({
          correo: usuario.correo,
          contrasenha: usuario.contrasenha,
        })

        // REDIRECCIÓN AL USUARIO
        this.$router.push(`/bienvenido-a-jekuaa/${usuario.nombreUsuario}`)

      } catch (error) {
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

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
