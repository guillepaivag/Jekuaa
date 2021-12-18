<template>
    <v-parallax 
        :src="require(`~/assets/img/seccion/${seccion ? seccion : 'sinSeccion'}.jpg`)"
        height="100%"
    >
        <div class="contenedor_contenido">
            <h1 class="titulo" style="">
                {{titulo}}
            </h1>
            
            <div class="descripcion" style="">
                {{descripcion}}
            </div>
            
            <v-btn
                class="verInformacion"
                color="#ffffff"
            >
                <v-icon>
                    mdi-book-open-variant
                </v-icon>
                <span class="ml-3">Ver información</span>
            </v-btn>

            <v-btn
                class="verContenido"
                color="#ffffff"
                :to="to"
            >
                <v-icon>
                    mdi-book-open-variant
                </v-icon>
                <span class="ml-3">Ver contenido</span>
            </v-btn>
        </div>
    </v-parallax>
</template>

<script>

export default {
    name: "Presentacion",
    data() {
        return {
            
        }
    },
    props: {
        titulo: String,
        descripcion: String,
        to: String,
        seccion: String,
    },
    components: {

    },
}
</script>

<style scoped>
.v-parallax {
    margin-top: -19px;
    height: 650px !important;
    background: #000000 !important;
}

.v-parallax__image-container {
    opacity: .72 !important;
}

.contenedor_contenido {
    background-color: rgba(0, 0, 0, 0.72);
    padding: 22px;
    margin-top: -150px;
    margin-left: 50px;
    max-width: 600px;
}

.titulo {
    font-size: 50px;
    margin-bottom: 30px;
}

.descripcion {
    font-size: 20px;
    margin-bottom: 30px;
}

.verInformacion {
    color: #ff1d89;
}

.verContenido {
    color: #683bce;
}

@media (max-width: 700px) { 
    .contenedor_contenido {
        margin-left: 0;
        text-align: center;
        justify-content: center;
    }
}

@media (min-width: 0px) and (max-width: 600px) { 
    .titulo {
        font-size: 40px;
        margin-bottom: 30px;
    }

    .descripcion {
        font-size: 17px;
        margin-bottom: 30px;
    }
}

@media (min-width: 0px) and (max-width: 522px) { 
    .contenedor_contenido {
        margin-top: 10px;
    }
    
    .titulo {
        font-size: 30px;
        margin-bottom: 30px;
    }

    .descripcion {
        font-size: 17px;
        margin-bottom: 30px;
    }
    
    button {
        display: block;
    }
    
    .verInformacion {
        margin: 6px 0 6px 0;
        width: 100%;
    }

    .verContenido {
        margin: 6px 0 6px 0;
        width: 100%;
    }
}

</style>