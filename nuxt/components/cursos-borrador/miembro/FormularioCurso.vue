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
                    :counter="300"
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

                                <v-btn
                                    class="mt-5"
                                    outlined
                                    color="#683bce"
                                    v-on:click="datosCurso.requisitos.push('')"
                                >
                                    Agregar requisito
                                </v-btn>
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

                                <v-btn
                                    class="mt-5"
                                    outlined
                                    color="#683bce"
                                    v-on:click="datosCurso.objetivos.push('')"
                                >
                                    Agregar objetivo
                                </v-btn>
                            </div>


                            <!-- NIVEL -->
                            <div :class="tabRO === 2 ? 'enNivel' : ''" v-else-if="n === 3">
                                <v-chip
                                    v-for="(nivel, index) in listaNiveles" :key="index"
                                    class="ma-1"
                                    outlined
                                    :disabled="nivelSeleccionado.id === nivel.id"
                                    :color="nivelSeleccionado.id === nivel.id ? '#683bce' : '#ff1d89'"
                                    @click="nivelSeleccionado = nivel"
                                >
                                    <v-icon left>
                                        {{ nivelSeleccionado.id === nivel.id ? 'mdi-check' : 'mdi-minus' }}
                                    </v-icon>
                                    {{ nivel.texto }}
                                </v-chip>
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

                                <v-divider v-if="seccionSeleccionado.id" class="mt-5"></v-divider>

                                <div class="mt-7" v-if="seccionSeleccionado.id">
                                    <v-chip
                                        v-for="(categoria, index) in listaCategorias" :key="index"
                                        class="ma-1"
                                        outlined
                                        :color="categoriasSeleccionadas.find(v => v.id === categoria.id) ? '#683bce' : '#ff1d89'"
                                        @click="agregarCategoria(categoria)"
                                        :close="categoriasSeleccionadas.find(v => v.id === categoria.id)"
                                        close-icon="mdi-delete"
                                        @click:close="quitarCategoria(categoria.id)"
                                    >
                                        <v-icon left>
                                            {{ categoriasSeleccionadas.find(v => v.id === categoria.id) ? 'mdi-check' : 'mdi-minus' }}
                                        </v-icon>
                                        {{ categoria.texto }}
                                    </v-chip>
                                </div>
                            </div>


                            <!-- IDIOMA -->
                            <div :class="tabRO === 4 ? 'enIdioma' : ''" v-else-if="n === 5">
                                <v-chip
                                    v-for="(idioma, index) in listaIdiomas" :key="index"
                                    class="ma-1"
                                    outlined
                                    :color="idiomaSeleccionado.id === idioma.id ? '#683bce' : '#ff1d89'"
                                    :disabled="idiomaSeleccionado.id === idioma.id"
                                    @click="idiomaSeleccionado = idioma"
                                >
                                    <v-icon left>
                                        {{ idiomaSeleccionado.id === idioma.id ? 'mdi-check' : 'mdi-minus' }}
                                    </v-icon>
                                    {{ idioma.texto }}
                                </v-chip>
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
import informacionSecciones from '@/helpers/informacionSecciones'
import informacionIdiomas from '@/helpers/informacionIdiomas'
import informacionNiveles from '@/helpers/informacionNiveles'

