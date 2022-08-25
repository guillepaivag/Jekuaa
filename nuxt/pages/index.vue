<template>
    <div class="">
        <section class="container presentacion">
            <div>
                <div class="mt-5">
                    <h1 class="titulo">¡Bienvenido a <span style="color: #683bce;">Class</span><span style="color: #ff1d89;">fii</span>!</h1>
                    <v-divider></v-divider>

                    <div class="mt-7 descripcion">
                        Classfii, una plataforma educativa para que 
                        aprendas sobre los temas y contenidos que te gusten, 
                        de manera rápida y divertida!
                    </div>

                    <div class="mt-5">
                        <v-btn
                            color="#ff1d89"
                            outlined
                            to="/cursos"
                        >
                            <v-icon
                                left
                                dark
                            >
                                mdi-alpha-j-box
                            </v-icon>
                            ¡Descubre más contenido!
                        </v-btn>
                    </div>
                </div>
            </div>
        </section>


        <div class="container contenedor-descripciones">
            <v-row no-gutters>
                <v-col
                    cols="12"
                    md="7"
                    class=""
                >
                    <v-img
                        height="270px"
                        :src="require(`~/assets/img/presentacion1.jpg`)"
                    >
                    </v-img>
                </v-col>

                <v-col
                    cols="12"
                    md="5"
                    class="contenedor-descripcion"
                >
                    <div class="font-weight-bold contenedor-descripcion-titulo contenedor-descripcion-titulo-d">
                        ¡Classfii cursos!
                    </div>

                    <div class="font-weight contenedor-descripcion-mensaje">
                        ¡Puedes aprender sobre varios temas como programación, matemática, marketing y más en Classfii cursos!
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-divider></v-divider>

        <div class="container contenedor-descripciones" style="padding-bottom: 50px;">
            <v-row no-gutters>
                <v-col
                    cols="12"
                    md="5"
                    class="contenedor-descripcion"
                >
                    <div class="font-weight-bold contenedor-descripcion-titulo contenedor-descripcion-titulo-i">
                        ¡Diversos temas!
                    </div>

                    <div class="font-weight contenedor-descripcion-mensaje contenedor-descripcion-mensaje-i">
                        En Classfii existen secciones, que se dividen en:
                    </div>
                </v-col>

                <v-col
                    cols="12"
                    md="7"
                    class=""
                >
                    <v-expansion-panels focusable>
                        <v-expansion-panel
                        v-for="(seccion, i) in listaSecciones"
                        :key="i"
                        >
                        <v-expansion-panel-header>
                            <div style="font-size: 22px;">
                                {{ seccion.nombre }}
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="mt-3" style="font-size: 18px;">
                                {{ seccion.descripcion }}
                            </div>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                
            </v-row>
        </div>
        <v-divider></v-divider>

        <div class="container contenedor-descripciones">
            <v-row no-gutters>
                <v-col
                    cols="12"
                    md="7"
                    class=""
                >
                    <v-img
                        height="270px"
                        :src="require(`~/assets/img/presentacion3.jpg`)"
                    >

                    </v-img>
                </v-col>

                <v-col
                    cols="12"
                    md="5"
                    class="contenedor-descripcion"
                >
                    <div class="font-weight-bold contenedor-descripcion-titulo contenedor-descripcion-titulo-d">
                        ¡Forma parte de la comunidad Classfii!
                    </div>

                    <div class="font-weight contenedor-descripcion-mensaje">
                        Puedes create una cuenta gratis en Classfii y comenzar con esta ¡aventura de conocimiento!
                    </div>
                </v-col>
                
            </v-row>
        </div>
        <v-divider></v-divider>

        <div class="container mt-10 mb-10">
            <div style="text-align: center;">
                <h1 class="titulo">Preguntas frecuentes</h1>
                <v-divider class="mb-7"></v-divider>
            </div>

            <v-expansion-panels focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <div style="font-size: 22px;">
                            ¿Qué es Classfii?
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="mt-3" style="font-size: 18px;">
                            Classfii es una plataforma de enseñanza de varios temas, por el momento la plataforma solamente cuenta con blogs, se irá agregando y actualizando funcionalidades, cursos, retos y de esa forma ir formando a los futuros estudiantes de Classfii y ¡divulgar información! 🌎
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <div style="font-size: 22px;">
                            ¿Qué es un Fiipoint?
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="mt-3" style="font-size: 18px;">
                            Los <nuxt-link to="/fiipoints">Fiipoints</nuxt-link> son creditos dentro de la plataforma para comprar tus cursos!
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>


    </div>
</template>





<script>
export default {
    name: '',

    data() {
        return {
            listaSecciones: [
                {
                    nombre: 'Informática',
                    descripcion: 'Tienes alguna duda sobre un lenguaje de programación, comando, operadores, modelos de programación o aprender sobre algún algoritmo? En Classfii lo tienes y ¡con códigos de ejemplo! 👩🏻‍💻'
                },
                {
                    nombre: 'Matemática',
                    descripcion: '¿Deseas aprender cálculo, física, geometría, analítica y comprender todo lo relacionado a la matemática? Con Classfii blogs puedes aprender! 🚀'
                },
            ],
        }
    },

    methods: {
        
    },

    created () {
        
    },

    mounted () {

    },
}
</script>







<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.presentacion {
    margin-bottom: 30px;
    text-align: center;
}

.contenedor-descripciones {
    padding: 50px 0 0 0;
    display: block;
}

.contenedor-descripcion {
    text-align: center;
}

.contenedor-descripcion-titulo {
    font-size: 40px;
    color: #683bce;
    margin-bottom: 18px;
}

.contenedor-descripcion-mensaje {
    font-size: 20px;
}

.titulo {
    font-size: 40px;
    /* color: #683bce; */
}

.descripcion {
    margin-top: 25px !important;
}

@media (min-width: 0px) and (max-width: 959px) { 
    .presentacion {
        height: 100%;
        text-align: center;
    }

    .contenedor-descripciones {
        padding: 50px 20px 50px 20px !important;
    }

    .contenedor-descripcion-titulo-d {
        margin-top: 20px;
    }

    .contenedor-descripcion-titulo-i {
        margin-top: -30px;
    }

    .contenedor-descripcion-mensaje-i {
        margin-bottom: 30px;
    }
}

</style>