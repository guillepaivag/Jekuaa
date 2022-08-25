<template>
    <div class="container">
        <div class="mt-3">
            
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

        <div v-if="buscando">
            Buscando..
            <v-progress-linear
            indeterminate
            color="#683bce"
            ></v-progress-linear>
        </div>
        <div v-else>
            <div class="container" v-if="datosUsuario">
                <v-row>

                    <v-col cols="12" md="8">
                        <VisualizadorDatosUsuario 
                            :firestore="datosUsuario.firestore" 
                            :auth="datosUsuario.auth" 
                        />
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-btn
                            v-if="datosUsuario.auth.disabled"
                            class=""
                            block
                            outlined
                            color="green"
                            disabled
                        >
                            Habilitar
                        </v-btn>
                        <v-btn
                            v-else
                            class=""
                            block
                            outlined
                            rounded
                            text
                            color="red"
                            disabled
                        >
                            Deshabilitar
                        </v-btn>

                        <v-divider class="my-5"></v-divider>

                        <!-- Actualizar rol -->
                        <v-card :loading="actualizandoRol" :disabled="actualizandoRol" class="mb-5" v-if="$store.state.modules.usuarios.rol === 'propietario'">
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="text-overline mb-1">
                                        <u>Actualizar rol</u>
                                    </div>

                                    <div class="my-3">
                                        <v-btn
                                            v-for="(item, index) in roles" :key="index"
                                            class="ma-2"
                                            dark
                                            small
                                            :color="item.selected ? 'green' : '#AFAFAF'"
                                            v-on:click="selectRol(item.value)"
                                        >
                                            {{ item.text }}
                                        </v-btn>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-card-actions class="ml-1">
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    v-on:click="actualizarRol"
                                >
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <!-- Actualizar funciones de moderador -->
                        <v-card :loading="actualizandoFuncionesModerador" :disabled="actualizandoFuncionesModerador" class="mb-5" v-if="$store.state.modules.usuarios.rol === 'propietario' && esModerador">
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="text-overline mb-1">
                                        <u>Actualizar funciones de moderador</u>
                                    </div>

                                    <div class="my-3">
                                        <v-btn
                                            v-for="(item, index) in funcionesModerador" :key="index"
                                            class="ma-2"
                                            dark
                                            small
                                            :color="item.selected ? 'green' : '#AFAFAF'"
                                            v-on:click="selectFuncionModerador(item.value)"
                                        >
                                            {{ item.text }}
                                        </v-btn>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-card-actions class="ml-1">
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    v-on:click="actualizarFuncionesModerador"
                                >
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <!-- Actualizar funciones de miembro -->
                        <v-card :loading="actualizandoFuncionesMiembro" :disabled="actualizandoFuncionesMiembro" class="mb-5" v-if="datosUsuario.firestore.rol !== 'estudiante' && esMiembro">
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="text-overline mb-1">
                                        <u>Actualizar funciones de miembro</u>
                                    </div>
                                    
                                    <div class="my-3">
                                        <v-btn
                                            v-for="(item, index) in funcionesMiembro" :key="index"
                                            class="ma-2"
                                            dark
                                            small
                                            :color="item.selected ? 'green' : '#AFAFAF'"
                                            v-on:click="selectFuncionMiembro(item.value)"
                                        >
                                            {{ item.text }}
                                        </v-btn>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-card-actions class="ml-1">
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    v-on:click="actualizarFuncionesMiembro"
                                >
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>

                </v-row>
            </div>
            <div v-else-if="noExisteElUsuario">
                No existe el usuario :(
            </div>
            <div v-else>
                Busca un usuario :)
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import VisualizadorDatosUsuario from '@/components/usuarios/moderador/VisualizadorDatosUsuario'

