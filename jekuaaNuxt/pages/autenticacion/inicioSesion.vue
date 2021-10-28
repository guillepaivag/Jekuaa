<template>
  <div class="">
    <div class="row">
      
      <div class="col-md-4">
        <authEmail
          action="is"
          :data="data"
          @process="inicioSesionEmail($event)"
        />
      </div>

      <div class="col-md-8 presentacion">
        
        

      </div>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import authEmail from '@/components/auth/authEmail'

export default {
  name: 'InicioSesion',
  components: {
    authEmail
  },
  middleware: 'accesoNoAutenticado',
  data () {
    return {
      data: {
        title: 'Iniciar Sesión',
        btnMessage: 'Iniciar sesión'
      }
    }
  },
  methods: {
    async inicioSesionEmail (user) {
      try {
        this.$store.dispatch('modules/sistema/setLoading', true)

        const userCredential = await this.$store.dispatch('modules/usuarios/firebaseInicioSesionUser_EmailAndPassword', {
          correo: user.correo,
          contrasenha: user.contrasenha
        })
        console.log('userCredential', userCredential)

        this.$router.push('/')
      } catch (error) {
        console.log('Error - inicioSesionEmail', error)
        
      } finally {
        this.$store.dispatch('modules/sistema/setLoading', false)
      }
    }
  }
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
