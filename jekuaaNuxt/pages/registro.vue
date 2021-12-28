<template>
  <div class="">
    <div class="row">
      <div class="col-md-8 presentacion_contenedor">
        <div class="frase_contenedor">
          <b class="frase">¡Nunca es tarde para hacer un cambio!</b>
        </div>
      </div>
      <div class="col-md-4 formulario">
        <authEmail
          action="r"
          :cargando="cargando"
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
        btnMessage: 'Registrarme',
      },
      cargando: false,
    }
  },
  methods: {
    ...mapActions('modules/usuarios', ['firebaseRegistroUser_EmailAndPassword', 'firebaseInicioSesionUser_EmailAndPassword', 'login', 'firebaseFirestoreGetUser_UID']),
    ...mapMutations('modules/sistema', ['setLoading', 'setError']),
    async registroEmail (usuario) {
      try {
        this.cargando = true
        this.$store.commit('modules/sistema/setLoading', true)

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
        this.$router.push(`/bienvenido-a-jekuaapy/${usuario.nombreUsuario}`)

      } catch (error) {
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

      } finally {
        this.cargando = false
        this.$store.commit('modules/sistema/setLoading', false)
      }
    }
  },
  
}
</script>

<style scoped>
.frase_contenedor {
  margin: 80px 0 0 80px;
}

.frase {
  position: relative;
  font-weight: normal; 
  font-family: 'Srisakdi', cursive;
  font-size: 30px;
  color: #ffffff;
}

.formulario {
  
}

.presentacion_contenedor {
  height: 100vh;
  background: url('~assets/img/autenticacion.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

@media (min-width: 0px) and (max-width: 959px) { 
  .presentacion_contenedor {
    display: none !important;
  }
}
</style>
