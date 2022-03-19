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
          v-if="accion !== 'leer'"
        >
          <v-icon left>
            mdi-book-open-page-variant
          </v-icon>
          Contenido del blog
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-3"
          v-if="accion === 'leer'"
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
                    v-if="accion === 'leer'"
                    :readonly="accion === 'leer'"
                    class="mt-1"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.referencia"
                    :error-messages="referenciaErr"
                    :counter="100"
                    label="Referencia"
                    required
                    :readonly="accion === 'leer'"
                    @input="$v.datosBlogAux.referencia.$touch()"
                    @blur="$v.datosBlogAux.referencia.$touch()"
                    :class="accion === 'leer' ? 'mt-7' : 'mt-1'"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.titulo"
                    :error-messages="tituloErr"
                    :counter="100"
                    label="Titulo"
                    required
                    :readonly="accion === 'leer'"
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
                    :readonly="accion === 'leer'"
                    @input="$v.datosBlogAux.descripcion.$touch()"
                    @blur="$v.datosBlogAux.descripcion.$touch()"
                    class="mt-7"
                  ></v-textarea>

                  <v-text-field
                    v-model="datosBlogAux.publicador"
                    label="Id del publicador"
                    v-if="accion === 'leer'"
                    :readonly="accion === 'leer'"
                    class="mt-7"
                  ></v-text-field>

                  <v-text-field
                    v-model="datosBlogAux.cantidadMeGusta"
                    label="Cantidad de me gusta"
                    v-if="accion === 'leer'"
                    :readonly="accion === 'leer'"
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
                    item-text="nombre"
                    item-value="uid"
                    label="Seleccionar una sección"
                    persistent-hint
                    return-object
                    single-line
                    :readonly="accion === 'leer'"
                    class="mt-1"
                  ></v-select>

                  <v-select
                    v-model="categoriaSelected"
                    :hint="`${categoriaSelected.nombre ? `Categoría: ${categoriaSelected.nombre}` : 'No se seleccionó nada'}`"
                    :items="listaCategorias"
                    :disabled="!listaCategorias.length"
                    item-text="nombre"
                    item-value="uid"
                    label="Seleccionar una categoria"
                    persistent-hint
                    return-object
                    single-line
                    :readonly="accion === 'leer'"
                    class="mt-7"
                  ></v-select>

                  <v-select
                    v-model="subCategoriasSelected"
                    :hint="`${subCategoriasSelected.length ? `Se seleccionó ${subCategoriasSelected.length} sub-categorias.` : 'No se seleccionó nada.'}`"
                    :items="listaSubCategorias"
                    :disabled="!listaSubCategorias.length"
                    item-text="nombre"
                    item-value="uid"
                    label="Seleccionar una sub-categoria"
                    persistent-hint
                    return-object
                    single-line
                    :readonly="accion === 'leer'"
                    attach
                    chips
                    multiple
                    class="mt-7"
                  ></v-select>

                  <v-checkbox
                    v-model="datosBlogAux.habilitado"
                    value
                    v-if="accion === 'leer'"
                    :readonly="accion === 'leer'"
                    color="#683bce"
                    :label="`Estado de habilitación (puedes cambiarlo luego)`"
                    class="mt-7"
                  ></v-checkbox>

                  <v-checkbox
                    v-model="datosBlogAux.publicado"
                    value
                    :readonly="accion === 'leer'"
                    color="#683bce"
                    :label="`Estado publicado (puedes cambiarlo luego)`"
                    class="mt-7"
                  ></v-checkbox>

                  <v-checkbox
                    v-model="datosBlogAux.revision"
                    value
                    v-if="accion === 'leer'"
                    :readonly="accion === 'leer'"
                    color="#683bce"
                    :label="`Estado de revisión`"
                    class="mt-7"
                  ></v-checkbox>

                  <div class="mt-5" v-if="accion === 'leer'">
                    Fecha de creación:
                    <v-date-picker 
                      v-model="datosBlogAux.fechaCreacion"
                      no-title
                      full-width
                      :readonly="accion === 'leer'"
                    ></v-date-picker>
                  </div>

                  <div class="mt-5" v-if="accion === 'leer'">
                    Fecha de actualización:
                    <v-date-picker 
                      v-model="datosBlogAux.fechaActualizacion"
                      no-title
                      full-width
                      :readonly="accion === 'leer'"
                    ></v-date-picker>
                  </div>
                  
                </v-col>  
              </v-row>
            </v-card>
          </v-tab-item>








          <!-- CONTENIDO DEL BLOG -->
          <v-tab-item
            :value="'mobile-tabs-5-2'"
            v-if="tabs === 'mobile-tabs-5-2' && accion !== 'leer'"
          >
            <v-card flat>
              <section>
                
                <div class="mt-10 mb-5">
                  <h2> Editor del contenido del blog </h2>
                  <v-divider></v-divider>
                  <Tiptap class="mt-5" v-model="contenidoBlogHTML" />
                  <p class="mt-3 mb-2">
                    Cantidad de carácteres: <strong>{{cantidadCaracteres}}</strong>
                  </p>
                  <p style="color:red;" v-if="errorContenidoBlog">
                    {{errorContenidoBlog}}
                  </p>
                </div>

                <div class="mt-10 mb-5">
                  <h2> Vista del contenido del blog </h2>
                  <v-divider></v-divider>
                  <div class="">
                    <visualizador-blog :contenidoBlog="contenidoBlogHTML" />
                  </div>
                </div>

                <v-divider class="mt-10 mb-5"></v-divider>

              </section>
            </v-card>
          </v-tab-item>










          
          <!-- VISUALIZADOR DEL BLOG -->
          <v-tab-item
            :value="'mobile-tabs-5-3'"
            v-if="tabs === 'mobile-tabs-5-3' && accion === 'leer'"
          >
            <v-card flat>
              <section>

                <div class="mt-15 mb-5">
                  <h2> Vista del contenido del blog </h2>
                  <v-divider></v-divider>
                  <div class="">
                    <visualizador-blog :contenidoBlog="contenidoBlogHTML" />
                  </div>
                </div>

              </section>
            </v-card>
          </v-tab-item>
        </v-tabs-items>












        <div class="text-center contenedor_botonesDeAcciones mt-10" v-if="accion !== 'leer'">
          <div class="botonesDeAcciones">
            <v-btn 
              block
              outlined
              class="mb-5"
              color="#683bce"
              v-on:click="enviarDatos"
              :disabled="$v.$anyError"
            >
              {{ accion === 'crear' ? 'Crear blog' : 'Actualizar blog' }}
            </v-btn>
            
            <v-btn 
              block
              outlined
              class="mt-0"
              color="#ff1d89"
              v-on:click="reiniciar"
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
import TurndownService from 'turndown'

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
      categoria: { required },
      subCategorias: {
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
    accion: String,
    datosBlog: Object,
    contenidoBlog: String,
  },

  data() {
    return {
      datosBlogAux: {
        referencia: '',       // requerido
        titulo: '',           // requerido
        descripcion: '',      // requerido
        publicador: '',       // requerido
        seccion: '',          // requerido
        categoria: '',        // requerido
        subCategorias: [],    // requerido
        publicado: true,      // opcional
      },
      contenidoBlogHTML: '',
      tabs: 'mobile-tabs-5-1',
      informacionSecciones: informacionSecciones,
      listaSecciones: [],
      listaCategorias: [],
      listaSubCategorias: [],
      seccionSelected: {
        uid: '', 
        nombre: 'Blog normal'
      },
      categoriaSelected: {
        uid: '', 
        nombre: ''
      },
      subCategoriasSelected: [],
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
    // contenidoHtml: {
    //   // getter
    //   get: function () {
    //     return this.contenidoBlogHTML
    //   },
    //   // setter
    //   set: function (html) {
    //     this.contenidoBlogHTML = html
    //   }
    // },
  },
  
  methods: {
    filtroDeDatosActualizados () {
      let datosBlog = {}
      let contenidoBlog = {}

      if (this.datosBlogAux.referencia !== this.datosBlog.referencia) {
        datosBlog.referencia = this.datosBlogAux.referencia
      }

      if (this.datosBlogAux.titulo !== this.datosBlog.titulo) {
        datosBlog.titulo = this.datosBlogAux.titulo
      }

      if (this.datosBlogAux.descripcion !== this.datosBlog.descripcion) {
        datosBlog.descripcion = this.datosBlogAux.descripcion
      }

      if (this.datosBlogAux.seccion !== this.datosBlog.seccion) {
        datosBlog.seccion = this.datosBlogAux.seccion
      }

      if (this.datosBlogAux.categoria !== this.datosBlog.categoria) {
        datosBlog.categoria = this.datosBlogAux.categoria
      }

      if (this.datosBlogAux.subCategorias.length !== this.datosBlog.subCategorias.length) {
        datosBlog.subCategorias = this.datosBlogAux.subCategorias
      } else {
        let cambio = false
        for (let i = 0; i < this.datosBlogAux.subCategorias.length; i++) {
          const newElement = this.datosBlogAux.subCategorias[i]
          cambio = !this.datosBlog.subCategorias.includes(newElement)
          if (cambio) {
            datosBlog.subCategorias = this.datosBlogAux.subCategorias
            break
          }
        }
      }

      if (this.datosBlogAux.publicado !== this.datosBlog.publicado) {
        datosBlog.publicado = this.datosBlogAux.publicado
      }

      if (this.contenidoBlogHTML !== this.contenidoBlog) {
        contenidoBlog = this.contenidoBlogHTML
      }

      return {
        datosBlog,
        contenidoBlog,
      }
    },
    enviarDatos () {
      if (this.accion === 'actualizar') {
        const actualizados = {
          uidBlog: this.datosBlog.uid,
          ...this.filtroDeDatosActualizados()
        }
        this.$emit('actualizarBlog', actualizados)
        return
      }

      this.$emit('crearBlog', {
        datosBlog: this.datosBlogAux,
        contenidoBlog: this.contenidoBlogHTML,
      })
    },
    async reiniciar () {
      this.tabs = 'mobile-tabs-5-1'

      this.datosBlogAux = {
        referencia: '',                                       // requerido
        titulo: '',                                           // requerido
        descripcion: '',                                      // requerido
        publicador: this.$store.state.modules.usuarios.uid,   // requerido
        seccion: '',                                          // requerido
        categoria: '',                                        // requerido
        subCategorias: [],                                    // requerido
        publicado: true,                                      // opcional
      }
      this.contenidoBlogHTML = ''
      
      this.listaSecciones = []
      this.listaCategorias = []
      this.listaSubCategorias = []

      this.seccionSelected = {
        uid: '', 
        nombre: 'Blog normal'
      }
      this.categoriaSelected = {
        uid: '', 
        nombre: ''
      }
      this.subCategoriasSelected = []

      this.cantidadCaracteres = 0
      this.errorContenidoBlog = 'La longitud mínima para un blog es 50.'

      await this.$nextTick()

      this.setListaSecciones()

      if (this.accion === 'actualizar' || this.accion === 'leer') {
        this.datosBlogAux = JSON.parse(JSON.stringify(this.datosBlog))
        this.contenidoBlogHTML = this.contenidoBlog

        if (this.accion === 'leer') {
          let fechaC = new Date(this.datosBlogAux.fechaCreacion.seconds * 1000)
          let fechaA = new Date(this.datosBlogAux.fechaActualizacion.seconds * 1000)
          this.datosBlogAux.fechaCreacion = (new Date(fechaC.getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          this.datosBlogAux.fechaActualizacion = (new Date(fechaA.getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }

        if (this.datosBlog.seccion) {
          this.seccionSelected = {
            uid: this.informacionSecciones[this.datosBlog.seccion].uid,
            nombre: this.informacionSecciones[this.datosBlog.seccion].nombre,
          }
          await this.$nextTick()
          
          this.categoriaSelected = {
            uid: this.informacionSecciones[this.datosBlog.seccion].categorias[this.datosBlog.categoria].uid,
            nombre: this.informacionSecciones[this.datosBlog.seccion].categorias[this.datosBlog.categoria].nombre,
          }
          await this.$nextTick()

          for (let i = 0; i < this.datosBlog.subCategorias.length; i++) {
            const element = this.datosBlog.subCategorias[i]
            this.subCategoriasSelected.push({
              uid: this.informacionSecciones[this.datosBlog.seccion].categorias[this.datosBlog.categoria].subCategorias[element].uid,
              nombre: this.informacionSecciones[this.datosBlog.seccion].categorias[this.datosBlog.categoria].subCategorias[element].nombre,
            })
          }
        }

        this.cantidadCaracteres = this.cantidadCaracteresHtml(this.contenidoBlog)
        this.errorContenidoBlog = ''
      }

    },
    setListaSecciones () {
      let arr = Object.keys(this.informacionSecciones)
      this.listaSecciones.push({
        uid: '',
        nombre: 'Blog normal'
      })  
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        this.listaSecciones.push({
          uid: this.informacionSecciones[element].uid,
          nombre: this.informacionSecciones[element].nombre,
        })  
      }

    },
    setListaCategorias (idSeccion) {
      let arr = Object.keys(this.informacionSecciones[idSeccion].categorias)
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        this.listaCategorias.push({
          uid: this.informacionSecciones[idSeccion].categorias[element].uid,
          nombre: this.informacionSecciones[idSeccion].categorias[element].nombre,
        })
      }
    },
    setListaSubCategorias (idSeccion, idCategoria) {
      let arr = Object.keys(this.informacionSecciones[idSeccion].categorias[idCategoria].subCategorias)
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        this.listaSubCategorias.push({
          uid: this.informacionSecciones[idSeccion].categorias[idCategoria].subCategorias[element].uid,
          nombre: this.informacionSecciones[idSeccion].categorias[idCategoria].subCategorias[element].nombre,
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
    contenidoBlogHTML: function (n, v) {
      let textoHtml = n

      this.cantidadCaracteres = this.cantidadCaracteresHtml(textoHtml)

      if (this.cantidadCaracteres < 50) {
        this.errorContenidoBlog = 'La longitud mínima para un blog es 50.'
      } else {
        this.errorContenidoBlog = ''
      }
    },
    seccionSelected: function (n, v) {
      if (n.uid == v.uid) return
      
      this.datosBlogAux.seccion = n.uid

      this.categoriaSelected = {
        uid: '', 
        nombre: ''
      }
      this.listaCategorias = []
      
      this.subCategoriasSelected = []
      this.listaSubCategorias = []

      n.uid ? this.setListaCategorias(n.uid) : ''
    },
    categoriaSelected: function (n, v) {
      if (n.uid === v.uid) return
      if (!this.seccionSelected.uid) return

      this.datosBlogAux.categoria = n.uid

      this.subCategoriasSelected = []
      this.listaSubCategorias = []

      this.seccionSelected.uid && n.uid ? this.setListaSubCategorias(this.seccionSelected.uid, n.uid) : ''
    },
    subCategoriasSelected: function (n, v) {
      if (n.length === v.length) return
      if (!this.seccionSelected.uid) return

      this.datosBlogAux.subCategorias = []
      for (let i = 0; i < n.length; i++) {
        const element = n[i]
        this.datosBlogAux.subCategorias.push(element.uid) 
      }
    },
  },

  async created() {
    await this.reiniciar()
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