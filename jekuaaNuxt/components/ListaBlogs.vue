<template>
  <div class="newMovies mt-10 mb-10">
    <div class="">
      
      <client-only>
        <ListaCategorias 
          :seccion="seccion" 
          @categoriaSeleccionada="categoria = $event" 
        />
        
        <div class="mt-5 mb-5" v-show="mostrarCarga" id="loadingMovie">
          <Spinner />
        </div>
        
        <div class="custom-carousel mt-5 mb-5" v-if="!mostrarCarga && categoria.uid && listaDatosBlogs.length">
          <!-- {{listaDatosBlogs}} -->
          <v-carousel hide-delimiters height="auto">
            <v-carousel-item
              v-for="(dato,i) in listaDatosBlogs"
              :key="i"
            >
              <v-card
                class="carta-blog mx-auto mt-5 mb-5"
                max-width="700"
              >
                <v-card-text>
                  <div>Jekuaapy blog</div>
                  <div class="mb-3 mt-2">
                    <nuxt-link :to="`/blog/${dato.blog.referencia}`">
                      <b class="text-h4 text--primary">
                        {{dato.blog.titulo}}
                      </b>
                    </nuxt-link>
                  </div>
                  <div class="text--primary">
                    {{dato.blog.descripcion}}
                  </div>

                  <div class="mt-3" v-if="dato.publicador.nombreUsuario">
                    <nuxt-link :to="`/estudiante/${dato.publicador.nombreUsuario}`">
                      <v-avatar color="#ffffff">
                        <v-img
                          v-if="!!dato.publicador.fotoPerfil"
                          class="elevation-6"
                          alt=""
                          :src="dato.publicador.fotoPerfil"
                        ></v-img>
                        <span v-else class="headline inicialNombreUsuario">
                          {{ inicialNombreUsuario(dato.publicador.nombreUsuario) }}
                        </span>
                      </v-avatar>

                      <b class="ml-3">
                        {{dato.publicador.nombreUsuario}} 
                      </b>
                    </nuxt-link>
                  </div>
                  <span v-else class="headline inicialNombreUsuario">
                    ...
                  </span>

                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="#ff1d89"
                    v-on:click="mostrarDatosBlog(i)"
                  >
                    Ver información
                  </v-btn>

                  <v-btn
                    text
                    color="#683bce"
                    :to="`/blog/${dato.blog.referencia}`" 
                  >
                    Ver blog
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
          
        </div>

        <v-dialog
          v-model="dialogDatosBlog"
          max-width="800px"
        >
          <v-card v-if="datosBlog">
            <v-img
              :src="require(`~/assets/img/seccion/${datosBlog.blog.seccion ? datosBlog.blog.seccion : 'sinSeccion'}.webp`)"
              height="200px"
              class="white--text"
            >
              <v-card-title>
                <span>
                  {{ datosBlog.blog.titulo }}
                </span>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  color="white"
                  v-on:click="dialogDatosBlog = false"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card-title>
            </v-img>

            <v-card-title>
              {{datosBlog.blog.titulo}}
            </v-card-title>

            <v-card-subtitle>
              {{ datosBlog.blog.cantidadMeGusta }} me gusta
            </v-card-subtitle>

            <v-card-text>
              <div class="">
                <v-row
                  class="mb-6"
                  no-gutters
                >
                  <v-col
                    lg="8"
                    md="8"
                  >
                    <div class="mt-4 pb-3">
                      {{datosBlog.blog.descripcion}}
                    </div>
                    <v-divider></v-divider>
                    <div class="mt-5" style="display: block;">
                      <b>Fecha creación: </b> {{ timeAgo( datosBlog.blog.fechaCreacion ) }}
                    </div>
                    <div style="display: block;">
                      <b>Fecha actualización: </b> {{ timeAgo( datosBlog.blog.fechaActualizacion ) }}
                    </div>
                  </v-col>
                  <v-col>
                    <div
                    >
                      <v-card-text>
                        Sección: <nuxt-link class="link-detalle" :to="`/blogs/${seccion.uid}`"> {{ seccion.nombre }} </nuxt-link>
                      </v-card-text>
                      <v-card-text>
                        Categoria: <nuxt-link class="link-detalle" :to="`/blogs/${seccion.uid}/${categoria.uid}`"> {{ categoria.nombre }} </nuxt-link>
                      </v-card-text>
                      <v-card-text>
                        Sub-categorias: <div style="display: inline;" v-for="(subCategoria, index) in datosBlog.blog.subCategorias" :key="index">
                          <nuxt-link class="link-detalle" :to="`/blogs/${seccion.uid}/${categoria.uid}/${subCategoria}`" v-if="index < datosBlog.blog.subCategorias.length - 1">
                            {{ subCategoria }}, 
                          </nuxt-link>
                          <nuxt-link class="link-detalle" :to="`/blogs/${seccion.uid}/${categoria.uid}/${subCategoria}`" v-else>
                            {{ subCategoria }}
                          </nuxt-link>
                        </div>
                      </v-card-text>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="#683bce"
                text
                :to="`/blog/${datosBlog.blog.referencia}`"
              >
                Ver blog
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>

      </client-only>
    </div>
  </div>
