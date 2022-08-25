<template>
  <div class="">
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list-item to="/perfil">
        <v-list-item-avatar color="#683bce">
          <v-img v-if="!!fotoPerfil" :src="fotoPerfil" />
          <span v-else class="white--text headline">
            {{ inicialNombreUsuario }}
          </span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="estiloTexto">
            {{ nombreUsuario }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          class="btnMisCursos2"
          to="/mis-cursos"
          link
        >
          <v-list-item-icon>
            <v-icon> 
              mdi-laptop
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Mis cursos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/historial-compra/productos"
          link
        >
          <v-list-item-icon>
            <v-icon> 
              mdi-history
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Historial de compra
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="esMiembro"
          to="/miembro"
          link
        >
          <v-list-item-icon>
            <v-icon> 
              mdi-alpha-j-box-outline
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Miembro
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="esModerador"
          to="/moderador"
          link
        >
          <v-list-item-icon>
            <v-icon>
              mdi-alpha-m-box-outline
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Moderador
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item @click="cerrarSesion">
          <v-list-item-icon>
            <v-icon> mdi-account-plus </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Cerrar sesión
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>







    <v-app-bar
      height="55"
      fixed
      app
      style="background: #ffffff;"
    >
      <div class="containerLogo">
        <nuxt-link to="/">
          <v-img
            contain
            max-width="125"
            :src="require(`~/assets/img/logo_classfii.png`)"
          />
        </nuxt-link>
      </div>

      <v-tabs align-with-title class="d-none d-sm-none d-md-flex" optional color="#683bce">
        <v-tab to="/centro">
          <v-icon class="navItemIcon">
            mdi-home
          </v-icon>
          <samp class="estiloTexto">Centro</samp>
        </v-tab>

        <v-tab to="/blogs">
          <v-icon class="navItemIcon">
            mdi-book-open-variant
          </v-icon>
          <samp class="estiloTexto">Blogs</samp>
        </v-tab>

        <v-tab to="/cursos">
          <v-icon class="navItemIcon">
            mdi-television-play
          </v-icon>
          <samp class="estiloTexto">Cursos</samp>
        </v-tab>

      </v-tabs>

      <v-spacer />

      <v-btn
        class="btnMisCursos1 mr-3"
        text
        small
        color="#683bce"
        to="/mis-cursos"
      >
        Mis cursos
      </v-btn>

      <v-chip
        class="mr-3"
        color="#683bce"
        outlined
        style="font-size: 17px;"
        small
      >
        <span class="">
          {{ $store.state.modules.usuarios.point }} FP
        </span>
      </v-chip>

      <div class="containerIcono d-none d-sm-none d-md-flex">
        <v-menu
          class="mr-5"
          bottom
          min-width="200px"
          rounded
          offset-y
        >
          <template #activator="{ on }">
            <v-btn
              icon
              x-large
              v-on="on"
            >
              <v-avatar
                color="#683bce"
                size="40"
              >
                <v-img v-if="!!fotoPerfil" :src="fotoPerfil" />
                <span v-else class="white--text headline">
                  {{ inicialNombreUsuario }}
                </span>
              </v-avatar>
            </v-btn>
          </template>
          
          <v-card class="mx-auto" max-width="300" tile>
            <!-- shaped -->
            <v-list shaped>
              
              <div class="mx-auto text-center mt-3">
                <v-avatar
                  color="#683bce"
                  size="55"
                >
                  <v-img v-if="!!fotoPerfil" :src="fotoPerfil" />
                  <span v-else class="estiloTexto white--text headline">
                    {{ inicialNombreUsuario }}
                  </span>
                </v-avatar>
                <h3 class="estiloTexto mt-2">
                  {{ nombreUsuario }}
                </h3>
                <p class="caption mt-1">
                  {{ correoUsuario }}
                </p>
              </div>

              <v-divider class="my-3" />

              <v-list-item
                v-for="(item, i) in itemsMenu2"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="esMiembro" to="/miembro">
                <v-list-item-icon>
                  <v-icon>mdi-alpha-j-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Miembro</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="esModerador" to="/moderador">
                <v-list-item-icon>
                  <v-icon>mdi-alpha-m-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Moderador</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-3" />

              <v-list-item
                @click="cerrarSesion"
              >
                <v-list-item-icon>
                  <v-icon>
                    mdi-logout-variant
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Cerrar sesión
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
            </v-list>
          </v-card>

        </v-menu>
      </div>

      <div class="containerIcono d-flex d-sm-flex d-md-none">
        <v-app-bar-nav-icon @click="drawer = true" />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'NavigationDefault',
  data () {
    return {
      sidebar: false,
      drawer: null,
      items: [
        { title: 'Centro', icon: 'mdi-home', to: '/centro' },
        { title: 'Blogs', icon: 'mdi-book-open-variant', to: '/blogs' },
        { title: 'Cursos', icon: 'mdi-television-play', to: '/cursos' },
        // { title: 'Precios', icon: 'mdi-alpha-p-circle', to: '/precios' },
      ],
      itemsMenu2: [
        { text: 'Ver perfil', icon: 'mdi-account', to: '/perfil' },
        { text: 'Historial de compra', icon: 'mdi-history', to: '/historial-compra/productos' },
      ]
    }
  },
  methods: {
    ...mapActions('modules/usuarios', ['logout']),
    async cerrarSesion () {
      
      try {
        this.logout()
        
        this.$router.push('/')

      } catch (error) {
        console.log('cerrarSesion - NavigationUser: ', error)

      } finally {

      }
        
    }
  },
  computed: {
    ...mapState('modules/usuarios', ['fotoPerfil', 'nombreUsuario', 'correo']),
    ...mapGetters('modules/usuarios', ['esMiembro', 'esModerador']),
    inicialNombreUsuario () {
      return this.nombreUsuario ? this.nombreUsuario[0].toUpperCase() : ''
    },
    correoUsuario () {
      return this.correo
    },
  },
  async mounted () {}
}
</script>

<style scoped>
.v-tabs {
  width: 50%;
}

.containerLogo {
    margin-left: 5px;
    margin-right: -20px;
}

.navButtons {
    margin-left: 10px;
}

.navItemIcon {
    margin-right: 10px;
}

.containerIcono{
    margin-right: 10px;
}

.estiloTexto {
    font-family: 'Asap', sans-serif;
    font-weight: bold;
}

@media (max-width: 460px) {
  .btnMisCursos1 {
    display: none;
  }
}

/* @media (min-width: 461px) {
  .btnMisCursos2 {
    display: none;
  }
} */

</style>
