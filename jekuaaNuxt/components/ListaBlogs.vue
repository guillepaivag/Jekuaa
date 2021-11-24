<template>
  <div class="newMovies mt-10 mb-10">
    <div class="">
      
      <client-only>
        <ListaCategorias 
          :seccion="seccion" 
          @categoriaSeleccionada="categoria = $event" 
        />

        <!-- <div v-observe-visibility="obtenerMasCategorias"> -->
        <div v-show="mostrarCarga" id="loadingMovie">
          <Spinner />
        </div>
        
        <div class="custom-carousel" v-if="!mostrarCarga && categoria.uid && listaDatosBlogs.length">
          <VueSlickCarousel v-bind="settings">
            <div
              class="movieDiv"
              v-for="(dato, index) in listaDatosBlogs" 
              :key="index + Date.now()"
            >
              <v-card
                class="mx-auto imagemPosterSlide"
                color="#683bce"
                dark
                max-width="400"
                @click="mostrarDatosBlog(index)"
              >
                <v-card-title>
                  <span class="text-h6 ml-1 font-weight-light">Jekuaa</span>
                </v-card-title>

                <v-card-text class="text-h5 font-weight titulo">
                  {{dato.blog.titulo}}
                </v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="#ffffff">
                      <v-img
                        v-if="!!dato.publicador.fotoPerfil"
                        class="elevation-6"
                        alt=""
                        :src="dato.publicador.fotoPerfil"
                      ></v-img>
                      <span v-else class="headline inicialNombreUsuario">
                        {{ inicialNombreUsuario(dato.publicador.nombreUsuario) }}
                      </span>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{dato.publicador.nombreUsuario}}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-row
                      class="mr-0"
                      align="center"
                      justify="end"
                    >
                      <v-icon class="mr-1">
                        mdi-heart
                      </v-icon>
                      <span class="subheading mr-2">
                        {{dato.blog.cantidadMeGusta}}
                      </span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </div>
            <template #prevArrow="arrowOption">
              <div class="custom-arrow arrow-prev">
                <v-icon
                  color="#683bce"
                  class="only-arrow"
                  right
                  dark
                >
                  mdi-skip-backward
                </v-icon>
              </div>
            </template>
            <template #nextArrow="arrowOption">
              <div class="custom-arrow arrow-next">
                <v-icon
                  color="#683bce"
                  class="only-arrow"
                  right
                  dark
                >
                  mdi-skip-forward
                </v-icon>
              </div>
            </template>
          </VueSlickCarousel>
        </div>

        <v-dialog
          v-model="dialogDatosBlog"
          max-width="800px"
        >
          <v-card v-if="datosBlog">
            <v-img
              :src="datosBlog.imgBlog"
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
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
      settings: {
        infinite: false,
        arrows: true,
        slidesPerRow: 5,
        speed: 1000,
        responsive: [
          {
            breakpoint: 1930,
            settings: {
              slidesPerRow: 4,
            }
          },
          {
            breakpoint: 1550,
            settings: {
              slidesPerRow: 3,
            }
          },
          {
            breakpoint: 1180,
            settings: {
              slidesPerRow: 2,
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesPerRow: 1,
            }
          }
        ]
      }
    };
  },
  props: {
    seccion: Object,
  },
  components: {
    Spinner,
    VueSlickCarousel,
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
      if (nuevo.uid === viejo.uid) {
        return
      }

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
        
        let response = await this.$axios.post('/blog/estudiante/listaBlogsPorMG', body, config)
        const listaDatosBlogs = response.data.resultado

        this.listaDatosBlogs = []
        listaDatosBlogs.length ? this.listaDatosBlogs = listaDatosBlogs : ''

      } catch (error) {
        console.error(error)
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
      } finally {
        this.mostrarCarga = false
      }
    }
  },
  async mounted() {
    
  },
};
</script>


<style scoped>
.slick-list {
  width: 97%;
}

/* .slide {
  width: 90%;
  height: 100%;
  margin: auto;
} */
.slick-disabled {
  display: none;
}

.custom-arrow {
  background: #ffffff;
  opacity: 0.0;
  height: 100%;
  padding-right: 60px;
  width: 50px;
  z-index: 1;
  transition: 500ms;
}

.custom-arrow:hover {
  background: #ffffff;
  opacity: 1;
  height: 100%;
  width: 50px;
}

.only-arrow {
  font-size: 5px;
  z-index: 6;
  transition: 500ms;
}

.custom-arrow:hover > .only-arrow {
  font-size: 35px;
  display: block;
  color: #683bce;
  margin-top: 115px;
  z-index: 6;
  opacity: 1;
  transition: 500ms;
}

.link-detalle {
  text-decoration: none;
  font-style: oblique;
  color: #683bce !important;
}

.titulo {
  color: #ffffff !important;
}

.arrow-prev {
  margin-left: 25px;
}

.arrow-next {
  margin-right: 25px;
}

/* .custom-arrow .arrow-next .slick-arrow .slick-next.no-before::before {
  content: none;
} */

.custom-arrow::before {
  content: none;
}

/* .slide .slick-slider .slick-arrow {
  z-index: -1;
} */

.newMovies {
  width: 100%;
  height: 100%;
  /* text-align: center; */
  margin: auto;
}
/* #buttonNexts {
  color: #f1f;
} */
.newMovies h1 {
  color: #683bce;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.custom-carousel {
  width: 100%;
}

#loadingMovie {
  display: flex;
  justify-content: center;
  align-items: center;
}
.movieDiv {
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  flex: 1;
}
.imagemPosterSlide {
  border-radius: 15px;
  transition: 0.5s;
  height: 200px;
  margin-bottom: 20px;
  width: 380px;
}

.imagemPosterSlide:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.inicialNombreUsuario {
  color: #683bce !important;
}

.VueCarousel-navigation-button[data-v-453ad8cd] {
  /* color: #e9e9e9 !important; */
  outline: none !important;
}

@media only screen and (max-width: 2140px) {
  .imagemPosterSlide {
    width: 340px;
  }
}


@media only screen and (max-width: 1850px) {
  .custom-arrow {
    width: 20px;
  }
  .custom-arrow:hover {
    background: #ffffff;
    opacity: 1;
    height: 100%;
    width: 20px;
  }
}

@media only screen and (max-width: 800px) {
  .imagemPosterSlide {
    width: 100%;
  }
}

@media only screen and (max-width: 599px) {
  .newMovies h1 {
    font-size: 15px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
</style>