<template>
    <div class="container">
        <h3>{{uidUser}}</h3>
        <hr>
        <h3>Datos de usuarios</h3>

        <div class="mt-5 mb-5">
            <b>Personales</b>
            <hr width="30%">
        </div>

        <div class="mt-5 mb-5">
            <b>Roles</b>
            <hr width="30%">

            <v-row align="center">
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <div>

                        <v-select
                            v-model="input.datosRol.selectRol"
                            v-on:input="setDataRol(input.datosRol.selectRol, null)"
                            :items="list.roles"
                            item-text="text"
                            item-value="value"
                            label="Roles"
                            return-object
                        ></v-select>

                        <v-btn
                            class="mr-4"
                            @click="changeRol()"
                        >
                            Cambiar rol
                        </v-btn>
                        
                    </div>
                </v-col>

                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <div>

                        <v-select
                            v-if="getAdminTeamSECCION.includes(input.datosRol.selectRol.value)"
                            v-model="input.datosRol.selectSeccion"
                            v-on:input="setDataRol(input.datosRol.selectRol, input.datosRol.selectSeccion)"
                            :items="list.secciones"
                            item-text="text"
                            item-value="value"
                            label="Secciones de admin, subAdmin y creadorContenido"
                            multiple
                            return-object
                        ></v-select>
                        
                    </div>
                </v-col>
            </v-row>
        </div>

        <div class="mt-5 mb-5">
            <b>Premium</b>
            <hr width="30%">

            <v-row align="center">
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <v-select
                        v-model="input.datosPlan.selectTipoPremium"
                        v-on:input="setDataTipoPremium(input.datosPlan.selectTipoPremium, null, null, null)"
                        :items="list.tipoPremium"
                        item-text="text"
                        item-value="value"
                        label="Tipos premium"
                        return-object
                    ></v-select>
                </v-col>

                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >

                    <v-btn
                        @click="changeTipoPremium()"
                    >
                        Cambiar estado premium
                    </v-btn>

                </v-col>
            </v-row>

            <v-row align="center" v-if="input.datosPlan.selectTipoPremium.value">
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <div>
                        
                         <!-- MOSTRAR FECHA Y DURACION PREMIUM-->
                        <v-date-picker
                            v-model="input.datosPlan.selectFechaDeCompra"
                            block
                        ></v-date-picker>
                        
                    </div>
                </v-col>

                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <div>

                        <v-time-picker
                            v-model="input.datosPlan.selectHoraDeCompra"
                            class="mt-4"
                            format="24hr"
                            use-seconds
                            block
                        ></v-time-picker>

                    </div>
                </v-col>
            </v-row>
        </div>

        <div class="mt-5 mb-5">
            <b>Nombre de usuario</b>
            <hr width="30%">
        </div>

        <div class="mt-5 mb-5">
            <b>Correo</b>
            <hr width="30%">
        </div>

        <div class="mt-5 mb-5">
            <b>Contraseña</b>
            <hr width="30%">
        </div>

        {{dataUser}}
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import cookieparser from 'cookieparser'

