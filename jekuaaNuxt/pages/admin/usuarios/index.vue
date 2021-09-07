<template>
  <div>
    <div class="container">
      <buscadorUsuarios v-on:buscar="buscarUsuario($event)" />

      <hr>

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
      
    }
  },
  methods: {
    buscarUsuario ( datosBusqueda ) {
      const {
        identificadorUsuario,
        codigoBuscador
      } = datosBusqueda

      alert(`Buscar por ${codigoBuscador} al usuario ${identificadorUsuario}`)
    }
  },
};
</script>

<style>
</style>
