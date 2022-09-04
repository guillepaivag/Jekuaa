<template>
    <div>
        <div class="mt-3 mb-7">
            <v-text-field
                v-model="codigoVideoYoutube"
                label="Código de youtube"
            ></v-text-field>

            <v-text-field
                v-model="duracion"
                label="Duración del video"
            ></v-text-field>
        </div>
        
        <div class="text-center">
            <v-btn
                :disabled="!codigoVideoYoutube || !duracion || !esDuracionValida"
                color="primary"
                text
                @click="sendYoutube"
            >
                Agregar video de youtube
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            codigoVideoYoutube: '',
            duracion: '',
        }
    },
    components: {
        
    },
    props: {
        uidCurso: String,
        uidUnidad: String,
        uidClase: String,
        contenidoInicial: Object,   // numero en segundos y codigo de youtube
    },
    methods: {
        sendYoutube () {
            const duracionFinalEnSegundos = this.getDuracionEnSegundos()

            this.$emit('sendYoutube', {
                uidCurso: this.uidCurso,
                uidUnidad: this.uidUnidad,
                uidClase: this.uidClase,
                duracion: duracionFinalEnSegundos,              // numero en segundos
                codigoVideoYoutube: this.codigoVideoYoutube,    // codigo de youtube
            })
        },
        getDuracionEnSegundos () {
            const arrayDuracion = this.duracion.split(':')

            const horas = parseInt(arrayDuracion[0])
            const minutos = parseInt(arrayDuracion[1])
            const segundos = parseInt(arrayDuracion[2])

            return horas*60*60 + minutos*60 + segundos
        },
        segundosToTimeString () {
            const date = new Date(0)
            date.setSeconds(this.contenidoInicial.duracion)
            const timeString = date.toISOString().substring(11, 19)

            return timeString
        }
    },
    computed: {
        esDuracionValida () {
            const arrayDuracion = this.duracion.split(':')

            const horas = arrayDuracion[0]
            const minutos = arrayDuracion[1]
            const segundos = arrayDuracion[2]

            if (!horas || !minutos || !segundos) return false
            if (isNaN(horas) || isNaN(minutos) || isNaN(segundos)) return false

            const horasNumeros = parseInt(arrayDuracion[0])
            const minutosNumeros = parseInt(arrayDuracion[1])
            const segundosNumeros = parseInt(arrayDuracion[2])

            if (horasNumeros < 0) return false
            if (minutosNumeros < 0 || minutosNumeros > 60) return false
            if (segundosNumeros < 0 || segundosNumeros > 60) return false

            return true
        }
    },
    watch: {
        contenidoInicial: function (n, v) {
            this.codigoVideoYoutube = this.contenidoInicial.codigoVideoYoutube ? this.contenidoInicial.codigoVideoYoutube : ''
            this.duracion = this.segundosToTimeString()
        }
    },
    created () {
        this.codigoVideoYoutube = this.contenidoInicial.codigoVideoYoutube ? this.contenidoInicial.codigoVideoYoutube : ''
        this.duracion = this.segundosToTimeString()
    },
}
</script>

<style lang="scss" scoped>

</style>