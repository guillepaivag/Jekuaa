<template>
  <div>
    <div class="container">
      <buscadorUsuarios v-on:buscar="buscarUsuario($event)" />

      <hr>

      <listaUsuarios v-bind:usuarios="usuarios" />

      <hr>

      <v-btn class="mt-5" v-if="existeMasDatos" v-on:click="paginar" block>
        Cargar más
      </v-btn>

    </div>
  </div>
</template>

<script>
import buscadorUsuarios from '@/components/admin/buscadorUsuarios'
import listaUsuarios from "@/components/admin/listaUsuarios"

export default {
  name: "",
  middleware: 'esMiembroJekuaa',
  components: {
    buscadorUsuarios,
    listaUsuarios
  },
  data() {
    return {
      datosBusqueda: {
        identificadorUsuario: '',
        codigoBuscador: null
      },
      datosFiltro: {

      },
      usuarios: [],
      ultimoDocumento: null,
      MAXIMO_USUARIOS: 10,
      existeMasDatos: false
    }
  },
  methods: {
    buscarUsuario ( datosBusqueda ) {
      this.usuarios = []
      this.datosBusqueda = datosBusqueda

      this.inicializarLista ()
    },
    filtrarUsuario ( datosFiltro ) {
      this.usuarios = []
      this.datosFiltro = datosFiltro

      this.inicializarLista ()
    },
    async inicializarLista () {
      const {
        identificadorUsuario,
        codigoBuscador
      } = this.datosBusqueda

      const usuariosAux = []
      this.usuarios = []
      this.ultimoDocumento = null

      let db = this.$firebase.firestore()
      let ref = db.collection('Usuarios')

      ref = this.filtrar( ref, this.datosBusqueda, this.datosFiltro )

      ref = ref.limit( this.MAXIMO_USUARIOS )

      const documentSnapshots = await ref.get()

      this.ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]

      for (let i = 0; i < documentSnapshots.docs.length; i++) {
        const element = documentSnapshots.docs[i];  
        usuariosAux.push( element.data() )
      }

      await this.verificarSiHayMasDatos()

      this.usuarios = usuariosAux
    },
    async paginar () {
      const usuariosAux = JSON.parse( JSON.stringify( this.usuarios ) )
      
      const db = this.$firebase.firestore()
      let ref = db.collection('Usuarios')
        .startAfter(this.ultimoDocumento)

      ref = this.filtrar( ref, this.datosBusqueda, this.datosFiltro )

      ref = ref.limit(this.MAXIMO_USUARIOS)

      const documentSnapshots = await ref.get()

      this.ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]

      for (let i = 0; i < documentSnapshots.docs.length; i++) {
        const element = documentSnapshots.docs[i];  
        usuariosAux.push( element.data() )
      }

      await this.verificarSiHayMasDatos()

      this.usuarios = usuariosAux
    },
    filtrar ( ref, datosBusqueda, datosFiltro ) {
      const {
        identificadorUsuario,
        codigoBuscador
      } = datosBusqueda

      if ( codigoBuscador ) {
        ref = ref.where(codigoBuscador, '==', identificadorUsuario)
      }
      
      return ref
    },
    async verificarSiHayMasDatos () {
      let db = this.$firebase.firestore()
      
      let ref = db.collection('Usuarios')
        .startAfter(this.ultimoDocumento)

      ref = this.filtrar( ref, this.datosBusqueda, this.datosFiltro )

      ref = ref.limit(1)

      const siguienteDato = await ref.get()

      this.existeMasDatos = !siguienteDato.empty
    },
  },
  async created() {
    await this.inicializarLista()
  },
};
</script>

<style>
</style>
