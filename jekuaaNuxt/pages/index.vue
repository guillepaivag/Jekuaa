<template>
  <div>
    <presentacion />
    <subpresentacion />
    <atajos />
  </div>
</template>

<script>
import presentacion from '@/components/inicio/presentacion'
import subpresentacion from '@/components/inicio/subpresentacion'
import atajos from '@/components/inicio/atajos'

export default {
  name: 'InicioIndex',
  components: {
    presentacion,
    subpresentacion,
    atajos
  },
  data () {
    return {

    }
  },
  head () {
    return {
      title: 'Inicio',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  }
}
</script>

<style>
.jumbotron {
    width: 100%;
    margin: 0;
}
</style>
