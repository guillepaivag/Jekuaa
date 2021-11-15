<template>
    <div>
        <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            shaped
            color="#ff1d89"
        >
            <b class="textoError" >{{ text }}</b>

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="#ffffff"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            multiLine: true,
            snackbar: false,
            text: '',
        }
    },
    props: {
        value: Object
    },
    watch: {
        value: function (n, v) {
            if (!this.value) return

            if (this.value.tipo === 'response') {
                const responseError = this.value.error.response
                const data = responseError.data

                this.text = data.mensaje
            } else if (this.value.tipo === 'request') {
                
            }

            this.snackbar = true
        },
        snackbar: function (n, v) {
            if (n) return
            
            this.text = ''
            this.$store.commit('modules/sistema/setError', null)
        }
    },
    methods: {

    },
}
</script>

<style scoped>
.textoError {
    color: #ffffff;
}
</style>