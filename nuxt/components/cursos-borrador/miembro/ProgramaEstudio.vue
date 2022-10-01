<template>
    <div id="create">
        <div class="container" style="margin-top: -12px;">
                            
            <draggable 
                @change="actualizacionOrdenUnidad" 
                :list="datosUnidades" 
                class="list-group" 
                handle=".btn-move-handle"
            >
                <!-- :color="datoUnidad.contieneErrores ? '#FFF2F2' : '#F9FFF7'" -->
                <v-card
                    color="#F5F0FF"
                    v-for="(datoUnidad, index) in datosUnidades" :key="index"
                    class="mb-15"
                    outlined
                    style="border: 1px solid #683bce;"
                >
                    <v-list-item class="contenedor_hijo1">
                        <v-list-item-content class="pl-0 pr-7 contenedor_hijo1_contenido">

                            <div class="mb-5 botones_accion_2">
                                
                                <v-btn
                                    class="btn-move-handle mb-1 mr-3"
                                    title="Cambiar orden"
                                    fab
                                    dark
                                    small
                                    color="#683bce"
                                >
                                    <v-icon dark>
                                        mdi-swap-vertical-bold
                                    </v-icon>
                                </v-btn>

                                <v-btn
                                    v-if="datoUnidad.auxiliares.vistaClases"
                                    title="Quitar clases"
                                    fab
                                    dark
                                    small
                                    color="#A283E8"
                                    class="mr-3"
                                    v-on:click="quitarVistaClases(datoUnidad.uid)"
                                >
                                    <v-icon dark>
                                        mdi-chevron-up
                                    </v-icon>
                                </v-btn>

                                <v-btn
                                    v-else
                                    class="my-icon mr-3"
                                    title="Mostrar clases"
                                    fab
                                    dark
                                    small
                                    color="#683bce"
                                    v-on:click="verVistaClases(datoUnidad.uid)"
                                >
                                    <v-icon dark>
                                        mdi-chevron-down
                                    </v-icon>
                                </v-btn>

                                <v-btn
                                    :disabled="!!datoUnidad.auxiliares.procesosContenidoPorClase.length"
                                    class="btn-move-handle mb-1 mr-3"
                                    title="Eliminar unidad"
                                    fab
                                    dark
                                    small
                                    color="red"
                                    v-on:click="
                                        verificarEliminacionElemento.value = true; 
                                        verificarEliminacionElemento.uid = datoUnidad.uid; 
                                        verificarEliminacionElemento.tipo = 'unidad';
                                    "
                                >
                                    <v-icon dark>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </div>

                            <v-text-field
                                v-model="datoUnidad.nombreUnidad"
                                :counter="60"
                                :label="`${index+1}) Nombre de la unidad`"
                                outlined
                                required
                            ></v-text-field>

                            <v-card-actions class="mb-2" style="margin-top: -25px; margin-left: -7px;">
                                <v-btn
                                    :disabled="datosUnidades[index].nombreUnidad === datosUnidades[index].auxiliares.nombreUnidadActual"
                                    outlined
                                    small
                                    color="#683bce"
                                    v-on:click="actualizarUnidad(datoUnidad.uid, datoUnidad.nombreUnidad)"
                                >
                                    Actualizar
                                </v-btn>
                            </v-card-actions>

                        </v-list-item-content> 
                        
                        <v-card-actions class="botones_accion_1">
                            <v-row align="center">
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                    <div class="text-center">
                                        <div class="my-2">
                                            <v-btn
                                                title="Cambiar orden"
                                                class="btn-move-handle mb-1"
                                                fab
                                                dark
                                                small
                                                color="#683bce"
                                            >
                                                <v-icon dark>
                                                    mdi-swap-vertical-bold
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="my-2">
                                            <v-btn
                                                v-if="datoUnidad.auxiliares.vistaClases"
                                                title="Quitar clases"
                                                fab
                                                dark
                                                small
                                                color="#A283E8"
                                                v-on:click="quitarVistaClases(datoUnidad.uid)"
                                            >
                                                <v-icon dark>
                                                    mdi-chevron-up
                                                </v-icon>
                                            </v-btn>
                                            <v-btn
                                                v-else
                                                class="my-icon"
                                                title="Mostrar clases"
                                                fab
                                                dark
                                                small
                                                color="#683bce"
                                                v-on:click="verVistaClases(datoUnidad.uid)"
                                            >
                                                <v-icon dark>
                                                    mdi-chevron-down
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="my-2">
                                            <v-btn
                                                :disabled="!!datoUnidad.auxiliares.procesosContenidoPorClase.length"
                                                class="btn-move-handle mb-1"
                                                title="Eliminar unidad"
                                                fab
                                                dark
                                                small
                                                color="red"
                                                v-on:click="
                                                    verificarEliminacionElemento.value = true; 
                                                    verificarEliminacionElemento.uid = datoUnidad.uid; 
                                                    verificarEliminacionElemento.tipo = 'unidad';
                                                "
                                            >
                                                <v-icon dark>
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-col>
                            
                            </v-row>
                            
                        </v-card-actions>
                        
                    </v-list-item>

                    <div v-if="datoUnidad.auxiliares.vistaClases">
                        <v-divider class="mt-0 mb-4"></v-divider>

                        <div class="pl-5 pr-5">
                            <div class="text-center py-5 pb-10" v-if="datoUnidad.auxiliares.estadoListaClases === 'cargando'">
                                <v-progress-circular
                                    indeterminate
                                    color="#683bce"
                                ></v-progress-circular>
                            </div>
                            <div v-else-if="datoUnidad.auxiliares.estadoListaClases === 'cargado'">

                                <draggable 
                                    @change="actualizacionOrdenClase(datoUnidad.uid)"
                                    :list="datoUnidad.datosClases" 
                                    class="list-group" 
                                    :handle="`.btn-move-handle-${datoUnidad.uid}`"
                                >

                                    <v-card
                                        v-for="(datoClase, index) in datoUnidad.datosClases" :key="index"
                                        class="mx-auto mb-15"
                                        :style="(datoClase.datosContenido && datoClase.datosContenido.contieneErrores) || datoClase.contieneErrores ? 'border: 1px solid red;' : 'border: 1px solid green;'"
                                    >
                                        <v-card-title class="mb-2" style="color: #683bce;">
                                            <div v-if="!datoClase.contieneErrores">
                                                <v-icon class="mr-1" color="#ff1d89" v-if="datoClase.tipoClase === 'video'">
                                                    mdi-play-circle
                                                </v-icon>
                                                <v-icon class="mr-1" color="#ff1d89" v-else-if="datoClase.tipoClase === 'video-youtube'">
                                                    mdi-youtube
                                                </v-icon>
                                                <v-icon class="mr-1" color="#ff1d89" v-else-if="datoClase.tipoClase === 'articulo'">
                                                    mdi-file-multiple
                                                </v-icon>
                                                <v-icon class="mr-1" color="#ff1d89" v-else>
                                                    mdi-note-off
                                                </v-icon>
                                            </div>
                                            <v-icon class="mr-1" color="#ff1d89" v-else>
                                                mdi-close-thick
                                            </v-icon>
                                            
                                            {{ datoClase.titulo }}
                                        </v-card-title>

                                        <v-card-subtitle class="" style="color: #683bce;">
                                            <ul>
                                                <li>
                                                    <b v-if="datoClase.estadoDocumento === ''">Sin cambios</b> 
                                                    <b v-else-if="datoClase.estadoDocumento === 'nuevo'">Nueva unidad</b> 
                                                    <b v-else-if="datoClase.estadoDocumento === 'actualizado'">Actualizado</b> 
                                                </li>

                                                <li>
                                                    <div v-if="datoClase.descripcion.length">
                                                        <b>Descripción:</b> {{ datoClase.descripcion }}
                                                    </div>
                                                    <div v-else>
                                                        <b>Descripción:</b> 
                                                        <p style="color: red; display: inline;">
                                                            Sin descripción
                                                        </p>
                                                    </div>
                                                </li>
                                                
                                                <li>
                                                    <b>Duración:</b> 
                                                    <p style="display: inline;" :style="datoClase.duracion ? '' : 'color: red;'">
                                                        {{ secondsToString(datoClase.duracion) }}
                                                    </p>
                                                </li>

                                                <li>
                                                    <b>Tipo de clase:</b>
                                                    <v-icon color="#ff1d89" v-if="datoClase.tipoClase === 'video'">
                                                        mdi-play-circle
                                                    </v-icon>
                                                    <v-icon color="#ff1d89" v-if="datoClase.tipoClase === 'video-youtube'">
                                                        mdi-youtube
                                                    </v-icon>
                                                    <v-icon color="#ff1d89" v-if="datoClase.tipoClase === 'articulo'">
                                                        mdi-file-multiple
                                                    </v-icon>
                                                    <p style="display: inline; color: red;" v-if="datoClase.tipoClase === ''">
                                                        Sin contenido
                                                    </p>
                                                </li>

                                                <li>
                                                    <b>Vista previa:</b> 
                                                    <p style="display: inline;">
                                                        {{ datoClase.vistaPrevia ? 'Si' : 'No' }}
                                                    </p>
                                                </li>

                                                <li>
                                                    <b>Contribuyentes:</b> 
                                                    <p style="display: inline;">
                                                        {{ datoClase.contribuyentes.toString() }}
                                                    </p>
                                                </li>

                                                <li>
                                                    <u 
                                                        v-if="datoClase.mensajesError.length"
                                                        class="cantidadErroresUnidad informacionUnidadTexto"
                                                        style="color: red;"
                                                        v-on:click="mostrarErroresClase(datoClase.mensajesError)"
                                                    > 
                                                        {{ datoClase.mensajesError.length }} {{ datoClase.mensajesError.length !== 1 ? 'errores.' : 'error.' }}
                                                    </u>
                                                    <p 
                                                        v-else
                                                        class="informacionUnidadTexto"
                                                        style="color: green; display: inline;"
                                                    > 
                                                        0 errores. 
                                                    </p>
                                                </li>
                                            </ul>
                                        </v-card-subtitle>

                                        <v-divider class="mt-3"></v-divider>

                                        <v-card-actions class="pl-4 py-4">
                                            <div class="horizontal_slider">
                                                <div class="slider_container">
                                                
                                                    <v-btn
                                                        title="Cambiar orden"
                                                        :class="`item-btn-move-handle btn-move-handle-${datoUnidad.uid}`"
                                                        fab
                                                        dark
                                                        small
                                                        color="#683bce"
                                                    >
                                                        <v-icon dark color="">
                                                            mdi-swap-vertical-bold
                                                        </v-icon>
                                                    </v-btn>

                                                    <v-btn
                                                        class="item-btn-move-handle"
                                                        title="Actualizar contribuyentes"
                                                        fab
                                                        dark
                                                        small
                                                        color="#683bce" 
                                                        :to="`/miembro/curso-borrador/curso/${uidCursoProp}/clase/${datoClase.uid}/contribuyentes`"
                                                        target="_blank"
                                                    >
                                                        <v-icon dark color="">
                                                            mdi-account-multiple
                                                        </v-icon>
                                                    </v-btn>

                                                    <v-btn
                                                        class="item-btn-move-handle"
                                                        title="Actualizar clase"
                                                        fab
                                                        dark
                                                        small
                                                        color="#683bce"
                                                        v-on:click="mostrarActualizacionClase(datoUnidad.uid, datoClase.uid)"
                                                    >
                                                        <v-icon dark color="">
                                                            mdi-content-save-edit
                                                        </v-icon>
                                                    </v-btn>

                                                    <v-btn
                                                        :disabled="!!datoClase.auxiliares.estadoContenido.length"
                                                        class="item-btn-move-handle"
                                                        title="Cambiar unidad"
                                                        fab
                                                        dark
                                                        small
                                                        color="#683bce"
                                                        v-on:click="mostrarDialogCambioUnidad(datoUnidad.uid, datoClase.uid)"
                                                    >
                                                        <v-icon dark color="">
                                                            mdi-content-save-move
                                                        </v-icon>
                                                    </v-btn>

                                                    <v-btn
                                                        :disabled="!!datoClase.auxiliares.estadoContenido.length"
                                                        class="item-btn-move-handle"
                                                        title="Eliminar clase"
                                                        fab
                                                        dark
                                                        small
                                                        color="red"
                                                        v-on:click="
                                                            verificarEliminacionElemento.value = true; 
                                                            verificarEliminacionElemento.uid = datoClase.uid; 
                                                            verificarEliminacionElemento.tipo = 'clase';
                                                            verificarEliminacionElemento.uidUnidadAux = datoUnidad.uid
                                                        "
                                                    >
                                                        <v-icon dark color="">
                                                            mdi-delete
                                                        </v-icon>
                                                    </v-btn>

                                                </div>
                                            </div>

                                            <v-spacer></v-spacer>

                                            <v-btn
                                                class="ml-2"
                                                icon
                                                @click="datoClase.auxiliares.mostrarContenido = !datoClase.auxiliares.mostrarContenido"
                                            >
                                                <v-icon color="">
                                                    {{ datoClase.auxiliares.mostrarContenido ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                                                </v-icon>
                                            </v-btn>
                                        </v-card-actions>

                                        <v-expand-transition>
                                            <div v-show="datoClase.auxiliares.mostrarContenido">
                                                <v-divider></v-divider>

                                                <div>
                                                    <div v-if="datoClase.datosContenido">
                                                        <div v-if="datoClase.auxiliares.estadoContenido">
                                                            <div v-if="datoClase.auxiliares.estadoContenido === 'subiendo'">
                                                                Subiendo...
                                                                <div v-if="datoClase.auxiliares.porcentajeSubida">
                                                                    {{ datoClase.auxiliares.porcentajeSubida }}
                                                                </div>
                                                            </div>
                                                            <div v-else>
                                                                Procesando...
                                                            </div>
                                                        </div>
                                                        <div class="pt-4 pb-4" v-else>
                                                            
                                                            <div class="text-center">
                                                                <v-btn
                                                                    disabled
                                                                    circle
                                                                    color="success"
                                                                    class="mb-1"
                                                                    v-on:click="setContenidoVideoParaActualizarContenidoClase(
                                                                        uidCursoProp, 
                                                                        datoUnidad.uid, 
                                                                        datoClase.uid
                                                                    )"
                                                                >
                                                                    <v-icon left>
                                                                        mdi-play-circle
                                                                    </v-icon>
                                                                    Video
                                                                </v-btn>

                                                                <v-btn
                                                                    circle
                                                                    color="success"
                                                                    class="mb-1"
                                                                    v-on:click="setContenidoArticuloParaActualizarContenidoClase(
                                                                        uidCursoProp,
                                                                        datoUnidad.uid,
                                                                        datoClase.uid,
                                                                        datoClase.tipoClase,
                                                                        datoClase.valorContenido
                                                                    )"
                                                                >
                                                                    <v-icon left>
                                                                        mdi-file-multiple
                                                                    </v-icon>
                                                                    Articulo
                                                                </v-btn>

                                                                <v-btn
                                                                    circle
                                                                    color="success"
                                                                    class="mb-1"
                                                                    v-on:click="setContenidoVideoYoutubeParaActualizarContenidoClase(
                                                                        uidCursoProp,
                                                                        datoUnidad.uid,
                                                                        datoClase.uid,
                                                                        datoClase.tipoClase,
                                                                        datoClase.valorContenido,
                                                                    )"
                                                                >
                                                                    <v-icon left>
                                                                        mdi-youtube
                                                                    </v-icon>
                                                                    Youtube
                                                                </v-btn>
                                                            </div>

                                                            <v-divider class="mt-3 mb-6"></v-divider>

                                                            <div v-if="datoClase.datosContenido.tipoContenido === 'video'">
                                                                <v-row no-gutters>
                                                                    <v-col class="text-center" cols="12" lg="7">
                                                                        <div class="contenedor_contenido_video ml-4 mr-4">
                                                                            <div v-if="datoClase.valorContenido">
                                                                                <VisualizadorVideo :options="datoClase.valorContenido" />
                                                                            </div>
                                                                            <div v-else>
                                                                                Cargando..
                                                                            </div>
                                                                        </div>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5">
                                                                        <div class="contenedor_descripcion_video">
                                                                            
                                                                            <p style="font-size: 20px;">
                                                                                {{ datoClase.datosContenido.fileName }}
                                                                            </p>

                                                                            <p style="font-size: 15px; margin-top: -7px;">
                                                                                <b>Duración:</b> {{ secondsToString(datoClase.duracion) }}
                                                                            </p>

                                                                            <p style="font-size: 15px; margin-top: -7px;">
                                                                                <b>Fecha subida:</b> {{ secondsToDateString( datoClase.datosContenido.fechaSubida.seconds ) }}
                                                                            </p>

                                                                            <u 
                                                                                v-if="datoClase.datosContenido.mensajesError.length"
                                                                                class="cantidadErroresUnidad informacionUnidadTexto"
                                                                                style="color: red; margin-top: -7px;"
                                                                                v-on:click="mostrarErroresClase(datoClase.datosContenido.mensajesError)"
                                                                            > 
                                                                                {{ datoClase.datosContenido.mensajesError.length }} {{ datoClase.datosContenido.mensajesError.length !== 1 ? 'errores.' : 'error.' }}
                                                                            </u>
                                                                            <p 
                                                                                v-else
                                                                                class="informacionUnidadTexto"
                                                                                style="color: green; display: inline; margin-top: -7px;"
                                                                            > 
                                                                                0 errores. 
                                                                            </p>
                                                                            
                                                                        </div>
                                                                    </v-col>
                                                                </v-row>
                                                            </div>
                                                            <div v-else-if="datoClase.datosContenido.tipoContenido === 'video-youtube'">
                                                                <v-row no-gutters>
                                                                    <v-col class="" cols="12" lg="7">
                                                                        <div class="">
                                                                            <div class="container" v-if="datoClase.valorContenido">
                                                                                <VisualizadorYoutube :codigoVideoYoutube="datoClase.valorContenido.codigoVideoYoutube" />
                                                                                <!-- {{datoClase.valorContenido}} -->
                                                                            </div>
                                                                            <div class="text-center" v-else>
                                                                                Cargando..
                                                                            </div>
                                                                        </div>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5">
                                                                        <div class="contenedor_descripcion_video">
                                                                            
                                                                            <p style="font-size: 20px;">
                                                                                <!-- {{ datoClase.datosContenido.fileName }} -->
                                                                                Video de Youtube
                                                                            </p>

                                                                            <p style="font-size: 15px; margin-top: -7px;">
                                                                                <b>Duración:</b> {{ secondsToString(datoClase.duracion) }}
                                                                            </p>

                                                                            <p style="font-size: 15px; margin-top: -7px;">
                                                                                <b>Fecha subida:</b> {{ secondsToDateString( datoClase.datosContenido.fechaSubida.seconds ) }}
                                                                            </p>

                                                                            <u 
                                                                                v-if="datoClase.datosContenido.mensajesError.length"
                                                                                class="cantidadErroresUnidad informacionUnidadTexto"
                                                                                style="color: red; margin-top: -7px;"
                                                                                v-on:click="mostrarErroresClase(datoClase.datosContenido.mensajesError)"
                                                                            > 
                                                                                {{ datoClase.datosContenido.mensajesError.length }} {{ datoClase.datosContenido.mensajesError.length !== 1 ? 'errores.' : 'error.' }}
                                                                            </u>
                                                                            <p 
                                                                                v-else
                                                                                class="informacionUnidadTexto"
                                                                                style="color: green; display: inline; margin-top: -7px;"
                                                                            > 
                                                                                0 errores. 
                                                                            </p>
                                                                            
                                                                        </div>
                                                                    </v-col>
                                                                </v-row>
                                                            </div>
                                                            <div v-else-if="datoClase.datosContenido.tipoContenido === 'articulo'">
                                                                <v-row no-gutters>
                                                                    <v-col class="" cols="12" lg="7">
                                                                        <div class="contenedor_contenido_articulo">
                                                                            <div 
                                                                                class="ml-4 mr-4"
                                                                                style="margin-top: -20px;"
                                                                                v-if="datoClase.valorContenido"
                                                                            >                                                                               
                                                                                <VisualizadorArticulo 
                                                                                    :contenido="datoClase.valorContenido" 
                                                                                />
                                                                            </div>
                                                                            <div class="text-center" v-else>
                                                                                Cargando..
                                                                            </div>
                                                                        </div>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5">
                                                                        <div class="contenedor_descripcion_articulo">
                                                                            
                                                                            <p style="font-size: 20px;">
                                                                                {{ datoClase.datosContenido.fileName }}
                                                                            </p>

                                                                            <p style="font-size: 15px; margin-top: -7px;">
                                                                                <b>Duración:</b> {{ secondsToString(datoClase.duracion) }}
                                                                            </p>

                                                                            <p style="font-size: 15px; margin-top: -7px;">
                                                                                <b>Fecha subida:</b> {{ secondsToDateString( datoClase.datosContenido.fechaSubida.seconds ) }}
                                                                            </p>

                                                                            <u 
                                                                                v-if="datoClase.datosContenido.mensajesError.length"
                                                                                class="cantidadErroresUnidad informacionUnidadTexto"
                                                                                style="color: red; margin-top: -7px;"
                                                                                v-on:click="mostrarErroresClase(datoClase.datosContenido.mensajesError)"
                                                                            > 
                                                                                {{ datoClase.datosContenido.mensajesError.length }} {{ datoClase.datosContenido.mensajesError.length !== 1 ? 'errores.' : 'error.' }}
                                                                            </u>
                                                                            <p 
                                                                                v-else
                                                                                class="informacionUnidadTexto"
                                                                                style="color: green; display: inline; margin-top: -7px;"
                                                                            > 
                                                                                0 errores. 
                                                                            </p>
                                                                            
                                                                        </div>
                                                                    </v-col>
                                                                </v-row>
                                                            </div>
                                                            <div class="text-center" v-else>
                                                                <p 
                                                                    style="font-size: 20px;"
                                                                >
                                                                    Sin contenido
                                                                </p>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        Cargando contenido...
                                                    </div>
                                                </div>
                                            </div>
                                        </v-expand-transition>

                                    </v-card>

                                </draggable>

                                <v-btn
                                    outlined
                                    small
                                    color="#683bce"
                                    class="btnActionClases mb-5"
                                    v-on:click="agregarClase(datoUnidad.uid)"
                                >
                                    Agregar clase
                                </v-btn>
                                
                            </div>
                        </div>
                    </div>
                </v-card>
            </draggable>

            <v-divider class="mt-8 mb-8"></v-divider>

            <div>
                <v-btn
                    class="mb-5"
                    outlined
                    color="#683bce"
                    v-on:click="agregarUnidad"
                >
                    Agregar unidad
                </v-btn>
            </div>
        </div>


















        <!-- Actividad de proceso -->
        <v-dialog
            v-model="processing.value"
            persistent
            width="300"
        >
            <v-card
                color="#683bce"
                dark
            >
                <v-card-text class="pt-3">
                    {{ processing.message }}
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Eliminar una unidad/clase -->
        <v-dialog
            v-model="verificarEliminacionElemento.value"
            width="600"
        >

            <v-card>
                <v-card-title class="red lighten-2 white--text" v-if="verificarEliminacionElemento.tipo === 'unidad'">
                    <p>¿Seguro que deseas eliminar esta unidad?</p>
                    <p>Escriba la uid de la unidad para eliminar: <b style="color: black;">{{ verificarEliminacionElemento.uid }}</b></p>
                </v-card-title>

                <v-card-title class="red lighten-2 white--text" v-if="verificarEliminacionElemento.tipo === 'clase'">
                    <p>¿Seguro que deseas eliminar esta clase?</p>
                    <p>Escriba la uid de la clase para eliminar: <b style="color: black;">{{ verificarEliminacionElemento.uid }}</b></p>
                </v-card-title>

                <v-card-text>
                    <v-text-field
                        class="mt-5"
                        v-model="verificarEliminacionElemento.uidVerificacion"
                        :label="verificarEliminacionElemento.tipo === 'unidad' ? 'ID de la unidad' : 'ID de la clase'"
                        outlined
                        required
                    ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="verificarEliminacionElemento.tipo === 'unidad'"
                        color="primary"
                        text
                        :disabled="verificarEliminacionElemento.uidVerificacion !== verificarEliminacionElemento.uid"
                        @click="eliminarUnidad"
                    >
                        Estoy seguro, eliminar unidad
                    </v-btn>

                    <v-btn
                        v-if="verificarEliminacionElemento.tipo === 'clase'"
                        color="primary"
                        text
                        :disabled="verificarEliminacionElemento.uidVerificacion !== verificarEliminacionElemento.uid"
                        @click="eliminarClase"
                    >
                        Estoy seguro, eliminar clase
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Mensajes de error -->
        <v-dialog
            v-model="estadoMensajesErrores.value"
            width="500"
        >

            <v-card>
                <v-card-title class="text-h5 red lighten-2 mb-3">
                    Mensajes de error
                </v-card-title>

                <v-card-text>
                    <ul>
                        <li v-for="(mensajesError, index) in estadoMensajesErrores.mensajesError" :key="index">
                            {{ mensajesError }}
                        </li>
                    </ul>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                    @click="estadoMensajesErrores.value = false"
                >
                    Cerrar
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Actualizacion de una clase -->
        <v-dialog
            v-model="dialogActualizacionClase.value"
            width="500"
        >

            <v-card>
                <v-card-title class="text-h5 green mb-3 white--text">
                    {{ dialogActualizacionClase.ordenClase }}. {{ dialogActualizacionClase.tituloActual }}
                </v-card-title>

                <v-card-text class="mt-8">
                    <v-text-field
                        v-model="dialogActualizacionClase.titulo"
                        :counter="60"
                        :label="`Titulo de la clase`"
                        outlined
                        required
                    ></v-text-field>

                    <v-textarea
                        v-model="dialogActualizacionClase.descripcion"
                        :counter="150"
                        :label="`Descripción de la clase`"
                        outlined
                        required
                    ></v-textarea>

                    <v-switch
                        style="margin-top: -12px;"
                        v-model="dialogActualizacionClase.vistaPrevia"
                        label="Vista previa"
                    ></v-switch>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="dialogActualizacionClase.value = false"
                    >
                        Cerrar
                    </v-btn>
                    <v-btn
                        :disabled="
                            dialogActualizacionClase.titulo === dialogActualizacionClase.tituloActual &&
                            dialogActualizacionClase.descripcion === dialogActualizacionClase.descripcionActual && 
                            dialogActualizacionClase.vistaPrevia === dialogActualizacionClase.vistaPreviaActual ||
                            dialogActualizacionClase.titulo.length > 60 || 
                            dialogActualizacionClase.descripcion.length > 150
                        "
                        color="#683bce"
                        text
                        @click="actualizarClase"
                    >
                        Actualizar
                    </v-btn>
                    
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Cambio de unidad de una clase -->
        <v-dialog
            v-model="dialogClaseCambioUnidad.value"
            scrollable
            max-width="300px"
        >
            <v-card>
                <v-card-title>
                    Selecciona una unidad
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <v-radio-group
                        v-model="dialogClaseCambioUnidad.uidUnidadNueva"
                        column
                    >
                        <v-radio
                            v-for="(datoUnidad, index) in datosUnidades" :key="index"
                            :disabled="dialogClaseCambioUnidad.uidUnidad === datoUnidad.uid"
                            :color="dialogClaseCambioUnidad.uidUnidad === datoUnidad.uid ? 'red' : ''"
                            :label="dialogClaseCambioUnidad.uidUnidad === datoUnidad.uid ? 
                            `${datoUnidad.nombreUnidad} (Seleccionado)` : datoUnidad.nombreUnidad"
                            :value="datoUnidad.uid"
                        ></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogClaseCambioUnidad.value = false"
                    >
                        Cerrar
                    </v-btn>
                    <v-btn
                        :disabled="dialogClaseCambioUnidad.uidUnidadNueva === dialogClaseCambioUnidad.uidUnidad"
                        color="blue darken-1"
                        text
                        @click="cambiarUnidadDeClase"
                    >
                        Cambiar unidad
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Subir contenido -->
        <v-dialog
            v-model="dialogSubirContenido.value"
            :fullscreen="dialogSubirContenido.tipo === 'articulo'"
            width="700"
        >

            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-card-title v-if="dialogSubirContenido.tipo === 'video'" class="text-h5 white--text lighten-2">
                        {{ 'Subir un video' }}
                    </v-card-title>

                    <v-card-title v-else-if="dialogSubirContenido.tipo === 'articulo'" class="text-h5 white--text lighten-2">
                        {{ 'Subir un articulo' }}
                    </v-card-title>

                    <v-card-title v-else-if="dialogSubirContenido.tipo === 'video-youtube'" class="text-h5 white--text lighten-2">
                        {{ 'Subir un video de YouTube' }}
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialogSubirContenido.value = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <div class="container">
                    <GeneradorVideoClase 
                        v-if="dialogSubirContenido.tipo === 'video'"
                        :uidCurso="uidCursoProp"
                        :uidUnidad="dialogSubirContenido.uidUnidad"
                        :uidClase="dialogSubirContenido.uidClase"
                        @sendVideo="subirVideoClase($event)"
                    />
                    <GeneradorVideoYoutubeClase 
                        v-else-if="dialogSubirContenido.tipo === 'video-youtube'"
                        :uidCurso="uidCursoProp"
                        :uidUnidad="dialogSubirContenido.uidUnidad"
                        :uidClase="dialogSubirContenido.uidClase"
                        :otrosDatos="dialogSubirContenido.otrosDatos"
                        @sendYoutube="subirVideoYoutubeClase($event)"
                    />
                    <GeneradorArticulo 
                        v-else-if="dialogSubirContenido.tipo === 'articulo'"
                        :uidCurso="uidCursoProp"
                        :uidUnidad="dialogSubirContenido.uidUnidad"
                        :uidClase="dialogSubirContenido.uidClase"
                        :otrosDatos="dialogSubirContenido.otrosDatos"
                        @sendArticulo="subirArticuloClase($event)"
                    />
                    
                    <div v-else-if="dialogSubirContenido.tipo === 'video-youtube'">
                        {{dialogSubirContenido.otrosDatos}}
                    </div>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        block
                        @click="dialogSubirContenido.value = false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </div>
