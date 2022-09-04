<template>
    <div class="video-responsive">
        <iframe 
            class="iframeYT"
            :src="urlVideoYoutube" 
            title="PELEA GOKU VS FREZZER COMPLETA SIN PUBLICIDAD! SAGA FREZER" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        ></iframe>
    </div>
</template>

<script>
export default {
  name: 'Youtube',
  props: {
    codigoVideoYoutube: String,
  },
  data() {
    return {
      urlVideoYoutube: '',
    }
  },
  created () {
    this.urlVideoYoutube = `https://www.youtube.com/embed/${this.codigoVideoYoutube}`
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
}
.video-responsive iframe, .video-responsive object, .video-responsive embed {
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}
</style>