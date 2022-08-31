<template>
    <div v-if="datosCurso">
        <h2 class="mb-3">Porque viste <b style="color: #ff1d89;">{{datosCurso.titulo}}</b></h2>

        <div class="horizontal_slider">
            <div class="slider_container">
                <div class="item" v-for="(curso, index) in cursosRecomendados" :key="index">
                    <v-img
                        width="350"
                        :src="curso.fotoPerfil"
                    ></v-img>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
import recommend from '@algolia/recommend'

const db = fb.firestore()
const recommendClient = recommend('RNRNTDZS3N', 'af4d4e9d36a7ceb75e258007c3ceccf2')
const indexName = process.env.NODE_ENV === 'production' ? 'prod_cursos_publicado' : 'dev_cursos_publicado'

export default {
    name: '',
    data() {
        return {
            datosCurso: null,
            cursosRecomendados: [],
        }
    },
    props: {
        uidCurso: {
            type: String,
            require: true,
        },
    },
    methods: {
        
    },
    async created () {
        const doc = await db.collection('CursosPublicado').doc(this.uidCurso).get()
        this.datosCurso = doc.data()

        const data = await recommendClient.getRelatedProducts([
            { 
                indexName, 
                objectID: this.uidCurso, 
                maxRecommendations: 12,
            },
        ])

        this.cursosRecomendados = data.results[0].hits
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
}

.item {
    border-radius: 15px;
    display: inline-block;
    margin-right: 10px;
}


</style>