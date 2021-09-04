<template>
  <div class="container">
    <div>
      <nuxt-link to="/">
        Home
      </nuxt-link>
      <a href="#" @click="signout">Logout</a>
    </div>
    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
// import {getUserFromCookie, getUserFromSession} from '../helpers/index.js'

import { mapActions } from 'vuex'
export default {
  middleware: 'authenticated',
  methods: {
    ...mapActions('modules/user/user', ['logout']),
    async signout () {
      await this.logout()
      this.$router.push('/')
      // this.logout().then(() => {
      //   this.$router.push('/')
      // }).catch((error) => {
      //   console.log(error.message)
      // })
    }
  }
  // async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
  //   if(process.server){
  //     const user = getUserFromCookie(req)

  //     if (user) {
  //       await store.dispatch('modules/user/setUSER', {
  //         name: !!user.name ? user.name : '',
  //         email: user.email,
  //         avatar: !!user.picture ? user.picture : '',
  //         uid: user.user_id
  //       })
  //       await store.dispatch('modules/user/saveUID', user.user_id)
  //     } else {
  //       await store.dispatch('modules/user/setUSER', null)
  //       await store.dispatch('modules/user/saveUID', null)
  //     }
  //   }

  // },
}
</script>

<style>
  a {
    padding: 5px;
  }
</style>
