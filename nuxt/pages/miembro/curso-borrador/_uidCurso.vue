<template>
    <div>
        <div class="container mt-0">
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

        <div class="container">
            <v-row no-gutters>
                <v-col cols="12" lg="2">
                    <!-- displayNonePequenha -->
                    <div class="conjuntoBotones">
                        <v-btn
                            v-for="(item, index) in informacionBotones" :key="index"
                            class="mb-2"
                            text
                            color="#683bce"
                            :disabled="!uidCurso"
                            :to="item.to"
                            exact
                        >
                            {{ item.title }}
                        </v-btn>
                    </div>
                </v-col>

                <v-divider class="displayNonePequenha" vertical></v-divider>
                
                <v-col cols="12" lg="10">
                    <nuxt-child />
                </v-col>
            </v-row>
            
        </div>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    data() {
        return {
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
                    text: 'Mis cursos',
                    disabled: false,
                    href: '/miembro/cursos/mis-cursos',
                },
                {
                    text: 'Borrador',
                    disabled: false,
                    href: '/miembro/cursos/mis-cursos/borrador',
                },
            ],
            uidCurso: '',
            informacionBotones: [
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}`, title: 'Información' },
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}/programa-estudio`, title: 'Contenido' },
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}/precios`, title: 'Precios' },
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}/publicacion`, title: 'Publicación' },
            ]
        }
    },
    methods: {
        
    },
    async created() {
        const doc = await fb.firestore()
        .collection('CursosBorrador').doc(this.$route.params.uidCurso)
        .get()
        this.uidCurso = doc.id

        if (!doc.exists) this.$router.push('/miembro/cursos/mis-cursos/borrador')

        this.breadcrumbs.push({
            text: doc.data().titulo,
            disabled: true,
            href: `/miembro/curso-borrador/${this.$route.params.uidCurso}`,
        })
    },
}
</script>

<style scoped>
@media (max-width: 1263px) {
  .displayNonePequenha {
    display: none;
  }

  .conjuntoBotones {
    margin-bottom: 30px;
  }
}
</style>