<template>
  <v-card class="jumbotron">
    <v-container
      class="containerPrincipal"
    >
      <h1 class="titulo" transition="scale-transition">
        Jekuaa
      </h1>
      <hr color="#F0F0F0">
      <p class="descripcion" transition="scale-transition">
        ¡Todos los cursos que deseas esta con nosotros!
      </p>

      <v-row
        align="center"
        justify="space-around"
        class="mt-4"
      >
        <v-col cols="auto">
          <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                class="btnVideo"
                color="#683bce"
                outlined
                v-bind="attrs"
                transition="scale-transition"
                v-on="on"
              >
                <v-icon left>
                  mdi-file-video-outline
                </v-icon>
                Ver video
              </v-btn>
            </template>
            <template #default="dialog">
              <v-card>
                <v-toolbar
                  color="#683bce"
                  dark
                >
                  Bienvenido ¡Dejanos presentarnos!
                </v-toolbar>
                <v-card-text>
                  <div class="text-h2">
                    <div class="mt-5">
                      <video-player :options="videoOptions" />
                    </div>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="dialog.value = false"
                  >
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <!-- <v-row no-gutters class="containerPrincipal">
            <v-col
                cols="12"
                sm="6"
            >
                <div class="contenedorVideoPlayer">
                    <video-player :options="videoOptions"/>
                </div>

                <v-card
                    class="mx-auto"
                    max-width="400"
                >
                    <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    <v-card-title>Top 10 Australian beaches</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                    Number 10
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                    <div>Whitehaven Beach</div>

                    <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>

                    <v-card-actions>
                    <v-btn
                        color="orange"
                        text
                    >
                        Share
                    </v-btn>

                    <v-btn
                        color="orange"
                        text
                    >
                        Explore
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col
                cols="12"
                sm="6"
            >
                <h3>Titulo</h3>
                <hr>
                <p
                    transition="slide-x-transition"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </v-col>
        </v-row> -->
  </v-card>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'

export default {
  name: 'Presentacion',
  components: {
    VideoPlayer
  },
  data () {
    return {
      videoOptions: {
        controls: true,
        sources: [
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/jekuaa-py.appspot.com/o/Rain%20-%2012156.mp4?alt=media&token=562c2a93-5bdd-4465-ad3c-42d997813388',
            // src:"https://www.youtube.com/watch?v=8BjmowhIRaU&ab_channel=ESPNFans",
            type: 'video/mp4'
          }
        ]
      }
    }
  }
}
</script>

<style>
    .containerPrincipal {
        padding: 30px;
        /*  */
        text-align: center;
        height: 500px;
    }

    .contenedorVideoPlayer {
        position: relative;
        /* padding-bottom: 56.25%;
        padding-top: 30px;  */
        height: 0;
        overflow: hidden;
        /* background: black;
        position: absolute; */
        width: 620px;
        height: 400px;
    }

    .titulo {
        margin: 23px 0;
        font-size: 80px;
        font-family: 'Asap', sans-serif;
    }

    .descripcion {
        margin-top: 23px;
        margin-top: 10px;
        font-family: 'Asap', sans-serif;
    }

    .listaServicios {
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .btnVideo {
        height: 120px;
        width: 220px;
        margin-top: 150px;
    }
</style>