</template>

<script>
import ListaCategorias from '@/components/ListaCategorias'
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'
TimeAgo.addLocale(es)
TimeAgo.setDefaultLocale('es')

import Spinner from './Spinner'

export default {
  name: 'ListaBlogs',
  data() {
    return {
      listaDatosBlogs: [],
      mostrarCarga: true,
      paginationButtons: false,
      cantidadBlogs: 5,
      categoria: {
        uid: '',
        nombre: '',
      },
      dialogDatosBlog: false,
      datosBlog: null,
    };
  },
  props: {
    seccion: Object,
  },
  components: {
    Spinner,
    ListaCategorias,
  },
  methods: {
    mostrarDatosBlog (index) {
      this.dialogDatosBlog = true

      this.datosBlog = this.listaDatosBlogs[index]
    },
    timeAgo ( timestamp ) {
      const ta = new TimeAgo('es-ES')
      const taResult = ta.format(timestamp._seconds * 1000)
      return taResult
    },
    inicialNombreUsuario (nombreUsuario) {
      return nombreUsuario ? nombreUsuario[0].toUpperCase() : ''
    },
  },
  computed: {
    listarSubCategorias: function () {
      const subCategorias = this.datosBlog.blog.subCategorias
      let lista = ''
      for (let i = 0; i < subCategorias.length; i++) {
        const element = subCategorias[i]
        lista += `${element}`
        if (i < subCategorias.length - 1) {
          lista += `, `
        }
      }

      return lista
    },
  },
  watch: {
    dialogDatosBlog: function (nuevo, viejo) {
      if (!nuevo) {
        this.datosBlog = null
      }
    },
    categoria: async function (nuevo, viejo) {
      if (nuevo.uid === viejo.uid) return

      try {
        this.mostrarCarga = true

        let body = {
          seccion: this.seccion.uid,
          categoria: this.categoria.uid,
          cantidad: this.cantidadBlogs
        }

        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        
        let response = await this.$axios.post('/blog/blogsSeccionCategoriaPorMG', body, config)
        const listaDatosBlogs = response.data.resultado

        let listaAux = []
        for (let i = 0; i < listaDatosBlogs.length; i++) {
          const datosBlog = listaDatosBlogs[i]
          listaAux.push({
            blog: datosBlog,
            publicador: {
              fotoPerfil: '',
              nombreUsuario: '',
            }
          })
        }
        this.listaDatosBlogs = listaAux

      } catch (error) {
        console.error(error)
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
      } finally {
        this.mostrarCarga = false
      }
    },
    listaDatosBlogs: async function (n, v) {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
      for (let i = 0; i < n.length; i++) {
        const infoBlog = n[i]
        const response = await this.$axios.get(`/usuario/datosAuthentication/uid/${infoBlog.blog.publicador}`, config)
        this.listaDatosBlogs[i].publicador.nombreUsuario = response.data.resultado.displayName
        this.listaDatosBlogs[i].publicador.fotoPerfil = response.data.resultado.photoURL
      }

    }
  },
  async mounted() {
    
  },
};
</script>


<style scoped>
a {
  text-decoration: none;
  color: #383838;
}

.link-detalle {
  text-decoration: none;
  font-style: oblique;
  color: #683bce !important;
}

#loadingMovie {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 850px) { 
  .carta-blog {
    width: 400px !important;
  }
}

@media (max-width: 490px) { 
  .carta-blog {
    width: 300px !important;
  }
}
</style>