<template>
    <div class="">
        <div class="mt-0 mb-3">
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

        <form>
            <v-row class="mb-3">
                <v-col cols="12">
                    <h1>Contraseña</h1>
                </v-col>

                <v-col cols="12" lg="6">
                    <v-text-field
                        class="mt-5 mb-5"
                        v-model="contrasenha"
                        :error-messages="erroresContrasenha"
                        :counter="20"
                        label="Nueva contraseña"
                        required
                        @input="$v.contrasenha.$touch()"
                        @blur="$v.contrasenha.$touch()"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-text-field
                        class="mt-5 mb-5"
                        v-model="confirmacionContrasenha"
                        :error-messages="erroresConfirmacionContrasenha"
                        :counter="20"
                        label="Confirmación de contraseña"
                        required
                        @input="$v.confirmacionContrasenha.$touch()"
                        @blur="$v.confirmacionContrasenha.$touch()"
                    ></v-text-field>
                </v-col>
            </v-row>

            <div class="botones">
                <v-btn
                    :disabled="$v.$anyError || !contrasenha || !confirmacionContrasenha || !$store.state.modules.usuarios.emailVerificado"
                    text
                    color="#683bce"
                    class="mr-4"
                    @click="actualizar"
                >
                    Actualizar contraseña
                </v-btn>
                <v-btn text color="#ff1d89" @click="reiniciar"> Reiniciar </v-btn>
            </div>
        </form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'

import { minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        contrasenha: {
            minLength: minLength(6),
            maxLength: maxLength(20),
        },
        confirmacionContrasenha: {
            minLength: minLength(6),
            maxLength: maxLength(20),
            sameAsPassword: sameAs('contrasenha'),
        },
    },

    data() {
        return {
            contrasenha: '',
            confirmacionContrasenha: '',
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Perfil',
                    disabled: false,
                    href: '/perfil',
                },
                {
                    text: 'Seguridad',
                    disabled: true,
                    href: '/perfil/seguridad',
                },
            ],
        }
    },

    methods: {
        reiniciar() {
            this.contrasenha = ''
            this.confirmacionContrasenha = ''
        },

        async actualizar() {
            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = {
                    contrasenha: this.contrasenha,
                    confirmacionContrasenha: this.confirmacionContrasenha,
                }

                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }

                const respuesta = await this.$axios.$put(`/serviceUsuario/actualizarUsuario`, body, config)

                await this.$store.dispatch('modules/usuarios/logout')
                this.$router.push('/')

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        },
    },

    computed: {
        erroresContrasenha() {
            const errors = [];
            if (!this.$v.contrasenha.$dirty) return errors
            !this.$v.contrasenha.maxLength && errors.push('La contraseña debe ser menor a 20 carácteres.')
            !this.$v.contrasenha.minLength && errors.push('La contraseña debe tener al menos 6 carácteres.')
            return errors
        },

        erroresConfirmacionContrasenha() {
            const errors = []
            if (!this.$v.confirmacionContrasenha.$model) return errors
            !this.$v.confirmacionContrasenha.maxLength && errors.push('La contraseña debe ser menor a 20 carácteres.')
            !this.$v.confirmacionContrasenha.minLength && errors.push('La contraseña debe tener al menos 6 carácteres.')
            !this.$v.confirmacionContrasenha.sameAsPassword && errors.push("¡Ambas contraseñas deben ser iguales!")
            return errors
        },

        
    },
    created() {
        this.$v.$reset()
    },
};
</script>

<style></style>
