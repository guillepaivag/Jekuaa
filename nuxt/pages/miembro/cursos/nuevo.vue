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

        <div class="mt-10">
            <form>
                <v-text-field
                    v-model="titulo"
                    :error-messages="tituloErrors"
                    :counter="60"
                    :disabled="procesandoCreacionCurso || cursoCreado"
                    label="Nombre del curso"
                    class="mb-7"
                    required
                    @focus="theFocus($v, true)"
                    @blur="theBlur($v, true)"
                ></v-text-field>

                <v-text-field
                    v-model="codigo"
                    :error-messages="codigoErrors"
                    :counter="60"
                    :disabled="procesandoCreacionCurso || cursoCreado"
                    label="Código del curso"
                    class="mb-7"
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
        </div>

    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esInstructor',
    mixins: [validationMixin],
    validations: {
      titulo: { required, minLength: minLength(10), maxLength: maxLength(60) },
      codigo: { required, minLength: minLength(1), maxLength: maxLength(60) },
    },
    data() {
        return {
            titulo: '',
            codigo: '',
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
            cursoCreado: false,
            procesandoCreacionCurso: false
        }
    },
    methods: {
        theFocus (v, esTitulo) {
            if (esTitulo) {
                v.titulo.$touch()
            } else {
                v.codigo.$touch()
            }
        },
        theBlur (v, esTitulo) {
            if (esTitulo) {
                v.titulo.$touch()
            } else {
                v.codigo.$touch()
            }
        },
        esCodigo (cadena) {
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
                        codigo: this.codigo
                    }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.procesandoCreacionCurso = true
                const respuesta = await this.$axios.$post(`/serviceCursoBorrador/miembro/crear`, body, config)
                
                this.procesandoCreacionCurso = false
                this.cursoCreado = true

            } catch (error) {
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.procesandoCreacionCurso = false
            }
        },
        vaciar () {
            this.titulo = ''
            this.codigo = ''
            this.$v.$reset()
            this.cursoCreado = false
        },
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
      codigoErrors () {
        const errors = []
        if (!this.$v.codigo.$dirty) return errors
        !this.$v.codigo.minLength && errors.push('Mínimo 1 caracter.')
        !this.$v.codigo.maxLength && errors.push('Máximo 60 caracteres.')
        !this.$v.codigo.required && errors.push('Es requerido el código.')
        this.esCodigo(this.$v.codigo.$model) ? '' : errors.push('Solo se acepta a-z A-Z 0-9 -')
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