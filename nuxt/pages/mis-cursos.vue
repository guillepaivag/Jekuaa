<template>
    <div class="container">
        <div class="text-center" v-if="cargando">
            <v-progress-circular
                indeterminate
                color="green"
                class="mt-15"
            ></v-progress-circular>
        </div>
        <div class="mt-5" v-else>
            <h2>Mis cursos:</h2>
            <v-divider class="mb-7" />

            <div
                class="flex-container wrap"
            >
                <v-card
                    v-for="(item, index) in lista" :key="index"
                    class="flex-item"
                >
                    <v-img
                        :src="item.datos.fotoPerfil"
                        height="140px"
                    ></v-img>
                    <v-progress-linear
                        :value="item.progreso"
                        color="#683bce"
                        height="20"
                    >
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                    
                    <h2 class="mt-3 ml-3">
                        {{ item.datos.titulo }}
                    </h2>
                    
                    <v-card-actions>
                        <v-row 
                            align="center"
                            justify="end"
                        >
                            <v-btn
                                v-if="item.progreso === 100"
                                class="mb-2 mr-2 mt-4"
                                color="#683bce"
                                text
                                :to="`/curso/${item.datos.codigo}`"
                            >
                                Ir al curso
                            </v-btn>
                            <v-btn
                                v-else
                                class="mb-2 mr-2 mt-4"
                                color="#683bce"
                                text
                                :to="`/curso/${item.datos.codigo}/continuar`"
                            >
                                Continuar
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>

            <v-btn
                v-if="existeMas"
                :loading="cargandoLista"
                class="ma-2"
                outlined
                color="indigo"
                @click="paginar"
            >
                Cargar más
            </v-btn>
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            cargando: true,
            lista: [],
            ultimoDoc: null,
            existeMas: false,
            cantidadAMostrar: 3,
            cargandoLista: false,
        }
    },
    methods: {
        calcularPorcentajeProgreso (curso, miCurso) {
            const cantidadVisualizada = miCurso.cantidadVisualizada
            const cantidadClases = curso.cantidadClases

            return parseInt((cantidadVisualizada * 100) / cantidadClases)
        },
        async inicializarLista () {
            const usuario = this.$store.state.modules.usuarios

            this.existeMas = true
            this.cargando = true
            this.cargandoLista = true

            const snapshotMisCursos = await db.collection('Usuarios').doc(usuario.uid)
            .collection('MisCursos')
            .where('tipoAcceso', '==', 'completo')
            .orderBy('ultimaActividad', 'desc')
            .limit(this.cantidadAMostrar)
            .get()

            if (snapshotMisCursos.empty) {
                this.existeMas = false
                this.cargando = false
                this.cargandoLista = false
                return
            }

            this.ultimoDoc = snapshotMisCursos.docs[snapshotMisCursos.docs.length-1]

            const listaAux = []
            for (const docMiCurso of snapshotMisCursos.docs) {
                const miCurso = docMiCurso.data()

                const docCurso = await db.collection('CursosPublicado').doc(miCurso.uid).get()
                const curso = docCurso.data()

                const progresoCalculado = this.calcularPorcentajeProgreso(curso, miCurso)

                listaAux.push({
                    datos: curso,
                    progreso: progresoCalculado,
                })

                this.lista = listaAux
            }

            this.existeMas = await this.verificarSiExisteMas()

            this.cargando = false
            this.cargandoLista = false
        },
        async paginar () {
            const usuario = this.$store.state.modules.usuarios

            this.cargandoLista = true

            const snapshotMisCursos = await db
            .collection('Usuarios').doc(usuario.uid)
            .collection('MisCursos')
            .where('tipoAcceso', '==', 'completo')
            .orderBy('ultimaActividad', 'desc')
            .startAfter(this.ultimoDoc)
            .limit(this.cantidadAMostrar)
            .get()

            this.ultimoDoc = snapshotMisCursos.docs[snapshotMisCursos.docs.length-1]

            for (const docMiCurso of snapshotMisCursos.docs) {
                const miCurso = docMiCurso.data()
                const docCurso = await db.collection('CursosPublicado').doc(miCurso.uid).get()
                const curso = docCurso.data()

                const progresoCalculado = this.calcularPorcentajeProgreso(curso, miCurso)

                this.lista.push({
                    datos: curso,
                    progreso: progresoCalculado,
                })
                
            }

            this.existeMas = await this.verificarSiExisteMas()
            
            this.cargandoLista = false
        },
        async verificarSiExisteMas () {
            const usuario = this.$store.state.modules.usuarios
            const snapshot = await db.collection('Usuarios').doc(usuario.uid)
            .collection('MisCursos')
            .where('tipoAcceso', '==', 'completo')
            .orderBy('ultimaActividad', 'desc')
            .startAfter(this.ultimoDoc)
            .limit(1)
            .get()

            return !snapshot.empty
        },
    },
    async created () {
        await this.inicializarLista()
    },
}
</script>

<style lang="scss" scoped>
.flex-container {
    padding: 0;
    margin: 0;
    list-style: none;
    -ms-box-orient: horizontal;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
}

.wrap { 
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}

.flex-item {
    width: 344px;
    margin-right: 35px;
    margin-bottom: 35px;
}

@media (max-width: 787px) {
    .flex-item {
        width: 100% !important;
    }
}

</style>