<template>
  <div>
    <presentacion 
      :titulo="blogMasMeGusta.titulo" 
      :descripcion="blogMasMeGusta.descripcion" 
      :to="`/blog/${blogMasMeGusta.referencia}`" 
      :srcImg="srcImg" 
    />
    

    <div class="mt-10 mb-10">
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
import listaInformacionSecciones from '@/helpers/listaSecciones'
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
      titulo: 'Desarrollo web en 2021',
      descripcion: `Contrary to popular belief, Lorem Ipsum is not simply random text. 
        It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.`,
      to: '/blog/desarrollo-web-en-2021',
      srcImg: 'http://www.icorp.com.mx/blog/wp-content/uploads/2021/01/gestion_activos_software.jpg',
    }
  },
  methods: {
    cargarSecciones (visible) {
      if (!visible) {
        return
      }

      const ultimaPagina = (this.listaInformacionSecciones.length-1)/2
      if (this.pagina >= ultimaPagina) {
        return
      }

      this.secciones.push(this.listaInformacionSecciones[this.pagina*2])
      this.secciones.push(this.listaInformacionSecciones[(this.pagina*2)+1])

      this.pagina = this.pagina + 1
    }
  },
  async asyncData({app, $axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
    const response = await $axios.get('/blog/blogConMasMeGusta', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let blogMasMeGusta = response.data.resultado

    let pagina = 0
    let secciones = []

    secciones.push(listaInformacionSecciones[pagina*2])
    secciones.push(listaInformacionSecciones[(pagina*2)+1])

    pagina++

    return {
      blogMasMeGusta,
      listaInformacionSecciones,
      secciones,
      pagina
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
