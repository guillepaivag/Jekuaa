<template>
    <div class="container d-flex flex-wrap">
        <v-card
            v-for="(item, index) in items" :key="index"
            class="cardAction ma-3"
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <!-- <div class="text-overline mb-4">
                        Moderación de cursos
                    </div> -->
                    <v-list-item-title class="text-h5 mb-1">
                        {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-5">
                        {{ item.description }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-2 mb-3"></v-divider>

            <v-card-actions>
                <v-btn
                    :loading="item.id === 'contenidos' && uidPrimeraClase === 'cargando'"
                    :disabled="item.id === 'contenidos' && uidPrimeraClase === 'sin-clase'"
                    outlined
                    rounded
                    text
                    block
                    color="#683bce"
                    :to="item.to"
                >
                    Acceder
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            items: [
                { id: 'auxiliares', title: 'Actualizar auxiliares', description: 'Agregar/eliminar ayudantes en este curso para facilitar las tareas.', to: `/moderador/curso-borrador/${this.uidCurso}/auxiliares` },
                { id: 'contenidos', title: 'Verificar contenido', description: 'Verificar si el contenido del curso es válido.', to: `` },
            ],
            uidPrimeraClase: 'cargando',
        }
    },
    async created () {
        const snapshotUnidad = await db.collection('CursosBorrador').doc(this.uidCurso)
        .collection('UnidadesBorrador').where('ordenUnidad', '==', 1)
        .get()

        if (snapshotUnidad.empty) {
            this.uidPrimeraClase = 'sin-clase'
            return
        }

        const snapshotClase = await snapshotUnidad.docs[0].ref
        .collection('ClasesBorrador').where('ordenClase', '==', 1)
        .get()

        if (snapshotClase.empty) {
            this.uidPrimeraClase = 'sin-clase'
            return
        }

        this.uidPrimeraClase = snapshotClase.docs[0].id

        const items = JSON.parse( JSON.stringify( this.items ) )
        items[1].to = `/moderador/curso-borrador/${this.uidCurso}/clase/${this.uidPrimeraClase}`

        this.items = items
    },
}
</script>

<style scoped>
.cardAction {
    height: 190px;
    max-width: 400px;
}

@media (max-width: 877px) {
    .cardAction {
        max-width: 100%;
        width: 100%;
    }
}
</style>