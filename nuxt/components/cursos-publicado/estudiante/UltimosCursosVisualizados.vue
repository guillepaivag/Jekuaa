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
                            class="element"
                            style="text-decoration: none;" 
                            :title="curso.datos.titulo"
                            :to="`/curso/${curso.datos.codigo}${curso.progreso === 100 ? '' : '/continuar'}`"
                        >
                            <div
                                class="cuadros"
                                :style="`
                                    background-image: linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('${curso.datos.fotoPerfil}');
                                    border-color: ${curso.progreso === 100 ? '#683bce' : '#40ab09'};    
                                `"
                            >
                                <v-img
                                    style="display: inline-block; margin-bottom: -12px;"
                                    height="35"
                                    max-width="35"
                                    :src="require(`~/assets/img/logo600x600.png`)"
                                >
                                </v-img>
                                <b class="ml-2" style="font-size: 20px; color: aliceblue;">{{curso.progreso}}%</b>
                                <h2 style="" class="styleTitulo white--text mt-5">
                                    {{ getTitulo(curso.datos.titulo) }}
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
                            class="imgLogo2"
                            style="margin-bottom: -12px;"
                            height="35"
                            max-width="35"
                            :src="require(`~/assets/img/logo600x600.png`)"
                        >
                        </v-img>
                        <h2 title="Explora" class="styleTitulo2" style="display: inline-block;">
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
            const maxLength = 22

            if (titulo.length > maxLength) return titulo.substring(0, maxLength) + '...'
            else return titulo
        }
    },
    created () {
        let a = [
            'Curso para Conseguir Inversión para Videojuegos: Preparar un Pitch Exitoso',
            'fkndsoifh doihgiod hdfig',
            'foihf ioejig jogdf',
        ]
        for (let i = 0; i < this.listaMisCursos.length; i++) {
            let curso = this.listaMisCursos[i]
            curso.datos.titulo = a[i]

            this.listaMisCursos[i] = curso
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
    display: inline-block;
    white-space: nowrap;
    margin-bottom: 5px;
}

.element {
    margin: 0px;
    width: 341px;
    height: 200px;
}

.cuadros {
    cursor: pointer;

    padding: 20px;

    background-size: cover;
    background-repeat: no-repeat;
    
    border: 3.5px solid;
    border-radius: 20px;

    display: inline-block;
    margin-right: 10px;
    height: 200px;
    width: 341px;
    transition: 500ms; 
}

.styleTitulo {
    font-size: 23px;
    white-space: normal;
}

.styleTitulo2 {
    font-size: 23px;
    margin-left: 10px;
    margin-top: 10px;
}

.contenedor_item2 {
    display: block;
    width: 100%;
}

.imgLogo2 {
    margin-left: 5px;
    display: inline-block;
}

.item2 {
    cursor: pointer;

    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
    
    border: 4px solid;
    border-radius: 20px;
    border-color: #ff1d89;

    height: 120px;
    width: 450px;
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

@media (max-width: 447.33px) {

    .contenedor_item2 {
        
    }

    .item2 {
        text-align: center;
    }

    .imgLogo2 {
        display: none;
    }

    .styleTitulo2 {
        font-size: 23px;
        margin-left: 0;
        margin-top: 0;
        display: block;
    }
}
</style>