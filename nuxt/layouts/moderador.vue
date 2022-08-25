<template>
  <div>

    <div v-if="getLoading">
      <loading />
    </div>

    <div v-else>
      <v-app>
        <v-app-bar
          app
          :height="$vuetify.breakpoint.smAndDown ? 60 : 10"
          color="#683bce"
          dark
        >
          <v-spacer></v-spacer>
          <div v-if="$vuetify.breakpoint.smAndDown">
            <v-app-bar-nav-icon @click="drawer = !drawer">
            </v-app-bar-nav-icon>
          </div>

        </v-app-bar>

        <v-main>
          <!-- Celular -->
          <v-navigation-drawer
            v-if="$vuetify.breakpoint.smAndDown"
            v-model="drawer"
            app
            :temporary="false"
          >
            <v-list-item class="px-2">
              <v-list-item-avatar color="#683bce">
                <v-img v-if="!!fotoPerfil" :src="fotoPerfil" />
                <span v-else class="white--text headline">
                  {{ inicialNombreUsuario }}
                </span>
              </v-list-item-avatar>

              <v-list-item-title>
                {{ nombreUsuario }}
              </v-list-item-title>

            </v-list-item>

            <v-divider></v-divider>

            <v-list class="mt-3" dense>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                exact
                :to="item.to"
                :disabled="(item.id === 'moderador-cursos' || item.id === 'moderador-blogs' || item.id === 'moderador-usuarios') && !$store.state.modules.usuarios.moderador.funciones.includes(item.id)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-5"></v-divider>
              
              <v-list-item
                link
                exact
                to="/"
              >
                <v-list-item-icon>
                  <v-icon>
                    mdi-home-city
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    Volver
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-5"></v-divider>
            </v-list>
          </v-navigation-drawer>

          <!-- Laptop -->
          <v-navigation-drawer
            v-if="!$vuetify.breakpoint.smAndDown"
            v-model="drawer"
            :mini-variant.sync="mini"
            absolute
            permanent
            expand-on-hover
            :temporary="false"
          >
            <v-list-item
              class="px-2"
            >
              <v-list-item-avatar color="#683bce">
                <v-img v-if="!!fotoPerfil" :src="fotoPerfil" />
                <span v-else class="white--text headline">
                  {{ inicialNombreUsuario }}
                </span>
              </v-list-item-avatar>

              <v-list-item-title>
                {{ nombreUsuario }}
              </v-list-item-title>

            </v-list-item>

            <v-divider></v-divider>

            <v-list class="mt-3" dense>
              
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                exact
                :to="item.to"
                :disabled="(item.id === 'moderador-cursos' || item.id === 'moderador-blogs' || item.id === 'moderador-usuarios') && !$store.state.modules.usuarios.moderador.funciones.includes(item.id)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-5"></v-divider>
              
              <v-list-item
                link
                exact
                to="/"
              >
                <v-list-item-icon>
                  <v-icon>
                    mdi-home-city
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    Volver
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-5"></v-divider>

            </v-list>
          </v-navigation-drawer>

          <!-- Vista de contenido -->
          <div class="contenedor_moderador">
            <nuxt />
          </div>
        </v-main>

      </v-app>
    
      <snackbar-error v-model="getError" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from '@/components/Loading'
import NavigationDefault from '@/components/NavigationDefault'
import NavigationUser from '@/components/NavigationUser'
import SnackbarError from '@/components/SnackbarError'

export default {
  data () {
    return {
      drawer: true,
      mini: true,
      items: [
        { id: 'moderador', title: 'Moderador', icon: 'mdi-account', to: '/moderador' },
        { id: 'moderador-usuarios', title: 'Usuarios', icon: 'mdi-account', to: '/moderador/usuarios' },
        { id: 'moderador-blogs', title: 'Blogs', icon: 'mdi-bookshelf', to: '/moderador/blogs' },
        { id: 'moderador-cursos', title: 'Cursos', icon: 'mdi-video', to: '/moderador/cursos' },
      ],
    }
  },
  components: {
    NavigationDefault,
    NavigationUser,
    'snackbar-error': SnackbarError
  },
  watch: {
    '$vuetify.breakpoint.smAndDown': function (n, v) {
      this.drawer = !n
    }
  },
  computed: {
    inicialNombreUsuario () {
      return this.nombreUsuario ? this.nombreUsuario[0].toUpperCase() : ''
    },
    ...mapGetters('modules/sistema', [
      'getLoading',
    ]),
    ...mapGetters('modules/usuarios', [
      'uid',
      'datosPersonales',
      'autenticado',
      'fotoPerfil',
      'nombreUsuario',
    ]),
    ...mapGetters('modules/sistema', [
      'getLoading',
      'getError'
    ])
  },
  async mounted() {
    if (this.$vuetify.breakpoint.smAndDown) this.drawer = false

    const db = this.$firebase.firestore()
    const uid = this.$store.state.modules.usuarios.uid
    const doc = await db.collection('Moderadores').doc(uid).get()

    this.$store.dispatch('modules/usuarios/moderador/setModerador', doc.data())
  },
}
</script>

<style scoped>
@media (max-width: 768px) {
  .v-navigation-drawer-hidden {
    display: none;
  }
}

@media (min-width: 768px) {
  .v-app-bar-hidden {
    display: none;
  }
}

/* CELULAR */
@media (max-width: 959px) {
  .contenedor_moderador {
    position: relative;
    margin-bottom: 30px;
    width: 100%;
  }
}

/* LAPTOP */
@media (min-width: 960px) {
  .contenedor_moderador {
    
  }
}

/* LAPTOP */
@media screen and (min-width: 1000px) and (max-width: 1035px) {
  .contenedor_moderador {
    margin-left: 35px;
  }
}

/* LAPTOP */
@media screen and (min-width: 960px) and (max-width: 1000px) {
  .contenedor_moderador {
    margin-left: 60px;
  }
}

/* LAPTOP */
@media screen and (min-width: 1264px) and (max-width: 1325px) {
  .contenedor_moderador {
    margin-left: 60px;
  }
}

/* 
  custom scrollbar:  
  https://dev.to/xtrp/how-to-create-a-beautiful-custom-scrollbar-for-your-site-in-plain-css-1mjg
*/

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: #dbdbdb;
}

::-webkit-scrollbar-thumb {
  background-color: #683bce;
  border-radius: 20px;

}

::-webkit-scrollbar-thumb:hover {
  background-color: #683bce;
}

::-webkit-scrollbar:horizontal{
  height: 6px;
}

</style>