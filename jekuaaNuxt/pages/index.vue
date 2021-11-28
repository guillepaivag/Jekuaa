<template>
  <div>
    <presentacion 
      v-if="blogMasMeGusta"
      :titulo="blogMasMeGusta.titulo" 
      :descripcion="blogMasMeGusta.descripcion" 
      :to="`/blog/${blogMasMeGusta.referencia}`" 
      :srcImg="srcImg" 
    />

    <div class="mt-10 mb-10" v-if="secciones.length">
      <ListaBlogs 
        v-for="(seccion, index) in secciones" 
        :seccion="seccion" 
        :key="index" 
      />
    </div>

    <client-only>
      <div class="mt-15" v-if="secciones.length" v-observe-visibility="cargarSecciones"></div>
    </client-only>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import presentacion from '@/components/Presentacion'
import ListaBlogs from '@/components/ListaBlogs'
import informacionSecciones from '@/helpers/informacionSecciones'
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  name: 'InicioIndex',
  components: {
    presentacion,
    ListaBlogs
  },
  directives: {
    ObserveVisibility
  },
  data () {
    return {
      blogMasMeGusta: null,
      listaInformacionSecciones: [],
      secciones: [],
      pagina: 0,
      srcImg: 'http://www.icorp.com.mx/blog/wp-content/uploads/2021/01/gestion_activos_software.jpg',
    }
  },
  methods: {
    cargarSecciones (visible) {
      if (!visible) return

      const ultimaPagina = (this.listaInformacionSecciones.length-1)/2
      if (this.pagina >= ultimaPagina) return

      this.secciones.push(this.listaInformacionSecciones[this.pagina*2])
      this.secciones.push(this.listaInformacionSecciones[(this.pagina*2)+1])

      this.pagina = this.pagina + 1
    }
  },
  async created () {
    try {
      const response = await this.$axios.get('/blog/estudiante/blogConMasMeGusta', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.blogMasMeGusta = response.data.resultado

      let arr = Object.keys(informacionSecciones)
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        this.listaInformacionSecciones.push({
          uid: informacionSecciones[element].uid,
          nombre: informacionSecciones[element].nombre,
        })
      }

      this.secciones.push(this.listaInformacionSecciones[this.pagina*2])
      this.secciones.push(this.listaInformacionSecciones[(this.pagina*2)+1])

      this.pagina++

    } catch (error) {
      console.log('error', error)
      const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
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
