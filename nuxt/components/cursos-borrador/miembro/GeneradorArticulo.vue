<template>
    <div>
        <div class="mt-3 mb-7">
            <Tiptap 
                class="mt-5" 
                v-model="articulo" 
                :contenidoNuevo="articuloInicial"
            />
        </div>
        
        <div class="text-center">
            <v-btn
                :disabled="!articulo"
                color="primary"
                text
                @click="sendArticulo"
            >
                Subir articulo
            </v-btn>
        </div>
    </div>
</template>

<script>    
import Tiptap from '@/components/Tiptap'

export default {
    name: '',
    data() {
        return {
            articulo: '',
            articuloInicial: '',
        }
    },
    components: {
        'Tiptap': Tiptap,
    },
    props: {
        uidCurso: String,
        uidUnidad: String,
        uidClase: String,
        otrosDatos: {
            type: Object,
            /**
             * {
             *      tipoContenidoClaseActual: String,
             *      contenidoClaseActual: Object || String,
             * }
            */
        },
    },
    methods: {
        inicializacion () {
            this.articulo = this.otrosDatos.tipoContenidoClaseActual === 'articulo' ? this.otrosDatos.contenidoClaseActual : ''
            this.articuloInicial = this.otrosDatos.tipoContenidoClaseActual === 'articulo' ? this.otrosDatos.contenidoClaseActual : ''
        },
        
        sendArticulo () {
            this.$emit('sendArticulo', {
                uidCurso: this.uidCurso,
                uidUnidad: this.uidUnidad,
                uidClase: this.uidClase,
                articulo: this.articulo,
            })
        },
    },
    watch: {
        otrosDatos: function (n, v) {
            this.inicializacion()
        }
    },
    created () {
        this.inicializacion()
    },
}
</script>
