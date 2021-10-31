<template>
    <div class="nextReleasesContainer">
        <div class="contentContainer">
            <!-- <video class="contentVideo" autoplay muted loop src="../assets/video2.mp4" type="video/mp4"></video> -->
            <img class="contentImg" :src="srcImg" alt="">
        </div>

        <div class="containerReleases">
            <h1>
                {{ titulo }}
            </h1>
            <p>
                {{ descripcion }}
            </p>
            <v-btn depressed id="buttonPlay">
                <v-icon>
                    mdi-book-open-variant
                </v-icon>
                <span>Ver información</span>
            </v-btn>
            <v-btn depressed id="buttonInfo" :to="to">
                <v-icon>
                    mdi-book-open-variant
                </v-icon>
                <span>Más contenido</span>
            </v-btn>
        </div>
    </div>
</template>

<script>

export default {
  name: "Presentacion",
  data() {
    return {
        titulo: 'Desarrollo web en 2021',
        descripcion: `Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.`,
        to: '/blog/desarrollo-web-en-2021',
        srcImg: 'http://www.icorp.com.mx/blog/wp-content/uploads/2021/01/gestion_activos_software.jpg'

    };
  },
  components: {

  }
};
</script>

<style scoped>
.nextReleasesContainer {
    width: 100%;
    height: 70vh;
    position: relative;
    background: #000000;
    display: block;
    align-items: center;
}

.nextReleasesContainer > .contentContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.nextReleasesContainer > .contentContainer > .contentImg {
    opacity: .72;
    height: 100%;
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
}

.nextReleasesContainer > .contentContainer > .contentVideo {
    opacity: .72;
    height: auto;
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
}

.containerReleases {
    z-index: 5;
    padding: 20px;
    width: 550px;
    margin-left: 40px;
    padding-top: 70px;
    position: relative;
}

.containerReleases h1 {
    color: #e9e9e9;
    text-shadow: black 0.1em 0.1em 0.2em;
    font-size: 50px;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 30px;
}

.containerReleases p {
    color: #e9e9e9;
    font-family: Arial, Helvetica, sans-serif;
    text-shadow: #e9e9e9 0em 0em 0em;
    font-size: 15px;
    margin-bottom: 30px;
    text-align: justify;
}

.containerReleases button {
    border: none;
    background: rgba(78, 78, 78, 0.562);
    color: #e9e9e9;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    transition: transform 0.5s;
}

.containerReleases button:hover {
    border: none;
    transform: scale(1.1);
    cursor: pointer;
}

.containerReleases button span {
    padding-left: 10px;
}

#buttonPlay {
    background: rgb(255, 255, 255);
    color: #ff1d89;
    padding: 10px 20px 10px 20px;
    margin-right: 20px;
}

#buttonInfo {
    background: rgb(255, 255, 255);
    color: #683bce;
    padding: 10px 20px 10px 20px;
}

@media only screen and (max-width: 900px) {
    .nextReleasesContainer {
        height: 50vh;
    }
}
@media only screen and (max-width: 790px) {
    .containerReleases h1 {
        font-size: 40px;
    }
}
@media only screen and (max-width: 699px) {
    .nextReleasesContainer {
        height: 40vh;
    }
    .containerReleases p {
        font-size: 13px;
    }
}
@media only screen and (max-width: 599px) {
    .containerReleases {
        width: 400px;
    }
    .containerReleases p {
        font-size: 13px;
    }
    #buttonPlay {
        width: 120px;
    }
    #buttonInfo {
        width: 170px;
    }
}
@media only screen and (max-width: 470px) {
    .containerReleases {
        width: 350px;
        margin-left: 20px;
    }
    .containerReleases h1 {
        font-size: 30px;
    }
    .containerReleases p {
        font-size: 11px;
    }
    #buttonPlay {
        font-size: 12px;
    }
    #buttonInfo {
        font-size: 12px;
    }
    .nextReleasesContainer {
        height: 41vh;
    }
}
@media only screen and (max-width: 399px) {
    .containerReleases {
        width: 270px;
    }
    .containerReleases h1 {
        font-size: 17px;
    }
    .containerReleases p {
        font-size: 12px;
    }
    button span {
        padding-bottom: 300px;
    }
    #buttonPlay {
        font-size: 7px;
        width: 70px;
    }
    #buttonInfo {
        font-size: 7px;
        width: 90px;
    }
}
</style>