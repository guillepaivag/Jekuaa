<template>
    <div>
        <div 
            v-if="listaMisCursos.length"
            class=""
        >
            
            <h2 class="mb-5">¡Ultimos cursos visualizados!</h2>

            <div class="horizontal_slider">
                <div class="slider_container">
                    <nuxt-link 
                        v-for="(curso, index) in listaMisCursos" 
                        :key="index"
                        :to="`/curso/${curso.datos.codigo}${curso.progreso === 100 ? '' : '/continuar'}`"
                    >
                        <div  
                            class="item pl-4 pt-7 white--text" 
                            :style="`background-image: linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('${curso.datos.fotoPerfil}'); border-color: ${curso.progreso === 100 ? '#683bce' : '#40ab09'};`"
                        >
                            <v-img
                                style="display: inline-block; margin-bottom: -12px;"
                                height="35"
                                max-width="35"
                                :src="require(`~/assets/img/logo600x600.png`)"
                            >
                            </v-img>
                            <h2 :title="curso.datos.titulo" class="styleTitulo ml-2" style="display: inline-block;">
                                {{ getTitulo(curso.datos.titulo) }} ({{curso.progreso}}%)
                            </h2>
                            
                        </div>
                    </nuxt-link>
                </div>
            </div>

        </div>
        <div 
            v-else
            class=""
        >
            <h2 class="mb-5">¿Todavía no tienes cursos?</h2>

            <div class="contenedor_item2">
                <nuxt-link to="/cursos">
                    <div  
                        class="item2 px-4 pt-7 white--text" 
                        :style="`background-image: linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('https://previews.123rf.com/images/maximusnd/maximusnd1707/maximusnd170702407/82017455-estrellas-y-galaxias-en-el-espacio-exterior-que-muestran-la-belleza-de-la-exploraci%C3%B3n-espacial.jpg');`"
                    >
                        <v-img
                            style="display: inline-block; margin-bottom: -12px;"
                            height="35"
                            max-width="35"
                            :src="require(`~/assets/img/logo600x600.png`)"
                        >
                        </v-img>
                        <h2 title="Explora" class="styleTitulo ml-2" style="display: inline-block;">
                            ¡Conoce el mundo de Jekuaapy!
                        </h2>
                        
                    </div>
                </nuxt-link>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        listaMisCursos: {
            type: Array,
            /**
             * [
             *  miCurso: Object,    -> Datos de informacion del curso obtenido
             *  datos: Object,      -> Datos de informacion del curso
             *  progreso: Number,   -> Progreso del curso
             * ]
            */
        }
    },
    methods: {
        getTitulo (titulo) {
            const maxLength = 26

            if (titulo.length > maxLength) {
                return titulo.substring(0, maxLength) + '...'
            }

            return titulo
        }
    }
}
</script>

<style lang="scss" scoped>
// https://youtu.be/75zbFb1PQYI

.horizontal_slider {
    display: block;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}

.slider_container {
    display: block;
    white-space: nowrap;
    margin-bottom: 5px;
}

.item {
    cursor: pointer;  

    background-size: cover;
    background-repeat: no-repeat;
    
    border: 4px solid;
    border-radius: 20px;

    display: inline-block;
    margin-right: 10px;
    height: 200px;
    width: 341px;
    transition: 500ms; 
}

.item::before {
    background-color: rgba(0, 0, 255, 0.8) !important;
    position: absolute;
    display: block;
}

.contenedor_item2 {
    display: block;
    width: 100%;
}

.item2 {
    cursor: pointer;

    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
    
    border: 4px solid;
    border-radius: 20px;
    border-color: #ff1d89;

    height: 150px;
    width: 450px;
}

.styleTitulo {
    font-size: 18px;
}

.porqueVisteTitulo {
    color: #683bce;
    text-decoration: none;
    transition: 500ms;
    font-weight: bold !important;
}

.porqueVisteTitulo:hover {
    transition: 500ms;
    color: #ff1d89;
}

@media (max-width: 500px) {
    .item2 {
        width: 100%;
    }
}
</style>