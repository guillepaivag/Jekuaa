<template>
    <div class="container container2">
        <div class="contenedorFlex" v-if="datosCurso">
            <v-card
                v-for="(auxiliar, index) in auxiliares" :key="index"
                :loading="!!auxiliar.proceso"
                class="contenedorFlexAuxiliar"
                :disabled="!!auxiliar.proceso"
            >
                <template slot="progress">
                    <v-progress-linear
                        :color="setColorVProgressLinear(auxiliar.proceso)"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>

                <v-img
                    v-if="auxiliar.photoURL"
                    height="200"
                    :src="auxiliar.photoURL"
                ></v-img>
                <v-img
                    v-else
                    height="200"
                    :src="require(`~/assets/img/loading1.jpg`)"
                ></v-img>

                <v-card-title>
                    {{
                        auxiliar.displayName ?
                        auxiliar.displayName : 'Cargando...'
                    }}
                </v-card-title>

                <v-card-text style="margin-top: -10px; margin-bottom: 35px;">

                    <div class="text-subtitle-1">
                        Auxiliar
                    </div>

                </v-card-text>

                <v-spacer></v-spacer>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        text
                        color="red lighten-2"
                        v-on:click="quitarAuxiliar(auxiliar.uid)"
                    >
                        <v-icon left>
                            mdi-delete
                        </v-icon>
                        Quitar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: 'auxiliares',
    layout: 'miembro',
    middleware: 'esInstructor',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            datosCurso: null,
            auxiliares: [],
        }
    },
    components: {
        
    },
    methods: {
        setColorVProgressLinear (proceso) {
            if (proceso === 'cargando') return '#683bce'
            else if (proceso === 'eliminando') return 'red'
            else if (proceso === false) return ''
        },
        async quitarAuxiliar (uidUsuario) {
            const index1 = this.datosCurso.auxiliares.findIndex(v => v == uidUsuario)
            const index2 = this.auxiliares.findIndex(v => v.uid == uidUsuario)

            try {
                this.auxiliares[index2].proceso = 'eliminando'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$delete(`/serviceCursoBorrador/miembro/quitar-auxiliar/${this.uidCurso}/${uidUsuario}`, config)

                if (index1 !== -1) this.datosCurso.auxiliares.splice(index1, 1)
                if (index2 !== -1) this.auxiliares.splice(index2, 1)
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                
            }
        }
    },
    async created() {
        const doc = await fb.firestore()
            .collection('CursosBorrador').doc(this.$route.params.uidCurso)
            .get()

        if (!doc.exists) this.$router.push('/miembro/cursos/mis-cursos/borrador')

        this.datosCurso = doc.data()

        for (const auxiliar of this.datosCurso.auxiliares) {
            this.auxiliares.push({
                uid: auxiliar,
                photoURL: '',
                displayName: '',
                proceso: 'cargando',
            })
        }

        const auxiliaresAux = []
        for (const auxiliar of this.auxiliares) {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            }
            const auth = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${auxiliar.uid}`, config)
            auxiliaresAux.push({
                uid: auxiliar.uid,
                photoURL: auth.resultado.photoURL ? auth.resultado.photoURL : '',
                displayName: auth.resultado.displayName,
                proceso: false,
            })
        }

        this.auxiliares = auxiliaresAux
    },
    beforeDestroy() {
        // alert('Hay cambios para guardar!')
    },
}
</script>

<style scoped>
.container2 {
    margin-top: -12px;
}

.contenedorFlex {
    display: flex;
    flex-wrap: wrap;
}

.contenedorFlexAuxiliar {
    margin-right: 6px;
    margin-bottom: 6px;
    max-width: 300px;
}
</style>