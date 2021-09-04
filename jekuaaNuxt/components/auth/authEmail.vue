<template>
  <div class="">
    <v-responsive color="teal" dark height="100px">
      <v-container fill-height>
        <v-row row align-center>
          <v-col text-xs-center>
            <h3 class="display-1">
              {{ data.title }}
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>

    <v-container>
      <v-responsive>
        <v-form id="nativeForm" v-model="valid">
          <v-text-field
            v-if="action === 'r'"
            v-model="nombreUsuario"
            label="Nombre de usuario"
            name="nombreUsuario"
          />

          <v-text-field
            v-if="action === 'r'"
            v-model="nombreCompleto"
            label="Nombre completo"
            name="nombreCompleto"
          />

          <v-text-field
            v-model="correo"
            label="Correo"
            name="correo"
          />

          <v-text-field
            v-model="contrasenha"
            label="Contraseña"
            name="contrasenha"
            type="password"
          />

          <v-text-field
            v-if="action === 'r'"
            v-model="confirmacionContrasenha"
            label="Confirmar contraseña"
            name="confirmacionContrasenha"
            type="password"
          />

          <v-btn color="teal" dark :disabled="!valid" @click="submit">
            {{ data.btnMessage }}
          </v-btn>
        </v-form>
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
// import f from 'firebase'

export default {
  name: '',
  props: {
    action: String,
    data: Object
  },
  data () {
    return {
      valid: false,
      nombreUsuario: '',
      nombreCompleto: '',
      correo: '',
      contrasenha: '',
      confirmacionContrasenha: ''
    }
  },
  methods: {
    submit () {
      let data = {}

      if (this.action == 'r') {
        
        if ( this.contrasenha === this.confirmacionContrasenha ) {
          data = {
            nombreUsuario: this.nombreUsuario,
            nombreCompleto: this.nombreCompleto,
            correo: this.correo,
            contrasenha: this.contrasenha,
            // fechaNacimiento: this.$firebase.firestore.Timestamp.fromDate(new Date(this.fechaNacimiento.replace('-', '/').replace('-', '/')))
          }
        } else {
          
        }

      } else {
        data = {
          correo: this.correo,
          contrasenha: this.contrasenha
        }
      }

      this.$emit('process', data)
    }
  }
}
</script>

<style>

</style>