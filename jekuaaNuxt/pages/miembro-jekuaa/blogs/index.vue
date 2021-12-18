<template>
    <div class="">
        
        <div class="container">
            <h3 class="titulo-presentacion">Crea un blog en Jekuaapy</h3>

            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>

            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        
            <v-btn
                class="ml-2 mt-5"
                outlined
                rounded
                color="#683bce"
                :to="`/miembro-jekuaa/blogs/nuevo`"
            >
                Crear un blog
            </v-btn>

            <v-btn
                class="ml-2 mt-5"
                outlined
                rounded
                color="#ff1d89"
                :to="`/miembro-jekuaa/blogs/mis-blogs`"
            >
                Mis blogs
            </v-btn>

            <h3 class="titulo-presentacion mt-15">
                Recomendaciones
            </h3>
            <v-divider></v-divider>

            <v-row
                class="mt-5"
                no-gutters
            >
                <v-col
                    cols="12"
                    md="5"
                >
                    <div class="contenedor-l">
                        <v-card
                            class="mx-auto"
                        >
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="require(`~/assets/img/letras-blog.jpg`)"
                            >
                            <v-card-title>
                                Recomendaciones general para blogs
                            </v-card-title>
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                Jekuaapy blog
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                            <div>
                                Si quieres que tu blog tenga una buena estructura, posicionamiento en las búsquedas de Google, y sea cómodo para los lectores, aquí te dejamos unas 4 pautas o recomendaciones para crear tu blog.
                            </div>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn
                                    color="#683bce"
                                    text
                                    to="/blog/recomendaciones-para-crear-un-blog"
                                >
                                    Ver recomendación
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-col>

                <v-col
                    cols="12"
                    md="7"
                >
                    <div class="contenedor-r">
                        <v-card
                            class="mx-auto"
                        >
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="require(`~/assets/img/letras-blog.jpg`)"
                            >
                            <v-card-title>
                                Top 10 Australian beaches
                            </v-card-title>
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                Jekuaapy blog
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div>
                                    Whitsunday Island, Whitsunday Islands
                                </div>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn
                                    color="#683bce"
                                    text
                                    to="/blog/recomendaciones-para-crear-un-blog"
                                >
                                    Ver recomendación
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </div>
        
    </div>
</template>

<script>
export default {
    name: '',
    layout: 'miembroJekuaa',
    middleware: 'esMiembroJekuaa',
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
.contenedor-l {
    margin-top: 10px;
    padding-right: 10px;
}

.contenedor-r {
    margin-top: 10px;
    padding-left: 10px;
}

.titulo-presentacion {
    color: #683bce;
    font-size: 25px;
    margin-bottom: 10px;
}
</style>