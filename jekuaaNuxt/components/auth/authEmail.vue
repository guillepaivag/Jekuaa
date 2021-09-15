<template>
  <div class="">

    <v-container class="auth text-center">
      <v-responsive>
        <div class="title">
          <v-row row align-center>
            <v-col text-xs-center>

              <v-avatar
                size="100"
                tile
              >
                <v-img
                  contain
                  max-height="60%"
                  src="https://firebasestorage.googleapis.com/v0/b/jekuaa-py.appspot.com/o/JekuaaLogo.png?alt=media&token=26851757-faff-48da-8e6f-e21f3c2c1e96"
                />
              </v-avatar>
              
              <h3 class="display-1">
                {{ data.title }}
              </h3>
            </v-col>
          </v-row>
        </div>

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

          <v-btn class="mt-4" color="#683bce" dark :disabled="!valid" @click="submit">
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
.auth {
  margin-top: 20px;
  margin-bottom: 35px;
}

.title {
  margin-bottom: 20px;
}
</style>