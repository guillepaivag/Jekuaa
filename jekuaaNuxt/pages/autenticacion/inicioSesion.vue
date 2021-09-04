<template>
  <div class="">
    <authEmail
      action="is"
      :data="data"
      @process="inicioSesionEmail($event)"
    />
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapMutations } from 'vuex'
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
    ...mapActions('modules/user/user', ['firebaseInicioSesionUser_EmailAndPassword', 'login', 'firebaseFirestoreGetUser_UID']),
    ...mapMutations('modules/system', ['setLoading', 'setError']),
    async inicioSesionEmail (user) {
      try {
        this.setLoading(true)

        const userCredential = await this.firebaseInicioSesionUser_EmailAndPassword({
          correo: user.correo,
          contrasenha: user.contrasenha
        })
        console.log('userCredential', userCredential)

        this.$router.push('/cursos')
      } catch (error) {
        this.setError({
          existe: true,
          titulo: 'Hubo un error',
          mensaje: '',
          error
        })

        this.setLoading(false)
      } finally {
        
      }
    }
  }
}
</script>

<style>

</style>
