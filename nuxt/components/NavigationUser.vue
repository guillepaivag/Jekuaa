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
          <v-list-item-title class="estiloTexto1">
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
            <v-list-item-title class="">
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
            <v-list-item-title class="">
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
            <v-list-item-title class="">
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
            <v-list-item-title class="">
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
            <v-list-item-title class="">
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
            <v-list-item-title class="">
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
            :src="require(`~/assets/img/logo1.png`)"
          />
        </nuxt-link>
      </div>

      <v-tabs align-with-title class="d-none d-sm-none d-md-flex" optional color="#683bce">
        <v-tab class="tab1" to="/centro">
          <v-icon class="navItemIcon">
            mdi-home
          </v-icon>
          <samp class="estiloTexto">Centro</samp>
        </v-tab>

        <v-tab class="tab1" to="/blogs">
          <v-icon class="navItemIcon">
            mdi-book-open-variant
          </v-icon>
          <samp class="estiloTexto">Blogs</samp>
        </v-tab>

        <v-tab class="tab1" to="/cursos">
          <v-icon class="navItemIcon">
            mdi-television-play
          </v-icon>
          <samp class="estiloTexto">Cursos</samp>
        </v-tab>

        <v-tab class="tab1" to="/mis-cursos">
          <v-icon class="navItemIcon px-9">
            mdi-bookshelf
          </v-icon>
          <samp class="estiloTexto">Mis cursos</samp>
        </v-tab>

      </v-tabs>

      <v-spacer />

      <!-- <v-btn
        class="btnMisCursos1 white--text mr-3"
        small
        color="#683bce"
        to="/mis-cursos"
      >
        Mis cursos
      </v-btn> -->

      <v-chip
        class="mr-3"
        color="#683bce"
        outlined
        style="font-size: 17px;"
        small
      >
        <span class="">
          {{ $store.state.modules.usuarios.point }} JP
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
            <v-list shaped>
              
              <div class="mx-auto text-center mt-3">
                <v-avatar
                  color="#683bce"
                  size="55"
                >
                  <v-img v-if="!!fotoPerfil" :src="fotoPerfil" />
                  <span v-else class="estiloTexto1 white--text headline">
                    {{ inicialNombreUsuario }}
                  </span>
                </v-avatar>
                <h3 class="estiloTexto1 mt-2">
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

.tab1 {
  display: block;
  padding: 10px 1px 1px 0;
  min-width: 75px !important;
}

.containerLogo {
  margin-left: 5px;
  margin-right: -20px;
}

.navButtons {
  margin-left: 10px;
}

.navItemIcon {
  font-size: 20px;
  margin-bottom: 3px;
}

.containerIcono {
  margin-right: 10px;
}

.estiloTexto {
  font-family: 'Asap', sans-serif;
  font-weight: bold;
  display: block;
  font-size: 11px;
}

.estiloTexto1 {
  font-family: 'Asap', sans-serif;
  font-weight: bold;
  font-size: 16px;
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
