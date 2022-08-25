<template>
    <div class="container mt-5">
        <v-bottom-sheet
            v-model="sheet"
            inset
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    outlined
                    rounded
                    text
                    color="#683bce"
                    class="mt-4"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon left>
                        mdi-plus
                    </v-icon>
                    Crear curso para Classfii
                </v-btn>
            </template>
            <v-sheet
                class="text-center pt-2"
                height="550px"
                rounded
            >
                <div class="container my-3">
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

                    <v-text-field
                        v-model="nombreUsuarioResponsable"
                        :disabled="procesandoCreacionCurso || cursoCreado"
                        label="Nombre de usuario (responsable)"
                        class="mb-7"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="nombreUsuarioInstructor"
                        :disabled="procesandoCreacionCurso || cursoCreado"
                        label="Nombre de usuario (instructor)"
                        class="mb-7"
                        required
                    ></v-text-field>

                    <div class="mt-10">
                        <v-btn
                            v-if="!cursoCreado"
                            outlined
                            rounded
                            text
                            color="#683bce"
                            :disabled="$v.$anyError || procesandoCreacionCurso"
                            class="mr-2 ma-2"
                            @click="crearCurso"
                        >
                            Crear curso
                        </v-btn>
                        <v-btn 
                            outlined
                            rounded
                            text
                            color="#ff1d89"
                            :disabled="procesandoCreacionCurso"
                            class="mr-2 ma-2"
                            @click="vaciar"
                        >
                            {{ cursoCreado ? 'Crear nuevo curso' : 'Vaciar' }}
                        </v-btn>
                        <v-btn
                            outlined
                            rounded
                            text
                            color="error"
                            class="mr-2 ma-2"
                            @click="sheet = !sheet"
                        >
                            <v-icon left>
                                mdi-close-circle
                            </v-icon>
                            Cerrar
                        </v-btn>
                    </div>
                </div>
            </v-sheet>
        </v-bottom-sheet>

        <v-divider class="my-7"></v-divider>

        <BuscadorCursosBorrador />
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { fb } from '~/plugins/firebase'
import BuscadorCursosBorrador from '@/components/cursos-borrador/moderador/BuscadorCursosBorrador'

export default {
    name: '',
    layout: 'moderador',
    middleware: 'esModerador',
    mixins: [validationMixin],
    validations: {
        titulo: { required, minLength: minLength(10), maxLength: maxLength(60) },
        codigo: { required, minLength: minLength(1), maxLength: maxLength(60) },
    },
    data() {
        return {
            sheet: false,
            titulo: '',
            codigo: '',
            nombreUsuarioResponsable: '',
            nombreUsuarioInstructor: '',
            cursoCreado: false,
            procesandoCreacionCurso: false,
        }
    },
    components: {
        BuscadorCursosBorrador
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

                const snapshot = await fb.firestore().collection('Usuarios').where('nombreUsuario', '==', this.nombreUsuarioResponsable).get()
                const snapshot2 = await fb.firestore().collection('Usuarios').where('nombreUsuario', '==', this.nombreUsuarioInstructor).get()

                if (snapshot.empty) {
                    alert('No existe el usuario.')
                    return
                }

                if (snapshot2.empty) {
                    alert('No existe el usuario.')
                    return
                }

                let body = {
                    datosCurso: {
                        titulo: this.titulo,
                        codigo: this.codigo,
                        responsable: snapshot.docs[0].id,
                        instructor: snapshot2.docs[0].id,
                    }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                this.procesandoCreacionCurso = true
                const respuesta = await this.$axios.$post(`/serviceCursoBorrador/moderador/crear`, body, config)
                
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
            this.nombreUsuarioResponsable = ''
            this.nombreUsuarioInstructor = ''
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

<style>

</style>