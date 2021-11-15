<template>
    <div>
        <!-- slot for parent component to activate the file changer -->
        <div>
            <div slot="activator">
                <v-avatar @click="launchFilePicker()" size="210px" v-ripple v-if="!value.imageURL" class="grey lighten-3 mb-3">
                    <span>Agregue una foto de perfil</span>
                </v-avatar>
                <v-avatar @click="launchFilePicker()" size="210px" v-ripple v-else class="mb-3">
                    <img :src="value.imageURL" alt="avatar">
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
    </div>
</template>

<script>
export default {
    name: 'image-input',
    data() {
        return {
            errorDialog: null,
            errorText: '',
            uploadFieldName: 'file',
            maxSize: 1024,
        }
    },
    props: {
        // Use "value" to enable using v-model
        value: Object,
    },
    watch: {
        
    },
    methods: {
        launchFilePicker(){
            this.$refs.file.click();
        },
        onFileChange(fieldName, files) {
            const { maxSize } = this
            let imageFile = files[0]
            
            if (files.length > 0) {
                let size = imageFile.size / maxSize / maxSize
                if (!imageFile.type.match('image.png') && !imageFile.type.match('image.jpg') && !imageFile.type.match('image.jpeg')) {
                    // check whether the upload is an image
                    this.errorDialog = true 
                    this.errorText = 'Se debe elegir un archivo imagen jpg o png.'
                } else if (size > 1) {
                    // check whether the size is greater than the size limit
                    this.errorDialog = true
                    this.errorText = 'El archivo es muy grande, favor elegir un archivo de hasta 1MB.'
                } else {
                    // Append file into FormData and turn file into image URL
                    let formData = new FormData()
                    let imageURL = URL.createObjectURL(imageFile)
                    formData.append('image', imageFile)

                    console.log('formData', formData)
                    console.log('imageURL', imageURL)
                    console.log('imageFile', imageFile)
                    
                    // Emit the FormData and image URL to the parent component
                    this.$emit('input', { formData, imageURL })
                }
            }
        }
    }
}
</script>