</template>

<script>
import VisualizadorArticulo from '@/components/cursos/VisualizadorArticulo'
import VisualizadorVideo from '@/components/cursos/VisualizadorVideo'
import VisualizadorYoutube from '@/components/cursos/VisualizadorYoutube'
import GeneradorArticulo from '@/components/cursos-borrador/miembro/GeneradorArticulo'
import GeneradorVideoClase from '@/components/cursos-borrador/miembro/GeneradorVideoClase'
import GeneradorVideoYoutubeClase from '@/components/cursos-borrador/miembro/GeneradorVideoYoutubeClase'
import draggable from 'vuedraggable'
import { fb } from '@/plugins/firebase'

export default {
    name: '',
    data() {
        return {
            unsubscribe: {},
            datosUnidades: [],
            processing: {
                value: false,
                message: ''
            },
            dialogActualizacionClase: {
                value: false,
                uidUnidad: '',
                uidClase: '',

                titulo: '',
                descripcion: '',
                vistaPrevia: false,
                
                tituloActual: '',
                descripcionActual: '',
                vistaPreviaActual: false,
                
                ordenClase: -1
            },
            verificarEliminacionElemento: {
                value: false,
                uid: '',
                uidVerificacion: '',
                tipo: '',
                uidUnidadAux: '',
            },
            estadoMensajesErrores: {
                value: false,
                mensajesError: []
            },
            dialogClaseCambioUnidad: {
                value: false,
                uidUnidad: '',
                uidClase: '',
                uidUnidadNueva: ''
            },
            dialogSubirContenido: {
                value: false,
                tipo: '',
                uidCurso: '',
                uidUnidad: '',
                uidClase: '',
                contenido: null,
                otrosDatos: null,
            }
        }
    },
    props: {
        uidCursoProp: String,
    },
    components: {
        draggable,
        GeneradorArticulo,
        GeneradorVideoClase,
        VisualizadorArticulo,
        VisualizadorVideo,
        VisualizadorYoutube,
        GeneradorVideoYoutubeClase,
    },
    methods: {
        // General
        actualizarTodoElContenido() {
            alert('verificando')
        },
        setContenidoArticuloParaActualizarContenidoClase (uidCurso, uidUnidad, uidClase, tipoContenidoClaseActual, contenidoActual) {
            this.dialogSubirContenido.value = true; 
            this.dialogSubirContenido.tipo = 'articulo';
            this.dialogSubirContenido.uidCurso = uidCurso;
            this.dialogSubirContenido.uidUnidad = uidUnidad;
            this.dialogSubirContenido.uidClase = uidClase;
            this.dialogSubirContenido.otrosDatos = {
                tipoContenidoClaseActual: tipoContenidoClaseActual,
                contenidoClaseActual: contenidoActual,
            };
        },
        setContenidoVideoParaActualizarContenidoClase (uidCurso, uidUnidad, uidClase) {
            this.dialogSubirContenido.value = true; 
            this.dialogSubirContenido.tipo = 'video';
            this.dialogSubirContenido.uidCurso = uidCurso;
            this.dialogSubirContenido.uidUnidad = uidUnidad;
            this.dialogSubirContenido.uidClase = uidClase;
        },
        setContenidoVideoYoutubeParaActualizarContenidoClase (uidCurso, uidUnidad, uidClase, tipoContenidoClaseActual, contenidoActual) {
            this.dialogSubirContenido.value = true; 
            this.dialogSubirContenido.tipo = 'video-youtube';
            this.dialogSubirContenido.uidCurso = uidCurso;
            this.dialogSubirContenido.uidUnidad = uidUnidad;
            this.dialogSubirContenido.uidClase = uidClase;
            this.dialogSubirContenido.otrosDatos = {
                tipoContenidoClaseActual: tipoContenidoClaseActual,
                contenidoClaseActual: contenidoActual,
            };
        },
        secondsToString(seconds) {
            var hour = Math.floor(seconds / 3600);
            hour = (hour < 10)? '0' + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? '0' + minute : minute;
            var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return hour + ':' + minute + ':' + String(second).split('.')[0];
        },
        secondsToDateString (seconds) {
            const someMillisecondValue = seconds * 1000
            const date = new Date(someMillisecondValue)
            return date.toLocaleString()
        },
        mostrarActualizacionClase (uidUnidad, uidClase) {
            const datoUnidad = this.datosUnidades.find(unidad => unidad.uid === uidUnidad)
            const datoClase = datoUnidad.datosClases.find(clase => clase.uid === uidClase)

            this.dialogActualizacionClase.value = true
            this.dialogActualizacionClase.uidUnidad = uidUnidad
            this.dialogActualizacionClase.uidClase = uidClase

            this.dialogActualizacionClase.titulo = datoClase.titulo
            this.dialogActualizacionClase.descripcion = datoClase.descripcion
            this.dialogActualizacionClase.vistaPrevia = datoClase.vistaPrevia

            this.dialogActualizacionClase.tituloActual = datoClase.titulo
            this.dialogActualizacionClase.descripcionActual = datoClase.descripcion
            this.dialogActualizacionClase.vistaPreviaActual = datoClase.vistaPrevia

            this.dialogActualizacionClase.ordenClase = datoClase.ordenClase
        },
        mostrarDialogCambioUnidad (uidUnidad, uidClase) {
            this.dialogClaseCambioUnidad.value = true
            this.dialogClaseCambioUnidad.uidUnidad = uidUnidad
            this.dialogClaseCambioUnidad.uidClase = uidClase
            this.dialogClaseCambioUnidad.uidUnidadNueva = uidUnidad
        },


        // Unidades
        async agregarUnidad () {
            try {
                this.processing.value = true
                this.processing.message = 'Creando unidad. Favor esperar.'

                const nombreUnidad = `Unidad ${this.datosUnidades.length+1}`

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { 
                    datosUnidad: { nombreUnidad }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const respuesta = await this.$axios.$post(`/serviceCursoBorrador/miembro/unidad/crear/${uidCurso}`, body, config)

                this.datosUnidades.push({
                    ...respuesta.resultado,
                    auxiliares: {
                        nombreUnidadActual: respuesta.resultado.nombreUnidad,
                        vistaClases: false,
                        estadoListaClases: 'sin-cargar',
                        procesosContenidoPorClase: []
                    },
                    datosClases: []
                })

                this.datosUnidades.sort((a, b) => a.ordenUnidad - b.ordenUnidad)
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        },
        async actualizarUnidad (uidUnidad = '', nombreUnidad = '') {
            try {
                this.processing.value = true
                this.processing.message = 'Actualizando el nombre de la unidad. Favor esperar.'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { 
                    datosUnidad: { nombreUnidad }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/unidad/actualizar/${uidCurso}/${uidUnidad}`, body, config)
                
                const datoUnidad = this.datosUnidades.find(datoUnidad => datoUnidad.uid === uidUnidad)
                datoUnidad.nombreUnidad = nombreUnidad
                datoUnidad.auxiliares.nombreUnidadActual = nombreUnidad

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        },
        async actualizacionOrdenUnidad () {
            const datosUnidad = {}
            for (let i = 0; i < this.datosUnidades.length; i++) {
                const datoUnidad = this.datosUnidades[i]
                this.datosUnidades[i].ordenUnidad = i+1
                datosUnidad[datoUnidad.uid] = { ordenUnidad: i+1 }
            }

            this.datosUnidades.sort((a, b) => a.ordenUnidad - b.ordenUnidad)

            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { datosUnidad }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/unidad/actualizarOrden/${uidCurso}`, body, config)

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        },
        async eliminarUnidad () {
            try {
                this.processing.value = true
                this.processing.message = 'Eliminando la unidad. Favor esperar.'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const uidUnidad = this.verificarEliminacionElemento.uidVerificacion
                const respuesta = await this.$axios.$delete(`/serviceCursoBorrador/miembro/unidad/eliminar/${uidCurso}/${uidUnidad}`, config)

                const index = this.datosUnidades.findIndex(datoUnidad => datoUnidad.uid === uidUnidad)

                // Eliminación de la unidad eliminada y reordenación del resto de unidades
                this.datosUnidades.splice(index, 1)

                for (let i = 0; i < this.datosUnidades.length; i++) 
                    if (i >= index) --this.datosUnidades[i].ordenUnidad

                this.datosUnidades.sort((a, b) => a.ordenUnidad - b.ordenUnidad)

                // Quitar dialog
                this.verificarEliminacionElemento.value = false
                this.verificarEliminacionElemento.uid = ''
                this.verificarEliminacionElemento.uidVerificacion = ''
                this.verificarEliminacionElemento.tipo = ''
                this.verificarEliminacionElemento.uidUnidadAux = ''

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        },
        async verVistaClases(uidUnidad = '') {
            const index = this.datosUnidades.findIndex(unidad => unidad.uid === uidUnidad)
            this.datosUnidades[index].auxiliares.vistaClases = true
            
            if (this.datosUnidades[index].auxiliares.estadoListaClases === 'sin-cargar') {
                this.datosUnidades[index].auxiliares.estadoListaClases = 'cargando'
                
                const snapshotClases = await fb.firestore()
                .collection('CursosBorrador').doc(this.uidCursoProp)
                .collection('UnidadesBorrador').doc(uidUnidad)
                .collection('ClasesBorrador')
                .orderBy('ordenClase')
                .get()

                for (let i = 0; i < snapshotClases.docs.length; i++) {
                    const doc = snapshotClases.docs[i]

                    // Agregar clase a la unidad
                    this.datosUnidades[index].datosClases.push({
                        ...doc.data(),
                        auxiliares: { 
                            estadoContenido: '',
                            porcentajeSubida: 0,
                            mostrarContenido: false
                        },
                        datosContenido: null,
                        valorContenido: ''
                    })
                
                    this.generarSuscripcionOnSnapshotClaseContenido(uidUnidad, doc.id)
                }

                this.datosUnidades[index].datosClases.sort((a, b) => a.ordenClase - b.ordenClase)

                this.datosUnidades[index].auxiliares.estadoListaClases = 'cargado'
            }
        },
        quitarVistaClases (uidUnidad = '') {
            const index = this.datosUnidades.findIndex(unidad => unidad.uid === uidUnidad)
            this.datosUnidades[index].auxiliares.vistaClases = false
        },
        mostrarErroresUnidad (uid) {
            const index = this.datosUnidades.findIndex(datoUnidad => datoUnidad.uid === uid)
            const mensajesError = this.datosUnidades[index].mensajesError

            this.estadoMensajesErrores.value = true
            this.estadoMensajesErrores.mensajesError = mensajesError
        },


        // Clases
        async generarSuscripcionOnSnapshotClaseContenido (uidUnidad = '', uidClase = '') {
            
            // Referencias a clase y contenido
            const refClase = fb.firestore()
                .collection('CursosBorrador').doc(this.uidCursoProp)
                .collection('UnidadesBorrador').doc(uidUnidad)
                .collection('ClasesBorrador').doc(uidClase)

            const refContenido = fb.firestore()
                .collection('CursosBorrador').doc(this.uidCursoProp)
                .collection('ContenidoClasesBorrador').doc(uidClase)
            
            // Generar el onSnapshot (clases)
            const unsubscribe1 = refClase.onSnapshot(snapshot => {
                
                if (snapshot.exists) {
                    const index = this.datosUnidades.findIndex(unidad => unidad.uid === uidUnidad)
                    const index2 = this.datosUnidades[index].datosClases.findIndex(datoClase => datoClase.uid === snapshot.id)

                    if (index2 !== -1) {
                        this.datosUnidades[index].datosClases[index2].uid = snapshot.data().uid
                        this.datosUnidades[index].datosClases[index2].ordenClase = snapshot.data().ordenClase
                        this.datosUnidades[index].datosClases[index2].contribuyentes = snapshot.data().contribuyentes
                        this.datosUnidades[index].datosClases[index2].titulo = snapshot.data().titulo
                        this.datosUnidades[index].datosClases[index2].descripcion = snapshot.data().descripcion
                        this.datosUnidades[index].datosClases[index2].duracion = snapshot.data().duracion
                        this.datosUnidades[index].datosClases[index2].tipoClase = snapshot.data().tipoClase
                        this.datosUnidades[index].datosClases[index2].complementos = snapshot.data().complementos
                        this.datosUnidades[index].datosClases[index2].subtitulos = snapshot.data().subtitulos
                        this.datosUnidades[index].datosClases[index2].vistaPrevia = snapshot.data().vistaPrevia
                        this.datosUnidades[index].datosClases[index2].mensajesError = snapshot.data().mensajesError
                        this.datosUnidades[index].datosClases[index2].contieneErrores = snapshot.data().contieneErrores
                        this.datosUnidades[index].datosClases[index2].estadoDocumento = snapshot.data().estadoDocumento

                        this.datosUnidades[index].datosClases.sort((a, b) => a.ordenClase - b.ordenClase)
                    }
                    
                }
            })

            // Guardar el unsubscribe (clases)
            this.unsubscribe.clases.push({
                uid: uidClase,
                unsubscribe: unsubscribe1
            })


            
            // Generar el onSnapshot (contenido)
            const unsubscribe2 = refContenido.onSnapshot(async snapshot => {
                
                const uidCurso = this.uidCursoProp
                const index = this.datosUnidades.findIndex(unidad => unidad.uid === uidUnidad)

                if (snapshot.exists) {
                    const index2 = this.datosUnidades[index].datosClases.findIndex(datoClase => datoClase.uid === snapshot.id)

                    // Obtencion de datos
                    const datosClase = this.datosUnidades[index].datosClases[index2]
                    const datosContenidoAnterior = datosClase.datosContenido ? 
                    JSON.parse( JSON.stringify( datosClase.datosContenido ) ) : null

                    // Asignacion de datos
                    datosClase.datosContenido = snapshot.data()
                    datosClase.auxiliares.estadoContenido = snapshot.data().estadoContenido
                    datosClase.auxiliares.porcentajeSubida = 0

                    if (snapshot.data().estadoContenido === '') {
                        const indexClase = this.datosUnidades[index].auxiliares.procesosContenidoPorClase.findIndex(element => element === snapshot.id)
                        if (indexClase !== -1) this.datosUnidades[index].auxiliares.procesosContenidoPorClase.splice(indexClase, 1)
                    }

                    // Primera vez que se ve el contenido o si hay un cambio de contenido
                    const noSeEstaProcesando = snapshot.data().estadoContenido === ''

                    // Si no se esta procesando un contenido y la clase tiene contenido en cloud storage
                    if ( noSeEstaProcesando && snapshot.data().tipoContenido ) {
                        if ( !datosContenidoAnterior || !datosContenidoAnterior.tipoContenido || datosContenidoAnterior.fechaSubida.seconds !== snapshot.data().fechaSubida.seconds ) {
                            datosClase.valorContenido = ''

                            let token = this.$firebase.auth().currentUser
                            token = token ? await token.getIdToken() : ''
                            await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                            let config = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            }
                            
                            if (snapshot.data().tipoContenido === 'video') {
                                this.$axios.$get(`/serviceCursoBorrador/miembro/contenidoClase/obtenerVideo/${uidCurso}/${snapshot.id}`, config)
                                .then(async respuesta => {
                                    datosClase.valorContenido = {
                                        autoplay: false,
                                        controls: true,
                                        sources: [
                                            {
                                                src: respuesta.resultado,
                                                type: snapshot.data().mimeType
                                            }
                                        ]
                                    }
                                })
                                .catch(error => {
                                    console.log('error video', error)
                                })

                            } else if (snapshot.data().tipoContenido === 'articulo') {
                                this.$axios.$get(`/serviceCursoBorrador/miembro/contenidoClase/obtenerArticulo/${uidCurso}/${snapshot.id}`, config)
                                .then(respuesta => {
                                    datosClase.valorContenido = respuesta.resultado
                                })
                                .catch(error => {
                                    console.log('error articulo', error)
                                })

                            } else if (snapshot.data().tipoContenido === 'video-youtube') {
                                datosClase.valorContenido = {
                                    duracion: snapshot.data().duracion,
                                    codigoVideoYoutube: snapshot.data().codigoVideoYoutube,
                                }
                            }
                        }

                    }
                    
                }

            })

            // Guardar el unsubscribe (contenido)
            this.unsubscribe.contenidos.push({
                uid: uidClase,
                unsubscribe: unsubscribe2
            })
        },
        async agregarClase (uidUnidad) {
            try {
                this.processing.value = true
                this.processing.message = 'Creando clase. Favor esperar.'

                const datoUnidad = this.datosUnidades.find(unidad => unidad.uid === uidUnidad)

                const nombreClase = `Clase ${datoUnidad.datosClases.length+1}`

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { 
                    datosClase: { titulo: nombreClase }
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const respuesta = await this.$axios.$post(`/serviceCursoBorrador/miembro/clase/crear/${uidCurso}/${uidUnidad}`, body, config)

                // Agregar clase a la unidad
                datoUnidad.datosClases.push({
                    ...respuesta.resultado.claseBorrador,
                    auxiliares: { 
                        estadoContenido: '',
                        porcentajeSubida: 0,
                        mostrarContenido: false
                    },
                    datosContenido: respuesta.resultado.contenidoClaseBorrador,
                    valorContenido: ''
                })

                const indexUnidad = this.datosUnidades.findIndex(unidad => unidad.uid === uidUnidad)
                this.datosUnidades[indexUnidad].datosClases.sort((a, b) => a.ordenClase - b.ordenClase)

                this.generarSuscripcionOnSnapshotClaseContenido(uidUnidad, respuesta.resultado.claseBorrador.uid)
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        },
        async actualizarClase () {
            try {
                const uidCurso = this.uidCursoProp
                const uidUnidad = this.dialogActualizacionClase.uidUnidad
                const uidClase = this.dialogActualizacionClase.uidClase
                const titulo = this.dialogActualizacionClase.titulo
                const descripcion = this.dialogActualizacionClase.descripcion
                const vistaPrevia = this.dialogActualizacionClase.vistaPrevia
                const datosClase = {}

                titulo !== this.dialogActualizacionClase.tituloActual ?
                datosClase.titulo = titulo : ''

                descripcion !== this.dialogActualizacionClase.descripcionActual ?
                datosClase.descripcion = descripcion : ''

                vistaPrevia !== this.dialogActualizacionClase.vistaPreviaActual ?
                datosClase.vistaPrevia = vistaPrevia : ''

                this.processing.value = true
                this.processing.message = 'Actualizando el clase. Favor esperar.'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { datosClase }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/clase/actualizar/${uidCurso}/${uidUnidad}/${uidClase}`, body, config)

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.dialogActualizacionClase.value = false
                this.processing.value = false
                this.processing.message = ''
            }
        },
        async actualizacionOrdenClase (uidUnidad) {
            const datosClase = {}

            const datoUnidad = this.datosUnidades.find(datoUnidad => datoUnidad.uid === uidUnidad)

            for (let i = 0; i < datoUnidad.datosClases.length; i++) {
                const datoClase = datoUnidad.datosClases[i]
                datoClase.ordenClase = i+1
                datosClase[datoClase.uid] = { ordenClase: i+1 }
            }

            datoUnidad.datosClases.sort((a, b) => a.ordenClase - b.ordenClase)

            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { datosClase }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/clase/actualizarOrden/${uidCurso}/${uidUnidad}`, body, config)

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            }
        },
        async cambiarUnidadDeClase () {
            try {
                console.time('jessi')

                this.processing.value = true
                this.processing.message = 'Cambiando unidad. Favor esperar.'

                const uidCurso = this.uidCursoProp
                const uidUnidad = this.dialogClaseCambioUnidad.uidUnidad
                const uidClase = this.dialogClaseCambioUnidad.uidClase
                const uidUnidadNueva = this.dialogClaseCambioUnidad.uidUnidadNueva

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { uidUnidadNueva }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/clase/cambiarUnidad/${uidCurso}/${uidUnidad}/${uidClase}`, body, config)

                // Eliminar clase de la unidad vieja
                const datoUnidadVieja = this.datosUnidades.find(unidad => unidad.uid === uidUnidad)
                const datoClaseVieja = datoUnidadVieja.datosClases.find(value => value.uid === uidClase)

                const indexClaseVieja = datoUnidadVieja.datosClases.findIndex(datoClase => datoClase.uid === uidClase)
                datoUnidadVieja.datosClases.splice(indexClaseVieja, 1)

                for (let i = 0; i < datoUnidadVieja.datosClases.length; i++) 
                    if (i >= indexClaseVieja) --datoUnidadVieja.datosClases[i].ordenClase

                datoUnidadVieja.datosClases.sort((a, b) => a.ordenClase - b.ordenClase)

                const index1 = this.unsubscribe.clases.findIndex(uc => uc.uid === uidClase)
                this.unsubscribe.clases[index1].unsubscribe()
                this.unsubscribe.clases.splice(index1, 1)
                
                const index2 = this.unsubscribe.contenidos.findIndex(uc => uc.uid === uidClase)
                this.unsubscribe.contenidos[index2].unsubscribe()
                this.unsubscribe.contenidos.splice(index2, 1)

                // Agregar clase a la unidad nueva
                const datoUnidadNueva = this.datosUnidades.find(unidad => unidad.uid === uidUnidadNueva)

                if (datoUnidadNueva.auxiliares.estadoListaClases === 'cargado') {
                    datoUnidadNueva.datosClases.push({
                        ...respuesta.resultado,
                        auxiliares: { 
                            estadoContenido: '',
                            porcentajeSubida: 0,
                            mostrarContenido: false
                        },
                        datosContenido: datoClaseVieja.datosContenido,
                        valorContenido: datoClaseVieja.valorContenido
                    })

                    const indexUnidadNueva = this.datosUnidades.findIndex(unidad => unidad.uid === uidUnidadNueva)
                    this.datosUnidades[indexUnidadNueva].datosClases.sort((a, b) => a.ordenClase - b.ordenClase)

                    this.generarSuscripcionOnSnapshotClaseContenido(uidUnidadNueva, uidClase)
                }

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
                this.dialogClaseCambioUnidad.value = false
                console.timeEnd('jessi')
            }
        },
        async eliminarClase () {
            try {
                this.processing.value = true
                this.processing.message = 'Eliminando la clase. Favor esperar.'

                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const uidCurso = this.uidCursoProp
                const uidUnidad = this.verificarEliminacionElemento.uidUnidadAux
                const uidClase = this.verificarEliminacionElemento.uidVerificacion
                const respuesta = await this.$axios.$delete(`/serviceCursoBorrador/miembro/clase/eliminar/${uidCurso}/${uidUnidad}/${uidClase}`, config)

                const datoUnidad = this.datosUnidades.find(datoUnidad => datoUnidad.uid === uidUnidad)
                const index = datoUnidad.datosClases.findIndex(datoClase => datoClase.uid === uidClase)

                // Eliminación de la unidad eliminada y reordenación del resto de unidades
                datoUnidad.datosClases.splice(index, 1)

                for (let i = 0; i < datoUnidad.datosClases.length; i++) 
                    if (i >= index) --datoUnidad.datosClases[i].ordenClase

                datoUnidad.datosClases.sort((a, b) => a.ordenClase - b.ordenClase)

                const index1 = this.unsubscribe.clases.findIndex(uc => uc.uid === uidClase)
                this.unsubscribe.clases[index1].unsubscribe()
                this.unsubscribe.clases.splice(index1, 1)
                
                const index2 = this.unsubscribe.contenidos.findIndex(uc => uc.uid === uidClase)
                this.unsubscribe.contenidos[index2].unsubscribe()
                this.unsubscribe.contenidos.splice(index2, 1)

                // Quitar dialog
                this.verificarEliminacionElemento.value = false
                this.verificarEliminacionElemento.uid = ''
                this.verificarEliminacionElemento.uidVerificacion = ''
                this.verificarEliminacionElemento.tipo = ''
                this.verificarEliminacionElemento.uidUnidadAux = ''

            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
            } finally {
                this.processing.value = false
                this.processing.message = ''
            }
        },
        mostrarErroresClase (mensajesError) {
            this.estadoMensajesErrores.value = true
            this.estadoMensajesErrores.mensajesError = mensajesError
        },
        async subirVideoClase(data) {
            
            const { uidCurso, uidUnidad, uidClase, file, urlVideo } = data

            // Quitar dialog de subida archivo
            this.dialogSubirContenido.value = false

            // Cambiar estado de archivo a 'subiendo'
            const index = this.datosUnidades.findIndex(unidad => unidad.uid === data.uidUnidad)
            const index2 = this.datosUnidades[index].datosClases.findIndex(datoClase => datoClase.uid === data.uidClase)
            
            this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = 'subiendo'
            this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
            this.datosUnidades[index].auxiliares.procesosContenidoPorClase.push(uidClase)
            
            try {
                // Subir a firebase cloud storage
                const storageRef = this.$firebaseContenidoBV.storage().ref()
                const uploadTask = storageRef.child(`${uidCurso}/${uidClase}/${file.name}`).put(file)

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = progress
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                            break;
                            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                            break;
                        }
                    },
                    async (error) => {
                        console.log('error', error)
                        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
                        
                        this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = ''
                        this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
                        const indexClase = this.datosUnidades[index].auxiliares.procesosContenidoPorClase.findIndex(element => element === uidClase)
                        if (indexClase !== -1) this.datosUnidades[index].auxiliares.procesosContenidoPorClase.splice(indexClase, 1)

                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                            break;
                            case 'storage/canceled':
                                // User canceled the upload
                            break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            
                        })
                    }
                )
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = ''
                this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
                const indexClase = this.datosUnidades[index].auxiliares.procesosContenidoPorClase.findIndex(element => element === uidClase)
                if (indexClase !== -1) this.datosUnidades[index].auxiliares.procesosContenidoPorClase.splice(indexClase, 1)
            }
        },
        async subirArticuloClase (data) {
            console.log('data', data)
            const { uidCurso, uidUnidad, uidClase, articulo } = data

            // Quitar dialog de subida archivo
            this.dialogSubirContenido.value = false

            // Cambiar estado de archivo a 'subiendo'
            const index = this.datosUnidades.findIndex(unidad => unidad.uid === data.uidUnidad)
            const index2 = this.datosUnidades[index].datosClases.findIndex(datoClase => datoClase.uid === data.uidClase)
            
            this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = 'subiendo'
            this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
            this.datosUnidades[index].auxiliares.procesosContenidoPorClase.push(uidClase)

            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { articulo }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/contenidoClase/actualizarArticulo/${uidCurso}/${uidUnidad}/${uidClase}`, body, config)
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = ''
                this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
                const indexClase = this.datosUnidades[index].auxiliares.procesosContenidoPorClase.findIndex(element => element === uidClase)
                if (indexClase !== -1) this.datosUnidades[index].auxiliares.procesosContenidoPorClase.splice(indexClase, 1)

            } finally {

            }
        },
        async subirVideoYoutubeClase (data) {
            console.log('data', data)
            const { uidCurso, uidUnidad, uidClase, duracion, codigoVideoYoutube } = data

            // Quitar dialog de subida archivo
            this.dialogSubirContenido.value = false

            // Cambiar estado de archivo a 'subiendo'
            const index = this.datosUnidades.findIndex(unidad => unidad.uid === data.uidUnidad)
            const index2 = this.datosUnidades[index].datosClases.findIndex(datoClase => datoClase.uid === data.uidClase)
            
            this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = 'subiendo'
            this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
            this.datosUnidades[index].auxiliares.procesosContenidoPorClase.push(uidClase)

            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                let body = { duracion, codigoVideoYoutube }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await this.$axios.$put(`/serviceCursoBorrador/miembro/contenidoClase/actualizarVideoYoutube/${uidCurso}/${uidUnidad}/${uidClase}`, body, config)
                
            } catch (error) {
                console.log('error', error)
                const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)

                this.datosUnidades[index].datosClases[index2].auxiliares.estadoContenido = ''
                this.datosUnidades[index].datosClases[index2].auxiliares.porcentajeSubida = 0
                const indexClase = this.datosUnidades[index].auxiliares.procesosContenidoPorClase.findIndex(element => element === uidClase)
                if (indexClase !== -1) this.datosUnidades[index].auxiliares.procesosContenidoPorClase.splice(indexClase, 1)

            } finally {

            }
        }
    },
    computed: {
        
    },
    watch: {
        'verificarEliminacionElemento.value': function (n, v) {
            if (!n) {
                this.verificarEliminacionElemento.uid = ''
                this.verificarEliminacionElemento.uidVerificacion = ''
                this.verificarEliminacionElemento.tipo = ''
                this.verificarEliminacionElemento.uidUnidadAux = ''
            }
        },
        'estadoMensajesErrores.value': function (n, v) {
            if (!n) {
                this.estadoMensajesErrores.mensajesError = []
            }
        },
        'dialogActualizacionClase.value': function (n, v) {
            if (!n) {
                this.dialogActualizacionClase.uidUnidad = ''
                this.dialogActualizacionClase.uidClase = ''
                this.dialogActualizacionClase.titulo = ''
                this.dialogActualizacionClase.descripcion = ''
                this.dialogActualizacionClase.vistaPrevia = false
                this.dialogActualizacionClase.tituloActual = ''
                this.dialogActualizacionClase.descripcionActual = ''
                this.dialogActualizacionClase.vistaPreviaActual = false
                this.dialogActualizacionClase.ordenClase = -1
            }
        },
        'dialogClaseCambioUnidad.value': function (n, v) {
            if (!n) {
                this.dialogClaseCambioUnidad.uidUnidad = ''
                this.dialogClaseCambioUnidad.uidClase = ''
                this.dialogClaseCambioUnidad.uidUnidadNueva = ''
            }
        },
        'dialogSubirContenido.value': function (n, v) {
            if (!n) {
                this.dialogSubirContenido.tipo = ''
                this.dialogSubirContenido.uidCurso = ''
                this.dialogSubirContenido.uidUnidad = ''
                this.dialogSubirContenido.uidClase = ''
                this.dialogSubirContenido.contenido = null
                this.dialogSubirContenido.otrosDatos = null
            }
        },
    },
    mounted () {
        
    },
    async created() {
        const snapshot = await fb.firestore()
        .collection('CursosBorrador').doc(this.uidCursoProp)
        .collection('UnidadesBorrador').orderBy('ordenUnidad').get()
        
        for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i]
            
            this.datosUnidades.push({
                ...doc.data(),
                auxiliares: {
                    nombreUnidadActual: doc.data().nombreUnidad,
                    vistaClases: false,
                    estadoListaClases: 'sin-cargar',
                    procesosContenidoPorClase: []
                },
                datosClases: []
            })
        }

        this.datosUnidades.sort((a, b) => a.ordenUnidad - b.ordenUnidad)
        
        this.unsubscribe.clases = []
        this.unsubscribe.contenidos = []

    },
    beforeDestroy () {
        
    },
    destroyed() {
        for (let i = 0; i < this.unsubscribe.clases.length; i++) {
            const element = this.unsubscribe.clases[i]
            element.unsubscribe()
        }

        for (let i = 0; i < this.unsubscribe.contenidos.length; i++) {
            const element = this.unsubscribe.contenidos[i]
            element.unsubscribe()
        }
    }
}
</script>

