<template>
    <div>
      
      <ais-instant-search 
        :search-client="searchClient" 
        :index-name="indexName"
      >
          <ais-configure :filters="filtros" :hitsPerPage="5" />

          <v-row no-gutters>

              <!-- FILTROS -->
              <v-col cols="12" md="3">
                  <div class="left-panel">
                      <div class="mt-5">
                          <!-- <ais-clear-refinements /> -->
                          <h2>Secciones</h2>
                          <div class="mt-3">
                            <ais-refinement-list attribute="seccion" searchable :limit="2" show-more>
                              <template
                                v-slot="{
                                  items,
                                  isShowingMore,
                                  isFromSearch,
                                  canToggleShowMore,
                                  refine,
                                  createURL,
                                  toggleShowMore,
                                  searchForItems,
                                  sendEvent,
                                }"
                              >
                                <v-text-field 
                                  class="mb-3 narrow-font set-width" 
                                  label="Secciones" 
                                  @input="searchForItems($event)"
                                ></v-text-field>
                                <!-- <input class="mb-3" @input="searchForItems($event.currentTarget.value)"> -->

                                <div v-if="isFromSearch && !items.length">
                                  No hay resultados.
                                </div>

                                <div v-for="item in items" :key="item.value">
                                  <v-checkbox
                                    v-model="item.isRefined"
                                    color="#683bce"
                                    :label="`${item.value}`"
                                    @click.prevent="refineSeccion(refine, item.value)"
                                  >
                                    <template v-slot:label>
                                      {{ getNombreSeccion(item.label) }}
                                      <v-chip
                                        small
                                        class="ml-3 white--text"
                                        color="#683bce"
                                      >
                                        {{ item.count.toLocaleString() }}
                                      </v-chip>
                                    </template>
                                  </v-checkbox>
                                </div>

                                <v-btn
                                  v-if="canToggleShowMore"
                                  @click="toggleShowMore"
                                  outlined
                                  color="#683bce"
                                >
                                  {{ !isShowingMore ? 'Mostrar más' : 'Mostrar menos'}}
                                </v-btn>

                              </template>
                            </ais-refinement-list>
                          </div>
                      </div>

                      <v-divider width="200px"></v-divider>

                      <div class="mt-5">
                          <h2> Categoría </h2>
                          <div class="mt-3">
                            <ais-refinement-list attribute="categorias" :limit="2" show-more>
                              <template
                                v-slot="{
                                  items,
                                  isShowingMore,
                                  isFromSearch,
                                  canToggleShowMore,
                                  refine,
                                  createURL,
                                  toggleShowMore,
                                  searchForItems,
                                  sendEvent,
                                }"
                              >
                                <v-text-field 
                                  class="mb-3 narrow-font set-width" 
                                  label="Categorías" 
                                  @input="searchForItems($event)"
                                ></v-text-field>

                                <div v-if="isFromSearch && !items.length">
                                  No hay resultados.
                                </div>

                                <div v-for="item in items" :key="item.value">
                                  <v-checkbox
                                    v-model="item.isRefined"
                                    :label="`${item.value}`"
                                    color="#683bce"
                                    @click.prevent="refineCategorias(refine, item.value)"
                                  >
                                    <template v-slot:label>
                                      {{ getNombreCategoria(item.label) }}
                                      <v-chip
                                        small
                                        class="ml-3 white--text"
                                        color="#683bce"
                                      >
                                        {{ item.count.toLocaleString() }}
                                      </v-chip>
                                    </template>
                                  </v-checkbox>
                                </div>

                                <v-btn
                                  v-if="canToggleShowMore"
                                  @click="toggleShowMore"
                                  outlined
                                  small
                                  :color="!isShowingMore ? '#683bce' : '#ff1d89'"
                                >
                                  {{ !isShowingMore ? 'Mostrar más' : 'Mostrar menos'}}
                                </v-btn>
                              </template>
                            </ais-refinement-list>
                          </div>
                      </div>
                  </div>
              </v-col>


              <!-- BUSCADOR -->
              <v-col cols="12" md="9">
                  <div class="right-panel mt-4">
                      <v-btn
                        outlined
                        small
                        @click="drawerFilter = !drawerFilter"
                        :color="!drawerFilter ? '#683bce' : '#ff1d89'"
                        class="drawerFilter mb-3"
                      >
                        Mostrar filtro
                      </v-btn>
                      <ais-search-box>
                        <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                          <v-text-field 
                            outlined 
                            type="search"
                            color="#683bce"
                            :value="currentRefinement"
                            @input="refine($event)"
                            label="Busca un curso aquí" 
                            append-icon="search"
                          ></v-text-field>
                          <span :hidden="!isSearchStalled">Loading...</span>
                        </template>
                      </ais-search-box>
                      
                      <ais-hits :transform-items="transformItems">
                        <div slot-scope="{ items }">
                          <div v-for="(item, index) in items" :key="index" class="card-link mb-5">
                            <article class="blog-card">
                              
                              <!-- Parte: Imagen Curso -->
                              <nuxt-link :to="`/curso/${item.codigo}`">
                                <img 
                                  v-if="item.fotoPerfil"
                                  class="post-image" 
                                  :src="item.fotoPerfil" 
                                />
                                <img 
                                  v-else
                                  class="post-image" 
                                  :src="require(`~/assets/img/portada_seccion/${item.seccion ? item.seccion : 'sin-seccion'}.webp`)" 
                                />
                              </nuxt-link>

                              <!-- Parte: Información -->
                              <div class="article-details">
                                
                                <!-- Parte: Sección -->
                                <h4 class="post-category">
                                  {{ item.seccion ? item.seccion : 'Curso normal' }}
                                </h4>

                                <!-- Parte: Titulo -->
                                <nuxt-link :to="`/curso/${item.codigo}`">
                                  <h3 class="post-title">
                                    {{ item.titulo }}
                                  </h3>
                                </nuxt-link>
                                
                                <!-- Parte: Precios -->
                                <div class="my-4">
                                  <b class="post-description">Precio:</b>

                                  <!-- Gratis -->
                                  <v-chip
                                    v-if="item.datosPrecio.precio === 0"
                                    class=""
                                    color="green"
                                    outlined
                                    style="font-size: 17px;"
                                    small
                                  >
                                    Gratis
                                  </v-chip>

                                  <!-- Pago comun -->
                                  <v-chip
                                    v-else-if="!estaEnDescuento(item.datosPrecio.descuento)"
                                    class=""
                                    color="green"
                                    outlined
                                    style="font-size: 17px;"
                                    small
                                  >
                                    {{ item.datosPrecio.precio }} FP
                                  </v-chip>

                                  <!-- Pago con descuento -->
                                  <v-chip
                                    v-if="estaEnDescuento(item.datosPrecio.descuento)"
                                    class=""
                                    color="green"
                                    outlined
                                    style="font-size: 17px;"
                                    small
                                  >
                                    {{ item.datosPrecio.descuento.precio }} FP
                                  </v-chip>

                                  <!-- Pago con descuento -->
                                  <b 
                                    v-if="estaEnDescuento(item.datosPrecio.descuento)"
                                    class="ml-1 text-decoration-line-through"
                                    style="color: #8E8E8E; font-size: 15px;"
                                  >
                                    {{ item.datosPrecio.precio }} FP
                                  </b>
                                </div>

                                <!-- Parte: Categorias -->
                                <div class="mb-4">
                                  <v-chip
                                    v-for="(categoria, index) in item.categorias" :key="index"
                                    class="mr-1"
                                    color="#ff1d89"
                                    outlined
                                    style="font-size: 17px;"
                                    small
                                  >
                                    {{ getNombreCategoriaPorSeccion(item.seccion, categoria) }}
                                  </v-chip>
                                </div>

                                <v-divider></v-divider>

                                <!-- Parte: Progreso -->
                                <v-progress-circular
                                  v-if="!instructores[item.instructor] || instructores[item.instructor] === 'cargando'"
                                  indeterminate
                                  color="#683bce"
                                  class="mt-3 mb-3"
                                ></v-progress-circular>

                                <!-- Parte: Instructor -->
                                <p class="post-author mt-3" v-else>
                                  <v-avatar
                                    color="#683bce"
                                    size="40"
                                    class=""
                                  >
                                    <v-img v-if="!!instructores[item.instructor].fotoPerfil" :src="instructores[item.instructor].fotoPerfil" />
                                    <span v-else class="white--text headline">
                                      {{ instructores[item.instructor].nombre[0] }}
                                    </span>
                                  </v-avatar>
                                  Por <b> {{ getInstructores[item.instructor].nombre }} </b>
                                </p>

                              </div>

                            </article>
                          </div>
                        </div>
                      </ais-hits>

                      <!-- PAGINATION -->
                      <ais-pagination>
                          <template
                            v-slot="{
                              currentRefinement,
                              nbPages,
                              pages,
                              isFirstPage,
                              isLastPage,
                              refine,
                              createURL
                            }"
                          >
                            <ul>
                              <li v-if="!isFirstPage">
                                  <v-btn
                                    :href="createURL(0)" 
                                    @click.prevent="refine(0)"
                                    small
                                    color="#683bce"
                                    class="white--text"
                                  >
                                    <span class="material-icons">
                                      keyboard_double_arrow_left
                                    </span>
                                  </v-btn>
                              </li>
                              <li v-if="!isFirstPage">
                                <v-btn
                                  :href="createURL(currentRefinement - 1)"
                                  @click.prevent="refine(currentRefinement - 1)"
                                  small
                                  color="#683bce"
                                  class="white--text"
                                >
                                  <span class="material-icons">
                                    keyboard_arrow_left
                                  </span>
                                </v-btn>
                              </li>
                              <li v-for="page in pages" :key="page">
                                <v-btn
                                  :href="createURL(page)"
                                  :style="{ fontWeight: page === currentRefinement ? 'bold' : '' }"
                                  @click.prevent="refine(page)"
                                  small
                                  color="#683bce"
                                  class="white--text"
                                >
                                  {{ page + 1 }}
                                </v-btn>
                              </li>
                              <li v-if="!isLastPage">
                                <v-btn
                                  :href="createURL(currentRefinement + 1)"
                                  @click.prevent="refine(currentRefinement + 1)"
                                  small
                                  color="#683bce"
                                  class="white--text"
                                >
                                  <span class="material-icons">
                                    keyboard_arrow_right
                                  </span>
                                </v-btn>
                              </li>
                              <li v-if="!isLastPage">
                                <v-btn
                                  :href="createURL(nbPages)" 
                                  @click.prevent="refine(nbPages)"
                                  small
                                  color="#683bce"
                                  class="white--text"
                                >
                                  <span class="material-icons">
                                    keyboard_double_arrow_right
                                  </span>
                                </v-btn>
                              </li>
                            </ul>
                          </template>
                      </ais-pagination>


                  </div>
              </v-col>
          </v-row>

          <div class="drawerFilter">
            <v-navigation-drawer
              v-model="drawerFilter"
              app
              temporary
              right
            >
              <div class="ml-3">
                  <div class="mt-5">
                      <!-- <ais-clear-refinements /> -->
                      <h2>Secciones</h2>
                      <div class="mt-3">
                        <ais-refinement-list attribute="seccion" :limit="2" show-more>
                          <template
                            v-slot="{
                              items,
                              isShowingMore,
                              isFromSearch,
                              canToggleShowMore,
                              refine,
                              createURL,
                              toggleShowMore,
                              searchForItems,
                              sendEvent,
                            }"
                          >
                            <v-text-field 
                              class="mb-3 narrow-font set-width" 
                              label="Secciones" 
                              @input="searchForItems($event)"
                            ></v-text-field>

                            <div v-if="isFromSearch && !items.length">
                              No hay resultados.
                            </div>

                            <div v-for="item in items" :key="item.value">
                              <v-checkbox
                                v-model="item.isRefined"
                                color="#683bce"
                                :label="`${item.value}`"
                                @click.prevent="refineSeccion(refine, item.value)"
                              >
                                <template v-slot:label>
                                  {{ getNombreSeccion(item.label) }}
                                  <v-chip
                                    small
                                    class="ml-1 white--text"
                                    color="#683bce"
                                  >
                                    {{ item.count.toLocaleString() }}
                                  </v-chip>
                                </template>
                              </v-checkbox>
                            </div>

                            <v-btn
                              v-if="canToggleShowMore"
                              @click="toggleShowMore"
                              outlined
                              color="#683bce"
                            >
                              {{ !isShowingMore ? 'Mostrar más' : 'Mostrar menos'}}
                            </v-btn>

                          </template>
                        </ais-refinement-list>
                      </div>
                  </div>

                  <v-divider width="200px"></v-divider>

                  <div class="mt-5">
                      <h2> Categoría </h2>
                      <div class="mt-3">
                        <ais-refinement-list attribute="categorias" :limit="2" show-more>
                          <template
                            v-slot="{
                              items,
                              isShowingMore,
                              isFromSearch,
                              canToggleShowMore,
                              refine,
                              createURL,
                              toggleShowMore,
                              searchForItems,
                              sendEvent,
                            }"
                          >
                            
                            <v-text-field 
                              class="mb-3 narrow-font set-width" 
                              label="Categorías" 
                              @input="searchForItems($event)"
                            ></v-text-field>

                            <div v-if="isFromSearch && !items.length">
                              No hay resultados.
                            </div>

                            <div v-for="item in items" :key="item.value">
                              <v-checkbox
                                v-model="item.isRefined"
                                :label="`${item.value}`"
                                color="#683bce"
                                @click.prevent="refineCategorias(refine, item.value)"
                              >
                                <template v-slot:label>
                                  {{ getNombreCategoria(item.label) }}
                                  <v-chip
                                    small
                                    class="ml-1 white--text"
                                    color="#683bce"
                                  >
                                    {{ item.count.toLocaleString() }}
                                  </v-chip>
                                </template>
                              </v-checkbox>
                            </div>

                            <v-btn
                              v-if="canToggleShowMore"
                              @click="toggleShowMore"
                              outlined
                              small
                              :color="!isShowingMore ? '#683bce' : '#ff1d89'"
                            >
                              {{ !isShowingMore ? 'Mostrar más' : 'Mostrar menos'}}
                            </v-btn>
                          </template>
                        </ais-refinement-list>
                      </div>
                  </div>
              </div>
            </v-navigation-drawer>
          </div>
      </ais-instant-search>
    </div>