export default {
    name: 'editUserRol_Admin',
    middleware: 'esUsuarioTeamJekuaa',
    data() {
        return {
            // UID del usuario
            uidUser: this.$route.params.uidUser,
            // Todos los datos de un usuario
            dataUser: {
                db: null,
                auth: null
            },
            // Datos para enviar para actualizar
            dataUserUpdate: {
                personal: {

                },
                rol: {
                    rol: null,
                    seccion: null
                },
                premium: {
                    tipoPremium: null,
                    fechaDeCompra: null,
                    duracionDeValidez: null
                },
                username: '',
                email: '',
                password: ''
            },
            // Datos que se seleccionan para la edicion
            input: {
                datosPlan: {
                    selectTipoPremium: { 
                        text: '', 
                        value: null
                    },
                    selectFechaDeCompra: null,
                    selectHoraDeCompra: null,
                    selectDuracionDeValidez: null,
                },
                datosRol: {
                    selectRol: { 
                        text: '',
                        value: null,
                    },
                    selectSeccion: [],
                },
            },
            // Lista de datos disponibles para la edicion
            list: {
                tipoPremium: [
                    { text: 'No premium', value: null },
                    { text: 'Básico', value: 'basico' },
                ],
                roles: [
                    { text: 'Usuario propietario', value: 'propietario' },
                    { text: 'Usuario administrador', value: 'admin' },
                    { text: 'Usuario sub-administrador', value: 'subAdmin' },
                    { text: 'Usuario creador de contenido', value: 'creadorContenido' },
                    { text: 'Usuario normal', value: 'normal' },
                ],
                secciones: [
                    { text: 'Informática', value: 'informatica' },
                    { text: 'Matemática', value: 'matematica' },
                    { text: 'Economía', value: 'economia' },
                    { text: 'Música', value: 'musica' }
                ],
            }
        }
    },
    methods: {
        initializeUserData () {
            let tipoPremium = this.dataUser.db.datosPlan.tipoPremium
            let fechaDeCompra = new Date(this.dataUser.db.datosPlan.fechaDeCompra._seconds*1000).toISOString().substring(0, 10)
            let horaDeCompra = new Date(this.dataUser.db.datosPlan.fechaDeCompra._seconds*1000).toTimeString().substring(0, 8)
            let duracionDeValidez = this.dataUser.db.datosPlan.duracionDeValidez

            let rol = this.dataUser.db.datosRol.rol
            let seccion = this.dataUser.db.datosRol.seccion

            this.initializeUserData_Premium(tipoPremium, fechaDeCompra, horaDeCompra, duracionDeValidez)

            this.initializeUserData_Rol(rol, seccion)

        },
        initializeUserData_Rol (rol, seccion) {
            // AGREGAR DATOS DE ROL
            console.log('this.getAdminTeamSECCION', this.getAdminTeamSECCION)
            const isAdminTeam = !!this.getAdminTeamSECCION.find(x => x === rol)
            const setRol = this.list.roles.filter(x => x.value === rol)[0]
            const setSeccion = isAdminTeam ? 
                                this.list.secciones.map(x => x.value).filter(x => {
                                    return seccion.includes(x)
                                }) :
                                null
            this.setDataRol(
                setRol, 
                setSeccion
            )
        },
        initializeUserData_Premium (tipoPremium, fechaDeCompra, horaDeCompra, duracionDeValidez) {
            
            // AGREGAR DATOS DE PREMIUM
            switch (tipoPremium) {
                // NO PREMIUM
                case null:
                    this.setDataTipoPremium(this.list.tipoPremium[0], null, null, null)
                    break;
                
                // PREMIUM BASICO
                case 'basico':
                    this.setDataTipoPremium(this.list.tipoPremium[1], fechaDeCompra, horaDeCompra, duracionDeValidez)
                    break;
            
                default:
                    break;
            }

        },
        setDataTipoPremium(selectTipoPremium, selectFechaDeCompra, selectHoraDeCompra, selectDuracionDeValidez) {
            this.input.datosPlan.selectTipoPremium = selectTipoPremium
            this.input.datosPlan.selectFechaDeCompra = selectFechaDeCompra
            this.input.datosPlan.selectHoraDeCompra = selectHoraDeCompra
            this.input.datosPlan.selectDuracionDeValidez = selectDuracionDeValidez
        },
        setDataRol (selectRol, selectSeccion) {

            this.input.datosRol.selectRol = selectRol
            this.input.datosRol.selectSeccion = !!selectSeccion ? selectSeccion : []

        },
        changeTipoPremium () {
            
        },
        changeRol () {

        }
    },
    computed: {
        ...mapGetters('modules/user/user', ['token']),
        ...mapGetters('modules/system', ['getAdminTeamSECCION']),
    },
    async mounted() {
        
        try {
            // GET TOKEN CON VUEX
            const body = {
                auth: `Bearer ${this.token}`,
                uid: this.uidUser
            }

            const res = await this.$axios.$post('/userAdmin/readOneUserByUID', body)

            if(!res.code.includes('Error')){

                this.dataUser.db = res.result.dataUserDB
                this.dataUser.auth = res.result.dataUserAuth
                
                this.initializeUserData()
                
            } else {

            }

        } catch (error) {
            console.log('error', error)
            
        } finally {

        }

    }
}
</script>

<style>

</style>