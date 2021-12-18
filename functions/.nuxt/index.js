import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\..\\jekuaaNuxt\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_b113f146 from 'nuxt_plugin_plugin_b113f146' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_plugin_501d39b7 from 'nuxt_plugin_plugin_501d39b7' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_workbox_5d96d7c8 from 'nuxt_plugin_workbox_5d96d7c8' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_9c70a6c8 from 'nuxt_plugin_metaplugin_9c70a6c8' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_93215be0 from 'nuxt_plugin_iconplugin_93215be0' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_70404200 from 'nuxt_plugin_axios_70404200' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_firebase_450a3d0a from 'nuxt_plugin_firebase_450a3d0a' // Source: ..\\..\\jekuaaNuxt\\plugins\\firebase.js (mode: 'all')
import nuxt_plugin_TiptapVuetify_746217d7 from 'nuxt_plugin_TiptapVuetify_746217d7' // Source: ..\\..\\jekuaaNuxt\\plugins\\TiptapVuetify.js (mode: 'client')
import nuxt_plugin_vueobservevisibility_42ab7ea7 from 'nuxt_plugin_vueobservevisibility_42ab7ea7' // Source: ..\\..\\jekuaaNuxt\\plugins\\vue-observe-visibility.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s - Jekuaapy","title":"Jekuaapy: Aprendizaje online contigo","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"¡Nunca es tarde para hacer un cambio! Estudia desde cero, investiga, aprende y despega con Jekuaapy de forma online y eficiente. ¡Lee blogs de diversos temas! Mejora tus conocimientos sobre programación, desarrollo web, matemática y otras áreas más!"},{"name":"robots","content":"index, follow"},{"name":"keywords","content":"informatica, algoritmos, desarrollo web, tutoriales, enseñanza, matematica, calculo, enseñanza eficiente"},{"hid":"og:site_name","property":"og:site_name","content":"Jekuaapy"},{"property":"og:title","content":"Jekuaapy: Aprendizaje online contigo"},{"property":"og:description","content":"¡Nunca es tarde para hacer un cambio! Estudia desde cero, investiga, aprende y despega con Jekuaapy de forma online y eficiente. ¡Lee blogs de diversos temas! Mejora tus conocimientos sobre programación, desarrollo web, matemática y otras áreas más!"},{"property":"og:image","content":"\u002Fimage-og-jekuaa-2021.png"},{"hid":"og:image:secure_url","property":"og:image:secure_url","content":"\u002Fimage-og-jekuaa-2021.png"},{"hid":"og:image:alt","property":"og:image:alt","content":"Jekuaapy aprendizaje online contigo"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:url","property":"og:url","content":"https:\u002F\u002Fjekuaa.web.app"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Asap&display=swap"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900|Material+Icons"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.11.2\u002Fcss\u002Fall.min.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FMaterialDesign-Webfont\u002F4.4.95\u002Fcss\u002Fmaterialdesignicons.min.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"script":[{"src":""}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_b113f146 === 'function') {
    await nuxt_plugin_plugin_b113f146(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_501d39b7 === 'function') {
    await nuxt_plugin_plugin_501d39b7(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_5d96d7c8 === 'function') {
    await nuxt_plugin_workbox_5d96d7c8(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_9c70a6c8 === 'function') {
    await nuxt_plugin_metaplugin_9c70a6c8(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_93215be0 === 'function') {
    await nuxt_plugin_iconplugin_93215be0(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_70404200 === 'function') {
    await nuxt_plugin_axios_70404200(app.context, inject)
  }

  if (typeof nuxt_plugin_firebase_450a3d0a === 'function') {
    await nuxt_plugin_firebase_450a3d0a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_TiptapVuetify_746217d7 === 'function') {
    await nuxt_plugin_TiptapVuetify_746217d7(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueobservevisibility_42ab7ea7 === 'function') {
    await nuxt_plugin_vueobservevisibility_42ab7ea7(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
