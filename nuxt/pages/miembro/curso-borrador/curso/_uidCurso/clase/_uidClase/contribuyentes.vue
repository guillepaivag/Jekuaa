<template>
    <div class="container">
        <div v-if="cargando">
            Cargando...
        </div>
        <div v-else>

            <div v-if="datosCurso && datosUnidad && datosClase">
                <h2> Curso: <b>{{ datosCurso.titulo }}</b> </h2>
                
                <h3>
                    Unidad {{ datosUnidad.ordenUnidad }} / Clase {{ datosClase.ordenClase }} - Contribuyentes
                </h3>
            </div>

            <v-divider class="mb-5" />

            <v-card
                v-for="(contribuyente, index) in contribuyentes" :key="index"
                class="mx-auto mb-7"
                max-width="600"
                outlined
                :style="`border-color: ${contribuyente.esContribuyente ? 'green' : 'red'};`"
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                            {{ contribuyente.firestore.nombreUsuario }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ contribuyente.auth.displayName }}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                        size="80"
                        color="grey"
                    >
                        <img 
                            v-if="contribuyente.auth.photoURL"
                            :src="contribuyente.auth.photoURL" 
                            alt=""
                        >
                    </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn
                        :color="contribuyente.esContribuyente ? 'red' : 'green'"
                        :loading="contribuyente.procesando"
                        outlined
                        rounded
                        text
                        @click="accion(contribuyente)"
                    >
                        {{ contribuyente.esContribuyente ? 'Quitar' : 'Agregar' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esInstructor',

    data () {
        return {
            uidCurso: this.$route.params.uidCurso,
            uidUnidad: '',
            uidClase: this.$route.params.uidClase,
            contribuyentes: [],
            contribuyentesClase: [],
            cargando: true,
            datosCurso: null,
            datosUnidad: null,
            datosClase: null,
        }
    },

    methods: {
        accion (contribuyente) {
            if (contribuyente.esContribuyente) this.quitarContribuyente(contribuyente.uid)
            else this.agregarContribuyente(contribuyente.uid)
        },
        async agregarContribuyente (uidContribuyente) {
            const contribuyente = this.contribuyentes.find(v => v.uid === uidContribuyente)
            contribuyente.esContribuyente = true
            contribuyente.procesando = true
            this.contribuyentesClase.push(contribuyente.uid)

            const datosClase = { contribuyentes: this.contribuyentesClase }

            await this.actualizarContribuyente(datosClase)

            contribuyente.procesando = false
        },
        async quitarContribuyente (uidContribuyente) {
            const contribuyente = this.contribuyentes.find(v => v.uid === uidContribuyente)
            contribuyente.esContribuyente = false
            contribuyente.procesando = true
            
            const index = this.contribuyentesClase.findIndex(v => v === uidContribuyente)
            this.contribuyentesClase.splice(index, 1)

            const datosClase = { contribuyentes: this.contribuyentesClase }

            await this.actualizarContribuyente(datosClase)

            contribuyente.procesando = false
        },
        async actualizarContribuyente (datosClase) {
            
            let token = this.$firebase.auth().currentUser
            token = token ? await token.getIdToken() : ''
            await this.$store.dispatch('modules/usuarios/setTOKEN', token)

            const body = { datosClase }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            await this.$axios.$put(`/serviceCursoBorrador/miembro/clase/actualizar/${this.uidCurso}/${this.uidUnidad}/${this.uidClase}`, body, config)
        
        }
    },

    async created () {
        this.cargando = true

        const docCurso = await db.collection('CursosBorrador').doc(this.uidCurso).get()
        const snapshotClase = await db.collectionGroup('ClasesBorrador').where('uid', '==', this.uidClase).get()
        const docClase = snapshotClase.docs[0]
        const docUnidad = await docClase.ref.parent.parent.get()
        
        this.uidUnidad = docClase.ref.parent.parent.id
        this.contribuyentesClase = docClase.data().contribuyentes

        this.datosCurso = docCurso.data()
        this.datosUnidad = docUnidad.data()
        this.datosClase = docClase.data()

        const contribuyentesAux = []
        for (const contribuyente of docCurso.data().contribuyentes) {
            const ref = this.$firebase.firestore().collection('Usuarios').doc(contribuyente)
            const doc = await ref.get()
            const datosUsuario = doc.data()

            let config = {
                headers: { 'Content-Type': 'application/json' }
            }
            const respuesta = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${contribuyente}`, config)
            const datosAuth = respuesta.resultado

            contribuyentesAux.push({
                uid: contribuyente,
                auth: datosAuth,
                firestore: datosUsuario,
                esContribuyente: docClase.data().contribuyentes.includes(contribuyente),
                procesando: false,
            })
        }

        this.contribuyentes = contribuyentesAux

        this.cargando = false
    }
}
</script>

<style lang="scss" scoped>

</style>