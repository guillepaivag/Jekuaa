<template>
  <div>
    <div class="mb-15">
        <!-- <div class="tiptap-vuetify-editor__content" v-html="contentHTML"/> -->
        <h3 class="mt-4 subtitulos"> Rol descriptivo: </h3>
        <v-divider/>
        <div class="mt-0 mb-5">
          <v-text-field
            v-model="rolDescriptivo"
            readonly
          ></v-text-field>
        </div>

        <div class="">
          <h3 class="mt-4 subtitulos"> Descripción: </h3>
          <v-divider/>
          <v-textarea
            class="mt-2 mb-5"
            name="input-7-1"
            label="Mi descripción"
            v-model="descripcion"
            :error-messages="erroresDescripcion"
            :counter="1000"
            required
            :loading="cargando"
            @input="$v.descripcion.$touch()"
            @blur="$v.descripcion.$touch()"
          ></v-textarea>
        </div>

        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <div class="componente">
              <h3 class="mt-4 subtitulos"> Especializaciones: </h3>
              <v-divider/>
              <v-textarea
                class="mt-2 mb-5"
                name="input-7-1"
                label="Mis especializaciones"
                v-model="especializaciones"
                :error-messages="erroresEspecializaciones"
                :counter="1000"
                required
                :loading="cargando"
                @input="$v.especializaciones.$touch()"
                @blur="$v.especializaciones.$touch()"
              ></v-textarea>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <div class="componente">
              <h3 class="mt-4 subtitulos"> Intereses: </h3>
              <v-divider/>
              <v-textarea
                class="mt-2 mb-5"
                name="input-7-1"
                label="Mis intereses"
                v-model="intereses"
                :error-messages="erroresIntereses"
                :counter="1000"
                required
                :loading="cargando"
                @input="$v.intereses.$touch()"
                @blur="$v.intereses.$touch()"
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
        
        <h3 class="mt-4 subtitulos"> Redes sociales: </h3>
        <v-divider/>
        <v-row no-gutters class="mt-3">
          <v-col
            cols="12"
            md="5"
          >
            <div class="componente">
              <v-select
                v-model="listaRedesSocialesCodigoSeleccionado"
                :items="listaRedesSociales"
                chips
                label="Redes sociales"
                item-text="texto"
                item-value="codigo"
                multiple
                :loading="cargando"
              >
                <template v-slot:selection="{ item }">
                  <div class="ml-2 mr-2">
                    <v-chip color="#683bce" text-color="#ffffff">
                      <v-icon size="23px" color="#ffffff">{{ item.icon }}</v-icon>
                      <b class="ml-3">
                        {{ item.texto }}
                      </b>
                    </v-chip>
                  </div>
                </template>
                <template v-slot:item="{ active, item }">
                  <div class="itemRedSocial seleccionado" v-if="estaSeleccionado(item)">
                    <v-icon color="#683bce">{{ item.icon }}</v-icon>
                    <b class="ml-3">
                      {{ item.texto }}
                    </b>
                  </div>
                  <div class="itemRedSocial" v-else>
                    <v-icon>{{ item.icon }}</v-icon>
                    <b class="ml-3">
                      {{ item.texto }}
                    </b>
                  </div>
                </template>
              </v-select>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="7"
          >
            <div class="componente">
              <div v-for="(redSocial, index) in redesSociales" :key="index">
                <v-row no-gutters>         
                  <v-icon class="align--center ml-2 mr-2 mb-3" size="40px" color="#683bce">{{ getRedSocialPorCodigo(redSocial.redSocial).icon }}</v-icon>
                  <v-text-field
                    v-model="redesSociales[index].urlPerfil"
                    :label="getRedSocialPorCodigo(redSocial.redSocial).texto"
                  ></v-text-field>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider class="mt-15 mb-15" />

        <div class="text-center contenedor_botonesDeAcciones">
          <div class="botonesDeAcciones">
            <v-btn 
              block
              outlined
              class="mb-5"
              color="#683bce"
              v-on:click="actualizar"
              :disabled="$v.$anyError || cargando"
            >
              Actualizar
            </v-btn>
            
            <v-btn 
              block
              outlined
              class="mt-0"
              color="#ff1d89"
              v-on:click="reiniciar"
            >
              Reiniciar
            </v-btn>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    descripcion: { minLength: minLength(0), maxLength: maxLength(1000) },
    especializaciones: { minLength: minLength(0), maxLength: maxLength(1000) },
    intereses: { minLength: minLength(0), maxLength: maxLength(1000) },
  },

  data() {
    return {
      actual: {},
      descripcion: '',
      especializaciones: '',
      intereses: '',
      redesSociales: [],
      rolDescriptivo: 'Estudiante de Jekuaapy',
      listaRedesSocialesCodigoSeleccionado: [],
      listaRedesSociales: [
        {
          icon: 'mdi-github',
          texto: 'GitHub',
          codigo: 'github',
        },
        {
          icon: 'mdi-instagram',
          texto: 'Instagram',
          codigo: 'instagram',
        },
        {
          icon: 'mdi-facebook',
          texto: 'Facebook',
          codigo: 'facebook',
        },
        {
          icon: 'mdi-twitter',
          texto: 'Twitter',
          codigo: 'twitter',
        },
        {
          icon: 'mdi-twitch',
          texto: 'Twitch',
          codigo: 'twitch',
        },
        {
          icon: 'mdi-linkedin',
          texto: 'LinkedIn',
          codigo: 'linkedin',
        },
        {
          icon: 'mdi-web',
          texto: 'Mi sitio web',
          codigo: 'web',
        },
      ],
      cargando: false,
    }
  },

  components: {
    
  },

  watch: {
    listaRedesSocialesCodigoSeleccionado: function (n, v) {
      let codigo

      if (n.length < v.length) {
        codigo = this.obtenerRedSocialEscrito(v, n)
        this.quitar(codigo)
        return
      }

      codigo = this.obtenerRedSocialEscrito(n, v)
      this.seleccionar(codigo)
    }
  },
  
  methods: {
    getRedSocialPorCodigo (codigo) {
      return this.listaRedesSociales.find(x => x.codigo === codigo)
    },
    obtenerRedSocialEscrito(arrMayor, arrMenor) {
      for (let i = 0; i < arrMayor.length; i++) {
        const elementMayor = arrMayor[i]
        const encontrado = !!arrMenor.find(x => x === elementMayor)
        
        if (!encontrado) return elementMayor
      }

      return
    },
    seleccionar(codigo) {
      if (!codigo) return
      const existe = !!this.redesSociales.find(x => x.redSocial === codigo)

      if (existe) return

      this.redesSociales.push({
        redSocial: codigo,
        urlPerfil: '',
      })
    },
    quitar(codigo) {
      if (!codigo) return
      const existe = !!this.redesSociales.find(x => x.redSocial === codigo)

      if (!existe) return

      for( var i = 0; i < this.redesSociales.length; i++){ 
        if ( this.redesSociales[i].redSocial === codigo) { 
          this.redesSociales.splice(i, 1); 
        }
      }
    },
    estaSeleccionado (item) {
      for (let i = 0; i < this.listaRedesSocialesCodigoSeleccionado.length; i++) {
        const element = this.listaRedesSocialesCodigoSeleccionado[i]
        if (element === item.codigo) return true

      }
      
      return false
    },
    obtenerDatosActualizados () {
      const actual = this.actual
      let datos = {}

      this.descripcion !== actual.descripcion ? 
      datos.descripcion = this.descripcion : ''
      
      this.especializaciones !== actual.especializaciones ? 
      datos.especializaciones = this.especializaciones : ''

      this.intereses !== actual.intereses ? 
      datos.intereses = this.intereses : ''

      let diferentes = this.redesSociales.length !== actual.redesSociales.length
      let existe
      if (!diferentes) {
        for (let i = 0; i < this.redesSociales.length; i++) {
          const element = this.redesSociales[i]
          existe = false
          for (let j = 0; j < actual.redesSociales.length; j++) {
            const element2 = actual.redesSociales[j]
            if (element.redSocial === element2.redSocial) {
              existe = true
              break
            }
          }

          if (!existe) break
        }

        
      }

      if (!existe || diferentes) {
        this.redesSociales !== actual.redesSociales ? 
        datos.redesSociales = this.redesSociales : ''
      }
      
      return datos
    },
    async actualizar () {
      if (this.$v.anyError) return

      const actualizados = this.obtenerDatosActualizados()
      
      try {
        let token = this.$firebase.auth().currentUser

        token = token ? await token.getIdToken() : ''

        let body = actualizados

        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const respuesta = await this.$axios.$put(`/usuarios/estudiante/actualizarInformacion`, body, config)

      } catch (error) {
        console.log('error', error)

        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
      }
    },
    reiniciar () {
      let actual = JSON.parse( JSON.stringify(this.actual) )
      this.descripcion = actual.descripcion
      this.especializaciones = actual.especializaciones
      this.intereses = actual.intereses
      this.redesSociales = actual.redesSociales
      this.rolDescriptivo = actual.rolDescriptivo
      this.listaRedesSocialesCodigoSeleccionado = actual.listaRedesSocialesCodigoSeleccionado
    },
  },

  computed:{
    listaNombresRedesSociales: {
      get: function () {
        let nombresRedesSociales = []
        for (let i = 0; i < this.listaRedesSociales.length; i++) {
          const element = this.listaRedesSociales[i]
          nombresRedesSociales.push(element.texto)
        }

        return nombresRedesSociales
      },
    },
    erroresDescripcion () {
      const errors = []
      if (!this.$v.descripcion.$dirty) return errors
      !this.$v.descripcion.minLength && errors.push('¡El texto es muy corto!')
      !this.$v.descripcion.maxLength && errors.push('¡El texto es muy largo!')
      return errors
    },
    erroresEspecializaciones () {
      const errors = []
      if (!this.$v.especializaciones.$dirty) return errors
      !this.$v.especializaciones.minLength && errors.push('¡El texto es muy corto!')
      !this.$v.especializaciones.maxLength && errors.push('¡El texto es muy largo!')
      return errors
    },
    erroresIntereses () {
      const errors = []
      if (!this.$v.intereses.$dirty) return errors
      !this.$v.intereses.minLength && errors.push('¡El texto es muy corto!')
      !this.$v.intereses.maxLength && errors.push('¡El texto es muy largo!')
      return errors
    },
  },

  async created() {
    this.cargando = true
    const db = this.$firebase.firestore()
    const ref = db.collection('InformacionUsuarios').doc(this.$store.state.modules.usuarios.uid)
    const doc = await ref.get()
    const data = doc.data()

    this.descripcion = data.descripcion
    this.especializaciones = data.especializaciones
    this.intereses = data.intereses
    this.redesSociales = data.redesSociales
    this.rolDescriptivo = data.rolDescriptivo

    let lista = []
    for (let i = 0; i < this.redesSociales.length; i++) {
      const element = this.redesSociales[i]
      lista.push(element.redSocial)
    }
    this.listaRedesSocialesCodigoSeleccionado = lista

    let data2 = JSON.parse( JSON.stringify(data) )
    this.actual.descripcion = data2.descripcion
    this.actual.especializaciones = data2.especializaciones
    this.actual.intereses = data2.intereses
    this.actual.redesSociales = data2.redesSociales
    this.actual.rolDescriptivo = data2.rolDescriptivo
    this.actual.listaRedesSocialesCodigoSeleccionado = JSON.parse( JSON.stringify( lista ) )

    this.cargando = false
  },
}
</script>

<style scoped>
.subtitulos {
  color: #683bce;
}

.componente {
  padding: 10px;
}

.itemRedSocial {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.seleccionado {
  
}

.primary--text {
  color: #683bce !important;
}

.v-list-item--active {
  background: #683bce !important;
}

.botonesDeAcciones {
  width: 500px;
  margin: auto;
}

.contenedor_botonesDeAcciones {

}

@media only screen and (max-width: 550px) {
  .botonesDeAcciones {
    width: 300px;
    margin: auto;
  }
}

@media only screen and (max-width: 350px) {
  .botonesDeAcciones {
    width: 190px;
    margin: auto;
  }
}
</style>