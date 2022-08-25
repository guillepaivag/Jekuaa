<template>
    <div class="container">
        <div class="mt-0 mb-8">
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

        <div class="">
            <v-row no-gutters>
                <v-col class="" cols="12" md="2">
                    
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

                        <v-btn
                            v-if="datosCurso && datosCurso.responsable === $store.state.modules.usuarios.uid"
                            class="mb-2"
                            text
                            color="#683bce"
                            :disabled="!uidCurso"
                            :to="`/miembro/curso-borrador/${uidCurso}/auxiliares`"
                            exact
                        >
                            Auxiliares
                        </v-btn>

                        <!-- <v-btn
                            v-if="datosCurso && datosCurso.responsable === $store.state.modules.usuarios.uid"
                            class="mb-2"
                            text
                            color="#683bce"
                            :disabled="!uidCurso"
                            :to="`/miembro/curso-borrador/${uidCurso}/precios`"
                            exact
                        >
                            Precio
                        </v-btn> -->

                        <v-btn
                            v-if="datosCurso && datosCurso.responsable === $store.state.modules.usuarios.uid"
                            class="mb-2"
                            text
                            color="#683bce"
                            :disabled="!uidCurso"
                            :to="`/miembro/curso-borrador/${uidCurso}/publicacion`"
                            exact
                        >
                            Publicación
                        </v-btn>

                        <v-btn
                            v-if="datosCurso"
                            :loading="uidPrimeraClase === 'cargando'"
                            :disabled="!uidCurso || uidPrimeraClase === 'sin-clase'"
                            class="mb-2"
                            text
                            color="#683bce"
                            :to="`/miembro/curso-borrador/vista-previa/${uidCurso}/clase/${uidPrimeraClase}`"
                            exact
                        >
                            Vista previa
                        </v-btn>
                    </div>

                </v-col>

                <v-divider 
                    class="my-v-divider mr-0"
                    vertical
                ></v-divider>
                
                <v-col cols="12" md="10">
                    <nuxt-child />
                </v-col>
            </v-row>
            
        </div>

        <v-speed-dial
            v-model="fab"
            :top="false"
            :bottom="true"
            :right="true"
            :left="false"
            :direction="'top'"
            :open-on-hover="false"
            :transition="'slide-y-reverse-transition'"
            class="contenedor_btnHerramientas mb-3 mr-3"
            style="position: fixed;"
        >
            <template v-slot:activator>
                <v-btn
                    v-model="fab"
                    color="blue darken-2"
                    dark
                    fab
                    ref="btnAction"
                >
                    <v-icon v-if="fab">
                        mdi-close
                    </v-icon>
                    <v-icon v-else>
                        mdi-cog
                    </v-icon>
                </v-btn>
            </template>

            <v-btn
                v-if="datosCurso"
                :loading="uidPrimeraClase === 'cargando'"
                :disabled="!uidCurso || uidPrimeraClase === 'sin-clase'"
                title="Vista previa"
                fab
                small
                dark
                color="blue"
                :to="`/miembro/curso-borrador/vista-previa/${uidCurso}/clase/${uidPrimeraClase}`"
            >
                <v-icon>
                    mdi-eye
                </v-icon>
            </v-btn>
            
            <v-btn
                v-if="datosCurso && datosCurso.responsable === $store.state.modules.usuarios.uid"
                title="Publicación"
                fab
                small
                dark
                color="pink"
                :to="`/miembro/curso-borrador/${uidCurso}/publicacion`"
            >
                <v-icon>
                    mdi-upload
                </v-icon>
            </v-btn>

            <!-- <v-btn
                v-if="datosCurso && datosCurso.responsable === $store.state.modules.usuarios.uid"
                title="Precio"
                fab
                small
                dark
                color="#ff1d89"
                :to="`/miembro/curso-borrador/${uidCurso}/precios`"
            >
                <v-icon>
                    mdi-currency-usd
                </v-icon>
            </v-btn> -->

            <v-btn
                v-if="datosCurso && datosCurso.responsable === $store.state.modules.usuarios.uid"
                title="Auxiliares"
                fab
                small
                dark
                color="green"
                :to="`/miembro/curso-borrador/${uidCurso}/auxiliares`"
            >
                <v-icon>
                    mdi-account-multiple
                </v-icon>
            </v-btn>
            
            <v-btn
                title="Contenido"
                fab
                small
                dark
                color="#ff1d89"
                :to="`/miembro/curso-borrador/${uidCurso}/programa-estudio`"
            >
                <v-icon>
                    mdi-video
                </v-icon>
            </v-btn>

            <v-btn
                title="Foto del curso"
                fab
                small
                dark
                color="primary"
                :to="`/miembro/curso-borrador/${uidCurso}/foto-curso`"
            >
                <v-icon>
                    mdi-image
                </v-icon>
            </v-btn>
            
            <v-btn
                title="Información del curso"
                fab
                small
                dark
                color="#683bce"
                :to="`/miembro/curso-borrador/${uidCurso}`"
            >
                <v-icon>
                    mdi-home-edit
                </v-icon>
            </v-btn>

        </v-speed-dial>
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
const db = fb.firestore()

export default {
    name: '',
    layout: 'miembro',
    middleware: 'esInstructor',
    data() {
        return {
            fab: false,
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
                    text: 'Borradores',
                    disabled: false,
                    href: '/miembro/cursos/borradores',
                },
            ],
            uidCurso: this.$route.params.uidCurso,
            datosCurso: null,
            informacionBotones: [
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}`, title: 'Información' },
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}/foto-curso`, title: 'Foto curso' },
                { to: `/miembro/curso-borrador/${this.$route.params.uidCurso}/programa-estudio`, title: 'Contenido' },
            ],
            uidPrimeraClase: 'cargando',
        }
    },
    methods: {
        
    },
    async mounted() {
        const snapshotUnidad = await db.collection('CursosPublicado').doc(this.uidCurso)
        .collection('UnidadesPublicado').where('ordenUnidad', '==', 1)
        .get()

        if (snapshotUnidad.empty) {
            this.uidPrimeraClase = 'sin-clase'
            return
        }

        const snapshotClase = await snapshotUnidad.docs[0].ref
        .collection('ClasesPublicado').where('ordenClase', '==', 1)
        .get()

        if (snapshotClase.empty) {
            this.uidPrimeraClase = 'sin-clase'
            return
        }

        this.uidPrimeraClase = snapshotClase.docs[0].id
    },
    async created() {
        const doc = await fb.firestore()
        .collection('CursosBorrador').doc(this.uidCurso)
        .get()
        this.datosCurso = doc.data()

        if (!doc.exists) this.$router.push('/miembro/cursos/borradores')

        this.breadcrumbs.push({
            text: doc.data().titulo,
            disabled: true,
            href: `/miembro/curso-borrador/${this.uidCurso}`,
        })
    },
}
</script>

<style scoped>
@media (min-width: 960px) {
    .contenedor_btnHerramientas {
        display: none;
    }

    .contenedor_vista{
        width: 50%;
    }

    .my-v-divider {
        margin-left: -40px;
    }
}

@media (max-width: 959px) {
    .my-v-divider {
        display: none;
    }

    .conjuntoBotones {
        display: none;
    }
  
}

@media (min-width: 960px) and (max-width: 1263.99px) {
    .my-v-divider {
        margin-left: -2px;
    }
  
}
</style>