export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    data() {
        return {
            tipoBusquedaCorreo: true,
            tipoBusquedaNombreUsuario: false,
            tipoBusquedaUID: false,
            codigo: 'buscaUnCorreo@gmail.com',
            datosUsuario: null,
            buscando: false,
            roles: [
                { text: 'Propietario', value: 'propietario', selected: false, },
                { text: 'Moderador', value: 'moderador', selected: false, },
                { text: 'Miembro', value: 'miembro', selected: false, },
                { text: 'Estudiante', value: 'estudiante', selected: false, },
            ],
            funcionesModerador: [
                { text: 'Moderador de usuarios', value: 'moderador-usuarios', selected: false, },
                { text: 'Moderador de blogs', value: 'moderador-blogs', selected: false, },
                { text: 'Moderador de cursos', value: 'moderador-cursos', selected: false, },
            ],
            funcionesMiembro: [
                { text: 'Instructor', value: 'instructor', selected: false, },
                { text: 'Blogger', value: 'blogger', selected: false, },
            ],
            esMiembro: false,
            esModerador: false,
            actualizandoRol: false,
            actualizandoFuncionesModerador: false,
            actualizandoFuncionesMiembro: false,
            noExisteElUsuario: false
        }
    },
    components: {
        VisualizadorDatosUsuario
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
    methods: {
        vaciar () {
            this.datosUsuario = null
            this.roles = [
                { text: 'Propietario', value: 'propietario', selected: false, },
                { text: 'Moderador', value: 'moderador', selected: false, },
                { text: 'Miembro', value: 'miembro', selected: false, },
                { text: 'Estudiante', value: 'estudiante', selected: false, },
            ]
            this.funcionesMiembro = [
                { text: 'Instructor', value: 'instructor', selected: false, },
                { text: 'Blogger', value: 'blogger', selected: false, },
                { text: 'Instructor Auxiliar', value: 'instructor-auxiliar', selected: false, },
            ]
            this.funcionesModerador = [
                { text: 'Moderador de usuarios', value: 'moderador-usuarios', selected: false, },
                { text: 'Moderador de blogs', value: 'moderador-blogs', selected: false, },
                { text: 'Moderador de cursos', value: 'moderador-cursos', selected: false, },
            ]
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

                this.datosUsuario = data.resultado

                // Seleccionar rol
                const index = this.roles.findIndex(v => v.value === this.datosUsuario.firestore.rol)
                this.roles[index].selected = true
                
                // Seleccionar funciones de miembro
                if (this.datosUsuario.firestore.rol !== 'estudiante') {
                    const docMiembro = await fb.firestore()
                    .collection('Miembros').doc(this.datosUsuario.firestore.uid).get()
                    this.esMiembro = docMiembro.exists
                    if (docMiembro.exists) {
                        const funcionesMiembro = docMiembro.data().funciones
                    
                        for (let i = 0; i < this.funcionesMiembro.length; i++) {
                            const element = this.funcionesMiembro[i]
                            
                            if (funcionesMiembro.find(v => v === element.value)) 
                                this.funcionesMiembro[i].selected = true
                        }
                    }
                    
                    // Seleccionar funciones de moderador
                    const docModerador = await fb.firestore()
                    .collection('Moderadores').doc(this.datosUsuario.firestore.uid).get()
                    this.esModerador = docModerador.exists
                    if (docModerador.exists) {
                        const funcionesModerador = docModerador.data().funciones

                        for (let i = 0; i < this.funcionesModerador.length; i++) {
                            const element = this.funcionesModerador[i]
                            
                            if (funcionesModerador.find(v => v === element.value)) 
                                this.funcionesModerador[i].selected = true
                        }
                    }
                }

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.buscando = false
            }
        },
        selectRol (rol) {
            const index = this.roles.findIndex(v => v.value === rol)
            for (let i = 0; i < this.roles.length; i++) {        
                this.roles[i].selected = false
                if (index === i) this.roles[i].selected = true
            }
        },
        selectFuncionMiembro (funcion) {
            const index = this.funcionesMiembro.findIndex(v => v.value === funcion)
            for (let i = 0; i < this.funcionesMiembro.length; i++) {        
                if (index === i) this.funcionesMiembro[i].selected = !this.funcionesMiembro[i].selected
            }
        },
        selectFuncionModerador (funcion) {
            const index = this.funcionesModerador.findIndex(v => v.value === funcion)
            for (let i = 0; i < this.funcionesModerador.length; i++) {        
                if (index === i) this.funcionesModerador[i].selected = !this.funcionesModerador[i].selected
            }
        },
        async actualizarRol () {
            try {
                this.actualizandoRol = true

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                const rolNuevo = this.roles.filter(v => v.selected === true)[0].value
                let body = { rolNuevo }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const uidUsuario = this.datosUsuario.firestore.uid
                const data = await this.$axios.$put(`/serviceUsuario/propietario/actualizarRol/${uidUsuario}`, body, config)

                const datosUsuarioAux = JSON.parse( JSON.stringify( this.datosUsuario ) )
                datosUsuarioAux.firestore.rol = rolNuevo
                datosUsuarioAux.auth.customClaims.rol = rolNuevo
                this.datosUsuario = datosUsuarioAux

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.actualizandoRol = false
            }
        },
        async actualizarFuncionesModerador () {
            try {
                this.actualizandoFuncionesModerador = true

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                const funciones = this.funcionesModerador.filter(v => v.selected === true).map(v => v.value)
                let body = { funciones }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const uidUsuario = this.datosUsuario.firestore.uid
                const data = await this.$axios.$put(`/serviceUsuario/propietario/asignarFuncionesModerador/${uidUsuario}`, body, config)

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.actualizandoFuncionesModerador = false
            }
        },
        async actualizarFuncionesMiembro () {
            try {
                this.actualizandoFuncionesMiembro = true

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                const funciones = this.funcionesMiembro.filter(v => v.selected === true).map(v => v.value)
                let body = { funciones }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const uidUsuario = this.datosUsuario.firestore.uid
                const data = await this.$axios.$put(`/serviceUsuario/moderador/asignarFuncionesMiembro/${uidUsuario}`, body, config)

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.actualizandoFuncionesMiembro = false
            }
        },
    },
    
}
</script>

<style>

</style>