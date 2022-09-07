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

<style lang="scss" scoped>
// .ProseMirror {
//     padding: 0 135px 20px 135px;

//     // ESTILOS CONTENIDO
//     > * + * {
//         margin-top: 1em;
//     }

//     ul,
//     ol {
//         padding: 0 1rem;
//     }

//     li {
//         margin-left: 10px;
//     }

//     pre {
//         background: #0D0D0D;
//         color: #FFF;
//         font-family: 'JetBrainsMono', monospace;
//         overflow: auto;
//         padding: 5px;
//         border-radius: 0.5rem;

//         code {
//             color: inherit;
//             padding: 0;
//             background: none;
//             font-size: 0.8rem;
//         }
//     }

//     blockquote {
//         padding-left: 1rem;
//         border-left: 2px solid rgba(#0D0D0D, 0.1);
//     }

//     hr {
//         border: none;
//         border-top: 2px solid rgba(#0D0D0D, 0.1);
//         margin: 3rem 0;
//     }

//     h1 {
//         margin-bottom: 20px;
//         font-weight: bold;
//         font-size: 40px;
//     }

//     h2 {
//         margin-bottom: 20px;
//         font-weight: bold;
//         font-size: 30px;
//     }

//     h3 {
//         margin-bottom: 20px;
//         font-weight: bold;
//         font-size: 25px;
//     }

//     p {
//         margin-bottom: 20px;
//         font-size: 20px;
//     }

//     img {
//       width: 100%;

//       &.ProseMirror-selectednode {
//         outline: 3px solid #68CEF8;
//       }
//     }
// }

// @media (min-width: 0) and (max-width: 899px) { 
//     .ProseMirror {
//         margin: 0;
//         padding: 0 7px 20px 7px;
//     }
// }

// @media (min-width: 700px) and (max-width: 899px) { 
//     .ProseMirror {
//         p {
//             margin-bottom: 20px;
//             font-size: 18px;
//         }
//     }
// }

// @media (min-width: 0) and (max-width: 699px) { 
//     .ProseMirror {
//         p {
//             margin-bottom: 20px;
//             font-size: 18px;
//         }
//     }
// }
</style>