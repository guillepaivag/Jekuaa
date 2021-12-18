<template>
    <div class="">
        
        <div class="container">
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
                            color="#683bce"
                            dark
                            class="pt-10 pb-10"
                        >
                            <div class="d-flex flex-no-wrap justify-space-between">
                            <div class="ml-5">
                                <v-card-title
                                    class="text-h5 mb-0"
                                >
                                    Blog
                                </v-card-title>

                                <v-card-subtitle class="mt-0">
                                    ¡Crea un blog con Jekuaapy!
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-btn
                                        class="ml-2 mt-3"
                                        outlined
                                        rounded
                                        :to="`/miembro-jekuaa/blogs/nuevo`"
                                    >
                                        Crear blog
                                    </v-btn>
                                </v-card-actions>
                            </div>

                            <v-avatar
                                class="ma-3 mr-7"
                                size="155"
                                tile
                            >
                                <v-img src="https://firebasestorage.googleapis.com/v0/b/jekuaa-py.appspot.com/o/vecteezy_write-to-computer-on-background_.jpg?alt=media&token=1c1589f4-c48b-4e9c-839c-e7be1e7600be"></v-img>
                            </v-avatar>
                            </div>
                        </v-card>
                    </div>
                </v-col>

                <v-col
                    cols="12"
                    md="7"
                >
                    <div class="contenedor-r">
                        <h3 class="titulo-presentacion">¡Blogs con Jekuaapy!</h3>

                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>

                        <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                    
                        <v-btn
                            class="ml-2 mt-5"
                            outlined
                            rounded
                            color="#683bce"
                            to="/miembro-jekuaa/blogs"
                        >
                            Comenzar jekuaapy blogs
                        </v-btn>
                    </div>
                </v-col>
            </v-row>


            <h3 class="titulo-presentacion mt-15">¡Mesas de trabajos!</h3>
            <v-divider></v-divider>

            <v-row
                class="mt-5 mb-5"
                no-gutters
            >
                <v-col
                    cols="12"
                    md="12"
                >
                    <div class="contenedor-r">
                        <v-card
                            class="mx-auto"
                        >
                            <v-img
                                class="white--text align-end"
                                height="250px"
                                :src="require(`~/assets/img/mesa-trabajo.jpg`)"
                            >
                                <v-card-title>
                                    ¡Blogs con Jekuaapy!
                                </v-card-title>
                            </v-img>

                            <div class="container">
                                <v-card-subtitle class="pb-0">
                                    ¡Escribe lo que quieres mostrar al mundo!
                                </v-card-subtitle>

                                <v-card-text class="text--primary">
                                    <div>

                                    </div>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn
                                        outlined
                                        rounded
                                        color="#683bce"
                                        to="/miembro-jekuaa/blogs"
                                    >
                                        Comenzar
                                    </v-btn>
                                </v-card-actions>
                            </div>
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