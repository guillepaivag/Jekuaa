<template>
    <div>
        <div class="not_found_container">
            <div class="row text-center presentacion">
                <div class="col-md-6">
                    <h1 class="notFoundNumber">404</h1>
                    <!-- <img class="imgNotFound" :src="src" alt=""> -->
                </div>
                <div class="col-md-6">
                    <div class="mensaje_posicion">
                        <h2 class="mensaje">
                            ¡Upsss!
                        </h2>

                        <v-divider color="white" class="mt-5 mb-5" />

                        <p class="mensaje">No se encontró la página que está buscando :(</p>
                    
                        <v-btn
                            class="ma-2"
                            outlined
                            large
                            fab
                            color="white"
                            to="/"
                        >
                            <v-icon>mdi-home</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>

        <div class="container text-center mt-5">

            <v-avatar
              size="100"
              tile
            >
              <v-img
                contain
                max-height="60%"
                src="https://firebasestorage.googleapis.com/v0/b/jekuaa-py.appspot.com/o/JekuaaLogo.png?alt=media&token=26851757-faff-48da-8e6f-e21f3c2c1e96"
              />
            </v-avatar>
            
            <v-text-field
                v-model="search"
                outlined
                label="Ingresa aquí lo que estas buscando"
                clearable
            ></v-text-field>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            src: 'https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.png',
            search: ''
        }
    },
    props: {
        error: Object
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nixie+One&display=swap');

.mensaje {
    color: white;
    font-family: 'Nixie One', cursive;
}

.mensaje_posicion {
    margin-top: 40px;
}

.presentacion {
    padding: 65px;
}

/* https://stackoverflow.com/questions/24695992/how-to-make-image-responsive-inside-a-div/24696059 */
.imgNotFound {
    max-width: 50%;
    height: auto;
}

.not_found_container {
    background-color: #683bce;
}

.notFoundNumber {
    color: white;
    font-size: 150px;
    font-family: 'Nixie One', cursive;
}
</style>