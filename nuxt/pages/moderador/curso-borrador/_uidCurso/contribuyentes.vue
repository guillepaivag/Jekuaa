<template>
    <div class="container">
        <v-row>
            <v-col cols="12" md="8">
                <div class="mt-3">
                    <!-- Tipo de busqueda -->
                    <v-checkbox
                        v-model="tipoBusquedaCorreo"
                        label="Correo"
                        color="#683bce"
                        hide-details
                        style="display: inline-block;"
                        class="mr-5"
                    ></v-checkbox>
                    <v-checkbox
                        v-model="tipoBusquedaNombreUsuario"
                        label="Nombre de usuario"
                        color="#683bce"
                        hide-details
                        style="display: inline-block;"
                        class="mr-5"
                    ></v-checkbox>
                    <v-checkbox
                        v-model="tipoBusquedaUID"
                        label="UID"
                        color="#683bce"
                        hide-details
                        style="display: inline-block;"
                        class="mr-5"
                    ></v-checkbox>

                    <!-- Buscador -->
                    <div class="mt-3">
                        <v-text-field
                            v-if="tipoBusquedaCorreo"
                            v-model="codigo"
                            :counter="100"
                            label="Correo del usuario"
                        ></v-text-field>
                        <v-text-field
                            v-else-if="tipoBusquedaNombreUsuario"
                            v-model="codigo"
                            :counter="20"
                            label="Nombre de usuario"
                        ></v-text-field>
                        <v-text-field
                            v-else-if="tipoBusquedaUID"
                            v-model="codigo"
                            label="UID del usuario"
                        ></v-text-field>
                        <v-btn
                            class="mt-2"
                            outlined
                            rounded
                            text
                            color="#683bce"
                            v-on:click="buscar"
                        >
                            Buscar
                        </v-btn>
                    </div>
                </div>

                <v-divider class="my-7"></v-divider>

                <!-- Resultados -->
                <div v-if="buscando">
                    Buscando..
                    <v-progress-linear
                        indeterminate
                        color="#683bce"
                    ></v-progress-linear>
                </div>
                <div v-else>
                    <div class="" v-if="datosUsuario">
                        <!-- Agregar/Eliminar -->
                        <div 
                            v-if="datosCurso.instructor !== datosUsuario.firestore.uid"
                            class="text-center"
                        >
                            <div class="mb-7" v-if="uidContribuyentes.includes(datosUsuario.firestore.uid)">
                                <v-btn
                                    :disabled="actualizandoContribuyentes"
                                    class=""
                                    outlined
                                    rounded
                                    text
                                    color="#683bce"
                                    v-on:click="quitarContribuyente(datosUsuario.firestore.uid)"
                                >
                                    <v-icon left>
                                        mdi-minus
                                    </v-icon>
                                    Quitar de contribuyentes
                                </v-btn>
                            </div>
                            <div class="mb-7" v-else>
                                <v-btn
                                    :disabled="actualizandoContribuyentes"
                                    class=""
                                    outlined
                                    rounded
                                    text
                                    color="#683bce"
                                    v-on:click="agregarContribuyente(datosUsuario.firestore.uid)"
                                >
                                    <v-icon left>
                                        mdi-plus
                                    </v-icon>
                                    Agregar contribuyente
                                </v-btn>
                            </div>
                        </div>

                        <VisualizadorDatosUsuario 
                            :firestore="datosUsuario.firestore" 
                            :auth="datosUsuario.auth" 
                            :miembro="datosUsuario.miembro" 
                        />
                        
                    </div>
                    <div v-else-if="noExisteElUsuario">
                        No existe el usuario :(
                    </div>
                    <div v-else>
                        Busca un usuario :)
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <!-- Eliminar -->
                <v-card
                    v-for="(item, index) in datosContribuyentes" :key="index"
                    :loading="item.estado === 'cargando'"
                    class="mt-5 mb-7"
                    outlined
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title v-if="item.estado === 'cargando'" class="text-h5 mb-1">
                                Cargando...
                            </v-list-item-title>
                            <v-list-item-title v-else class="text-h5 mb-1">
                                {{ item.auth.displayName }}
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="item.estado !== 'cargando'">
                                {{ item.firestore.nombreUsuario }}
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                            v-if="item.estado === 'cargando'"
                            tile
                            size="80"
                            color="grey"
                        ></v-list-item-avatar>
                        <v-list-item-avatar
                            v-else
                            tile
                            size="80"
                            color="grey"
                        >
                            <v-img :src="item.auth.photoURL"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                        <div class="py-2">
                            <v-btn
                                :disabled="datosCurso.instructor === item.uid || actualizandoContribuyentes || item.estado === 'cargando'"
                                class=""
                                outlined
                                rounded
                                text
                                color="#683bce"
                                v-on:click="quitarContribuyente(item.uid)"
                            >
                                <v-icon left>
                                    mdi-minus
                                </v-icon>
                                Quitar de contribuyentes
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import VisualizadorDatosUsuario from '@/components/usuarios/moderador/VisualizadorDatosUsuario'
import { fb } from '~/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            datosCurso: null,
            uidContribuyentes: [],
            datosContribuyentes: [],

            tipoBusquedaCorreo: true,
            tipoBusquedaNombreUsuario: false,
            tipoBusquedaUID: false,
            codigo: 'buscaUnCorreo@gmail.com',

            buscando: false,
            datosUsuario: null,
            noExisteElUsuario: false,

            actualizandoContribuyentes: false,
        }
    },
    components: {
        VisualizadorDatosUsuario
    },
    methods: {
        vaciar () {
            this.buscando = false
            this.datosUsuario = null
            this.noExisteElUsuario = false
        },
        async buscar () {
            try {
                this.vaciar()
                this.buscando = true

                let tipoBusqueda = ''
                if (this.tipoBusquedaCorreo) tipoBusqueda = 'correo'
                else if (this.tipoBusquedaNombreUsuario) tipoBusqueda = 'nombreUsuario'
                else if (this.tipoBusquedaUID) tipoBusqueda = 'uid'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const data = await this.$axios.$get(`/serviceUsuario/moderador/obtenerUsuario/${tipoBusqueda}/${this.codigo}`, config)

                if (data.estado !== 200) {
                    this.noExisteElUsuario = true
                    this.buscando = false
                    return
                }

                if (data.resultado.firestore.rol !== 'estudiante') {
                    const doc = await db.collection('Miembros').doc(data.resultado.firestore.uid)
                    .get()

                    this.datosUsuario = Object.assign(data.resultado, {
                        miembro: doc.data()
                    })
                } else {
                    this.datosUsuario = data.resultado
                }

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.buscando = false
            }
        },
        async quitarContribuyente (uidUsuario) {
            let array1 = JSON.parse( JSON.stringify( this.datosCurso.contribuyentes ) )
            let array2 = JSON.parse( JSON.stringify( this.uidContribuyentes ) )
            let array3 = JSON.parse( JSON.stringify( this.datosContribuyentes ) )

            const index1 = array1.findIndex(v => v === uidUsuario)
            array1.splice(index1, 1)
            this.datosCurso.contribuyentes = array1

            const index2 = array2.findIndex(v => v === uidUsuario)
            array2.splice(index2, 1)
            this.uidContribuyentes = array2

            const index3 = array3.findIndex(v => v.uid === uidUsuario)
            array3.splice(index3, 1)
            this.datosContribuyentes = array3

            await this.actualizarContribuyentes()
        },
        async agregarContribuyente (uidUsuario) {
            this.datosCurso.contribuyentes.push(uidUsuario)
            this.uidContribuyentes.push(uidUsuario)
            this.datosContribuyentes.push({
                uid: uidUsuario,
                firestore: this.datosUsuario.firestore,
                auth: this.datosUsuario.auth,
                estado: 'listo',
            })

            await this.actualizarContribuyentes()
        },
        async actualizarContribuyentes () {
            this.actualizandoContribuyentes = true

            let token = this.$firebase.auth().currentUser
            token = token ? await token.getIdToken() : ''
            await this.$store.dispatch('modules/usuarios/setTOKEN', token)

            let body = { contribuyentes: this.uidContribuyentes }

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            await this.$axios.$put(`/serviceCursoBorrador/moderador/actualizarContribuyentes/${this.uidCurso}`, body, config)

            this.actualizandoContribuyentes = false
        }
    },
    watch: {
        tipoBusquedaCorreo: function (n, v) {
            if (this.tipoBusquedaCorreo) {
                this.codigo = 'buscaUnCorreo@gmail.com'
                this.tipoBusquedaNombreUsuario = false
                this.tipoBusquedaUID = false
            }
        },
        tipoBusquedaNombreUsuario: function (n, v) {
            if (this.tipoBusquedaNombreUsuario) {
                this.codigo = ''
                this.tipoBusquedaCorreo = false
                this.tipoBusquedaUID = false
            }
        },
        tipoBusquedaUID: function (n, v) {
            if (this.tipoBusquedaUID) {
                this.codigo = ''
                this.tipoBusquedaNombreUsuario = false
                this.tipoBusquedaCorreo = false
            }
        },
    },
    async created() {
        const doc = await db.collection('CursosBorrador').doc(this.uidCurso).get()

        if (!doc.exists) {
            this.$router.push('/moderador/cursos/borradores')
            return
        }

        this.datosCurso = doc.data()
        this.uidContribuyentes = doc.data().contribuyentes

        for (const uidContribuyente of this.uidContribuyentes) {
            this.datosContribuyentes.push({
                uid: uidContribuyente,
                firestore: null,
                auth: null,
                estado: 'cargando',
            })
        }

        let aux = JSON.parse( JSON.stringify( this.datosContribuyentes ) )

        const myPromise = new Promise((res, rej) => {
            for (let i = 0; i < this.uidContribuyentes.length; i++) {
                const uidContribuyente = this.uidContribuyentes[i]
                
                db.collection('Usuarios').doc(uidContribuyente).get()
                .then(async docUsuario => {
                    const { resultado } = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${docUsuario.id}`)

                    aux[i] = {
                        uid: uidContribuyente,
                        firestore: docUsuario.data(),
                        auth: resultado,
                        estado: 'listo',
                    }

                    const existe = aux.find(v => v.estado === 'cargando')
                    if (!existe) res(aux)
                })
            }
        })

        myPromise
        .then(res => { this.datosContribuyentes = res })
    },
}
</script>

<style scoped>

</style>