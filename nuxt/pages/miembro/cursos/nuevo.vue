<template>
    <div class="container">
        <div class="mt-0">
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

        <div class="mt-10">
            <v-row>
                <v-col cols="12" sm="8">
                    <form>
                        <v-text-field
                            v-model="titulo"
                            :error-messages="tituloErrors"
                            :counter="60"
                            :disabled="procesandoCreacionCurso || cursoCreado"
                            label="Nombre del curso"
                            class="mb-15"
                            required
                            @focus="theFocus($v, true)"
                            @blur="theBlur($v, true)"
                        ></v-text-field>

                        <v-text-field
                            v-model="referenciaUrl"
                            :error-messages="referenciaUrlErrors"
                            :counter="60"
                            :disabled="procesandoCreacionCurso || cursoCreado"
                            label="Referencia para la url"
                            class="mb-15"
                            required
                            @focus="theFocus($v, false)"
                            @blur="theBlur($v, false)"
                        ></v-text-field>

                        <div class="mt-10">
                            <v-btn
                                outlined
                                color="#683bce"
                                :disabled="$v.$anyError || procesandoCreacionCurso || cursoCreado"
                                class="mr-4"
                                @click="crearCurso"
                            >
                                Crear curso
                            </v-btn>
                            <v-btn 
                                outlined
                                color="#ff1d89"
                                :disabled="procesandoCreacionCurso"
                                class="mr-4"
                                @click="vaciar"
                            >
                                {{ cursoCreado ? 'Crear nuevo curso' : 'Vaciar' }}
                            </v-btn>
                            <v-btn 
                                v-if="cursoCreado"
                                outlined
                                color="#4cf32a"
                                to="/siu"
                            >
                                Ver curso
                            </v-btn>
                        </div>
                    </form>
                </v-col>
                <v-col cols="12" sm="4" class="col2">
                    <div class="container-col2" v-if="procesandoCreacionCurso">
                        Se esta creando el curso. Favor espere :D
                    </div>
                    <div class="container-col2" v-else>
                        <div v-if="vistaInformacion === 'titulo'">
                            Titulo
                        </div>
                        <div v-else-if="vistaInformacion === 'referenciaUrl'">
                            Referencia URL
                        </div>
                        <div v-else>
                            Seleccione uno.
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>




        <div>
            <v-snackbar
                v-model="informacionMensaje.visible"
                :multi-line="multiLine"
                :timeout="-1"
                :value="true"
                :color="informacionMensaje.color"
                elevation="24"
            >
                {{ informacionMensaje.mensaje }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    outlined
                    color="#ffffff"
                    v-bind="attrs"
                    @click="quitarMensaje"
                    >
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
        
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    name: '',
    mixins: [validationMixin],
    validations: {
      titulo: { required, minLength: minLength(10), maxLength: maxLength(60) },
      referenciaUrl: { required, minLength: minLength(1), maxLength: maxLength(60) },
    },
    data() {
        return {
            titulo: '',
            referenciaUrl: '',
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
                    text: 'Cursos',
                    disabled: false,
                    href: '/miembro/cursos',
                },
                {
                    text: 'Nuevo',
                    disabled: true,
                    href: '/miembro/cursos/nuevo',
                },
            ],
            vistaInformacion: '',
            informacionMensaje: {
                visible: false,
                mensaje: '',
                color: ''
            },
            cursoCreado: false,
            procesandoCreacionCurso: false
        }
    },
    methods: {
        theFocus (v, esTitulo) {
            if (esTitulo) {
                v.titulo.$touch()
                this.vistaInformacion = 'titulo'
            } else {
                v.referenciaUrl.$touch()
                this.vistaInformacion = 'referenciaUrl'
            }
        },
        theBlur (v, esTitulo) {
            if (esTitulo) {
                v.titulo.$touch()
            } else {
                v.referenciaUrl.$touch()
            }
            this.vistaInformacion = ''
        },
        esReferenciaURL (cadena) {
            return /^[a-zA-Z0-9-]+$/.test(cadena)
        },
        async crearCurso () {
            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = {
                    datosCurso: {
                        titulo: this.titulo,
                        referenciaURL: this.referenciaUrl
                    }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.procesandoCreacionCurso = true
                const respuesta = await this.$axios.$post(`/apiMiembro/curso/borrador/cursos/crearCursoBorrador`, body, config)
                // await new Promise((res, rej) => {
                //     setTimeout(() => {
                //         this.procesandoCreacionCurso = false
                //         res()
                //     }, 3000)
                // })
                
                this.procesandoCreacionCurso = false
                
                this.informacionMensaje = {
                    visible: true,
                    mensaje: 'Se creo el curso de forma correcta.',
                    color: '#4cf32a'
                }

                this.cursoCreado = true

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.procesandoCreacionCurso = false
            }
        },
        vaciar () {
            this.titulo = ''
            this.referenciaUrl = ''
            this.$v.$reset()

            this.informacionMensaje = {
                visible: false,
                mensaje: '',
                color: ''
            }
            this.cursoCreado = false
        },
        quitarMensaje () {
            this.informacionMensaje = {
                visible: false,
                mensaje: '',
                color: ''
            }
        }
    },
    computed: {
      tituloErrors () {
        const errors = []
        if (!this.$v.titulo.$dirty) return errors
        !this.$v.titulo.minLength && errors.push('Mínimo 10 caracteres.')
        !this.$v.titulo.maxLength && errors.push('Máximo 60 caracteres.')
        !this.$v.titulo.required && errors.push('Es requerido el titulo')
        return errors
      },
      referenciaUrlErrors () {
        const errors = []
        if (!this.$v.referenciaUrl.$dirty) return errors
        !this.$v.referenciaUrl.minLength && errors.push('Mínimo 1 caracter.')
        !this.$v.referenciaUrl.maxLength && errors.push('Máximo 60 caracteres.')
        !this.$v.referenciaUrl.required && errors.push('Es requerido el titulo')
        this.esReferenciaURL(this.$v.referenciaUrl.$model) ? '' : errors.push('Solo se acepta a-z A-Z 0-9 -')
        return errors
      },
    },
}
</script>

<style scoped>

@media (max-width: 599px) {
  .container-col2 {
    display: none;
  }
}

</style>