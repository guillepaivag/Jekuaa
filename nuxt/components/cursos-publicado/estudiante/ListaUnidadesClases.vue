<template>
    <div>
        <v-list style="height: 70vh; overflow-y: scroll;">
            <div class="mb-8" v-for="(elementUnidad, index) in unidades" :key="index">
                <h4 class="tituloUnidad mb-1"> {{ elementUnidad.data.nombreUnidad }} </h4>

                <v-list-item-group color="primary">
                    <div v-for="(elementClase, index) in elementUnidad.clases" :key="index">
                        <v-list-item 
                            class="elemento_texto_clase"
                            :to="`/curso/${codigo}/clase/${elementClase.data.uid}`"
                        >
                            <v-list-item-content>

                                <!--  -->
                                <v-list-item-title class="tituloClase">
                                    <v-icon 
                                        v-if="elementClase.data.tipoClase === 'video'"
                                        size="20"
                                        :color="getColorDisplay(elementClase.data.uid) === 'green' ? '#683bce' : 'gray'"
                                    >
                                        mdi-play-circle
                                    </v-icon>
                                    <v-icon 
                                        v-else-if="elementClase.data.tipoClase === 'video-youtube'"
                                        size="20"
                                        :color="getColorDisplay(elementClase.data.uid) === 'green' ? 'red' : 'gray'"
                                    >
                                        mdi-youtube
                                    </v-icon>
                                    <v-icon 
                                        v-else-if="elementClase.data.tipoClase === 'articulo'"
                                        size="20"
                                        :color="getColorDisplay(elementClase.data.uid) === 'green' ? '#ff1d89' : 'gray'"
                                    >
                                        mdi-file-multiple
                                    </v-icon>
                                    <p 
                                        :style="getColorDisplay(elementClase.data.uid) === 'green' ? 'color: #683bce;' : 'color: gray;'"
                                        style="display: inline; margin-left: 5px !important;"
                                    >
                                        {{ elementClase.data.titulo }}
                                </p>
                                </v-list-item-title>
                            </v-list-item-content>

                            <v-spacer></v-spacer>

                            <v-icon 
                                v-if="elementClase.data.vistaPrevia"
                                color="#683bce"
                                left
                                size="18"
                                title="Vista previa"
                            >
                                mdi-lock-open-alert
                            </v-icon>

                            <p 
                                :style="getColorDisplay(elementClase.data.uid) === 'green' ? 'color: #683bce;' : 'color: gray;'"
                                style="display: inline; font-size: 13px; margin-top: 16px; margin-right: -8px;"
                            >
                                {{ secondsToString(elementClase.data.duracion) }}
                            </p>

                        </v-list-item>
                        <v-divider></v-divider>
                    </div>
                </v-list-item-group>
            </div>
        </v-list>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        codigo: String,
        unidades: Array,
        listaProgresos: Array,
    },
    methods: {
        secondsToString (seconds) {
            var hour = Math.floor(seconds / 3600);
            hour = (hour < 10)? '0' + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return hour + ':' + minute + ':' + String(second).split('.')[0];
        },
        getColorDisplay (uidClase) {
            const progreso = this.listaProgresos.find(v => v.uidClase === uidClase)
        
            return !!progreso ? 'green' : 'gray'
        }
    },
}
</script>

<style scoped>
.elemento_texto_clase {
    color: black;
}

.clase_visualizada {
    background-color: #fcd8e9;
}

/* .v-item--active:hover {
    color: blueviolet;
} */


</style>