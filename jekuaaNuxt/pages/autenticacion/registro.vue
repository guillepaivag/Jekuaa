<template>
  <div class="">
    <div class="row">
      <div class="col-md-8 presentacion_contenedor">
        <img 
          class="imagen"
          :src="require(`~/assets/img/working-at-home.png`)"
          alt="Logotipo de cdlibre.org" 
        >
        <b class="frase">¡Nunca es tarde para hacer un cambio!</b>
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
@import url('https://fonts.googleapis.com/css2?family=Srisakdi&display=swap');

.imagen {
  -webkit-animation: action .5s infinite  alternate;
  animation: action .5s infinite  alternate;
  width: 350px;
}

@-webkit-keyframes action {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
}
@keyframes action {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
}

.frase {
  font-weight: normal; 
  font-family: 'Srisakdi', cursive;
  margin-left: 40px;
  font-size: 30px;
  color: #ffffff;
}

.formulario {
  
}

.presentacion_contenedor {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(43deg, #683bce 43%, #ff1d89 91%);
}

@media (min-width: 0px) and (max-width: 1430px) { 
  .imagen {
    width: 300px;
  }
  .frase {
    margin-left: 40px;
    font-size: 27px;
  }
}

@media (min-width: 0px) and (max-width: 1370px) { 
  .imagen {
    width: 250px;
  }
}

@media (min-width: 0px) and (max-width: 1190px) { 
  .imagen {
    width: 250px;
  }
}

@media (min-width: 0px) and (max-width: 1150px) { 
  .imagen {
    width: 200px;
  }
  .frase {
    margin-left: 30px;
    font-size: 24px;
  }
}

@media (min-width: 0px) and (max-width: 1040px) { 
  .imagen {
    width: 200px;
  }
  .frase {
    margin-left: 35px;
    font-size: 20px;
  }
}

@media (min-width: 0px) and (max-width: 1000px) { 
  .frase {
    margin-left: 10px;
  }
}

@media (min-width: 0px) and (max-width: 959px) { 
  .presentacion_contenedor {
    display: none !important;
  }
}
</style>
