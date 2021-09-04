<template>
  <div>
    <div class="contenedorTitulo">
      <h3 class="estiloTexto">
        Novedades
      </h3>
    </div>

    <div
      v-for="(item, index) in atajosData"
      :key="index"
      class="contenedor"
      :style="getImg(item.imgFondo)"
    >
      <div
        class="contenedorContenido"
      >
        <h3
          :class="`${item.colorTexto}--text`"
          class="estiloTexto"
        >
          {{ item.titulo }}
        </h3>

        <p :class="`${item.colorTexto}--text`" class="estiloTexto">
          {{ item.descripcion }}
        </p>

        <hr>

        <v-btn
          class="mt-4 estiloTexto"
          block
          outlined
          :color="item.color"
          :to="item.to"
        >
          {{ item.mensaje }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Atajos',
  data () {
    return {
      atajosData: [
        {
          imgFondo: 'https://sm.ign.com/t/ign_es/news/m/mortal-kom/mortal-kombat-release-date-delayed_y6sn.1200.jpg',
          colorTexto: 'white',
          titulo: 'Cursos por nivel',
          descripcion: 'Subimos contenido para todos los niveles, principiante, intermedio o avanzado. Te guiaremos con los cursos disponibles.',
          color: '#ffffff',
          to: '/cursos',
          mensaje: 'Ver cursos por nivel'
        },
        {
          imgFondo: 'https://sm.ign.com/t/ign_latam/news/m/mortal-kom/mortal-kombat-x-modder-unlocks-rain-sindel-and-bar_svm3.h720.jpg',
          colorTexto: 'white',
          titulo: 'Cursos más populares',
          descripcion: 'Te presentamos nuestros cursos más populares aquí.',
          color: '#ffffff',
          to: '/cursos',
          mensaje: 'Ver cursos más populares'
        }
      ]
    }
  },
  methods: {
    getImg (url) {
      if (url) {
        return `background-image:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${url});background-repeat: no-repeat;background-size: cover;background-color: rgba(0,0,0,0.6);`
      }
    }
  }
}
</script>

<style>
.posicionContenido {
    text-align: center;
}

.contenedorTitulo {
    margin: auto;
    text-align: center;
    height: 50px;
}

.contenedor {
    text-align: center;
    height: 400px;
    /* Centrado de contenido */
    display: flex;
    justify-content: center;
    align-items: center;
}

.estiloTexto {
    font-family: 'Asap', sans-serif;
}

.contenedorContenido {
    max-width: 400px;
}

@media (max-width: 515px) {
  .contenedorContenido {
    max-width: 280px;
  }
}
</style>
