<template>
  <div>
    <presentacion 
      v-if="blogMasMeGusta"
      :titulo="blogMasMeGusta.titulo" 
      :descripcion="blogMasMeGusta.descripcion" 
      :to="`/blog/${blogMasMeGusta.referencia}`" 
      :seccion="this.blogMasMeGusta.seccion" 
    />

    <div class="mt-10 mb-10" v-if="secciones.length">
      <ListaBlogs 
        v-for="(seccion, index) in secciones" 
        :seccion="seccion" 
        :key="index" 
      />
    </div>
    <div class="mt-10 mb-10" v-else>
      Cargando secciones...
    </div>

    <client-only>
      <div 
        class="mt-15" 
        v-if="secciones.length" 
        v-observe-visibility="cargarSecciones"
      ></div>
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
      listaInformacionSecciones: [],
      secciones: [],
      pagina: 0,
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
  },
  async asyncData({isDev, route, $axios, store, env, params, query, req, res, redirect, error}) {
    try {
      const response = await $axios.get('/blog/blogConMasMeGusta', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      let blogMasMeGusta = response.data.resultado

      return {
        blogMasMeGusta
      }
    } catch (error) {
      
    }
  },
}
</script>

<style>

</style>
