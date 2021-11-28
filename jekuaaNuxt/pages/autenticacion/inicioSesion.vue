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
        
        <b class="frase">¡Es momento de aprender!</b>

        <img 
          class="imagen"
          :src="imagen" 
          alt="Logotipo de cdlibre.org" 
        >

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
      imagen: 'https://firebasestorage.googleapis.com/v0/b/jekuaa-py.appspot.com/o/working-at-home.png?alt=media&token=51b948bb-7f3b-483e-bef1-88ed04e7d694',
    }
  },
  methods: {
    async inicioSesionEmail (user) {
      try {
        await this.$store.dispatch('modules/usuarios/firebaseInicioSesionUser_EmailAndPassword', {
          correo: user.correo,
          contrasenha: user.contrasenha
        })

        this.$router.push('/')
      } catch (error) {
        console.log('Error - inicioSesionEmail', error)
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
        
      }
    }
  }
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
  margin-right: 40px;
  font-size: 30px;
  color: #ffffff;
}

.presentacion_contenedor {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(43deg, #683bce 43%, #ff1d89 91%);
}

.formulario {
  
}

@media (min-width: 0px) and (max-width: 1430px) { 
  .imagen {
    width: 300px;
  }
  .frase {
    margin-right: 40px;
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
    margin-right: 30px;
    font-size: 24px;
  }
}

@media (min-width: 0px) and (max-width: 1040px) { 
  .imagen {
    width: 200px;
  }
  .frase {
    margin-right: 35px;
    font-size: 20px;
  }
}

@media (min-width: 0px) and (max-width: 1000px) { 
  .frase {
    margin-right: 10px;
  }
}

@media (min-width: 0px) and (max-width: 959px) { 
  .presentacion_contenedor {
    display: none !important;
  }
}

</style>