</template>

<script>
import { 
    AisSearchBox, 
    AisInstantSearch, 
    AisHits, 
    AisConfigure, 
    AisPagination, 
    AisClearRefinements, 
    AisRefinementList 
} from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'
import informacionSecciones from '@/helpers/informacionSecciones'

export default {
    data() {
        return {
            searchClient: algoliasearch(
                'RNRNTDZS3N',
                'af4d4e9d36a7ceb75e258007c3ceccf2'
            ),
            indexName: process.env.NODE_ENV === 'production' ? 'prod_cursos_publicado' : 'dev_cursos_publicado',
            filtros: ``,
            drawerFilter: false,
            informacionSecciones: informacionSecciones,
            instructores: {},
        };
    },
    methods: {
      getNombreSeccion (uid) {
        return this.informacionSecciones[uid].nombre
      },
      getNombreCategoria (uid) {
        const seccionesId = Object.keys(this.informacionSecciones)

        for (const seccionId of seccionesId) {
          if (this.informacionSecciones[seccionId].categorias[uid]) 
            return this.informacionSecciones[seccionId].categorias[uid].nombre
        }
      },
      getNombreCategoriaPorSeccion (seccion, uid) {
        return this.informacionSecciones[seccion].categorias[uid].nombre
      },
      refineSeccion(refine, value) {
        refine(value)
      },
      refineCategorias(refine, value) {
        refine(value)
      },
      fechaActual (segundos) {
        return (new Date( (segundos*1000) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      },
      getDescuento (precio, descuento) {
        let descuentoNumero = Number( (precio * (1 - descuento.porcentaje)).toFixed() )
        return descuentoNumero
      },
      estaEnDescuento (descuento) {
        if (!descuento) return false

        const currentSecond = Date.now() / 1000
        return currentSecond >= descuento.fechaInicio && currentSecond < descuento.fechaFin
      },


      transformItems (items) {
        this.setDataInstructor(items)
        
        return items
      },
      async setDataInstructor (items) {
        for (const item of items) {
          if (!this.instructores[item.instructor]) {

            const target = JSON.parse( JSON.stringify( this.instructores ) )
            const source = {}
            source[item.instructor] = 'cargando'
            
            this.instructores = Object.assign(target, source)

            let token = this.$firebase.auth().currentUser
            token = token ? await token.getIdToken() : ''
            await this.$store.dispatch('modules/usuarios/setTOKEN', token)

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${item.instructor}`, config)
            .then(respuesta => {
              const target1 = JSON.parse( JSON.stringify( this.instructores ) )
              const source1 = {}
              source1[item.instructor] = {
                nombre: respuesta.resultado.displayName,
                fotoPerfil: respuesta.resultado.photoURL,
              }

              this.instructores = Object.assign(target1, source1)
            })

          }
        }
      }
    },
    props: {

    },
    computed: {
      getInstructores () {
        return this.instructores
      }
    },
    watch: {

    },
    components: {
        'ais-instant-search': AisInstantSearch,
        'ais-search-box': AisSearchBox,
        'ais-hits': AisHits,
        'ais-configure': AisConfigure,
        'ais-pagination': AisPagination,
        'ais-clear-refinements': AisClearRefinements,
        'ais-refinement-list': AisRefinementList,
    },
    created() {
      this.filtros = `publicado: ${true} AND habilitado: ${true}`
    },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

$bg: #eedfcc;
$text: #777;
$black: #121212;
$white: #fff;
$red: #683bce;
$border: #ebebeb;
$shadow: rgba(0, 0, 0, 0.2);

@mixin transition($args...) {
  transition: $args;
}

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}

body {
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: $text;
  background: $bg;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

#container {
  width: 30rem;
  height: 13.625rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: $white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  &:hover .post-title {
    @include transition(color 0.3s ease);
    color: $red;
  }
  &:hover .post-image {
    @include transition(opacity 0.3s ease);
    opacity: 0.9;
  }
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
	object-fit: cover;
}

.article-details {
  padding: .9rem .9rem 0 .9rem;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid $border;
}

.post-title {
  @include transition(color 0.3s ease);
  font-size: 1.125rem;
  line-height: 1.4;
  color: $black;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  cursor: pointer;
}

.post-description {
  
}

.post-author {
  font-size: 0.81rem;
  line-height: 0.6;
}

@media (max-width: 40rem) {
  #container {
    width: 18rem;
    height: 27.25rem;
  }
  
  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }
  
  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .post-image {
    height: 100%;
  }
  
  .blog-card {
    display: grid;
    grid-template-columns: 2.0fr 1.9fr;
    grid-template-rows: 0.5fr;
  }
  
  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>

<style scoped>
body {
  font-family: sans-serif;
  padding: 1em;
}

.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}

.drawerFilter {
  display: none;
}

@media (max-width: 959px) {
  .left-panel {
    display: none;
  }

  .drawerFilter {
    display: flex;
  }
}

.narrow-font {
  font-family: 'Open Sans Condensed', sans-serif;
}
.set-width {
  width: 200px;
}

ol {
  list-style-type: none !important;
}

a {
  text-decoration: none;
}

ul {    
  display: inline-block;
  font-family: Arial, Verdana;
  font-size: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
}

ul li {
  display: block;
  position: relative;
  float: left;
  text-align: center;
  margin-left: 20px;
}

li ul {
  display: none;
}
</style>