<template>
    <div class="text-center">
        <input
            class=""
            type="file"
            ref="file"
            @change="onFileChange($event.target.name, $event.target.files)"
        />

        <div class="my-7 contenedor_contenido_video">
            <video
                v-if="file && urlVideo"
                controls
                poster=""
                preload="auto"
                data-setup="{}"
                controlslist="nodownload"
                :src="urlVideo"
            >
                <p class="">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that supports HTML5 video
                </p>
            </video>
            <div v-else>
                <p class="texto_sin_video">
                    Nos falta un video para continuar :c
                </p>
            </div>
        </div>

        <v-btn
            :disabled="!file"
            color="primary"
            text
            @click="sendVideo"
        >
            Subir video
        </v-btn>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            file: null,
            urlVideo: ''
        }
    },
    components: {

    },
    props: {
        uidCurso: String,
        uidUnidad: String,
        uidClase: String
    },
    methods: {
        launchFilePicker(){
            this.$refs.file.click()
        },
        onFileChange(fieldName, files) {
            this.file = files[0]

            this.urlVideo = URL.createObjectURL(this.file)
        },
        sendVideo () {
            this.$emit('sendVideo', {
                uidCurso: this.uidCurso,
                uidUnidad: this.uidUnidad,
                uidClase: this.uidClase,
                file: this.file,
                urlVideo: this.urlVideo,
            })
        }
    }
}
</script>

<style scoped>
.contenedor_contenido_video video {
    width: 450px;
}

@media (max-width: 595.99px) {
    .contenedor_contenido_video video {
        width: 350px;
    }
}

@media (max-width: 493.99px) {
    .contenedor_contenido_video video {
        width: 270px;
    }
}

@media (max-width: 411.99px) {
    .contenedor_contenido_video video {
        width: 250px;
    }
}

@media (max-width: 391.99px) {
    .contenedor_contenido_video video {
        width: 210px;
    }
}

.texto_sin_video {
    font-size: 21px;
}
</style>