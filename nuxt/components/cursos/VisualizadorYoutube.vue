<template>
  <div class="video-responsive">
    <iframe 
      frameborder="0"
      allowfullscreen="1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title="Clase de Jekuaapy" 
      width="100%" 
      height="100%" 
      :src="urlVideoYoutube"
      id="widget2"
      data-gtm-yt-inspected-4="true"
      autohide="1"
      modestbranding="1" 
      rel="0" 
      showinfo="0"
      ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Youtube',
  props: {
    codigoVideoYoutube: String,
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      urlVideoYoutube: '',
    }
  },
  created() {
    const autoPlay10 = this.autoPlay ? 1 : 0
    this.urlVideoYoutube = `https://www.youtube.com/embed/${this.codigoVideoYoutube}?autoplay=${autoPlay10}&mute=0&controls=1&origin=https%3A%2F%2Fapp.ed.team&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1`
  },
  beforeDestroy() {

  }
}
</script>

<style scoped>
.video-responsive {
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  padding-top: 30px;
  position: relative;
  border-radius: 0.75rem;
}

.video-responsive iframe,
.video-responsive object,
.video-responsive embed {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>