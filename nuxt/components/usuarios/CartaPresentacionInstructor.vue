<template>
    <div class="container" v-if="usuario && informacionUsuario">
        <h3 class="mb-5 titulo-presentacion">
            Presentación del instructor:
        </h3>

        <div>
            <v-card
                class="mx-auto"
            >
                <v-img
                :src="require(`~/assets/img/portada_usuario.png`)"
                height="200px"
                ></v-img>

                <v-card-title>
                    ¡Hola, soy <b class="texto-nombreCompleto ml-1"> {{usuario.nombreCompleto}}!</b>
                </v-card-title>

                <v-card-subtitle>
                    {{usuario.nombreUsuario}} - {{getRolDescriptivo(informacionUsuario.rolDescriptivo)}}
                </v-card-subtitle>

                <v-card-actions>
                <v-btn
                    color="#683bce"
                    text
                    :to="`/estudiante/${usuario.nombreUsuario}`"
                >
                    Mi perfil
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    color="#683bce"
                    text
                    @click="show = !show"
                >
                    <b>Información</b>
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text v-html="descripcion">
                    </v-card-text>
                </div>
                </v-expand-transition>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'carta-presentacion',
    data() {
        return {
            informacionUsuario: null,
            usuario: null,
            show: false
        }
    },
    props: {
        uidUsuario: String
    },
    methods: {
        getRolDescriptivo (rolDescriptivo) {
            if (rolDescriptivo === 'estudiante') {
                return 'Estudiante de Jekuaapy'
            }

            return rolDescriptivo
        },
    },
    computed: {
        descripcion () {
            return this.informacionUsuario.descripcion.replace(/\n/g, '<br>')
        }
    },
    async created() {
        const ref = this.$firebase.firestore().collection('Usuarios').doc(this.uidUsuario)
        const doc = await ref.get()

        this.usuario = doc.data()

        let config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const respuesta = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${this.uidUsuario}`, config)
        this.usuario.nombreCompleto = respuesta.resultado.displayName

        const refInformacionUsuario = this.$firebase.firestore().collection('InformacionUsuarios').doc(this.uidUsuario)
        const docInformacionUsuario = await refInformacionUsuario.get()

        this.informacionUsuario = docInformacionUsuario.data()
    },
}
</script>

<style scoped>
.titulo-presentacion {
    font-size: 25px;
}

.texto-nombreCompleto {
    color: #683bce;
}
</style>