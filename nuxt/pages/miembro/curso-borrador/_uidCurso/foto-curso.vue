<template>
    <div class="">

        <div class="container contenedor_imgFotoCurso">
            <img 
                class="imagen" 
                @click="launchFilePickerFotoCurso()" 
                :src="fotoPerfil.value ? fotoPerfil.value : require(`~/assets/img/rojo.png`)" 
                :style="fotoPerfil.saving ? '' : 'cursor: pointer;'"
            />
        </div>

        <v-parallax
            dark
            class="my-v-parallax"
            :src="fotoPortada.value ? fotoPortada.value : require(`~/assets/img/gris.jpg`)"
        >
            <div class="container contenedor_presentacion">
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="contenedor_contenido">
                            <h1 class="text-h4 font-weight-thin mb-4">
                                {{curso.titulo}}
                            </h1>
                            <p v-if="curso.descripcion" class="">
                                {{curso.descripcion}}
                            </p>
                            <p v-else class="">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                It has survived not only five centuries, but also the.
                            </p>

                            <p class="">
                                <b>Duración: </b>{{secondsToString(curso.duracion)}}
                            </p>

                            <p class="" v-if="curso.nivel">
                                <b>Nivel: </b>{{ getNivel(curso.nivel).nombre }}
                            </p>
                            
                            <v-btn
                                outlined
                                x-large
                                color="white"
                                @click="launchFilePickerFotoPortada()"
                                :disabled="fotoPortada.saving"
                            >
                                Foto portada
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="contenedor_contenido_derecha">
                            <img 
                                class="imagen" 
                                @click="launchFilePickerFotoCurso()" 
                                :src="fotoPerfil.value ? fotoPerfil.value : require(`~/assets/img/rojo.png`)" 
                                :style="fotoPerfil.saving ? '' : 'cursor: pointer;'"
                            />
                        </div>
                    </v-col>
                </v-row>
            </div>
            
        </v-parallax>

        <!-- Requisitos -->
        <div class="container mt-5">
            <v-row no-gutters>
                <v-col class="requisitos_foto_curso" cols="12" md="6">
                    <h3>Requisitos foto del curso:</h3>
                    <v-divider></v-divider>

                    <ul>
                        <li> Resolución: 1024x600 </li>
                        <li> Formatos válidos: .jpg .jpeg .png </li>
                        <li> Tamaño máximo: 2MB </li>
                    </ul>
                </v-col>

                <v-col class="requisitos_foto_portada" cols="12" md="6">
                    <h3>Requisitos foto de portada:</h3>
                    <v-divider></v-divider>

                    <ul>
                        <li> Resolución: 1920x1080 </li>
                        <li> Formatos válidos: .jpg .jpeg .png </li>
                        <li> Tamaño máximo: 2MB </li>
                    </ul>
                </v-col>
            </v-row>
        </div>

        <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
        <input type="file"
            ref="fileFotoCurso"
            @change="onFileChangeFotoCurso($event.target.name, $event.target.files)"
            style="display:none" />

        <input type="file"
            ref="fileFotoPortada"
            @change="onFileChangeFotoPortada($event.target.name, $event.target.files)"
            style="display:none" />


        <!-- error dialog displays any potential error messages -->
        <v-dialog v-model="errorDialog" max-width="300">
            <v-card>
                <v-card-text class="subheading">
                    {{errorText}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import informacionNiveles from '@/helpers/informacionNiveles'

export default {
    name: 'FotoPerfil',
    data() {
        return {
            uidCurso: this.$route.params.uidCurso,

            curso: {},

            fotoPerfil: {
                value: '',
                actual: '',
                saving: false,
                saved: false,
                maxSize: 1024,
                imageFile: null,
            },

            fotoPortada: {
                value: '',
                actual: '',
                saving: false,
                saved: false,
                maxSize: 1024,
                imageFile: null,
            },

            errorDialog: null,
            errorText: '',

            condiciones: [
                'Solo se acepta jpg, jpeg y png.',
                'Como máximo 2MB.',
            ],
        }
    },
    props: {
    },
    watch: {
    },
    methods: {
        secondsToString(seconds) {
            var hour = Math.floor(seconds / 3600);
            hour = (hour < 10)? '0' + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return hour + ':' + minute + ':' + String(second).split('.')[0];
        },
        getNivel (nivel) {
            return informacionNiveles[nivel]
        },


        launchFilePickerFotoCurso(){
            if (this.fotoPerfil.saving) return
            this.$refs.fileFotoCurso.click()
        },
        launchFilePickerFotoPortada(){
            if (this.fotoPortada.saving) return
            this.$refs.fileFotoPortada.click()
        },
        async onFileChangeFotoCurso(fieldName, files) {
            const { maxSize } = this
            
            this.fotoPerfil.saving = false
            this.fotoPerfil.saved = false
            this.fotoPerfil.imageFile = files[0]
            
            if (files.length === 1) {
                let size = this.fotoPerfil.imageFile.size / maxSize / maxSize
                if (!this.fotoPerfil.imageFile.type.match('image.png') && !this.fotoPerfil.imageFile.type.match('image.jpg') && !this.fotoPerfil.imageFile.type.match('image.jpeg')) {
                    this.errorDialog = true 
                    this.errorText = 'Se debe elegir un archivo imagen jpg o png.'
                    this.fotoPerfil.imageFile = null
                    return
                } 
                
                if (size > 2) {
                    this.errorDialog = true
                    this.errorText = 'El archivo es muy grande, favor elegir un archivo de hasta 3MB.'
                    this.fotoPerfil.imageFile = null
                    return
                }

                const img = new Image()
                img.src = URL.createObjectURL(this.fotoPerfil.imageFile)
                
                const resolucionImg = new Promise((res, rej) => {
                    img.onload = function() {
                        if (this.width !== 1024 || this.height !== 600) 
                            return res('error')

                        return res()
                    }
                })

                const res = await resolucionImg

                if (res === 'error') {
                    this.errorDialog = true
                    this.errorText = 'La resolución de la foto del curso es 1024x600.'
                    this.fotoPerfil.imageFile = null
                    return
                }

                // Append file into FormData and turn file into image URL
                this.fotoPerfil.imageFile = files[0]
                this.fotoPerfil.value = URL.createObjectURL(this.fotoPerfil.imageFile)

                this.actualizarFotoPerfil()

            } else {
                this.fotoPerfil.imageFile = null

                // Mostrar error
                this.errorDialog = true
                this.errorText = 'Solo se puede subir una foto.'
            }
        },
        async onFileChangeFotoPortada(fieldName, files) {
            const { maxSize } = this

            this.fotoPortada.saving = false
            this.fotoPortada.saved = false
            this.fotoPortada.imageFile = files[0]
            
            if (files.length === 1) {
                let size = this.fotoPortada.imageFile.size / maxSize / maxSize
                if (!this.fotoPortada.imageFile.type.match('image.png') && !this.fotoPortada.imageFile.type.match('image.jpg') && !this.fotoPortada.imageFile.type.match('image.jpeg')) {
                    // check whether the upload is an image
                    this.errorDialog = true 
                    this.errorText = 'Se debe elegir un archivo imagen jpg o png.'
                    this.fotoPortada.imageFile = null

                    return
                } 
                
                if (size > 2) {
                    // check whether the size is greater than the size limit
                    this.errorDialog = true
                    this.errorText = 'El archivo es muy grande, favor elegir un archivo de hasta 3MB.'
                    this.fotoPortada.imageFile = null

                    return
                }

                const img = new Image()
                img.src = URL.createObjectURL(this.fotoPortada.imageFile)
                
                const resolucionImg = new Promise((res, rej) => {
                    img.onload = function() {
                        if (this.width !== 1920 || this.height !== 1080) 
                            return res('error')

                        return res()
                    }
                })

                const res = await resolucionImg
                
                if (res === 'error') {
                    this.errorDialog = true
                    this.errorText = 'La resolución de la foto de portada es 1920x1080.'
                    this.fotoPerfil.imageFile = null
                    return
                }

                // Append file into FormData and turn file into image URL
                this.fotoPortada.imageFile = files[0]
                this.fotoPortada.value = URL.createObjectURL(this.fotoPortada.imageFile)

                this.actualizarFotoPortada()

            } else {
                this.fotoPortada.imageFile = null

                // Mostrar error
                this.errorDialog = true
                this.errorText = 'Solo se puede subir una foto.'
            }
        },
        reiniciarImagen() {
            const fotoPerfil = this.fotoPerfil.actual
            const fotoPortada = this.fotoPortada.actual

            this.fotoPerfil = {
                value: fotoPerfil,
                actual: fotoPerfil,
                saving: false,
                saved: false,
                maxSize: 1024,
                imageFile: null,
            }

            this.fotoPortada = {
                value: fotoPortada,
                actual: fotoPortada,
                saving: false,
                saved: false,
                maxSize: 1024,
                imageFile: null,
            }
        },
        async actualizarFotoPerfil() {
            this.fotoPerfil.saving = true

            try {
                const storageRef = this.$firebaseFotoCurso.storage().ref()
                
                // uidCurso/verificacion/nombre.extension
                const uploadTask = storageRef.child(`${this.uidCurso}/fotoCurso/verificacion/${this.fotoPerfil.imageFile.name}`).put(this.fotoPerfil.imageFile)

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                            break;
                            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                            break;
                        }
                    },
                    (error) => {
                        console.log(error)
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                            break;
                            case 'storage/canceled':
                                // User canceled the upload
                            break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {                           
                            this.fotoPerfil.saved = true
                            this.fotoPerfil.saving = false

                            this.fotoPerfil.actual = this.fotoPerfil.value

                            this.reiniciarImagen()
                        });
                    }
                )
            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.fotoPerfil.saving = false
                this.reiniciarImagen()
            }
        },
        async actualizarFotoPortada() {
            this.fotoPortada.saving = true

            try {
                const storageRef = this.$firebaseFotoCurso.storage().ref()
                
                // uidCurso/verificacion/nombre.extension
                const uploadTask = storageRef.child(`${this.uidCurso}/fotoPortada/verificacion/${this.fotoPortada.imageFile.name}`).put(this.fotoPortada.imageFile)

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                            break;
                            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                            break;
                        }
                    },
                    (error) => {
                        console.log(error)
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                            break;
                            case 'storage/canceled':
                                // User canceled the upload
                            break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {                           
                            this.fotoPortada.saved = true
                            this.fotoPortada.saving = false

                            this.fotoPortada.actual = this.fotoPortada.value

                            this.reiniciarImagen()
                        });
                    }
                )
            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.fotoPortada.saving = false
                this.reiniciarImagen()
            }
        },
    },
    async created() {
        const db = fb.firestore()
        const doc = await db.collection('CursosBorrador').doc(this.uidCurso).get()

        const fotoPerfil = doc.data().fotoPerfil
        const fotoPortada = doc.data().fotoPortada

        this.curso = doc.data()

        this.fotoPerfil = {
            value: fotoPerfil,
            actual: fotoPerfil,
            saving: false,
            saved: false,
            maxSize: 1024,
            imageFile: null,
        }

        this.fotoPortada = {
            value: fotoPortada,
            actual: fotoPortada,
            saving: false,
            saved: false,
            maxSize: 1024,
            imageFile: null,
        }
    }
}
</script>

