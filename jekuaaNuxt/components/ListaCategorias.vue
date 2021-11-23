<template>
    <div>
        <div class="titulos">
            <b class="titulo-text">{{ seccion.nombre }} / </b> 
            <b class="titulo-text categoria-text" v-on:click="dialog = !dialog">
                {{categoriaSeleccionada.nombre}}
            </b>
        </div>

        <v-dialog
            v-model="dialog"
            scrollable
            max-width="300px"
        >
            <v-card>
                <v-card-title>Categorias: {{seccion.nombre}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <div class="mt-1" v-for="(categoria, index) in categorias" :key="index">
                        <v-btn
                            color="#683bce"
                            class="ma-2 white--text"
                            block
                            :disabled="categoriaSeleccionada.uid == categoria.uid"
                            v-on:click="categoriaSeleccionada = categoria"
                            @mouseover="hoverCategoria = categoria.uid"
                            @mouseleave="hoverCategoria = null"
                        >
                            <v-icon
                                v-if="hoverCategoria === categoria.uid"
                                class="mr-2"
                                right
                                dark
                            >
                                mdi-check
                            </v-icon>
                            <p class="textoBotonLista">
                                {{categoria.nombre}}
                            </p>
                        </v-btn>
                        
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <!-- <v-btn
                        v-if="existeMasCategorias"
                        color="blue darken-1"
                        text
                        @click="paginarCategorias"
                    >
                        Mostrar más
                    </v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import informacionSecciones from '@/helpers/informacionSecciones'

export default {
    data: () => ({
        categorias: [],
        categoriaSeleccionada: {
            uid: '',
            nombre: '',
        },
        dialog: false,
        hoverCategoria: null,
        informacionSecciones: informacionSecciones,
    }),
    props: {
        seccion: Object
    },
    components: {
        
    },
    computed: {

    },
    watch: {
        categoriaSeleccionada: function (nuevo, viejo) {
            if (nuevo.uid === viejo.uid) return
            this.$emit('categoriaSeleccionada', nuevo)
        }
    },
    methods: {
        inicializarListaCategorias () {
            let arr = Object.keys(this.informacionSecciones[this.seccion.uid].categorias)
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i]
                this.categorias.push({
                    uid: this.informacionSecciones[this.seccion.uid].categorias[element].uid,
                    nombre: this.informacionSecciones[this.seccion.uid].categorias[element].nombre,
                })
            }

            this.categoriaSeleccionada = this.categorias[0]
        },
    },
    created() {
        this.inicializarListaCategorias()
    },
};
</script>

<style scoped>
.titulos {
    margin-left: 50px;
}

.textoBotonLista {
    color: #ffffff;
    margin-top: 18px;
}

.botonLista {
    height: 20px;
    background: #683bce;
}

.titulo-text {
  font-size: 24px;
}

.categoria-text {
  cursor: pointer; 
  color: #683bce;
  transition: 0.4s;
}

.categoria-text:hover {
  color: #ff1d89;
  transition: 0.4s;
}
</style>