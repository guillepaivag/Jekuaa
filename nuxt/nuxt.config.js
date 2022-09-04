const isProduction = false
const localeProduction = false

const baseURL = isProduction ? 
  'https://southamerica-east1-jekuaa-py.cloudfunctions.net' : 

  localeProduction ? 
  'http://localhost:5001/jekuaa-py/southamerica-east1' : 
  'http://localhost:5001/jekuaa-py-dev/southamerica-east1'

module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Jekuaapy',
    title: 'Jekuaapy: Aprendizaje online contigo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '¡Nunca es tarde para hacer un cambio! Estudia desde cero, investiga, aprende y despega con Jekuaapy de forma online y eficiente. ¡Lee blogs de diversos temas! Mejora tus conocimientos sobre programación, desarrollo web, matemática y otras áreas más!' },
      { name: 'robots', content: 'index, follow' },
      { name: 'keywords', content: 'informatica, algoritmos, desarrollo web, tutoriales, enseñanza, matematica, calculo, enseñanza eficiente' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Jekuaapy', },
      { property: 'og:title', content: 'Jekuaapy: Aprendizaje online contigo' },
      { property: 'og:description', content: '¡Nunca es tarde para hacer un cambio! Estudia desde cero, investiga, aprende y despega con Jekuaapy de forma online y eficiente. ¡Lee blogs de diversos temas! Mejora tus conocimientos sobre programación, desarrollo web, matemática y otras áreas más!' },
      { property: 'og:image', content: '/image-og-2022.png' },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: '/image-og-2022.png', },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'Jekuaapy aprendizaje online contigo', },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://jekuaapy.com', },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      
      { rel: 'stylesheet', href: 'https://unpkg.com/video.js@7/dist/video-js.min.css' },
      // { rel: 'stylesheet', href: 'https://unpkg.com/@videojs/themes@1/dist/forest/index.css' },
    ],
    script: [
      { src: 'https://vjs.zencdn.net/7.19.2/video.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/videojs-youtube/2.6.1/Youtube.min.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/visualizador_prose_mirror.scss',
    '~/assets/style/videojs_custom_theme.scss',
    '~/assets/style/fonts.scss',
  ],
  
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/firebase.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // 
  srcDir: '',

  // 
  buildDir: '../functions/.nuxt',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  env: {
    NODE_ENV: (isProduction || localeProduction) ? 'production' : 'development'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'nuxt-sass-resources-loader',
      ['~/assets/style/visualizador_prose_mirror.scss'],
      ['~/assets/style/videojs_custom_theme.scss'],
      ['~/assets/style/fonts.scss'],
    ]
  ],

  router: {
    prefetchLinks: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: baseURL,
    credentials: true,
  },
  
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Jekuaapy',
      lang: 'es',
      useWebmanifestExtension: false
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', 'vue-instantsearch', 'instantsearch.js/es'],
    extractCSS: true,
    babel:{
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  }
}
