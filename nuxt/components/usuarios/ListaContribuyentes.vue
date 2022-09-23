<template>
    <div v-if="datosCurso">
        <h2 class="mb-7">
            {{contribuyentes.length > 1 ? 'Contribuyentes' : 'Contribuyente'}} 
            <b style="color: #ff1d89;">
                de este curso
            </b>
        </h2>

        <div class="horizontal_slider">
            <div class="slider_container mb-5">
                <div class="item" v-for="(contribuyente, index) in contribuyentes" :key="index">
                    <nuxt-link :to="`/estudiante/${contribuyente.firestore.nombreUsuario}`" target="_blank">
                        <v-avatar class="avatar__photoURL" size="170">
                            <v-img
                                class="photoURL"
                                :alt="`Foto de perfil de ${contribuyente.firestore.nombreUsuario}`"
                                :src="contribuyente.auth.photoURL"
                            ></v-img>
                        </v-avatar>

                        <h2 class="nombreUsuario mt-5">
                            {{ contribuyente.firestore.nombreUsuario }}
                        </h2>
                    </nuxt-link>
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
    border-radius: 15px;
    display: inline-block;
    margin-right: 70px;
    text-align: center;
}

.item h2 {
    color: #683bce;
    transition: 200ms;
}

.item h2:hover {
    cursor: pointer;
    color: #ff1d89;
    transition: 200ms;
}

.avatar__photoURL {
    transition: 200ms;
}

.avatar__photoURL:hover {
    cursor: pointer;
    transition: 200ms;
}

a {
    text-decoration: none;
}

</style>