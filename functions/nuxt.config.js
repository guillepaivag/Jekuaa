const colors = require('vuetify/es5/util/colors')
const axios = require('axios')

const baseURL = process.env.NODE_ENV === 'production' ? 
'https://southamerica-east1-jekuaa-py.cloudfunctions.net/apiJekuaa' : 
'http://localhost:5001/jekuaa-py/southamerica-east1/apiJekuaa'

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
      { property: 'og:image', content: '/image-og-jekuaa-2021.png' },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: '/image-og-jekuaa-2021.png', },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'Jekuaapy aprendizaje online contigo', },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://jekuaa.web.app', },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Asap&display=swap' },
      // Iconfonts for Vuetify. You need to leave only which one you use
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' },
    ],
    script: [
      { src: '' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/firebase.js' },
    { src: './plugins/TiptapVuetify.js', ssr: false },
    { src: './plugins/vue-observe-visibility.js', ssr: false },
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
    NODE_ENV: true ? 'production' : 'development'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://sitemap.nuxtjs.org
    ['@nuxtjs/sitemap', {
      hostname: 'https://jekuaapy.com',
      gzip: true,
      defaults: { 
        lastmod: new Date().toISOString(), 
        changefreq: 'weekly', 
        priority: 0.5,
      },
      exclude: [
        '/miembro-jekuaa/**',
        '/miembro-jekuaa',
      ],
      async routes() {            
        const res = await axios.default.post(`${baseURL}/sitemap/getSitemapRoutes`, {}, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const array = res.data.resultado
  
        return array.map((element) => {
          let tipo = element.tipo
          let ruta = ''
          if (tipo === 'blog') {
            ruta = '/blog'
          } else if (tipo === 'usuario') {
            ruta = ''
          }
  
          return `${ruta}/${element.referencia}`
        })
      },
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: baseURL
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

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.default.blue.darken2,
          accent: colors.default.grey.darken3,
          secondary: colors.default.amber.darken3,
          info: colors.default.teal.lighten1,
          warning: colors.default.amber.base,
          error: colors.default.deepOrange.accent4,
          success: colors.default.green.accent3
        },
        light: {
          primary: colors.default.blue.lighten1,
          accent: colors.default.grey.lighten1,
          secondary: colors.default.amber.lighten1,
          info: colors.default.teal.lighten1,
          warning: colors.default.amber.lighten1,
          error: colors.default.deepOrange.lighten1,
          success: colors.default.green.lighten1
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify', 'vue-instantsearch', 'instantsearch.js/es'],
    extractCSS: true,
    babel:{
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    },
  }
}
