<template>
    <div class="">
        <section class="container presentacion">
            <v-row no-gutters>
                <v-col
                    cols="12"
                    md="7"
                    class="contenedor-i"
                >
                    <div class="main-i">
                        <h1 class="titulo">¡Bienvenido a Jekuaapy!</h1>
                        <v-divider></v-divider>

                        <div class="mt-10 descripcion">
                            Bienvenidos a Jekuaapy, una plataforma educativa para que 
                            aprendas sobre los temas y contenidos que te gusten, 
                            de manera rápida y divertida!
                        </div>

                        <div class="mt-5">
                            <v-btn
                                color="#ff1d89"
                                outlined
                                to="/blogs"
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
                </v-col>

                <v-col
                    cols="12"
                    md="5"
                    class="contenedor-d"
                >
                    <div class="main-d">
                        <video 
                            :src="require(`~/assets/video/videoPresentacion.mp4`)"
                            autoplay 
                            loop 
                            muted 
                            type="mp"
                        ></video>
                        <img 
                            :src="require(`~/assets/img/pantallaPresentacion.jpg`)"
                            class="mask"
                        >
                    </div>
                </v-col>
                
            </v-row>
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
                        ¡Jekuaapy blogs!
                    </div>

                    <div class="font-weight contenedor-descripcion-mensaje">
                        ¡Puedes aprender sobre varios temas como programación, desarrollo web, linux y más en Jekuaapy blogs!
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
                        En Jekuaapy existen secciones, que se dividen en:
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
                        ¡Forma parte de la comunidad Jekuaapy!
                    </div>

                    <div class="font-weight contenedor-descripcion-mensaje">
                        Puedes create una cuenta gratis en Jekuaapy y comenzar con esta ¡aventura de conocimiento!
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
                <v-expansion-panel
                v-for="(item,i) in listaPreguntasFrecuentes"
                :key="i"
                >
                <v-expansion-panel-header>
                    <div style="font-size: 22px;">
                        {{ item.nombre }}
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="mt-3" style="font-size: 18px;">
                        {{ item.descripcion }}
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
                    descripcion: 'Tienes alguna duda sobre un lenguaje de programación, comando, operadores, modelos de programación o aprender sobre algún algoritmo? En Jekuaapy lo tienes y ¡con códigos de ejemplo! 👩🏻‍💻'
                },
                {
                    nombre: 'Matemática',
                    descripcion: '¿Deseas aprender cálculo, física, geometría, analítica y comprender todo lo relacionado a la matemática? Con Jekuaapy blogs puedes aprender! 🚀'
                },
            ],
            listaPreguntasFrecuentes: [
                {
                    nombre: '¿Qué es Jekuaapy?',
                    descripcion: 'Jekuaapy es una plataforma de enseñanza de varios temas, ahora mismo la plataforma cuenta con blogs, vamos ir agregando y actualizando funcionalidades, cursos, retos y de esa forma ir formando a los futuros estudiantes de Jekuaapy y ¡divulgar información! 🌎'
                },
            ]
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Asap&display=swap');

p, h1, h2, h3, h4 {
    font-family: 'Asap', sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.presentacion {
    height: 380px;
    margin-bottom: 50px;
}

.contenedor-d {
    height: 100%;
}

.contenedor-i {
    height: 100%;
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

.main-i {
    padding: 45px 20px 0 20px;
    width: 100%;
    height: 100%;
}

.main-d {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 0;
}

.titulo {
    font-size: 40px;
    color: #683bce;
}

.descripcion {
    margin-top: 25px !important;
}

.mask {
    position: absolute;
    width: 100%;
    height: 380px;
    z-index: 2;
    user-select: none;
    mix-blend-mode: screen;
}

.main-d video {
    position: absolute;
    width: 99.9%;
    margin-top: 35px;
    object-fit: contain;
    z-index: 1;
}

@media (min-width: 0px) and (max-width: 1370px) { 
    .contenedor-d {
        width: 400px;
    }
    
    .mask {
        height: 350px;
        margin-top: 0;
    }

    .main-d video {
        margin-top: 25px;
    }
}

@media (min-width: 0px) and (max-width: 1111px) { 
    .contenedor-d {
        width: 300px;
    }

    .mask {
        height: 350px;
        margin-top: 0;
    }

    .main-d video {
        margin-top: 45px;
    }
}

@media (min-width: 0px) and (max-width: 999px) { 
    .contenedor-d {
        width: 200px;
    }

    .mask {
        height: 300px;
        margin-top: 0;
    }

    .main-d video {
        margin-top: 31px;
    }
}

@media (min-width: 0px) and (max-width: 959px) { 
    .presentacion {
        height: 100%;
        text-align: center;
    }

    .contenedor-d {
        display: none;
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