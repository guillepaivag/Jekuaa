<template>
  <div>
    <presentacion />

    <div class="mt-10">
      siuuu
    </div>
  </div>
</template>

<script>
import presentacion from '@/components/Presentacion'

export default {
  name: 'InicioIndex',
  components: {
    presentacion,
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
