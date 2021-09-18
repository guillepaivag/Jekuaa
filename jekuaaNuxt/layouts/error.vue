<template>
  <v-app dark>
    {{ error.statusCode }}

    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 No se encontró la página.',
      otherError: 'Ha ocurrido un error'
    }
  },
  methods: {
    handleError() {
      console.log('this.getError', this.getError)
      
      if ( this.getError.codigo === '' ) {
        return
      }
      
      const codigoError = this.getError.codigo
      this.otherError = this.getError.mensaje

      if ( codigoError === 'jekuaa/error/usuario_no_autenticado' ) {
        
      } else if ( codigoError === 'jekuaa/error/usuario_deshabilitado' ) {
        
      } else if ( codigoError === 'jekuaa/error/usuario_no_autorizado' ) {
        
      } else if ( codigoError === 'jekuaa/error/sistema' ) {
        
      }

    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return { title }
  },
  computed: {
    ...mapGetters('modules/system', ['getError']),
  },
  created() {
    this.handleError()
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
