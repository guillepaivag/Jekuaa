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
                    v-model="datosBlogAux.referencia"
                    :error-messages="referenciaErr"
                    :counter="100"
                    label="Referencia"
                    required
                    @input="$v.datosBlogAux.referencia.$touch()"
                    @blur="$v.datosBlogAux.referencia.$touch()"
                    :class="'mt-1'"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.titulo"
                    :error-messages="tituloErr"
                    :counter="100"
                    label="Titulo"
                    required
                    @input="$v.datosBlogAux.titulo.$touch()"
                    @blur="$v.datosBlogAux.titulo.$touch()"
                    class="mt-7"
                  ></v-text-field>

                  <v-textarea
                    v-model="datosBlogAux.descripcion"
                    :error-messages="descripcionErr"
                    :counter="500"
                    label="Descripción"
                    required
                    @input="$v.datosBlogAux.descripcion.$touch()"
                    @blur="$v.datosBlogAux.descripcion.$touch()"
                    class="mt-7"
                  ></v-textarea>

                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="seccionSelected"
                    :hint="seccionSelected.uid ? `Sección: ${seccionSelected.nombre}` : `Se seleccionó: ${seccionSelected.nombre}`"
                    :items="listaSecciones"
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
                    v-model="datosBlogAux.publicado"
                    value
                    color="#683bce"
                    :label="`Estado publicado (puedes cambiarlo luego)`"
                    class="mt-7"
                  ></v-checkbox>
                  
                </v-col>  
              </v-row>
            </v-card>
          </v-tab-item>








          <!-- CONTENIDO DEL BLOG -->
          <v-tab-item
            :value="'mobile-tabs-5-2'"
            v-if="tabs === 'mobile-tabs-5-2'"
          >
            <v-card flat>
              <section>
                
                <div class="mt-10 mb-10">
                  <h2> Editor del contenido del blog </h2>
                  <v-divider></v-divider>
                  <Tiptap class="mt-5" v-model="contenidoBlogAux" />
                </div>

                <v-divider class="mt-10"></v-divider>

                <p class="mt-3 mb-2">
                  Cantidad de carácteres: <strong>{{cantidadCaracteres}}</strong>
                </p>
                <p style="color:red;" v-if="errorContenidoBlog">
                  {{errorContenidoBlog}}
                </p>

              </section>
            </v-card>
          </v-tab-item>




        </v-tabs-items>





        <div class="text-center contenedor_botonesDeAcciones mt-10">
          <div class="botonesDeAcciones">
            <v-btn 
              block
              outlined
              class="mb-5"
              color="#683bce"
              v-on:click="enviarDatos"
              :disabled="$v.$anyError || !$store.state.modules.usuarios.emailVerificado"
            >
              Actualizar blog
            </v-btn>
            
            <v-btn 
              block
              outlined
              class="mt-0"
              color="#ff1d89"
              v-on:click="reiniciarTodo"
            >
              Reiniciar
            </v-btn>
          </div>
        </div>
      </form>

    </client-only>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import VisualizadorBlog from '@/components/blogs/Visualizador'
import Tiptap from '@/components/Tiptap'
import informacionSecciones from '@/helpers/informacionSecciones'
import showdown from 'showdown'

