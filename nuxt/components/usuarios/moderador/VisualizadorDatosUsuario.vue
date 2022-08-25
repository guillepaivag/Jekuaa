<template>
    <div>
        <div class="text-center mb-10">
            <v-avatar color="#683bce" size="164">
                <img
                    v-if="auth.photoURL"
                    :src="auth.photoURL"
                    :alt="firestore.nombreUsuario"
                >
                <span v-else class="estiloTexto white--text headline">
                    {{ inicialNombreUsuario(firestore.nombreUsuario) }}
                </span>
            </v-avatar>
        </div>

        <div class="mb-5">
            <b class="mr-2">
                Habilitado:
                <v-icon v-if="!auth.disabled" color="green">
                    mdi-check-circle
                </v-icon>
                <v-icon v-else color="red">
                    mdi-close-circle
                </v-icon>
            </b>

            <b class="mr-2">
                Email verificado:
                <v-icon v-if="auth.emailVerified" color="green">
                    mdi-check-circle
                </v-icon>
                <v-icon v-else color="red">
                    mdi-close-circle
                </v-icon>
            </b>
        </div>

        <v-text-field
            label="UID"
            :value="firestore.uid"
            class="mb-3"
        ></v-text-field>

        <v-text-field
            label="Nombre de usuario"
            :value="firestore.nombreUsuario"
            class="mb-3"
        ></v-text-field>

        <v-text-field
            label="Correo de usuario"
            :value="firestore.correo"
            class="mb-3"
        ></v-text-field>

        <v-text-field
            label="Nombre completo"
            :value="auth.displayName"
            class="mb-3"
        ></v-text-field>

        <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                    label="Rol"
                    :value="firestore.rol"
                    class="mb-3"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                    label="Plan"
                    :value="firestore.plan"
                    class="mb-3"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                    label="Puntos"
                    :value="firestore.point"
                    class="mb-3"
                ></v-text-field>
            </v-col>
        </v-row>

       <v-divider class="mt-2 mb-7"></v-divider>

       <v-text-field
            label="Fecha creación"
            :value="auth.metadata.creationTime"
            class="mb-3"
        ></v-text-field>

        <v-text-field
            label="Fecha inicio sesión"
            :value="auth.metadata.lastSignInTime"
            class="mb-3"
        ></v-text-field>

        <h3> Proveedores de inicio de sesión: </h3>
        <v-divider class="mb-5"></v-divider>
        <div class="mr-3" style="display: inline-block;" v-for="(item, index) in auth.providerData" :key="index">
            <v-icon :title="item.email" v-if="item.providerId === 'password'">
                mdi-email
            </v-icon>
            <v-icon :title="item.email" v-if="item.providerId === 'google.com'">
                mdi-google
            </v-icon>
            <v-icon :title="item.email" v-if="item.providerId === 'facebook.com'">
                mdi-facebook
            </v-icon>
        </div>

        <div class="mt-7" v-if="miembro">
            <h3>Datos como miembro:</h3>
            <v-divider class="mb-5"></v-divider>
            
            <v-text-field
                label="Cantidad de blogs"
                :value="miembro.cantidadBlogs"
                class="mb-3"
            ></v-text-field>

            <v-text-field
                label="Cantidad de cursos"
                :value="miembro.cantidadCursos"
                class="mb-3"
            ></v-text-field>

            <v-text-field
                label="Cantidad de estudiantes"
                :value="miembro.cantidadEstudiantes"
                class="mb-3"
            ></v-text-field>

            <b>Funciones:</b>
            <ul class="mb-5">
                <li v-for="(item, index) in miembro.funciones" :key="index">
                    {{ item }}
                </li>
            </ul>

            <v-text-field
                label="Fecha comienzo"
                :value="millisecondsToDateString(miembro.fechaComienzo.seconds*1000)"
                class="mb-3"
            ></v-text-field>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        firestore: Object,
        auth: Object,
        miembro: Object,
    },
    methods: {
        millisecondsToDateString (milliseconds) {
            return (new Date(milliseconds - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
        inicialNombreUsuario (nombreUsuario) {
            return nombreUsuario ? nombreUsuario[0].toUpperCase() : ''
        },
    },
    computed: {
        
    }
}
</script>

<style scoped>
.estiloTexto {
    font-family: 'Asap', sans-serif;
    font-weight: bold;
    font-size: 80px !important;
}
</style>