<template>
  <div class="container">
    <client-only>

      <v-tabs
        class="mt-3"
        v-model="tabs"
        fixed-tabs
        optional
        color="#683bce"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          href="#mobile-tabs-5-1"
        >
          <v-icon left>
            mdi-book-open-variant
          </v-icon>
          Datos del blog
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-2"
        >
          <v-icon left>
            mdi-book-open-page-variant
          </v-icon>
          Contenido del blog
        </v-tab>
      </v-tabs>

      <form >
        <v-tabs-items v-model="tabs">





          <!-- FORMULARIO DE DATOS DEL BLOG -->
          <v-tab-item
            :value="'mobile-tabs-5-1'"
            v-if="tabs === 'mobile-tabs-5-1'"
            class="pb-15"
          >
            <v-card class="mt-10" flat>
              <h2>Datos blogs</h2>
              <v-divider></v-divider>
              <v-row class="mt-2">
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="datosBlogAux.uid"
                    label="Id del blog"
                    :readonly="true"
                    class="mt-1"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.referencia"
                    :counter="100"
                    label="Referencia"
                    required
                    :readonly="true"
                    :class="'mt-7'"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.titulo"
                    :counter="100"
                    label="Titulo"
                    required
                    :readonly="true"
                    class="mt-7"
                  ></v-text-field>

                  <v-textarea
                    v-model="datosBlogAux.descripcion"
                    :counter="500"
                    label="Descripción"
                    required
                    :readonly="true"
                    class="mt-7"
                  ></v-textarea>

                  <v-text-field
                    v-model="datosBlogAux.publicador"
                    label="Id del publicador"
                    :readonly="true"
                    class="mt-7"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.cantidadMeGusta"
                    label="Cantidad de me gusta"
                    :readonly="true"
                    class="mt-7"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="seccionSelected"
                    :hint="seccionSelected.uid ? `Sección: ${seccionSelected.nombre}` : `Se seleccionó: ${seccionSelected.nombre}`"
                    :items="listaSecciones"
                    readonly
                    item-text="nombre"
                    item-value="uid"
                    label="Seleccionar una sección"
                    persistent-hint
                    return-object
                    single-line
                    class="mt-1"
                  ></v-select>

                  <v-select
                    v-model="categoriasSelected"
                    :hint="`${categoriasSelected.length ? `Se seleccionó ${categoriasSelected.length} categorias.` : 'No se seleccionó nada.'}`"
                    :items="listaCategorias"
                    readonly
                    :disabled="!seccionSelected.uid"
                    item-text="nombre"
                    item-value="uid"
                    label="Seleccionar categorias"
                    persistent-hint
                    return-object
                    single-line
                    attach
                    chips
                    multiple
                    class="mt-7"
                  ></v-select>

                  <v-checkbox
                    v-model="datosBlogAux.habilitado"
                    value
                    :readonly="true"
                    color="#683bce"
                    :label="`Estado de habilitación`"
                    class="mt-7"
                  ></v-checkbox>

                  <v-checkbox
                    v-model="datosBlogAux.publicado"
                    value
                    :readonly="true"
                    color="#683bce"
                    :label="`Estado publicado (puedes cambiarlo luego)`"
                    class="mt-7"
                  ></v-checkbox>

                  <v-checkbox
                    v-model="datosBlogAux.revision"
                    value
                    :readonly="true"
                    color="#683bce"
                    :label="`Estado de revisión`"
                    class="mt-7"
                  ></v-checkbox>

                  <div class="mt-5">
                    Fecha de creación:
                    <v-date-picker 
                      v-model="datosBlogAux.fechaCreacion"
                      no-title
                      full-width
                      :readonly="true"
                    ></v-date-picker>
                  </div>

                  <div class="mt-5">
                    Fecha de actualización:
                    <v-date-picker 
                      v-model="datosBlogAux.fechaActualizacion"
                      no-title
                      full-width
                      :readonly="true"
                    ></v-date-picker>
                  </div>
                  
                </v-col>  
              </v-row>
            </v-card>
          </v-tab-item>




          
          <!-- VISUALIZADOR DEL BLOG -->
          <v-tab-item
            :value="'mobile-tabs-5-2'"
            v-if="tabs === 'mobile-tabs-5-2'"
          >
            <v-card flat>
              <section>

                <div class="mt-15 mb-5">
                  <h2> Vista del contenido del blog </h2>
                  <v-divider></v-divider>
                  <div class="">
                    <visualizador-blog :contenido="contenidoBlogAux" />
                  </div>
                </div>

              </section>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

      </form>

    </client-only>
  </div>
</template>

<script>
import VisualizadorBlog from '@/components/blogs/Visualizador'
import informacionSecciones from '@/helpers/informacionSecciones'
import showdown from 'showdown'

