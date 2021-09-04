<template>
  <v-app>
    <NavigationDefault />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <FooterDefault />
  </v-app>
</template>

<script>
import NavigationDefault from '@/components/NavigationDefault'
import FooterDefault from '@/components/FooterDefault'

export default {
  components: {
    NavigationDefault,
    FooterDefault
  },
  data () {
    return {

    }
  }
}
</script>
