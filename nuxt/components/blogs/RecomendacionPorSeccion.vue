<template>
    <div>
        <div class="mb-3">
            <h2 v-if="seccion">
                Blogs recomendados de  
                <b style="color: #ff1d89;">
                    {{ getNombreSeccion(seccion) }}
                </b>
            </h2>
            <h2 v-else>
                Otros blogs 
                <b style="color: #ff1d89;">
                    recomendados
                </b>
            </h2>
        </div>

        <div class="horizontal_slider">
            <div class="slider_container">
                <v-card :to="`/blog/${blog.referencia}`" class="item pl-4 pt-7 white--text" v-for="(blog, index) in blogsRecomendados" :key="index">
                    <v-img
                        style="display: inline-block; margin-bottom: -12px;"
                        height="35"
                        max-width="35"
                        :src="require(`~/assets/img/logo600x600.png`)"
                    >
                    </v-img>
                    <h2 :title="blog.titulo" class="styleTitulo ml-2" style="display: inline-block;">
                        {{ getTitulo(blog.titulo) }}
                    </h2>
                    
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
import recommend from '@algolia/recommend'
import informacionSecciones from '@/helpers/informacionSecciones'

const db = fb.firestore()
const recommendClient = recommend('RNRNTDZS3N', 'af4d4e9d36a7ceb75e258007c3ceccf2')
const indexName = process.env.NODE_ENV === 'production' ? 'prod_blogs' : 'dev_blogs'

export default {
    name: '',
    data() {
        return {
            blogsRecomendados: [],
        }
    },
    props: {
        seccion: {
            type: String,
            require: true,
        },
    },
    methods: {
        getNombreSeccion (uid) {
            return informacionSecciones[uid].nombre
        },
        getTitulo (titulo) {
            const maxLength = 35

            if (titulo.length > maxLength) {
                return titulo.substring(0, maxLength) + '...'
            }

            return titulo
        }
    },
    async created () {
        const snapshot = await db.collection('Blogs')
        .where('seccion', '==', this.seccion)
        .where('publicado', '==', true)
        .where('habilitado', '==', true)
        .orderBy('cantidadMeGusta', 'desc')
        .limit(1)
        .get()

        const uidBlogConMasMG = snapshot.docs[0].id

        const data = await recommendClient.getRelatedProducts([
            { 
                indexName, 
                objectID: uidBlogConMasMG,
                maxRecommendations: 12,
            },
        ])

        this.blogsRecomendados = data.results[0].hits
    },
}
</script>

<style lang="scss" scoped>
// https://youtu.be/75zbFb1PQYI

.horizontal_slider {
    display: block;
    width: 100%;
    overflow-x: scroll;
}

.slider_container {
    display: block;
    white-space: nowrap;
    margin-bottom: 5px;
}

.item {
    border-radius: 20px;
    background-color: #683bce;
    display: inline-block;
    margin-right: 10px;
    height: 100px;
    width: 350px;
    transition: 500ms;
}

.item:hover {
    cursor: pointer;
    background-color: #b291fe;
    transition: 500ms;
}

.styleTitulo {
    font-size: 15px;
}
</style>