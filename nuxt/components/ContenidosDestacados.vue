<template>
    <div>
        <h2 class="titulo">¡Lo más querido!</h2>

        <v-row class="">
            <v-col
                v-for="(item, index) in destacados" :key="index"
                class="d-flex child-flex cuadros"
                :cols="cantidadCuadros"
            >
                <nuxt-link style="text-decoration: none; display: block;" :to="getLink(item.tipo, item.datos)">
                    <div 
                        class="element"
                        :style="`background-image: linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('${getImageContenidoDestacado(item.datos.seccion)}');`"
                    >
                        <v-img
                            style="display: inline-block; margin-bottom: -12px;"
                            height="35"
                            max-width="35"
                            :src="require(`~/assets/img/logo600x600.png`)"
                        >
                        </v-img>
                        <h2 class="styleTitulo white--text mt-3">
                            {{ getTitulo(item.tipo, item.datos) }}
                        </h2>
                    </div>
                </nuxt-link>
                <!-- <v-img
                    :src="`https://storage.googleapis.com/prod-j-fotos-cursos/vBiXFBChuTVnBsthzCSU%2FfotoCurso%2Fpublicado-1664221059590.png`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    class="grey lighten-2"
                    style="border-radius: 0.4rem;"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img> -->
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
const db = fb.firestore()

export default {
    data() {
        return {
            destacados: [],
        }
    },
    methods: {
        getImageContenidoDestacado (seccion) {
            if (seccion === 'informatica') 
                return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            else if (seccion === 'matematica') 
                return 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            else 
                return 'https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
        },
        getTitulo (tipo, item) {
            if (tipo === 'blog') return item.titulo
        },
        getLink (tipo, item) {
            if (tipo === 'blog') return `/blog/${item.referencia}`
        },
    },
    computed: {
      cantidadCuadros () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 12  // 1
          case 'sm': return 6   // 2
          case 'md': return 4   // 3
          case 'lg': return 4   // 4
          case 'xl': return 3   // 4
        }
      },
    },
    async created () {
        const snapshot = await db.collection('Blogs').orderBy('cantidadMeGusta', 'desc').limit(6).get()
      
        const destacadosAux = []
        for (const doc of snapshot.docs) {
            destacadosAux.push({
                tipo: 'blog',
                datos: doc.data(),
            })
        }

        this.destacados = destacadosAux
    },
}
</script>

<style lang="scss" scoped>
.titulo {
    margin-bottom: 15px;
    font-size: 30px;
}
    
.cuadros {
    margin: 0px;
    width: 341px;
    height: 200px;
}

.element {
    cursor: pointer;

    padding: 20px;
    
    border-radius: 15px;
    background-size: cover;
    transition: 200ms;
    height: 100%;
}

.element:hover {
    transition: 200ms;
}

.styleTitulo {
    font-size: 23px;
}

@media (max-width: 959px) {
    .titulo {
        margin-bottom: 30px;
        font-size: 30px;
    }
}

@media (max-width: 595px) {
    .cuadros {
        margin: 0px;
        height: 230px;
    }
    
}
</style>