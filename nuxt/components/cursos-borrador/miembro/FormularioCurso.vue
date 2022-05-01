<template>
    <div class="pl-3 pr-3">
        <form>
            <div class="pl-1 pr-1">
                <v-text-field
                    class="mt-0 mb-5"
                    v-model="datosCurso.titulo"
                    :error-messages="tituloErrors"
                    :counter="60"
                    label="Titulo"
                    required
                    filled
                    @input="$v.datosCurso.titulo.$touch()"
                    @blur="$v.datosCurso.titulo.$touch()"
                ></v-text-field>

                <v-textarea
                    class="mt-5 mb-5"
                    v-model="datosCurso.descripcion"
                    :error-messages="descripcionErrors"
                    :counter="150"
                    label="Descripción"
                    required
                    filled
                    @input="$v.datosCurso.descripcion.$touch()"
                    @blur="$v.datosCurso.descripcion.$touch()"
                ></v-textarea>
            </div>

            <v-divider></v-divider>

            <v-tabs
                class="mt-7 mb-7"
                v-model="tabRO"
                color="deep-purple accent-4"
                left
            >
                <v-tab :tabindex="1">Requisitos</v-tab>
                <v-tab :tabindex="2">Objetivos</v-tab>
                <v-tab :tabindex="3">Nivel</v-tab>
                <v-tab :tabindex="4">Secciones & Categorias</v-tab>
                <v-tab :tabindex="5">Idioma</v-tab>


                <v-tabs-items v-model="tabRO">
                    <v-tab-item
                        v-for="n in 5"
                        :key="n"
                    >
                        <v-container class="mt-5" fluid>
                            
                            <!-- REQUISITOS -->
                            <div v-if="n === 1">
                                <div class="mb-4" v-for="(requisito, index) in datosCurso.requisitos" :key="index">
                                    <v-card
                                        class="mx-auto"
                                        max-width="800"
                                    >
                                        <v-card-text>
                                            <v-text-field
                                                v-model="datosCurso.requisitos[index]"
                                                :counter="60"
                                                filled
                                                :label="`Requisito ${index+1}`"
                                            ></v-text-field>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                style="margin-top: -20px;"
                                                class="white--text"
                                                color="red"
                                                outlined
                                                v-on:click="quitarRequisito(index)"
                                            >
                                                Quitar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </div>
                            </div>


                            <!-- OBJETIVOS -->
                            <div v-else-if="n === 2">
                                <div class="mb-4" v-for="(objetivo, index) in datosCurso.objetivos" :key="index">
                                    <v-card
                                        class="mx-auto"
                                        max-width="800"
                                    >
                                        <v-card-text>
                                            <v-text-field
                                                v-model="datosCurso.objetivos[index]"
                                                :counter="60"
                                                filled
                                                :label="`Objetivo ${index+1}`"
                                            ></v-text-field>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn
                                                style="margin-top: -20px;"
                                                class="white--text"
                                                color="red"
                                                outlined
                                                v-on:click="quitarObjetivo(index)"
                                            >
                                                Quitar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </div>
                            </div>


                            <!-- NIVEL -->
                            <div :class="tabRO === 2 ? 'enNivel' : ''" v-else-if="n === 3">
                                <v-select
                                    v-model="nivelSeleccionado"
                                    :items="listaNiveles"
                                    :error-messages="nivelErrors"
                                    label="Nivel"
                                    required
                                    filled
                                    :hint="`Se seleccionó el nivel ${nivelSeleccionado.texto}`"
                                    item-text="texto"
                                    item-value="id"
                                    persistent-hint
                                    return-object
                                    single-line
                                    @change="$v.datosCurso.nivel.$touch()"
                                    @blur="$v.datosCurso.nivel.$touch()"
                                ></v-select>
                            </div>

                            
                            <!-- SECCIONES Y CATEGORIAS -->
                            <div :class="tabRO === 3 ? 'enSeccionCategoria' : ''" v-else-if="n === 4">
                                <v-select
                                    v-model="seccionSeleccionado"
                                    :hint="seccionSeleccionado.id ? `Sección: ${seccionSeleccionado.texto}` : `Se seleccionó: ${seccionSeleccionado.texto}`"
                                    :items="listaSecciones"
                                    item-text="texto"
                                    item-value="id"
                                    label="Seleccionar una sección"
                                    filled
                                    persistent-hint
                                    return-object
                                    single-line
                                    class="mt-1"
                                ></v-select>

                                <v-select
                                    v-model="categoriasSelectedo"
                                    :hint="`${categoriasSelectedo.length ? `Se seleccionó ${categoriasSelectedo.length} categorias.` : 'No se seleccionó nada.'}`"
                                    :items="listaCategorias"
                                    :disabled="!seccionSeleccionado.id"
                                    item-text="texto"
                                    item-value="id"
                                    label="Seleccionar categorias"
                                    filled
                                    persistent-hint
                                    return-object
                                    single-line
                                    attach
                                    chips
                                    multiple
                                    class="mt-7"
                                ></v-select>
                            </div>


                            <!-- IDIOMA -->
                            <div :class="tabRO === 4 ? 'enIdioma' : ''" v-else-if="n === 5">
                                <v-select
                                    v-model="idiomaSeleccionado"
                                    :items="listaIdiomas"
                                    label="Idioma"
                                    required
                                    :hint="`Se seleccionó un idioma ${idiomaSeleccionado.texto}`"
                                    filled
                                    item-text="texto"
                                    item-value="id"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select>
                            </div>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
                
            </v-tabs>

            <v-divider></v-divider>

            <v-btn
                class="mt-7 mb-7"
                outlined
                color="#683bce"
                v-on:click="actualizarDatosCurso"
            >
                Actualizar datos del curso
            </v-btn>

        </form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import informacionSecciones from '@/helpers/informacionSecciones'

