<template>
  <div>

    <div v-if="getLoading">
      <loading />
    </div>

    <div v-else>
      <v-app>

        <NavigationUser v-if="autenticado" />
        <NavigationDefault v-else />

        <v-main>
          <nuxt />
        </v-main>

        <FooterDefault />
      </v-app>
    
      <snackbar-error v-model="getError" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from '@/components/Loading'
import NavigationDefault from '@/components/NavigationDefault'
import NavigationUser from '@/components/NavigationUser'
import FooterDefault from '@/components/FooterDefault'
import SnackbarError from '@/components/SnackbarError'

export default {
  components: {
    NavigationDefault,
    NavigationUser,
    FooterDefault,
    'snackbar-error': SnackbarError
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('modules/sistema', [
      'getLoading',
    ]),
    ...mapGetters('modules/usuarios', [
      'uid',
      'datosPersonales',
      'autenticado'
    ]),
    ...mapGetters('modules/sistema', [
      'getLoading',
      'getError'
    ])
  }
}
</script>
