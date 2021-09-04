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
          <strong class="subheading">Siguenos y aprende con nosotros!</strong>

          <v-spacer />

          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-1 white--text text-center backgroundFooterRojo">
          <samp class="footerTextTamanho">
            {{ new Date().getFullYear() }} — <strong>Jekuaa</strong>
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
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
    }
  }
}
</script>

<style>
.footerTextTamanho {
    font-size: 15px;
}

.backgroundFooterLila {
    background: #683bce;
}
.backgroundFooterRojo {
    background: #ff1d89;
}
</style>
