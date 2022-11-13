<template>
  <div class="">


    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list-item>
        <!-- <v-list-item-avatar color="#683bce">
                    <span class="white--text headline">{{ user.initials }}</span>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar> -->

        <v-list-item-content>
          <v-list-item-title class="estiloTexto2">
            Jekuaapy
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

        <v-divider />

        <v-list-item
          to="/registro"
          link
        >
          <v-list-item-icon>
            <v-icon> mdi-account-plus </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto2">
              Registrarme
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/inicioSesion"
          link
        >
          <v-list-item-icon>
            <v-icon> mdi-account-circle </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto2">
              Iniciar sesión
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
        <v-tab class="tab1" to="/">
          <v-icon class="navItemIcon">
            mdi-home
          </v-icon>
          <samp class="estiloTexto">Inicio</samp>
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

      </v-tabs>

      <v-spacer />

      <v-toolbar-items class="d-none d-sm-none d-md-flex">
        <v-btn
          class="estiloTexto2"
          color="#683bce"
          text
          to="/registro"
        >
          <v-icon left>
            mdi-account-plus
          </v-icon>
          Registrarme
        </v-btn>

        <v-btn
          class="estiloTexto2"
          color="#683bce"
          text
          to="/inicioSesion"
        >
          <v-icon left>
            mdi-account-circle
          </v-icon>
          Iniciar sesión
        </v-btn>
      </v-toolbar-items>

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

.estiloTexto2 {
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
