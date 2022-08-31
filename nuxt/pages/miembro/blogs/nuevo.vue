<template>
    <div class="container">
        <div class="mt-0 mb-5">
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

        <div class="mb-10">
            <v-text-field
                v-model="titulo"
                :error-messages="tituloErr"
                :counter="100"
                label="Titulo"
                required
                @input="$v.titulo.$touch()"
                @blur="$v.titulo.$touch()"
                class="mt-7"
            ></v-text-field>

            <v-text-field
                v-model="referencia"
                :error-messages="referenciaErr"
                :counter="100"
                label="Referencia URL"
                required
                @input="$v.referencia.$touch()"
                @blur="$v.referencia.$touch()"
                class="mt-7"
            ></v-text-field>
        </div>

        <div class="mt-7">
            <v-btn 
                outlined
                color="#683bce"
                v-on:click="crearBlog"
                :disabled="$v.$anyError || !$store.state.modules.usuarios.emailVerificado"
            >
              Crear blog
            </v-btn>

            <v-btn 
                v-if="datosCreacion.creado"
                outlined
                color="#683bce"
                :to="`/miembro/blog/${referencia}`"
                :disabled="$v.$anyError"
            >
              Ver blog
            </v-btn>
        </div>

        <div v-if="datosCreacion.visible && datosCreacion.creado">
            <v-snackbar
                v-model="datosCreacion.visible"
                :timeout="-1"
                :value="true"
                color="#683BCE"
                elevation="24"
            >
                ¡Se creo el blog de forma exitosa!

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="#ff1d89"
                    v-bind="attrs"
                    @click="datosCreacion.visible = false"
                    >
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>

        <v-dialog
            v-model="processing.value"
            persistent
            width="300"
        >
            <v-card
                color="#683bce"
                dark
            >
                <v-card-text class="pt-3">
                    {{ processing.message }}
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

import showdown from 'showdown'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esBlogger',
    mixins: [validationMixin],
    validations: {
        referencia: { required, maxLength: maxLength(100) },
        titulo: { required, maxLength: maxLength(100) },
    },
    data() {
        return {
            referencia: '',
            titulo: '',
            datosCreacion: {
                visible: false,
                creado: false,
            },
            blogCreado: null,
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Miembro',
                    disabled: false,
                    href: '/miembro',
                },
                {
                    text: 'Blogs',
                    disabled: false,
                    href: '/miembro/blogs',
                },
                {
                    text: 'Nuevo',
                    disabled: true,
                    href: '/miembro/blogs/nuevo',
                },
            ],
            processing: {
                value: false,
                message: ''
            },
        }
    },
    components: {
        
    },
    methods: {
        
        async crearBlog () {
            try {
                this.processing.value = true
                this.processing.message = 'Creando blog. Favor esperar.'

                const datosBlog = {
                    referencia: this.referencia,
                    titulo: this.titulo
                }

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { datosBlog }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$post(`/serviceBlog/miembro/crear`, body, config)

                this.blogCreado = respuesta.resultado

                this.datosCreacion.visible = true
                this.datosCreacion.creado = true
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        }
    },
    computed: {
        referenciaErr () {
            const errors = []
            if (!this.$v.referencia.$dirty) return errors
            !this.$v.referencia.maxLength && errors.push('La referencia URL es muy larga.')
            !this.$v.referencia.required && errors.push('La referencia URL es requerida.')
            return errors
        },
        tituloErr () {
            const errors = []
            if (!this.$v.titulo.$dirty) return errors
            !this.$v.titulo.maxLength && errors.push('El titulo es muy largo.')
            !this.$v.titulo.required && errors.push('El titulo es requerido.')
            return errors
        },
    },
    watch: {
        
    },
    created() {
        
    },
}
</script>

<style scoped>

</style>