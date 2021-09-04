<template>
    <div>
        <v-navigation-drawer
            v-model="drawerFilter"
            absolute
            :width="325"
        >
            <v-list-item @click="drawerFilter = !drawerFilter">
                <v-list-item-icon>
                    <v-icon>
                    mdi-menu
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>
                    Filtro
                </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list dense>
                <v-list-item>
                <v-list-item-icon>
                    <v-icon>
                    mdi-account-hard-hat
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        Código Rol: {{ rol.rolName }}
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item-content style="margin-top: -30px;">
                <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                        <div class="container">
                            <p class="mt-1">
                                Rol: {{ rol.rolName }}
                            </p>
                            
                            <v-btn
                                color="#683bce"
                                outlined
                                block
                                dark
                                v-bind="attrs"
                                v-on="on"
                            >
                                Roles
                            </v-btn>
                            
                        </div>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(rol, index) in roles"
                            :key="index"
                            link
                            v-on:click="selectRole(rol)"
                        >
                            <v-list-item-title>
                            {{ rol.rolName }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                </v-list-item-content>

                <div v-if="rol.rolCode === 'admin' || rol.rolCode === 'subAdmin' || rol.rolCode === 'creadorContenido'" style="margin-top: -30px;">
                    <!-- <v-select
                        v-model="selectedIdentifier"
                        :items="identifierListOptions"
                        v-on:input="selectIdentifierCode(selectedIdentifier)"
                        item-text="optionName"
                        :item-value="selectedIdentifier.optionCode"
                        label="Identificadores"
                        return-object
                    ></v-select> -->
                    
                    <v-container fluid>
                        <v-select
                            v-model="seccion"
                            :items="secciones"
                            v-on:input="setSections(seccion)"
                            label="Secciones"
                            multiple
                            item-text="seccionName"
                            :item-value="dataFilter.seccionCode"
                            return-object
                        ></v-select>
                    </v-container>
                </div>

                <v-divider></v-divider>

                <v-list-item>
                <v-list-item-icon>
                    <v-icon>
                    mdi-account-star
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>
                        <p class="mt-1">
                            Premium: {{ premium.premiumName }}
                        </p>
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item-content style="margin-top: -30px;">
                <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                    <div class="container">
                        <p class="mt-1">
                            Premium:
                        </p>
                        
                        <v-btn
                            color="#683bce"
                            outlined
                            block
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            Premium
                        </v-btn>
                        
                    </div>
                    </template>
                    <v-list>
                    <v-list-item
                        v-for="(premium, index) in premiumOptions"
                        :key="index"
                        link
                        v-on:click="selectPremium(premium)"
                    >
                        <v-list-item-title>
                        {{ premium.premiumName }}
                        </v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>
                </v-list-item-content>

                <v-divider></v-divider>

                <div class="container">
                    <v-btn
                        color="#683bce"
                        outlined
                        block
                        dark
                        v-on:click="filter(dataFilter)"
                    >
                        Buscar
                    </v-btn>
                </div>
            </v-list>
        </v-navigation-drawer>

        <!-- LISTA DE USUARIOS -->
        <div>
            <div class="container">
                
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                    >
                        <v-select
                            v-model="selectedIdentifier"
                            :items="identifierListOptions"
                            v-on:input="selectIdentifierCode(selectedIdentifier)"
                            item-text="optionName"
                            :item-value="selectedIdentifier.optionCode"
                            label="Identificadores"
                            return-object
                        ></v-select>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                    >
                        <v-text-field
                            v-if="selectedIdentifier.optionCode === 'uid'"
                            v-model="dataFilter.userIdentifier.identifierData"
                            label="UID del usuario"
                            @input="$v.filterUID.$touch()"
                            @blur="$v.filterUID.$touch()"
                        ></v-text-field>
                        <v-text-field
                            v-else-if="selectedIdentifier.optionCode === 'ci'"
                            v-model="dataFilter.userIdentifier.identifierData"
                            :error-messages="CIErrors"
                            type="number"
                            label="CI del usuario"
                            @input="$v.filterCI.$touch()"
                            @blur="$v.filterCI.$touch()"
                        ></v-text-field>
                        <v-text-field
                            v-else-if="selectedIdentifier.optionCode === 'username'"
                            v-model="dataFilter.userIdentifier.identifierData"
                            :error-messages="nameErrors"
                            :counter="10"
                            label="Nombre de usuario"
                            @input="$v.filterUsername.$touch()"
                            @blur="$v.filterUsername.$touch()"
                        ></v-text-field>
                        <v-text-field
                            v-else-if="selectedIdentifier.optionCode === 'email'"
                            v-model="dataFilter.userIdentifier.identifierData"
                            :error-messages="emailErrors"
                            label="Correo"
                            @input="$v.filterEmail.$touch()"
                            @blur="$v.filterEmail.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                    >
                        <v-select
                        :items="items"
                        label="Outlined style"
                        dense
                        outlined
                        ></v-select>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                    >
                        <v-select
                        :items="items"
                        label="Solo field"
                        dense
                        solo
                        ></v-select>
                    </v-col> -->
                </v-row>

                <!-- <v-row>
                    <v-col>
                        <v-text-field
                            v-model="dataFilter.uid"
                            label="UID del usuario"
                            @input="$v.filterUID.$touch()"
                            @blur="$v.filterUID.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="dataFilter.ci"
                            :error-messages="CIErrors"
                            type="number"
                            label="CI del usuario"
                            @input="$v.filterCI.$touch()"
                            @blur="$v.filterCI.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="dataFilter.username"
                            :error-messages="nameErrors"
                            :counter="10"
                            label="Nombre de usuario"
                            @input="$v.filterUsername.$touch()"
                            @blur="$v.filterUsername.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="dataFilter.email"
                            :error-messages="emailErrors"
                            label="Correo"
                            @input="$v.filterEmail.$touch()"
                            @blur="$v.filterEmail.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row> -->

                <v-btn
                    class="mr-4"
                    color="#683bce"
                    outlined
                    @click="filter(dataFilter)"
                >
                    Buscar
                </v-btn>
                
                <v-btn
                    class="ma-2"
                    color="#683bce"
                    outlined
                    @click="drawerFilter = !drawerFilter"
                >
                    Más filtros
                </v-btn>

                <hr class="mt-3 mb-3">

            </div>
        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, numeric } from 'vuelidate/lib/validators'

