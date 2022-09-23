<template>
    <div class="container container2">
        <div class="contenedorFlex" v-if="datosCurso">
            <v-card
                v-for="(contribuyente, index) in contribuyentes" :key="index"
                :loading="!!contribuyente.proceso"
                class="contenedorFlexContribuyente"
                :disabled="!!contribuyente.proceso"
            >
                <template slot="progress">
                    <v-progress-linear
                        :color="setColorVProgressLinear(contribuyente.proceso)"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                </template>

                <v-img
                    v-if="contribuyente.photoURL"
                    height="200"
                    :src="contribuyente.photoURL"
                ></v-img>
                <v-img
                    v-else
                    height="200"
                    :src="require(`~/assets/img/loading1.jpg`)"
                ></v-img>

                <v-card-title>
                    {{
                        contribuyente.displayName ?
                        contribuyente.displayName : 'Cargando...'
                    }}
                </v-card-title>

                <v-card-text style="margin-top: -10px; margin-bottom: 35px;">

                    <div class="text-subtitle-1">
                        Contribuyente
                    </div>

                </v-card-text>

                <v-spacer></v-spacer>

                <v-card-actions style="position: absolute; bottom: 0;">
                    <v-btn
                        :disabled="contribuyente.uid === datosCurso.instructor"
                        text
                        color="red lighten-2"
                        v-on:click="quitarContribuyente(contribuyente.uid)"
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
    name: 'contribuyentes',
    layout: 'miembro',
    middleware: 'esInstructor',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            datosCurso: null,
            contribuyentes: [],
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
        async quitarContribuyente (uidUsuario) {
            const index1 = this.datosCurso.contribuyentes.findIndex(v => v == uidUsuario)
            const index2 = this.contribuyentes.findIndex(v => v.uid == uidUsuario)

            try {
                this.contribuyentes[index2].proceso = 'eliminando'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                await this.$axios.$delete(`/serviceCursoBorrador/miembro/quitar-contribuyente/${this.uidCurso}/${uidUsuario}`, config)

                if (index1 !== -1) this.datosCurso.contribuyentes.splice(index1, 1)
                if (index2 !== -1) this.contribuyentes.splice(index2, 1)
                
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

        for (const contribuyente of this.datosCurso.contribuyentes) {
            this.contribuyentes.push({
                uid: contribuyente,
                photoURL: '',
                displayName: '',
                proceso: 'cargando',
            })
        }

        const contribuyentesAux = []
        for (const contribuyente of this.contribuyentes) {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            }
            const auth = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${contribuyente.uid}`, config)
            contribuyentesAux.push({
                uid: contribuyente.uid,
                photoURL: auth.resultado.photoURL ? auth.resultado.photoURL : '',
                displayName: auth.resultado.displayName,
                proceso: false,
            })
        }

        this.contribuyentes = contribuyentesAux
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

.contenedorFlexContribuyente {
    margin-right: 6px;
    margin-bottom: 6px;
    max-width: 300px;
}
</style>