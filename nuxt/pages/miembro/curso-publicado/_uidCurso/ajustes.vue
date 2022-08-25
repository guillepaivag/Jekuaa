<template>
    <div class="container">
        <div class="mt-0 mb-0">
            <v-breadcrumbs>
                <div v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                    <v-breadcrumbs-item
                        :href="breadcrumb.href"
                        :disabled="breadcrumb.disabled"
                        :nuxt="true"
                    >
                        {{ breadcrumb.text.toUpperCase() }}
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider v-if="index !== breadcrumbs.length-1">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-breadcrumbs-divider>
                </div>
            </v-breadcrumbs>
        </div>

        <h2 class="mt-5">Actualización de estado de publicación:</h2>

        <v-alert
            outlined
            type="warning"
            prominent
            border="left"
            class="mt-5"
        >
            Si despublicas:
            <ul>
                <li> No podrás obtener nuevos estudiantes. </li>
                <li> Tu curso no aparecerá en la lista de cursos. </li>
            </ul>
        </v-alert>

        <v-switch
            :loading="publicando"
            :disabled="publicando"
            v-model="publicado"
            v-on:click="publicar"
            :label="`Publicado: ${publicado ? 'Si' : 'No'}`"
        ></v-switch>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esMiembro',

    data() {
        return {
            uidCurso: this.$route.params.uidCurso,
            publicado: false,
            publicando: false,
            breadcrumbs: [
                {
                    text: 'Inicio',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Miembro',
                    disabled: false,
                    href: '/miembro',
                },
                {
                    text: 'Cursos',
                    disabled: false,
                    href: '/miembro/cursos',
                },
                {
                    text: 'Publicados',
                    disabled: false,
                    href: '/miembro/cursos/publicados',
                },
            ],
        }
    },

    methods: {
        async publicar () {
            try {
                this.publicando = true

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { publicado: this.publicado }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const uidCurso = this.uidCurso
                await this.$axios.$put(`/serviceCursoPublicado/miembro/publicar/${uidCurso}`, body, config)

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.publicando = false
            }
        }
    },

    async created() {
        const db = fb.firestore()
        const doc = await db.collection('CursosPublicado').doc(this.uidCurso).get()

        if (!doc.exists) return this.$router.push('/miembro/cursos/publicados')

        this.breadcrumbs.push({
            text: doc.data().titulo,
            disabled: false,
            href: `/miembro/curso-publicado/${this.uidCurso}`,
        })
        this.breadcrumbs.push({
            text: 'Ajustes',
            disabled: true,
            href: `/miembro/curso-publicado/${this.uidCurso}/ajustes`,
        })
        
        this.publicado = doc.data().publicado
    },
}
</script>

<style>

</style>