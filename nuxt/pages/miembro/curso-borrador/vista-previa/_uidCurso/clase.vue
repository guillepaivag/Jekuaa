<template>
    <div class="container">
        <div class="mt-0 mb-5">
            <v-breadcrumbs>
                <div v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                    <v-breadcrumbs-item
                        :href="breadcrumb.href"
                        :disabled="breadcrumb.disabled"
                        :nuxt="true"
                    >
                        {{ breadcrumb.text.toUpperCase() }}
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider v-if="index !== breadcrumbs.length-1">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-breadcrumbs-divider>
                </div>
            </v-breadcrumbs>
        </div>

        <div class="mb-10">
            <v-row>
                <v-col cols="12" :md="listaClases ? '8' : '12'">
                    <!-- Contenido de la clase -->
                    <nuxt-child 
                        :listaClases="listaClases" 
                        :unidades="unidades" 
                        @agregarListaClases="agregarListaClases($event)"
                    />
                </v-col>
                <v-col cols="12" md="4" v-if="listaClases">

                    <v-btn
                        class="btnAgregarListaClases mb-3"
                        outlined
                        block
                        color="#683bce"
                        v-on:click="quitarListaClases"
                    >
                        Quitar lista de clases
                    </v-btn>
                    
                    <!-- Lista de unidades y clases -->
                    <ListaUnidadesClases 
                        :uidCurso="uidCurso" 
                        :unidades="unidades" 
                    />

                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

import ListaUnidadesClases from '@/components/cursos-borrador/miembro/ListaUnidadesClases'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esMiembro',

    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            listaClases: true,
            unidades: [],
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Miembro',
                    disabled: false,
                    href: '/miembro',
                },
                {
                    text: 'Cursos',
                    disabled: false,
                    href: '/miembro/cursos',
                },
                {
                    text: 'Borradores',
                    disabled: false,
                    href: '/miembro/cursos/borradores',
                },
            ],
        }
    },

    components: {
        ListaUnidadesClases,
    },
    
    methods: {
        quitarListaClases () {
            this.listaClases = false
        },

        agregarListaClases (data = {}) {
            this.listaClases = true
        },
    },

    watch: {
        
    },

    async mounted () {
        const db = fb.firestore()
        
        // Lista unidades/clases
        const snapshot = await db
        .collection('CursosBorrador').doc(this.uidCurso)
        .collection('UnidadesBorrador').orderBy('ordenUnidad')
        .get()

        let i = 0
        let unidades = []
        for (const doc1 of snapshot.docs) {
            unidades.push({
                data: doc1.data(),
                clases: []
            })

            const snapshot2 = await db
            .collection('CursosBorrador').doc(this.uidCurso)
            .collection('UnidadesBorrador').doc(doc1.id)
            .collection('ClasesBorrador').orderBy('ordenClase').get()

            for (const doc2 of snapshot2.docs) {
                unidades[i].clases.push({
                    data: doc2.data(),
                    contenido: null
                })
            }

            i++
        }

        this.unidades = unidades
    },

    async created() {
        const db = fb.firestore()
        const doc = await db.collection('CursosBorrador').doc(this.uidCurso).get()

        if (!doc.exists) return this.$router.push('/miembro/cursos/borradores')

        this.breadcrumbs.push({
            text: doc.data().titulo,
            disabled: false,
            href: `/miembro/curso-borrador/${this.uidCurso}`,
        })
        this.breadcrumbs.push({
            text: 'Clase',
            disabled: true,
            href: ``,
        })
    },
}
</script>

<style scoped>
.tituloUnidad {
    
}

.tituloClase {
    font-size: 13px;
}

@media (max-width: 959px) {
    .btnAgregarListaClases {
        display: none;
    }
}
</style>