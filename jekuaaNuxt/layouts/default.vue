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
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from '@/components/Loading'
import NavigationDefault from '@/components/NavigationDefault'
import NavigationUser from '@/components/NavigationUser'
import FooterDefault from '@/components/FooterDefault'

export default {
  components: {
    NavigationDefault,
    NavigationUser,
    FooterDefault
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('modules/user/system', [
      'getLoading',
    ]),
    ...mapGetters('modules/user/user', [
      'uid',
      'datosPersonales',
      'autenticado'
    ]),
    ...mapGetters('modules/system', [
      'getLoading',
      'getError'
    ])
  }
}
</script>
