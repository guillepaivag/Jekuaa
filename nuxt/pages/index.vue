<template>
    <div class="">
        <section class="container presentacion">
            <div>
                <div class="mt-5">
                    <h1 class="titulo">¡Bienvenido a <span style="color: #683bce;">Jekuaa</span><span style="color: #ff1d89;">py</span>!</h1>
                    <v-divider></v-divider>

                    <p class="mt-5 descripcion">
                        Jekuaapy, una plataforma educativa para que 
                        aprendas sobre los temas y contenidos que te gusten, 
                        de manera rápida y divertida!
                    </p>

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
            <v-row>
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
                    <h3 class="font-weight-bold contenedor-descripcion-titulo">
                        ¡Jekuaapy cursos!
                    </h3>

                    <p class="font-weight contenedor-descripcion-mensaje">
                        ¡Puedes aprender sobre varios temas como programación, matemática, marketing y más en Jekuaapy cursos!
                    </p>
                </v-col>
            </v-row>
        </div>
        <v-divider></v-divider>

        <div class="container contenedor-descripciones" style="padding-bottom: 50px;">
            <v-row>
                <v-col
                    cols="12"
                    md="5"
                    class="contenedor-descripcion"
                >
                    <h3 class="font-weight-bold contenedor-descripcion-titulo">
                        ¡Diversos temas!
                    </h3>

                    <p class="font-weight contenedor-descripcion-mensaje">
                        En Jekuaapy existen secciones, que se dividen en:
                    </p>
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
            <v-row>
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
                    <h3 class="font-weight-bold contenedor-descripcion-titulo">
                        ¡Forma parte de la comunidad Jekuaapy!
                    </h3>

                    <p class="font-weight contenedor-descripcion-mensaje">
                        Puedes create una cuenta gratis en Jekuaapy y comenzar con esta ¡aventura de conocimiento!
                    </p>
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
                        <h4 style="font-size: 22px; display: inline;">
                            ¿Qué es Jekuaapy?
                        </h4>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="mt-3" style="font-size: 18px;">
                            Jekuaapy es una plataforma de enseñanza de varios temas, por el momento la plataforma solamente cuenta con blogs, se irá agregando y actualizando funcionalidades, cursos, retos y de esa forma ir formando a los futuros estudiantes de Jekuaapy y ¡divulgar información! 🌎
                        </p>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <h4 style="font-size: 22px; display: inline;">
                            ¿Qué es un Jekuaapoint?
                        </h4>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="mt-3" style="font-size: 18px;">
                            Los <nuxt-link to="/jekuaapoints">Jekuaapoints</nuxt-link> son creditos dentro de la plataforma para comprar tus cursos!
                        </p>
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
                    descripcion: 'Tienes alguna duda sobre un lenguaje de programación, comando, operadores, modelos de programación o aprender sobre algún algoritmo? En Jekuaapy lo tienes y ¡con códigos de ejemplo! 👩🏻‍💻'
                },
                {
                    nombre: 'Matemática',
                    descripcion: '¿Deseas aprender cálculo, física, geometría, analítica y comprender todo lo relacionado a la matemática? Con Jekuaapy blogs puedes aprender! 🚀'
                },
            ],
        }
    },

    methods: {
        
    },

    created () {
        
    },

    mounted () {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV)
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
}
</style>