const nivelesDisponibles = ['basico', 'intermedio', 'avanzado']
const idiomasDisponibles = ['español', 'english']

export default {
    name: '',
    mixins: [validationMixin],

    validations: {
        datosCurso: {
            titulo: { required, minLength: minLength(10), maxLength: maxLength(60) },
            descripcion: { minLength: minLength(10), maxLength: maxLength(150) },
            requisitos: {  },
            objetivos: {  },
            nivel: {  },
            seccion: {  },
            categorias: {  },
            idioma: {  },
        }
    },
    data() {
        return {
            tabRO: 0,
            datosCurso: {
                titulo: '',
                descripcion: '',
                requisitos: [],
                objetivos: [],
                nivel: 'basico',
                seccion: '',
                categorias: [],
                idioma: 'español',
            },
            nivelesDisponibles: nivelesDisponibles,
            listaNiveles: [
                { id: 'basico', texto: 'Básico' },
                { id: 'intermedio', texto: 'Intermedio' },
                { id: 'avanzado', texto: 'Avanzado' },
            ],
            nivelSeleccionado: {
                id: 'basico',
                texto: 'Básico'
            },
            idiomasDisponibles: idiomasDisponibles,
            listaIdiomas: [
                { id: 'español', texto: 'Español' },
                { id: 'english', texto: 'Ingles' },
                { id: 'português', texto: 'Portugués' },
            ],
            idiomaSeleccionado: {
                id: 'español',
                texto: 'Español'
            },
            listaSecciones: [],
            seccionSeleccionado: {
                uid: '', 
                nombre: 'Curso normal'
            },
            listaCategorias: [],
            categoriasSelectedo: [],
        }
    },
    props: {
        datosCursoProp: Object,
    },
    methods: {
        agregarRequisito () {
            this.datosCurso.requisitos.push('')
        },
        quitarRequisito (index) {
            this.datosCurso.requisitos.splice(index, 1)
        },
        agregarObjetivo () {
            this.datosCurso.objetivos.push('')
        },
        quitarObjetivo (index) {
            this.datosCurso.objetivos.splice(index, 1)
        },
        setListaSecciones () {
            let arr = Object.keys(informacionSecciones)
            this.listaSecciones = []
            this.listaSecciones.push({
                id: '',
                texto: 'Curso normal'
            })  
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i]
                this.listaSecciones.push({
                    id: informacionSecciones[element].uid,
                    texto: informacionSecciones[element].nombre,
                })  
            }
        },
        setListaCategorias (idSeccion) {
            this.listaCategorias = []
            let arr = Object.keys(informacionSecciones[idSeccion].categorias)
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i]
                this.listaCategorias.push({
                    id: informacionSecciones[idSeccion].categorias[element].uid,
                    texto: informacionSecciones[idSeccion].categorias[element].nombre,
                })
            }
        },
        filtroDeDatosActualizados () {

        },
        async actualizarDatosCurso () {
            console.log('Actualizando datos del curso', this.datosCurso)
        },
    },
    watch: {
        nivelSeleccionado: function (n, v) {
            this.datosCurso.nivel = n.id
        },
        idiomaSeleccionado: function (n, v) {
            this.datosCurso.idioma = n.id
        },
        seccionSeleccionado: function (n, v) {
            if (n.id == v.id) return
            
            this.datosCurso.seccion = n.id

            this.categoriasSelectedo = []
            n.id ? this.setListaCategorias(n.id) : ''
        },
        categoriasSelectedo: function (n, v) {
            this.datosCurso.categorias = []
            if (!this.seccionSeleccionado.id) return

            for (let i = 0; i < n.length; i++) {
                const element = n[i]
                this.datosCurso.categorias.push(element.id) 
            }
        },
    },
    computed: {
        tituloErrors () {
            const errors = []
            if (!this.$v.datosCurso.titulo.$dirty) return errors
            !this.$v.datosCurso.titulo.minLength && errors.push('Al menos 10 caracteres.')
            !this.$v.datosCurso.titulo.maxLength && errors.push('Hasta 60 caracteres.')
            !this.$v.datosCurso.titulo.required && errors.push('El titulo es requerido')
            return errors
        },
        descripcionErrors () {
            const errors = []
            if (!this.$v.datosCurso.descripcion.$dirty) return errors
            !this.$v.datosCurso.descripcion.minLength && errors.push('Al menos 10 caracteres.')
            !this.$v.datosCurso.descripcion.maxLength && errors.push('Hasta 150 caracteres.')
            return errors
        },
        requisitosErrors () {
            const errors = []
            if (!this.$v.datosCurso.requisitos.$dirty) return errors
            this.datosCurso.requisitos.length > 10 && errors.push('Hasta 10 requisitos.')

            for (let i = 0; i < this.datosCurso.requisitos.length; i++) {
                const requisito = this.datosCurso.requisitos[i]
                if ( requisito.trim().length > 60 ) errors.push('Cada requisito no puede exceder 60 caracteres.')
            }

            return errors
        },
        objetivosErrors () {
            const errors = []
            if (!this.$v.datosCurso.objetivos.$dirty) return errors
            this.datosCurso.objetivos.length > 10 && errors.push('Hasta 10 objetivos.')

            for (let i = 0; i < this.datosCurso.objetivos.length; i++) {
                const objetivo = this.datosCurso.objetivos[i]
                if ( objetivo.trim().length > 60 ) 
                    errors.push('Cada objetivo no puede exceder 60 caracteres.')
            }

            return errors
        },
        nivelErrors () {
            const errors = []
            if (!this.$v.datosCurso.nivel.$dirty) return errors

            if (!nivelesDisponibles.includes(this.datosCurso.nivel)) 
                errors.push('Debe ser un nivel válido.')
            
            return errors
        },
    },
    async created() {
        this.datosCurso = {
            titulo: this.datosCursoProp.titulo,
            descripcion: this.datosCursoProp.descripcion,
            requisitos: this.datosCursoProp.requisitos,
            objetivos: this.datosCursoProp.objetivos,
            nivel: this.datosCursoProp.nivel,
            seccion: this.datosCursoProp.seccion,
            categorias: this.datosCursoProp.categorias,
            idioma: this.datosCursoProp.idioma,
        }

        for (let i = 0; i < this.listaNiveles.length; i++) {
            const nivel = this.listaNiveles[i]
            
            if (this.datosCurso.nivel === nivel.id) {
                this.nivelSeleccionado.id = nivel.id
                this.nivelSeleccionado.texto = nivel.texto
            }
        }

        this.setListaSecciones()
        if (this.datosCursoProp.seccion) {
            this.seccionSeleccionado = {
                id: informacionSecciones[this.datosCursoProp.seccion].uid,
                texto: informacionSecciones[this.datosCursoProp.seccion].nombre
            }

            await this.$nextTick()

            this.setListaCategorias(this.datosCursoProp.seccion)

            for (let i = 0; i < this.datosCursoProp.categorias.length; i++) {
                const categoria = this.datosCursoProp.categorias[i]
                this.categoriasSelectedo.push({
                    id: informacionSecciones[this.datosCursoProp.seccion].categorias[categoria].uid,
                    texto: informacionSecciones[this.datosCursoProp.seccion].categorias[categoria].nombre,
                })
            }
        }

        for (let i = 0; i < this.listaIdiomas.length; i++) {
            const idioma = this.listaIdiomas[i]
            
            if (this.datosCurso.idioma === idioma.id) {
                this.idiomaSeleccionado.id = idioma.id
                this.idiomaSeleccionado.texto = idioma.texto
            }
        }
    },
}
</script>

<style scoped>
.enNivel {
    margin-bottom: 100px;
}

.enSeccionCategoria {
    margin-bottom: 100px;
}

.enIdioma {
    margin-bottom: 100px;
}
</style>