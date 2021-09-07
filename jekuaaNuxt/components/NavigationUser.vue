<template>
  <div class="">
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list-item to="/perfil">
        <v-list-item-avatar color="#683bce">
          <v-img v-if="!!fotoPerfil" src="https://randomuser.me/api/portraits/men/78.jpg" />
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
          v-if="esMiembroJekuaa"
          to="/admin"
          link
        >
          <v-list-item-icon>
            <v-icon> mdi-account-supervisor-circle-outline </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Administración
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          @click="cerrarSesion"
        >
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
      height="100"
      fixed
      app
      style="background: #ffffff;"
    >
      <div class="containerLogo">
        <nuxt-link to="/">
          <v-app-bar-nav-icon @click="sidebar = !sidebar">
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
          </v-app-bar-nav-icon>
        </nuxt-link>
      </div>

      <v-tabs align-with-title class="d-none d-sm-none d-md-flex" optional color="#683bce">
        <v-tab to="/">
          <v-icon class="navItemIcon">
            mdi-home
          </v-icon>
          <samp class="estiloTexto">Inicio</samp>
        </v-tab>

        <v-tab to="/cursos">
          <v-icon class="navItemIcon">
            mdi-television-play
          </v-icon>
          <samp class="estiloTexto">Cursos</samp>
        </v-tab>

        <v-tab to="/planes">
          <v-icon class="navItemIcon">
            mdi-cards
          </v-icon>
          <samp class="estiloTexto">Planes</samp>
        </v-tab>

        <v-tab to="/blog">
          <v-icon class="navItemIcon">
            mdi-book-open-variant
          </v-icon>
          <samp class="estiloTexto">Blog</samp>
        </v-tab>

        <v-tab v-if="esMiembroJekuaa" to="/admin">
          <v-icon class="navItemIcon">
            mdi-account-supervisor-circle-outline
          </v-icon>
          <samp class="estiloTexto">Administración</samp>
        </v-tab>
      </v-tabs>

      <v-spacer />

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
                size="48"
              >
                <v-img v-if="!!fotoPerfil" src="https://randomuser.me/api/portraits/men/78.jpg" />
                <span v-else class="white--text headline">{{ inicialNombreUsuario }}</span>
              </v-avatar>
            </v-btn>
          </template>
          
          <v-card class="mx-auto" max-width="300" tile>
            <!-- shaped -->
            <v-list>
              
              <div class="mx-auto text-center mt-3">
                <v-avatar
                  color="#683bce"
                >
                  <span class="estiloTexto white--text headline">{{ inicialNombreUsuario }}</span>
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
                v-for="(item, i) in itemsPerfil"
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
        { title: 'Inicio', icon: 'mdi-home', to: '/' },
        { title: 'Cursos', icon: 'mdi-television-play', to: '/cursos' },
        { title: 'Planes', icon: 'mdi-cards', to: '/planes' },
        { title: 'Blog', icon: 'mdi-book-open-variant', to: '/blog' }
      ],
      itemsPerfil: [
        { text: 'Ver perfil', icon: 'mdi-account', to: '/perfil' },
      ]
    }
  },
  methods: {
    ...mapActions('modules/user/user', ['firebaseCerrarSesionUser_EmailAndPassword', 'logout']),
    async cerrarSesion () {
      
      try {
        await this.firebaseCerrarSesionUser_EmailAndPassword()
        
        this.logout()
        
        this.$router.push('/')

      } catch (error) {
        console.log('cerrarSesion - NavigationUser: ', error)

      } finally {

      }
        
    }
  },
  computed: {
    ...mapState('modules/user/user', ['fotoPerfil', 'nombreUsuario', 'correo']),
    ...mapGetters('modules/user/user', ['esMiembroJekuaa']),
    inicialNombreUsuario () {
      return this.nombreUsuario[0].toUpperCase()
    },
    correoUsuario () {
      return this.correo
    },
  },
  async mounted () {}
}
</script>

<style>

.containerLogo {
    margin-left: 10px;
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

</style>
