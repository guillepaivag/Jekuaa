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
                    <v-btn
                        v-if="existeMasCategorias"
                        color="blue darken-1"
                        text
                        @click="paginarCategorias"
                    >
                        Mostrar más
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
    data: () => ({
        categorias: [],
        ultimoDocumentoCategoria: null,
        categoriaSeleccionada: {
            uid: '',
            nombre: '',
        },
        dialog: false,
        cantidadCategoriasMaxima: 3,
        existeMasCategorias: true,
        buscandoCategorias: false,
        hoverCategoria: null,
    }),
    props: {
        seccion: Object
    },
    components: {
        
    },
    computed: {
        listaNombreCategorias () {
            const listaCategorias = []
            for (let i = 0; i < this.categorias.length; i++) {
                const element = this.categorias[i]
                listaCategorias.push(element.nombre)
            }

            return listaCategorias
        },
        categoriaNombreSeleccionada: {
            set (nombre) {
                this.categoriaSeleccionada = this.categorias.find(categoria => categoria.nombre === nombre )            
            },
            get () {
                return this.categoriaSeleccionada.nombre
            },
        },
    },
    watch: {
        categoriaSeleccionada: function (nuevo, viejo) {
            if (nuevo.uid === viejo.uid) {
                return
            }
            
            this.$emit('categoriaSeleccionada', nuevo)
        }
    },
    methods: {
        async inicializarListaCategorias () {
            const categoriasAux = []
            this.categorias = []
            this.ultimoDocumentoCategoria = null

            this.buscandoCategorias = true

            const db = this.$firebase.firestore()
            let ref = db.collection('Secciones').doc(this.seccion.uid).collection('Categorias')
            ref = ref.limit( this.cantidadCategoriasMaxima )
            const documentSnapshots = await ref.get()
            this.ultimoDocumentoCategoria = documentSnapshots.docs[documentSnapshots.docs.length-1]
            for (let i = 0; i < documentSnapshots.docs.length; i++) {
                const element = documentSnapshots.docs[i]
                categoriasAux.push( element.data() )
            }
            if (categoriasAux.length) {
                await this.verificarSiHayMasCategorias()
                this.categorias = categoriasAux
            }

            this.buscandoCategorias = false
        },
        async paginarCategorias () {
            // const categoriasAux = JSON.parse( JSON.stringify( this.categorias ) )
            this.buscandoCategorias = true
            
            const db = this.$firebase.firestore()
            let ref = db.collection('Secciones').doc(this.seccion.uid).collection('Categorias')
                .startAfter(this.ultimoDocumentoCategoria)
            ref = ref.limit(this.cantidadCategoriasMaxima)
            const documentSnapshots = await ref.get()
            this.ultimoDocumentoCategoria = documentSnapshots.docs[documentSnapshots.docs.length-1]
            await this.verificarSiHayMasCategorias()
            for (let i = 0; i < documentSnapshots.docs.length; i++) {
                const element = documentSnapshots.docs[i]
                // categoriasAux.push( element.data() )
                this.categorias.push( element.data() )
            }
            // await this.verificarSiHayMasCategorias()
            // this.categorias = categoriasAux

            this.buscandoCategorias = false
        },
        async verificarSiHayMasCategorias (inicio) {
            const db = this.$firebase.firestore()
            let ref = db.collection('Secciones').doc(this.seccion.uid).collection('Categorias')
            if (!inicio) {
                ref = ref.startAfter(this.ultimoDocumentoCategoria)
            }
            ref = ref.limit(1)
            const siguienteDato = await ref.get()
            this.existeMasCategorias = !siguienteDato.empty
        },
    },
    async created() {
        await this.verificarSiHayMasCategorias(true)
        if (this.existeMasCategorias) {
            await this.inicializarListaCategorias()
            this.categoriaSeleccionada = this.categorias[0]
        }
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