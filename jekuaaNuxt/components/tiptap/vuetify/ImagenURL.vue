<template>
  <div class="mt-5 mb-5 container">
        <v-divider class="mb-5"></v-divider>

        <v-text-field
            v-model="imageUrl"
            label="Ingresa la URL de tu imagen"
            required
        ></v-text-field>

        <v-text-field
            v-model="imageAlt"
            label="Ingresa el ALT de tu imagen"
            required
        ></v-text-field>

        <v-btn 
            class="mt-5 btnImage"
            color="#ff1d89"
            @click="selectImage"
            block
        >
            Seleccionar
        </v-btn>

        <v-divider class="mt-5"></v-divider>
  </div>
</template>

<script>
  /**
   * Example of a custom Image selector
   * Key is to emit a select-file event when a file needs to be added
   */
  import { VImg } from 'vuetify/lib'
  export default {
    name: "ImagenURL",
    components: { VImg },
    data() {
        // Some public domain images from wikimedia.
        return {
            imageUrl: '',
            imageAlt: '',
        };
    },
    methods: {
      selectImage() {
        this.$emit('select-file', {
            src: this.imageUrl,
            alt: this.imageAlt,
        });
      }
    }
  }
</script>

<style scoped>
.btnImage {
    color: #ffffff;
}
</style>