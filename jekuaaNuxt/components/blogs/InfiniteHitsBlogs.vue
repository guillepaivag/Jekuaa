<template>
    <div class="contenedor" v-if="state">
        <v-card
            class="item-blog"
            v-for="hit in state.hits" :key="hit.objectID"
        >
            <v-card-text>
                <div>
                    Jekuaapy blog
                </div>

                <p class="text-h4 titulo mt-3">
                    <nuxt-link style="color: #683bce;" :to="`/blog/${hit.referencia}`">
                        {{hit.titulo}}
                    </nuxt-link>
                </p>
                
                <p v-if="hit.seccion">
                    <nuxt-link style="color: #777777;" :to="`/blogs/${hit.seccion}`">
                        {{ mostrarNombre('seccion', {seccion: hit.seccion}) }}
                    </nuxt-link>
                    /
                    <nuxt-link style="color: #777777;" :to="`/blogs/${hit.seccion}/${hit.categoria}`">
                        {{ mostrarNombre('categoria', {seccion: hit.seccion, categoria: hit.categoria}) }}
                    </nuxt-link>
                </p>
                <p v-if="hit.seccion">
                    <v-chip
                        class="mr-2 pl-4 pr-4"
                        color="#683bce"
                        text-color="white"
                        :to="`/blogs/${hit.seccion}/${hit.categoria}/${subCategoria}`"
                        v-for="(subCategoria, index) in hit.subCategorias" :key="index"
                    >
                        <v-icon left>
                            mdi-book-open
                        </v-icon>
                        {{ mostrarNombre('subCategoria', {seccion: hit.seccion, categoria: hit.categoria, subCategoria}) }}
                    </v-chip>
                </p>
                <p v-else>
                    Blog normal
                </p>
                <div class="text--primary">
                    {{hit.descripcion}}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    color="#683bce"
                    :to="`/blog/${hit.referencia}`"
                >
                    Ver blog
                </v-btn>
            </v-card-actions>
        </v-card>
        
        <div v-observe-visibility="visibilityChanged" ></div>
    </div>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch'
import { connectInfiniteHits } from 'instantsearch.js/es/connectors'
import { ObserveVisibility } from 'vue-observe-visibility'
import informacionSecciones from '@/helpers/informacionSecciones'

export default {
    data() {
        return {
            informacionSecciones: informacionSecciones,
        }
    },
    mixins: [
        createWidgetMixin({ connector: connectInfiniteHits })
    ],
    directives: {
        ObserveVisibility
    },
    methods: {
        visibilityChanged(isVisible) {
            if (isVisible && !this.state.isLastPage) {
                this.state.showMore()
            }
        },
        mostrarNombre(tipo, opciones) {
            let nombre 
            if (tipo === 'seccion') {
                nombre = this.informacionSecciones[opciones.seccion].nombre
            } else if (tipo === 'categoria') {
                nombre = this.informacionSecciones[opciones.seccion].categorias[opciones.categoria].nombre
            } else {
                nombre = this.informacionSecciones[opciones.seccion].categorias[opciones.categoria].subCategorias[opciones.subCategoria].nombre
            }

            return nombre
        },
    },
};
</script>

<style scoped>
.contenedor {
    
}

.sentinel {
    list-style-type: none;
}

.item-blog {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    width: 900px;
}

.titulo {
    font-size: 24px;
    color: #683bce !important;
}

a {
    text-decoration: none;
}

.text-h4 {
    color: #683bce;
}

@media (min-width: 700px) and (max-width: 999px) { 
    .item-blog {
        width: 600px;
    }
}

@media (min-width: 500px) and (max-width: 699px) { 
    .item-blog {
        width: 400px;
    }
}

@media (min-width: 350px) and (max-width: 499px) { 
    .item-blog {
        width: 300px;
    }
}

@media (min-width: 0px) and (max-width: 349px) { 
    .item-blog {
        width: 250px;
    }
}
</style>
