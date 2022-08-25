<template>
  <div>

    <div v-if="getLoading">
      <loading />
    </div>

    <div v-else>
      <v-app>
        <NavigationUser v-if="autenticado" />
        <NavigationDefault v-else />

        <v-main class="">
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
  methods: {
    
  },
  computed: {
    ...mapGetters('modules/sistema', [
      'getLoading',
    ]),
    ...mapGetters('modules/usuarios', [
      'autenticado'
    ]),
    ...mapGetters('modules/sistema', [
      'getLoading',
      'getError'
    ])
  },
  created () {
    
  }
}
</script>

<style>
/* 
  custom scrollbar:  
  https://dev.to/xtrp/how-to-create-a-beautiful-custom-scrollbar-for-your-site-in-plain-css-1mjg
*/

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: #dbdbdb;
}

::-webkit-scrollbar-thumb {
  background-color: #683bce;
  border-radius: 20px;

}

::-webkit-scrollbar:horizontal{
  height: 6px;
}

</style>