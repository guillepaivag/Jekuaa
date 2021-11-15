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
          <v-list-item-title class="estiloTexto">
            Jekuaa
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

        <v-divider />

        <v-list-item
          to="/autenticacion/registro"
          link
        >
          <v-list-item-icon>
            <v-icon> mdi-account-plus </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Registrarme
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/autenticacion/inicioSesion"
          link
        >
          <v-list-item-icon>
            <v-icon> mdi-account-circle </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="estiloTexto">
              Iniciar sesión
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-toolbar
            height="100"
            fixed
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
                            ></v-img>
                        </v-avatar>
                    </v-app-bar-nav-icon>
                </nuxt-link>
            </div>

            <v-toolbar-items class="containerItems d-none d-sm-none d-md-flex">
                <v-btn text to="/">Inicio</v-btn>
                <v-btn text to="/cursos">Cursos</v-btn>
                <v-btn text to="/planes">Planes</v-btn>
                <v-btn text to="/blog">Blog</v-btn>
            </v-toolbar-items>

            <v-spacer/>

            <div class="containerIcono d-none d-sm-none d-md-flex">
                <v-btn
                    tile
                    color="#683bce"
                    class="mr-2 white--text"
                    rounded
                    to="/autenticacion/registro"
                >
                    <v-icon left>
                        mdi-account-plus
                    </v-icon>
                    Registrarme
                </v-btn>

                <v-btn
                    tile
                    color="#683bce"
                    class="white--text"
                    rounded
                    to="/autenticacion/inicioSesion"
                >
                    <v-icon left>
                        mdi-account-circle
                    </v-icon>
                    Iniciar sesión
                </v-btn>
            </div>

            <div class="containerIcono d-flex d-sm-flex d-md-none">
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            </div>
        </v-toolbar> -->

    <v-app-bar
      height="70"
      fixed
      app
      style="background: #ffffff;"
    >
      <div class="containerLogo">
        <nuxt-link to="/">
          <v-app-bar-nav-icon @click="sidebar = !sidebar">
            <v-avatar
              size="80"
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

        <!-- <v-tab to="/cursos">
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
        </v-tab> -->

        <v-tab to="/blogs">
          <v-icon class="navItemIcon">
            mdi-book-open-variant
          </v-icon>
          <samp class="estiloTexto">Blogs</samp>
        </v-tab>
      </v-tabs>

      <v-spacer />

      <v-toolbar-items class="d-none d-sm-none d-md-flex">
        <v-btn
          class="estiloTexto"
          color="#683bce"
          text
          to="/autenticacion/registro"
        >
          <v-icon left>
            mdi-account-plus
          </v-icon>
          Registrarme
        </v-btn>

        <v-btn
          class="estiloTexto"
          color="#683bce"
          text
          to="/autenticacion/inicioSesion"
        >
          <v-icon left>
            mdi-account-circle
          </v-icon>
          Iniciar sesión
        </v-btn>
      </v-toolbar-items>

      <!-- <div class="containerIcono d-none d-sm-none d-md-flex">
                <v-btn
                    color="#683bce"
                    text
                    to="/autenticacion/registro"
                >
                    <v-icon left>
                        mdi-account-plus
                    </v-icon>
                    Registrarme
                </v-btn>

                <v-btn
                    color="#683bce"
                    text
                    to="/autenticacion/inicioSesion"
                >
                    <v-icon left>
                        mdi-account-circle
                    </v-icon>
                    Iniciar sesión
                </v-btn>
            </div> -->

      <div class="containerIcono d-flex d-sm-flex d-md-none">
        <v-app-bar-nav-icon @click="drawer = true" />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'NavigationDefault',
  data: () => ({
    sidebar: false,
    drawer: null,
    items: [
      { title: 'Inicio', icon: 'mdi-home', to: '/' },
      { title: 'Blogs', icon: 'mdi-book-open-variant', to: '/blogs' }
    ],
    user: {
      initials: 'GP',
      fullName: 'Guillermo Paiva',
      email: 'guillepaivag@gmail.com'
    }
  })
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

.containerItems {
    margin-left: 20px;
}

.estiloTexto {
    font-family: 'Asap', sans-serif;
    font-weight: bold;
}

</style>
