<template>
    <div>
        <div class="flex-container">
            <div class="flex-item" v-for="(blog, index) in blogs" :key="index">
                <v-card
                    class="mx-auto"
                    min-width="360px"
                >
                    <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="blog.imgBlog"
                    >
                        <v-card-title>
                            {{blog.blog.titulo}}
                        </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        {{blog.publicador.nombreUsuario}}
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div>
                            {{blog.blog.descripcion}}
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="#683bce"
                            text
                            block
                            :to="getURL(blog.blog.referencia)"
                        >
                            Ver blog
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>

        <!-- Pantalla de carga al buscar mas datos -->
        <div v-if="buscando && existeMasDatos" class="cargando">
            <v-progress-circular
                indeterminate
                color="#683bce"
                :size="70"
                :width="7"
            ></v-progress-circular>
        </div>

        <div class="mt-15" v-if="blogs.length" v-observe-visibility="cargarBlogs"></div>
    </div>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
    name: '',
    directives: {
        ObserveVisibility
    },
    data() {
        return {
            
        }
    },
    props: {
        blogs: Array,
        existeMasDatos: Boolean,
        buscando: Boolean,
    },
    methods: {
        cargarBlogs (visible) {
            if (!visible || this.buscando || !this.existeMasDatos) {
                return
            }

            this.$emit('cargarBlogs', {
                visible
            })
        },
        getURL (referencia) {
            if (window.location.href.includes('miembro-jekuaa')) {
                return `/miembro-jekuaa/blog/${referencia}`
            } else {
                return `/blog/${referencia}`
            }
        }
    },
    watch: {
        
    },
    computed: {
        
    },
    mounted() {
        
    },
    created() {
        
    },
}
</script>

<style scoped>
.flex-container {
    margin: 0 25px 0 25px;
    display: flex;
    flex-wrap: wrap;
}

.flex-item {
    width: 450px;
    height: 100%;
    margin: 5px;
    flex: 1;
}

.cargando {
    margin-top: 50px;
    text-align: center;
}
</style>