<style lang="scss">
.my-v-parallax {
    .v-parallax__image-container {
        background: rgba(0, 0, 0) !important;

        .v-parallax__image {
            opacity: 0.7 !important;
        }
    }
}
</style>

<style scoped>
.my-v-parallax {
    height: 100%;
}

.contenedor_presentacion {
    max-width: 1200px;
    margin-top: -20px;
}

.contenedor_contenido {
    padding: 0 5px 0 0;
}

.contenedor_contenido_derecha {
    padding: 0 0 0 10px;
}

.imagen {
    width: 100%;
    border-radius: 1.8rem;
}

@media (max-width: 959px) {
    .contenedor_contenido_derecha {
        display: none;
    }
}

.avatar-img {
    background: #683bce;
    cursor: pointer;
}

.contenedorCondiciones {
    width: 100%;
    padding: 40px 15px;
}

.listaCondicion {
    list-style-type: none;
    padding: 0;
}

.condicion {
    margin-bottom: 16px;
}

@media (max-width: 959px) {
    .contenedor_imgFotoCurso {
        max-width: 400px;
    }

    .contenedorCondiciones {
        margin-top: 50px;
    }

    .requisitos_foto_curso {
        margin-bottom: 20px;
    }

    .requisitos_foto_portada {
        margin-bottom: 20px;
    }
}

@media (min-width: 960px) {
    .contenedor_imgFotoCurso {
        display: none;
    }
}

</style>