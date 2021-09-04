<template>
  <div>
    {{ user }}

    <hr>

    {{ userClaims }}
  </div>
</template>

<script>
export default {
  name: 'Perfil',
  data () {
    return {
      user: Object,
      userClaims: Object
    }
  },
  async mounted () {
    let user = null

    if(process.client) {
      user = this.$firebase.auth().currentUser
      this.user = user
      console.log(user)
    }

    const getUserClaims = this.$firebase.functions().httpsCallable('getUserClaims')
    this.userClaims = await getUserClaims()
    console.log(this.userClaims)
  },
  methods: {

  }
}
</script>

<style>

</style>
