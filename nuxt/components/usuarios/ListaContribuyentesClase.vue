<template>
    <div v-if="datosCurso">
        <h4 class="mb-3">
            {{contribuyentes.length > 1 ? 'Instructores' : 'Instructor'}} 
            <b style="color: #ff1d89;">
                de esta clase
            </b>
        </h4>

        <div class="horizontal_slider">
            <div class="slider_container mb-2">
                <div class="item" v-for="(contribuyente, index) in contribuyentes" :key="index">
                    <v-avatar size="70">
                        <v-img
                            :alt="`Foto de perfil de ${contribuyente.firestore.nombreUsuario}`"
                            :src="contribuyente.auth.photoURL"
                        ></v-img>
                    </v-avatar>

                    <h5 class="mt-5">
                        {{ contribuyente.firestore.nombreUsuario }}
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    data() {
        return {
            datosCurso: null,
        }
    },
    props: {
        uidCurso: {
            type: String,
            require: true,
        },
        contribuyentes: {
            type: Array,
            require: true,
        },
        datosCursoProp: {
            type: Object,
            require: false,
        },
    },
    methods: {
        
    },
    async created () {
        if (this.datosCursoProp) {
            this.datosCurso = this.datosCursoProp
            return
        }

        const doc = await db.collection('CursosPublicado').doc(this.uidCurso).get()
        this.datosCurso = doc.data()
    },
}
</script>

<style lang="scss" scoped>
// https://youtu.be/75zbFb1PQYI

.horizontal_slider {
    display: block;
    width: 100%;
    overflow-x: auto;
}

.slider_container {
    display: block;
    white-space: nowrap;
}

.item {
    max-width: 110px;
    border-radius: 15px;
    display: inline-block;
    margin-right: 40px;
    text-align: center;
}

</style>