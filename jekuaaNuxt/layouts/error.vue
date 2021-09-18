<template>
  <div dark>
    <h1 v-if="error.statusCode === 404">
      <notFound :error="error" />
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
  </div>
</template>

<script>
import notFound from '@/components/notFound'
import { mapGetters } from 'vuex'

export default {
  layout: 'empty',
  components: {
    notFound
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 No se encontró la página.',
      otherError: 'Ha ocurrido un error'
    }
  },
  methods: {
  },
  head () {
    const title = this.error.statusCode === 404 ? '404 - No se encontró la página' : this.otherError
    return { title }
  },
  computed: {
    ...mapGetters('modules/system', ['getError']),
  },
  created() {
    
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
