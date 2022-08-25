<template>
    <div>
        <!-- slot for parent component to activate the file changer -->
        <div>
            <div slot="activator">
                <v-avatar @click="launchFilePicker()" size="210px" v-ripple v-if="!fotoPerfil" class="mb-3 avatar-img">
                    <span class="white--text">
                        Agregue una foto de perfil
                    </span>
                </v-avatar>
                <v-avatar @click="launchFilePicker()" size="210px" v-ripple v-else class="mb-3 avatar-img">
                    <img :src="fotoPerfil" alt="">
                </v-avatar>
            </div>
        </div>


        <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
        <input type="file"
            ref="file"
            :name="uploadFieldName"
            @change="onFileChange($event.target.name, $event.target.files)"
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


        <div class="mt-5">
            <v-btn 
            v-if="formData"
            block
            text
            class="mt-1 mb-1"
            color="#683bce"
            @click="actualizarFotoPerfil" 
            :loading="saving || deleting"
            :disabled="!formData"
            >Actualizar foto de perfil</v-btn>

            <v-btn 
            v-if="formData"
            block
            :disabled="saving || deleting"
            class="mt-1 mb-1"
            text
            color="#ff1d89"
            @click="reiniciarImagen" 
            >Reiniciar</v-btn>

            <v-btn 
            v-if="!formData && fotoPerfil"
            block
            :disabled="saving || deleting"
            class="mt-1 mb-1"
            text
            color="red"
            @click="eliminarFotoPerfil" 
            >Borrar foto de perfil</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FotoPerfil',
    data() {
        return {
            saving: false,
            saved: false,
            deleting: false,
            deleted: false,
            errorDialog: null,
            errorText: '',
            uploadFieldName: 'file',
            maxSize: 1024,
            fotoPerfil: '',
            formData: null,
            imageFile: null
        }
    },
    props: {
    },
    watch: {
    },
    methods: {
        launchFilePicker(){
            this.$refs.file.click()
        },
        onFileChange(fieldName, files) {
            const { maxSize } = this
            
            this.saved = false
            this.deleted = false

            this.formData = null
            this.imageFile = files[0]
            
            if (files.length === 1) {
                let size = this.imageFile.size / maxSize / maxSize
                if (!this.imageFile.type.match('image.png') && !this.imageFile.type.match('image.jpg') && !this.imageFile.type.match('image.jpeg')) {
                    // check whether the upload is an image
                    this.errorDialog = true 
                    this.errorText = 'Se debe elegir un archivo imagen jpg o png.'
                    this.formData = null
                    this.imageFile = null

                    return
                } 
                
                if (size > 1) {
                    // check whether the size is greater than the size limit
                    this.errorDialog = true
                    this.errorText = 'El archivo es muy grande, favor elegir un archivo de hasta 1MB.'
                    this.formData = null
                    this.imageFile = null

                    return
                }

                // Append file into FormData and turn file into image URL
                this.formData = new FormData()
                this.formData.append('image', this.imageFile)

                this.fotoPerfil = URL.createObjectURL(this.imageFile)

            } else {
                this.formData = null
                this.imageFile = null

                // Mostrar error
                this.errorDialog = true
                this.errorText = 'Solo se puede subir una foto.'
            }
        },
        reiniciarImagen() {
            const fotoPerfil = this.$store.state.modules.usuarios.fotoPerfil

            this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
            this.formData = null
            this.imageFile = null
        },
        async actualizarFotoPerfil() {
            this.saving = true
            const usuario = this.$store.state.modules.usuarios

            try {
                const storageRef = this.$firebaseFotoPerfil.storage().ref()

                const uploadTask = storageRef.child(`${usuario.uid}/verificacion/${this.imageFile.name}`).put(this.imageFile)

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
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.$store.commit('modules/usuarios/setFotoPerfil', downloadURL)
                            this.saved = true
                            this.saving = false
                            this.reiniciarImagen()
                        });
                    }
                )
            } catch (error) {
                console.log('error', error)

                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.saving = false
                this.reiniciarImagen()
            }
        },
        async eliminarFotoPerfil () {
            const condicion = !this.formData && this.fotoPerfil
            if (!condicion) return

            this.deleting = true

            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                await this.$axios.$delete(`/serviceUsuario/eliminarFotoPerfil`, config)

                this.$store.commit('modules/usuarios/setFotoPerfil', null)
                this.deleted = true
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.deleting = false
                this.reiniciarImagen()
            }
        }
    },
    created() {
        const fotoPerfil = this.$store.state.modules.usuarios.fotoPerfil
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
    }
}
</script>

<style scoped>
.avatar-img {
    background: #683bce;
    cursor: pointer;
}
</style>