<style scoped>
.horizontal_slider {
    display: block;
    width: 100%;
    overflow-x: auto;
}

.slider_container {
    display: block;
    white-space: nowrap;
    margin-bottom: 5px;
    padding: 10px;
}

.item-btn-move-handle {
    background-color: #683bce;
    margin-right: 10px;
    transition: 500ms;
}

.item-btn-move-handle:hover {
    cursor: pointer;
    background-color: #b291fe;
    transition: 500ms;
}

#create .v-speed-dial {
    position: fixed;
}

#create .v-btn--floating {
    position: relative;
}

.btn-action {
    margin: 0 10px 0 20px;
}

.my-icon {
    font-size: 35px;
}

.contenedor_hijo1 {
    height: 190px;
}

.contenedor_hijo1_contenido {
    margin-top: -25px;
}

.botones_accion_2 {
    margin-top: 35px;
}

.botones_accion_2 {
    display: none;
}

.cantidadErroresUnidad {
    cursor: pointer;
}

.informacionUnidadTexto {
    font-size: 15px;
}

.btnActionClases {
    /* margin-top: -20px; */
}



.contenedor_contenido_video video {
    width: 450px;
}

@media (max-width: 595.99px) {
    .contenedor_contenido_video video {
        width: 350px;
    }
}

@media (max-width: 493.99px) {
    .contenedor_contenido_video video {
        width: 270px;
    }
}

@media (max-width: 411.99px) {
    .contenedor_contenido_video video {
        width: 250px;
    }
}

@media (max-width: 391.99px) {
    .contenedor_contenido_video video {
        width: 210px;
    }
}


@media (max-width: 1263.99px) {
    .contenedor_contenido_articulo {

    }

    .contenedor_descripcion_articulo {
        text-align: center;
        margin-top: 30px;
    }
    
    .contenedor_contenido_video {
        text-align: center;
    }
    
    .contenedor_descripcion_video {
        text-align: center;
        margin-top: 30px;
    }
}

@media (max-width: 484px) {
    .btnActionClases {
        width: 100%;
        margin-bottom: 5px;
    }

    .contenedor_hijo1 {
        height: 190px;
    }

    .botones_accion_1 {
        display: none;
    }

    .botones_accion_2 {
        display: block;
    }

    .contenedor_hijo1_contenido {
        margin-top: -25px;
    }
}

</style>