export default {
    name: '',
    mixins: [validationMixin],

    validations: {
        datosCurso: {
            titulo: { required, minLength: minLength(10), maxLength: maxLength(60) },
            descripcion: { minLength: minLength(10), maxLength: maxLength(300) },
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

            listaNiveles: [],
            nivelSeleccionado: {
                id: 'basico',
                texto: 'Básico'
            },

            listaIdiomas: [],
            idiomaSeleccionado: {
                id: 'español',
                texto: 'Español'
            },

            listaSecciones: [],
            seccionSeleccionado: {
                uid: '', 
                texto: 'Curso normal'
            },

            listaCategorias: [],
            categoriasSeleccionadas: [],

            processing: {
                value: false,
                message: ''
            }
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
            let datosActualizados = {}

            if (this.datosCurso.titulo !== this.datosCursoProp.titulo) {
                datosActualizados.titulo = this.datosCurso.titulo
            }

            if (this.datosCurso.descripcion !== this.datosCursoProp.descripcion) {
                datosActualizados.descripcion = this.datosCurso.descripcion
            }

            if (this.datosCurso.requisitos.length !== this.datosCursoProp.requisitos.length) {
                datosActualizados.requisitos = this.datosCurso.requisitos
            } else {
                let cambio = false
                for (let i = 0; i < this.datosCurso.requisitos.length; i++) {
                    const requisito = this.datosCurso.requisitos[i]
                    cambio = !this.datosCursoProp.requisitos.includes(requisito)
                    if (cambio) {
                        datosActualizados.requisitos = this.datosCurso.requisitos
                        break
                    }
                }
            }

            if (this.datosCurso.objetivos.length !== this.datosCursoProp.objetivos.length) {
                datosActualizados.objetivos = this.datosCurso.objetivos
            } else {
                let cambio = false
                for (let i = 0; i < this.datosCurso.objetivos.length; i++) {
                    const objetivo = this.datosCurso.objetivos[i]
                    cambio = !this.datosCursoProp.objetivos.includes(objetivo)
                    if (cambio) {
                        datosActualizados.objetivos = this.datosCurso.objetivos
                        break
                    }
                }
            }

            if (this.datosCurso.nivel !== this.datosCursoProp.nivel) {
                datosActualizados.nivel = this.datosCurso.nivel
            }

            if (this.datosCurso.seccion !== this.datosCursoProp.seccion) {
                datosActualizados.seccion = this.datosCurso.seccion
            }

            if (this.datosCurso.categorias.length !== this.datosCursoProp.categorias.length) {
                datosActualizados.categorias = this.datosCurso.categorias
            } else {
                let cambio = false
                for (let i = 0; i < this.datosCurso.categorias.length; i++) {
                    const categoria = this.datosCurso.categorias[i]
                    cambio = !this.datosCursoProp.categorias.includes(categoria)
                    if (cambio) {
                        datosActualizados.categorias = this.datosCurso.categorias
                        break
                    }
                }
            }

            if (this.datosCurso.idioma !== this.datosCursoProp.idioma) {
                datosActualizados.idioma = this.datosCurso.idioma
            }

            return datosActualizados
        },
        async actualizarDatosCurso () {

            const hayActualizacion = !!Object.keys( this.filtroDeDatosActualizados() ).length

            if (hayActualizacion) {
                try {
                    this.processing.value = true
                    this.processing.message = 'Actualizando los datos del curso. Favor esperar.'

                    const datosActualizados = this.filtroDeDatosActualizados()

                    let token = this.$firebase.auth().currentUser
                    token = token ? await token.getIdToken() : ''
                    await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                    let body = { datosCurso: datosActualizados }

                    let config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const uidCurso = this.datosCursoProp.uid
                    const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/actualizar/${uidCurso}`, body, config)

                    this.$emit('actualizacionCurso', { datosCurso: datosActualizados })
                    
                } catch (error) {
                    console.log('error', error)
                    const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
                } finally {
                    this.processing.value = false
                    this.processing.message = ''
                }
            } else {
                console.log('No hay actualizaciones..')
            }
        },
        agregarCategoria (categoria) {
            const existe = this.categoriasSeleccionadas.find(v => v.id === categoria.id)
            if (existe) return
            this.categoriasSeleccionadas.push(categoria)
        },
        quitarCategoria (id) {
            const index = this.categoriasSeleccionadas.findIndex(v => v.id === id)
            if (index === -1) return

            this.categoriasSeleccionadas.splice(index, 1)
        }
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

            this.categoriasSeleccionadas = []
            n.id ? this.setListaCategorias(n.id) : ''
        },
        categoriasSeleccionadas: function (n, v) {
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
            !this.$v.datosCurso.descripcion.maxLength && errors.push('Hasta 300 caracteres.')
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

            // if (!nivelesDisponibles.includes(this.datosCurso.nivel)) 
            //     errors.push('Debe ser un nivel válido.')
            
            return errors
        },
    },
    async created() {
        this.datosCurso = {
            titulo: this.datosCursoProp.titulo,
            descripcion: this.datosCursoProp.descripcion,
            requisitos: JSON.parse( JSON.stringify( this.datosCursoProp.requisitos ) ),
            objetivos: JSON.parse( JSON.stringify( this.datosCursoProp.objetivos ) ),
            nivel: this.datosCursoProp.nivel,
            seccion: this.datosCursoProp.seccion,
            categorias: JSON.parse( JSON.stringify( this.datosCursoProp.categorias ) ),
            idioma: this.datosCursoProp.idioma,
        }

        const uidNiveles = Object.keys(informacionNiveles)
        for (let i = 0; i < uidNiveles.length; i++) {
            const uidNivel = uidNiveles[i]

            const nivel = informacionNiveles[uidNivel]
            this.listaNiveles.push({
                id: nivel.uid,
                texto: nivel.nombre,
            })

            if (this.datosCurso.nivel === nivel.uid) {
                this.nivelSeleccionado.id = nivel.uid
                this.nivelSeleccionado.texto = nivel.nombre
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
                this.categoriasSeleccionadas.push({
                    id: informacionSecciones[this.datosCursoProp.seccion].categorias[categoria].uid,
                    texto: informacionSecciones[this.datosCursoProp.seccion].categorias[categoria].nombre,
                })
            }
        }

        const uidIdiomas = Object.keys(informacionIdiomas)
        for (let i = 0; i < uidIdiomas.length; i++) {
            const uidIdioma = uidIdiomas[i]
            const idioma = informacionIdiomas[uidIdioma]
            this.listaIdiomas.push({
                id: idioma.uid,
                texto: idioma.nombre,
            })

            if (this.datosCurso.idioma === idioma.uid) {
                this.idiomaSeleccionado.id = idioma.uid
                this.idiomaSeleccionado.texto = idioma.nombre
            }
        }
    },
}
</script>

<style scoped>
.enNivel {
    margin-bottom: 0;
}

.enSeccionCategoria {
    margin-bottom: 50px;
}

.enIdioma {
    margin-bottom: 0;
}
</style>