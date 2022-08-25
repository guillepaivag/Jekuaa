<template>
  <div class="">
    <div class="row">
      
      <div class="col-md-4 formulario">
        <authEmail
          action="is"
          :data="data"
          @process="inicioSesionEmail($event)"
        />
      </div>

      <div class="col-md-8 presentacion_contenedor">
        
        <div class="frase_contenedor">
          <b class="frase">
            ¡Es momento de aprender!
          </b>
        </div>

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
      },
    }
  },
  methods: {
    async inicioSesionEmail (user) {
      try {
        this.$store.commit('modules/sistema/setLoading', true)

        const userCredential = await this.$store.dispatch('modules/usuarios/login', {
          correo: user.correo,
          contrasenha: user.contrasenha
        })

        await this.$store.dispatch('modules/usuarios/setDatosUsuarioPorUID', userCredential.user.uid)

        if (userCredential.user.emailVerified) this.$router.push('/centro')
        else this.$router.push(`/verificacion-email/${userCredential.user.uid}`)

      } catch (error) {
        console.log('Error - inicioSesionEmail', error)
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
        
      }
    }
  }
}
</script>

<style scoped>
.frase_contenedor {
  margin: 80px 0 0 80px;
}

.frase {
  font-weight: normal; 
  font-family: 'Srisakdi', cursive;
  margin-right: 40px;
  font-size: 30px;
  color: #ffffff;
}

.presentacion_contenedor {
  height: 100vh;
  background: url('~assets/img/autenticacion.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.formulario {
  
}

@media (min-width: 0px) and (max-width: 959px) { 
  .presentacion_contenedor {
    display: none !important;
  }
}

</style>
