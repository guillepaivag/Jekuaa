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
                <v-divider class="mb-2"></v-divider>
                <p>
                    En el equipo de Jekuaapy buscamos que tengas un sitio donde 
                    ir aprendiendo de forma eficaz, que nunca te desmotives y 
                    puedas aprender de la manera más divertida!
                </p>

            </v-col>
            <v-col class="" cols="12" md="5">
                <!-- class="stylie" -->
                <!-- max-height="250" max-width="450" -->
                <v-img :src="require('~/assets/img/team.jpg')"></v-img>
            </v-col>
        </v-row>

        <v-row class="contenedor_informacion">
            <v-col class="" cols="12" md="5">
                <v-img :src="require('~/assets/img/profesional.jpg')"></v-img>
            </v-col>
            <v-col cols="12" md="7">
                <h2>¡Transformate en un profesional! 🚀</h2>
                <v-divider class="mb-2"></v-divider>
                <p>
                    Tenemos la misión de que aprendas de forma eficiente, divertida
                    y te transformes en el profesional que tu quieres ser, estaras con 
                    profesionales guiandote paso a paso con nuestros cursos especializados 
                    y gamificados.
                </p>
                <p>
                    ¡Conoceras tu "yo" del futuro! 
                </p>
            </v-col>
        </v-row>

        <v-row class="contenedor_informacion mb-15">
            <v-col cols="12" md="7">
                <h2>¡Busca a otras personas para aprender!</h2>
                <v-divider class="mb-2"></v-divider>
                <p>
                    Una de las cosas mas importantes cuando quieres 
                    conseguir un trabajo y experiencia es formar una 
                    red de contacto, aquí en Jekuaapy priorizamos que 
                    además de aprender, puedas conocer a nuestros 
                    miembros y la comunidad.
                </p>
                <p>
                    ¿y quién sabe si te encuentras 
                    un nuevo socio? 😉
                </p>
            </v-col>
            <v-col class="" cols="12" md="5">
                <v-img :src="require('~/assets/img/conociendo_gente.jpg')"></v-img>
            </v-col>
        </v-row>

        <div class="text-center mb-15">
            <v-btn
                class=""
                outlined
                x-large
                color="indigo"
                to="/centro"
            >
                🚀 Comenzar
            </v-btn>
        </div>
        
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
    margin-bottom: 150px;
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