export default {
  components: {
    'visualizador-blog': VisualizadorBlog,
  },

  props: {
    datosBlogProps: Object,
    contenidoBlogProps: String,
  },

  data() {
    return {
        tabs: 'mobile-tabs-5-1',
        datosBlogAux: {
            referencia: '',       // requerido
            titulo: '',           // requerido
            descripcion: '',      // requerido
            publicador: '',       // requerido
            seccion: '',          // requerido
            categorias: [],       // requerido
            publicado: true,      // opcional
        },
        contenidoBlogAux: '',
        seccionSelected: {
            uid: '', 
            nombre: 'Blog normal'
        },
        categoriasSelected: [],
        listaSecciones: [],
        listaCategorias: [],
        cantidadCaracteres: 0,
        errorContenidoBlog: 'La longitud mínima para un blog es 50.',
    }
  },

  computed: {
    
  },
  
  methods: {
    setListaSecciones () {
      let arr = Object.keys(informacionSecciones)
      this.listaSecciones.push({
        uid: '',
        nombre: 'Blog normal'
      })  
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        this.listaSecciones.push({
          uid: informacionSecciones[element].uid,
          nombre: informacionSecciones[element].nombre,
        })  
      }

    },
    setListaCategorias (idSeccion) {
      this.listaCategorias = []
      let arr = Object.keys(informacionSecciones[idSeccion].categorias)
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        this.listaCategorias.push({
          uid: informacionSecciones[idSeccion].categorias[element].uid,
          nombre: informacionSecciones[idSeccion].categorias[element].nombre,
        })
      }
    },
  },

  watch: {
    seccionSelected: function (n, v) {
      if (n.uid == v.uid) return
      
      this.datosBlogAux.seccion = n.uid

      this.categoriasSelected = []
      n.uid ? this.setListaCategorias(n.uid) : ''
    },
    categoriasSelected: function (n, v) {
      if (!this.seccionSelected.uid) return

      this.datosBlogAux.categorias = []
      for (let i = 0; i < n.length; i++) {
        const element = n[i]
        this.datosBlogAux.categorias.push(element.uid) 
      }
    },
  },

  async created() {
    const fechaCreacion = (new Date(this.datosBlogProps.fechaCreacion.seconds*1000 - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    const fechaActualizacion = (new Date(this.datosBlogProps.fechaActualizacion.seconds*1000 - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

    this.datosBlogAux = {
        uid: this.datosBlogProps.uid,
        referencia: this.datosBlogProps.referencia,
        titulo: this.datosBlogProps.titulo,
        descripcion: this.datosBlogProps.descripcion,
        publicador: this.datosBlogProps.publicador,
        seccion: this.datosBlogProps.seccion,
        categorias: this.datosBlogProps.categorias,
        publicado: this.datosBlogProps.publicado,
        habilitado: this.datosBlogProps.habilitado,
        revision: this.datosBlogProps.revision,
        cantidadMeGusta: this.datosBlogProps.cantidadMeGusta,
        fechaCreacion: fechaCreacion,
        fechaActualizacion: fechaActualizacion,
    }

    this.contenidoBlogAux = this.contenidoBlogProps

    if (this.datosBlogProps.seccion) {

      // Cargar lista seccion
      this.setListaSecciones()
      // Seleccionar una seccion
      this.seccionSelected = {
        uid: informacionSecciones[this.datosBlogProps.seccion].uid,
        nombre: informacionSecciones[this.datosBlogProps.seccion].nombre
      }

      // Esperar que el DOM se actualice
      await this.$nextTick()

      // Cargar lista categorias por seccion seleccionada
      this.setListaCategorias(this.datosBlogProps.seccion)

      // Seleccionar las categorias 
      for (let i = 0; i < this.datosBlogProps.categorias.length; i++) {
        const categoria = this.datosBlogProps.categorias[i]
        this.categoriasSelected.push({
          uid: informacionSecciones[this.datosBlogProps.seccion].categorias[categoria].uid,
          nombre: informacionSecciones[this.datosBlogProps.seccion].categorias[categoria].nombre,
        })
      }

    } else {
      // Cargar lista seccion
      this.setListaSecciones()
      // Seleccionar una seccion
      this.seccionSelected = {
        uid: '', 
        nombre: 'Blog normal'
      }

      // Esperar que el DOM se actualice
      await this.$nextTick()

      // Cargar lista categorias por seccion seleccionada
      this.listaCategorias = []
      // Seleccionar las categorias 
      this.categoriasSelected = []
    }
  },
}
</script>

<style scoped>
.botonesDeAcciones {
  width: 500px;
  margin: auto;
}

@media only screen and (max-width: 550px) {
  .botonesDeAcciones {
    width: 300px;
    margin: auto;
  }
}

@media only screen and (max-width: 350px) {
  .botonesDeAcciones {
    width: 190px;
    margin: auto;
  }
}
</style>