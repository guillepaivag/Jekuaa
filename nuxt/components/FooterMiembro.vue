<template>
  <div>
    <v-footer
      dark
      padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title style="background: #683bce;">
          <strong class="subheading">¡Nunca es tarde para hacer un cambio!</strong>

          <v-spacer />

          <div v-for="(social, index) in socials" :key="index" class="mx-4">
            <a :href="social.to" target="_blank" class="iconlink">
              <v-icon size="24px">
                {{ social.icon }}
              </v-icon>
            </a>
          </div>
        </v-card-title>

        <v-card-text class="py-1 white--text text-center backgroundFooterRojo">
          <samp class="footerTextTamanho">
            {{ new Date().getFullYear() }} — <strong>Classfii</strong>
          </samp>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'FooterDefault',
  data () {
    return {
      fixed: false,
      socials: [
        {
          icon: 'mdi-instagram',
          to: 'https://instagram.com/classfii',
        },
        {
          icon: 'mdi-facebook',
          to: 'https://facebook.com/classfii',
        },
        {
          icon: 'mdi-twitter',
          to: 'https://twitter.com/classfii',
        },
        // {
        //   icon: 'mdi-linkedin',
        //   to: '',
        // },      
      ]
    }
  }
}
</script>

<style scoped>
.footerTextTamanho {
    font-size: 15px;
}

.backgroundFooterLila {
    background: #683bce;
}
.backgroundFooterRojo {
    background: #ff1d89;
}

.iconlink {
  text-decoration: none;
}
</style>