export default {
    name: 'filterAdminUser',
    middleware: 'check-adminTeam',
    mixins: [validationMixin],

    validations: {
      filterUsername: { maxLength: maxLength(10) },
      filterEmail: { email },
      filterUID: {  },
      filterCI: { numeric },
    },

    props: {
        limit: Number,
        filtracion: Function

    },

    data() {
        return {
            drawerFilter: false,
            rol: {
                rolName: 'Todos',
                rolCode: null
            },
            roles: [
                { rolName: 'Todos', rolCode: null },
                { rolName: 'Propietario', rolCode: 'propietario' },
                { rolName: 'Administrador', rolCode: 'admin' },
                { rolName: 'SubAdministrador', rolCode: 'subAdmin' },
                { rolName: 'Creador de contenido', rolCode: 'creadorContenido' },
                { rolName: 'Normal', rolCode: 'normal' }
            ],
            seccion: [],
            secciones: [
                { seccionName: 'Informática', seccionCode: 'informatica' },
                { seccionName: 'Matemática', seccionCode: 'matematica' },
                { seccionName: 'Economía', seccionCode: 'economia' },
                { seccionName: 'Música', seccionCode: 'musica' }
            ],
            premium: {
                premiumName: 'Todos',
                premiumOption: null
            },
            premiumOptions: [
                { premiumName: 'Todos', premiumOption: null },
                { premiumName: 'Premium', premiumOption: true },
                { premiumName: 'No Premium', premiumOption: false }
            ],
            datePremiumOptions: [
                { optionName: 'Todos', optionCode: null },
                { optionName: 'Fecha de compra', optionCode: 0 },
                { optionName: 'Día', optionCode: 1 },
                { optionName: 'Mes', optionCode: 2 },
                { optionName: 'Año', optionCode: 3 }
            ],
            selectedIdentifier: {
                optionName: 'Elegir un identificador',
                optionCode: null
            },
            identifierListOptions: [
                { optionName: 'Elegir un identificador', optionCode: null },
                { optionName: 'UID', optionCode: 'uid' },
                { optionName: 'Nombre de usuario', optionCode: 'username' },
                { optionName: 'Correo', optionCode: 'email' }
            ],
            dataFilter: {
                roleCode: null,
                seccionCode: null,
                premium: null,
                tipoPremium: null,
                datePremium: null,
                userIdentifier: {
                    type: null,
                    identifierData: ''
                }
            },
            lastDocument: null,
            usersData: [],
        }
    },
    methods: {
        selectRole(rol) {
            this.rol.rolName = rol.rolName
            this.rol.rolCode = rol.rolCode

            this.dataFilter.roleCode = rol.rolCode
            if (rol.rolCode === 'admin' || rol.rolCode === 'subAdmin' || rol.rolCode === 'creadorContenido') {
                this.dataFilter.seccionCode = []
            } else {
                this.dataFilter.seccionCode = null
            }
        },
        selectPremium(premium) {
            this.premium.premiumName = premium.premiumName
            this.premium.premiumOption = premium.premiumOption
            this.dataFilter.premium = premium.premiumOption
        },
        selectIdentifierCode(typeIdentifier) {
            console.log(typeIdentifier)
            this.dataFilter.userIdentifier.type = typeIdentifier.optionCode
            this.dataFilter.userIdentifier.identifierData = ''
        },
        setSections (seccion) {
            this.dataFilter.seccionCode = []
            for (let i = 0; i < seccion.length; i++) {
                this.dataFilter.seccionCode.push(seccion[i].seccionCode)
            }
        },
        async filter(dataFilter){
            this.$v.$touch()
            console.log(this.$v.$touch())

            console.log('dataFilter', dataFilter)

            try {
                this.$emit('loadingUsers', true)

                const db = this.$firebase.firestore()
                this.usersData = []

                let first = db.collection('Usuarios')

                first = this.filtracion(first, dataFilter)

                first = first.limit(this.limit)

                const snapshot = await first.get()

                if(snapshot.size > 0) {
                    snapshot.forEach(snap => {
                        this.usersData.push(snap.data())
                    })
                    
                    this.lastDocument = snapshot.docs[snapshot.docs.length - 1];

                    console.log('this.usersData', this.usersData)
                    this.$emit('usersData', this.usersData)
                    this.$emit('lastDocument', this.lastDocument)
                } else {
                    this.$emit('usersData', [])
                    this.$emit('lastDocument', null)
                }

            } catch (error) {
                console.log('error', error)
                
            } finally {
                this.$emit('loadingUsers', false)
            }

            this.$emit('dataFilter', dataFilter)
        },
    },
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.filterUsername.$dirty) return errors
        !this.$v.filterUsername.maxLength && errors.push('El nombre debe tener 10 caracteres como máximo.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.filterEmail.$dirty) return errors
        !this.$v.filterEmail.email && errors.push('Debe ser válido el correo electrónico.')
        return errors
      },
      CIErrors () {
        const errors = []
        if (!this.$v.filterCI.$dirty) return errors
        !this.$v.filterCI.numeric && errors.push('Debe ser válido la cédula de identidad.')
        return errors
      },
    },
    created() {
        const dataFilter = {
            roleCode: null,
            seccionCode: null,
            premium: null,
            tipoPremium: null,
            datePremium: null,
            userIdentifier: {
                type: null,
                identifierData: ''
            }
        }
        

        this.filter(dataFilter)
    },
}
</script>

<style>

</style>