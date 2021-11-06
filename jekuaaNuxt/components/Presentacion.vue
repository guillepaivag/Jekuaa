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
                <span class="ml-3">Ver información</span>
            </v-btn>
            <v-btn depressed id="buttonInfo" :to="to">
                <v-icon>
                    mdi-book-open-variant
                </v-icon>
                <span class="ml-3">Más contenido</span>
            </v-btn>
        </div>
    </div>
</template>

<script>

export default {
    name: "Presentacion",
    data() {
        return {
            
        }
    },
    props: {
        titulo: String,
        descripcion: String,
        to: String,
        srcImg: String,
    },
    components: {

    },
}
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
    /* transform: scale(1.1) !important; */
    cursor: pointer;
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
        height: 70vh;
    }
    .containerReleases {
        padding-top: 150px;
        margin-left: 0;
        width: 100%;
        text-align: center;
    }
    .containerReleases h1 {
        font-size: 40px;
    }
}
@media only screen and (max-width: 790px) {
    .containerReleases h1 {
        font-size: 40px;
    }
}
@media only screen and (max-width: 699px) {
    .nextReleasesContainer {
        height: 50vh;
    }
    .containerReleases {
        padding-top: 90px;
        margin-left: 0;
        width: 100%;
        text-align: center;
    }
    .containerReleases p {
        font-size: 13px;
    }
}
@media only screen and (max-width: 599px) {
    .nextReleasesContainer {
        height: 50vh;
    }
    .containerReleases {
        padding-top: 70px;
        margin-left: 0;
        width: 100%;
        text-align: center;
    }
    .containerReleases p {
        font-size: 13px;
    }
}
@media only screen and (max-width: 516px) {
    #buttonPlay {
        margin-right: 0;
        width: 250px;
        margin-top: 10px;
    }
    #buttonInfo {
        width: 250px;
        margin-top: 10px;
    }
}
@media only screen and (max-width: 470px) {
    .nextReleasesContainer {
        height: 50vh;
    }
    .containerReleases {
        padding-top: 40px;
        margin-left: 0;
        width: 100%;
        text-align: center;
    }
    #buttonPlay {
        font-size: 12px;
    }
    #buttonInfo {
        font-size: 12px;
    }
}
@media only screen and (max-width: 399px) {
    .nextReleasesContainer {
        height: 50vh;
    }
    .containerReleases {
        padding-top: 40px;
        margin-left: 0;
        width: 100%;
        text-align: center;
    }
    .containerReleases h1 {
        font-size: 30px;
    }
    .containerReleases p {
        font-size: 20px;
    }
}
@media only screen and (max-width: 310px) {
    .nextReleasesContainer {
        height: 47vh;
    }
    .containerReleases {
        padding-top: 40px;
        margin-left: 0;
        width: 100%;
        text-align: center;
    }
    .containerReleases h1 {
        font-size: 20px;
    }
    .containerReleases p {
        font-size: 15px;
    }
    #buttonPlay {
        width: 190px;
        font-size: 10px;
        margin-top: 10px;
    }
    #buttonInfo {
        width: 190px;
        font-size: 10px;
        margin-top: 10px;
    }
}
</style>