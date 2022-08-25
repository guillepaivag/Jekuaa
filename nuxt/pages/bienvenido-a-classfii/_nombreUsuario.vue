<template>
    <div class="container">
        <h1 class="mt-5">
            ¡Bienvenido 
            <b style="color: #ff1d89;">{{nombreUsuario}}</b>!
        </h1>

        <v-divider class="mt-5 mb-15"></v-divider>

        <v-row class="contenedor_informacion">
            <v-col cols="12" md="7">
                <h2>¡Aprende con un equipo especializado!</h2>
                <v-divider class=""></v-divider>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed et lacus a ipsum viverra ullamcorper. Interdum et 
                    malesuada fames ac ante ipsum primis in faucibus. Maecenas 
                    orci diam, pellentesque imperdiet sapien sed, viverra placerat 
                    nisi. Proin commodo semper pellentesque. Sed vulputate 
                    convallis sem, a lobortis tortor imperdiet ac.
                </p>

            </v-col>
            <v-col class="" cols="12" md="5">
                <!-- class="stylie" -->
                <!-- max-height="250" max-width="450" -->
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    src="https://picsum.photos/id/11/500/300"
                ></v-img>
            </v-col>
        </v-row>

        <v-row class="contenedor_informacion">
            <v-col class="" cols="12" md="5">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    src="https://picsum.photos/id/11/500/300"
                ></v-img>
            </v-col>
            <v-col cols="12" md="7">
                <h2>¡Transformate en un profesional!</h2>
                <v-divider class=""></v-divider>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed et lacus a ipsum viverra ullamcorper. Interdum et 
                    malesuada fames ac ante ipsum primis in faucibus. Maecenas 
                    orci diam, pellentesque imperdiet sapien sed, viverra placerat 
                    nisi. Proin commodo semper pellentesque. Sed vulputate 
                    convallis sem, a lobortis tortor imperdiet ac.
                </p>
            </v-col>
        </v-row>

        <v-row class="contenedor_informacion">
            <v-col cols="12" md="7">
                <h2>¡Busca también en blogs!</h2>
                <v-divider class=""></v-divider>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed et lacus a ipsum viverra ullamcorper. Interdum et 
                    malesuada fames ac ante ipsum primis in faucibus. Maecenas 
                    orci diam, pellentesque imperdiet sapien sed, viverra placerat 
                    nisi. Proin commodo semper pellentesque. Sed vulputate 
                    convallis sem, a lobortis tortor imperdiet ac.
                </p>
            </v-col>
            <v-col class="" cols="12" md="5">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    src="https://picsum.photos/id/11/500/300"
                ></v-img>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            nombreUsuario: this.$route.params.nombreUsuario,
        }
    },
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        const miNombreUsuario = store.state.modules.usuarios.nombreUsuario

        if (miNombreUsuario !== params.nombreUsuario) return redirect('/centro')
    },
}
</script>

<style scoped>
.contenedor_informacion {
    margin-bottom: 70px;
}

/* .stylie {
  -webkit-animation-name: stylie-transform-keyframes;
  -webkit-animation-duration: 2000ms;
  -webkit-animation-delay: 0ms;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -webkit-transform-origin: 0 0;
}
@-webkit-keyframes stylie-transform-keyframes {
  0% {-webkit-transform:translateX(0) translateY(10px) rotate(0deg)}
  20% {-webkit-transform:translateX(0) translateY(15px) rotate(0deg)}
  40% {-webkit-transform:translateX(0) translateY(20px) rotate(0deg)}
  50% {-webkit-transform:translateX(0) translateY(25px) rotate(0deg)}
  60% {-webkit-transform:translateX(0) translateY(20px) rotate(0deg)}
  80% {-webkit-transform:translateX(0) translateY(15px) rotate(0deg)}
  100% {-webkit-transform:translateX(0) translateY(10px) rotate(0deg)}
} */
</style>