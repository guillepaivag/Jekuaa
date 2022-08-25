<template>
    <div class="video-js-responsive-container vjs-hd">
        <video
            id="my-video"
            ref="videoPlayer" 
            class="video-js vjs-theme-forest"
            controls
            poster="MY_VIDEO_POSTER.jpg"
            data-setup='{ "aspectRatio":"16:9", "playbackRates": [1, 1.5, 2] }'
        >
            <!-- <source src="MY_VIDEO.mp4" type="video/mp4" />
            <source src="MY_VIDEO.webm" type="video/webm" /> -->
            <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
                >supports HTML5 video</a
            >
            </p>
        </video>
    </div>
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this)
    })

  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style scoped>
@media (min-width: 960px) {
  .video-js-responsive-container.vjs-hd {
      padding-top: 56.25%;
  }
  .video-js-responsive-container.vjs-sd {
      padding-top: 75%;
  }
  .video-js-responsive-container {
      width: 100%;
      position: relative;
  }
  .video-js-responsive-container .video-js {
      height: 100% !important; 
      width: 100% !important;
      position: absolute;
      top: 0;
      left: 0;
  }
}

@media (max-width: 650px) {
  .video-js-responsive-container.vjs-hd {
      padding-top: 56.25%;
  }
  .video-js-responsive-container.vjs-sd {
      padding-top: 75%;
  }
  .video-js-responsive-container {
      width: 100%;
      position: relative;
  }
  .video-js-responsive-container .video-js {
      height: 100% !important; 
      width: 100% !important;
      position: absolute;
      top: 0;
      left: 0;
  }
}

.video-js-responsive-container { 
  position: relative;
  display: block;
  box-shadow: 0 10px 19px 1px #683bce;
}

</style>