export default {
  components: {
    'Tiptap': Tiptap,
    'visualizador-blog': VisualizadorBlog,
  },

  mixins: [validationMixin],

  validations: {
    datosBlogAux: {
      referencia: { required, maxLength: maxLength(100) },
      titulo: { required, maxLength: maxLength(100) },
      descripcion: { required, maxLength: maxLength(500) },
      seccion: { required },
      categorias: {
        required, 
        minLength: minLength(1), 
        maxLength: maxLength(3),
        $each: {
          minLength: minLength(0),
          maxLength: maxLength(20),
        }
      },
      publicado: {  },
    }
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
        seccion: '',          // requerido
        categorias: [],       // requerido
        publicado: true,      // opcional
      },
      listaSecciones: [],
      listaCategorias: [],
      seccionSelected: {
        uid: '', 
        nombre: 'Blog normal'
      },
      categoriasSelected: [],
      contenidoBlogAux: '',
      cantidadCaracteres: 0,
      errorContenidoBlog: 'La longitud mínima para un blog es 50.',
    }
  },

  computed: {
    referenciaErr () {
      const errors = []
      if (!this.$v.datosBlogAux.referencia.$dirty) return errors
      !this.$v.datosBlogAux.referencia.maxLength && errors.push('La referencia es muy larga.')
      !this.$v.datosBlogAux.referencia.required && errors.push('La referencia es requerida.')
      return errors
    },
    tituloErr () {
      const errors = []
      if (!this.$v.datosBlogAux.titulo.$dirty) return errors
      !this.$v.datosBlogAux.titulo.maxLength && errors.push('El titulo es muy largo.')
      !this.$v.datosBlogAux.titulo.required && errors.push('El titulo es requerido.')
      return errors
    },
    descripcionErr () {
      const errors = []
      if (!this.$v.datosBlogAux.descripcion.$dirty) return errors
      !this.$v.datosBlogAux.descripcion.maxLength && errors.push('La descripción ds muy larga')
      !this.$v.datosBlogAux.descripcion.required && errors.push('La descripción es requerida.')
      return errors
    },
  },
  
  methods: {
    filtroDeDatosActualizados () {
      let datosBlog = {}
      let contenidoBlog = {}

      if (this.datosBlogAux.referencia !== this.datosBlogProps.referencia) {
        datosBlog.referencia = this.datosBlogAux.referencia
      }

      if (this.datosBlogAux.titulo !== this.datosBlogProps.titulo) {
        datosBlog.titulo = this.datosBlogAux.titulo
      }

      if (this.datosBlogAux.descripcion !== this.datosBlogProps.descripcion) {
        datosBlog.descripcion = this.datosBlogAux.descripcion
      }

      if (this.datosBlogAux.seccion !== this.datosBlogProps.seccion) {
        datosBlog.seccion = this.datosBlogAux.seccion
      }

      if (this.datosBlogAux.categorias.length !== this.datosBlogProps.categorias.length) {
        datosBlog.categorias = this.datosBlogAux.categorias
      } else {
        let cambio = false
        for (let i = 0; i < this.datosBlogAux.categorias.length; i++) {
          const newElement = this.datosBlogAux.categorias[i]
          cambio = !this.datosBlogProps.categorias.includes(newElement)
          if (cambio) {
            datosBlog.categorias = this.datosBlogAux.categorias
            break
          }
        }
      }

      if (this.datosBlogAux.publicado !== this.datosBlogProps.publicado) {
        datosBlog.publicado = this.datosBlogAux.publicado
      }

      if (this.contenidoBlogAux !== this.contenidoBlogProps) {
        contenidoBlog = this.contenidoBlogAux
      }

      return {
        datosBlog,
        contenidoBlog,
      }
    },
    enviarDatos () {
      const actualizados = {
        uidBlog: this.datosBlogProps.uid,
        ...this.filtroDeDatosActualizados()
      }
      this.$emit('actualizarBlog', actualizados)
    },
    async reiniciarDatos () {
      // Cargar datos
      this.datosBlogAux = {
        referencia: this.datosBlogProps.referencia,
        titulo: this.datosBlogProps.titulo,
        descripcion: this.datosBlogProps.descripcion,
        seccion: '',
        categorias: [],
        publicado: this.datosBlogProps.publicado,
      }

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
        let categoriasSelectedAux = []
        for (let i = 0; i < this.datosBlogProps.categorias.length; i++) {
          const categoria = this.datosBlogProps.categorias[i]
          categoriasSelectedAux.push({
            uid: informacionSecciones[this.datosBlogProps.seccion].categorias[categoria].uid,
            nombre: informacionSecciones[this.datosBlogProps.seccion].categorias[categoria].nombre,
          })
        }
        this.categoriasSelected = categoriasSelectedAux

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
    reiniciarContenido () {
      this.contenidoBlogAux = this.contenidoBlogProps

      this.cantidadCaracteres = this.cantidadCaracteresHtml(this.contenidoBlogProps)
      if (this.cantidadCaracteres < 50) this.errorContenidoBlog = 'La longitud mínima para un blog es 50.' 
      else this.errorContenidoBlog = ''
    },
    async reiniciarTodo () {
      this.tabs = 'mobile-tabs-5-1'

      await this.reiniciarDatos()
      this.reiniciarContenido()
    },
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
    cantidadCaracteresHtml (html) {
      let soloTexto = html.replace(/(<([^>]+)>)/ig,"")
      soloTexto =  soloTexto.replace(/[\n\r]+/g, '')
      soloTexto = soloTexto.replace(/\s{2,10}/g, ' ')
      soloTexto = soloTexto.trim()

      return soloTexto.length
    }
  },

  watch: {
    contenidoBlogAux: function (n, v) {
      let textoHtml = n

      this.cantidadCaracteres = this.cantidadCaracteresHtml(textoHtml)

      this.errorContenidoBlog = this.cantidadCaracteres < 50 ? 
      'La longitud mínima para un blog es 50.' : ''

    },
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
    this.reiniciarTodo()
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