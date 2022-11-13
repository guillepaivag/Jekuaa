<template>
    <div class="container">
        <div class="text-center" v-if="cargando">
            <v-progress-circular
                indeterminate
                color="green"
                class="mt-15"
            ></v-progress-circular>
        </div>
        <div v-else>
            <v-simple-table class="mt-5">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Nombre
                            </th>
                            <th class="text-left">
                                Tipo
                            </th>
                            <th class="text-left">
                                Fecha compra
                            </th>
                            <th class="text-left">
                                Precio total
                            </th>
                            <th class="text-left">
                                Tipo pago
                            </th>
                            <th class="text-left">
                                Cantidad reembolsado
                            </th>
                            <th class="text-left">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(pedido, index) in pedidos" :key="index"
                        >
                            <td>
                                <div v-if="pedido.cantidadTotalItems === 1">
                                    <div v-if="pedido.detallesItems[0].tipoItem === 'curso'">
                                        {{ pedido.detallesItems[0].informacion.titulo }}
                                    </div>
                                </div>
                                <div v-else>
                                    Varios
                                </div>
                            </td>
                            <td>
                                <div v-if="pedido.cantidadTotalItems === 1">
                                    <div v-if="pedido.detallesItems[0].tipoItem === 'curso'">
                                        Curso
                                    </div>
                                </div>
                                <div v-else>
                                    Varios
                                </div>
                            </td>
                            <td>{{ getFecha(pedido.fechaCompra.seconds) }}</td>
                            <td>{{ pedido.costoTotal }}</td>
                            <td>{{ getFormaDePago(pedido.formaDePago) }}</td>
                            <td>
                                {{ pedido.cantidadReembolsado }} / {{pedido.cantidadTotalItems}}
                            </td>
                            <td>
                                <v-btn
                                    fab
                                    outlined
                                    text
                                    color="green"
                                    class="white--text my-1 mr-1"
                                    v-on:click="abrirDialog(pedido.uid)"
                                    title="Detalles"
                                >
                                    <v-icon dark>
                                        mdi-eye-outline
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <div class="text-center mt-7">
                <v-btn
                    :loading="cargandoPedidos"
                    v-if="existeMas"
                    outlined
                    text
                    color="green"
                    v-on:click="paginar"
                >
                    <v-icon left>
                        mdi-plus
                    </v-icon>
                    Cargar más
                </v-btn>
            </div>
        </div>

        <v-dialog
            v-model="dialogPedido"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            
            <v-card v-if="dataDialogPedido">
                <v-toolbar
                    dark
                    color="green"
                >
                    <v-btn
                        icon
                        dark
                        @click="dialogPedido = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                        Detalles del pedido: {{dataDialogPedido.uid}}
                    </v-toolbar-title>
                </v-toolbar>
                
                <div class="pt-5 px-5">
                    
                    <v-row>
                        <v-col class="text-center" cols="12" md="3">
                            <div class="mb-7">
                                <h2>Forma de pago</h2>
                                <v-divider></v-divider>
                                <p style="display: inline;">
                                    {{ getFormaDePago(dataDialogPedido.formaDePago) }}
                                </p>
                            </div>

                            <div class="mb-7">
                                <h2>Fecha del pedido</h2>
                                <v-divider></v-divider>
                                <p style="display: inline;">
                                    {{ getFecha(dataDialogPedido.fechaPedido.seconds) }}
                                </p>
                            </div>
                            
                            <div class="mb-7">
                                <h2>Fecha de la compra</h2>
                                <v-divider></v-divider>
                                <p style="display: inline;">
                                    {{ getFecha(dataDialogPedido.fechaCompra.seconds) }}
                                </p>
                            </div>

                            <div class="mb-7">
                                <h2>Costo total</h2>
                                <v-divider></v-divider>
                                <p style="display: inline;">
                                    {{ dataDialogPedido.costoTotal }} JP
                                </p>
                            </div>

                            <div class="mb-7">
                                <h2>Paquetes de items</h2>
                                <v-divider></v-divider>
                                <p style="display: inline;">
                                    {{ dataDialogPedido.cantidadPaquetesDeItems }}
                                </p>
                            </div>

                            <div class="mb-7">
                                <h2>Reembolsos / Items</h2>
                                <v-divider></v-divider>
                                <p style="display: inline;">
                                    {{ dataDialogPedido.cantidadReembolsado }} / {{ dataDialogPedido.cantidadTotalItems }}
                                </p>
                            </div>
                        </v-col>

                        <v-divider vertical></v-divider>

                        <v-col cols="12" md="9">
                            <v-card
                                v-for="(detallesItem, index) in dataDialogPedido.detallesItems" :key="index"
                                class="mx-auto pb-2"
                                :class="vistaReembolso[index] && !esObtencionUnica(detallesItem.tipoItem) ? 'pb-15' : ''"
                                max-width="600"
                            >
                                <v-card-text>
                                
                                    <div v-if="detallesItem.tipoItem === 'curso'">
                                        <p style="display: inline;">
                                            Curso {{ detallesItem.uid }}
                                        </p>
                                        <p class="text-h4 text--primary">
                                            {{ detallesItem.informacion.titulo }}
                                        </p>
                                    </div>

                                    <p> Cantidad de items: {{ detallesItem.cantidad }} </p>
                                    
                                    <p v-if="detallesItem.porcentajeDescuento" class="text--primary" style="display: inline;">
                                        <b>Costo unitario:</b> 
                                            <span>{{ detallesItem.precioUnitario }} JP</span> 
                                            <span class="text-decoration-line-through">{{ detallesItem.precioUnitarioOriginal }} JP</span> 
                                        
                                        <b class="ml-3">Costo total:</b> 
                                            <span>{{ detallesItem.precioTotal }} JP</span>
                                    </p>
                                    <p v-else class="text--primary" style="display: inline;">
                                        <b>Costo unitario:</b>
                                            <span>{{ detallesItem.precioUnitarioOriginal }} JP</span>

                                        <b class="ml-3">Costo total:</b>
                                            <span>{{ detallesItem.precioTotal }} JP</span>
                                    </p>
                                
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        class="white--text"
                                        color="green accent-4"
                                        :to="generateLinkProducto(detallesItem.tipoItem, detallesItem)"
                                    >
                                        Ver producto
                                    </v-btn>
                                    <v-btn
                                        readonly
                                        v-if="detallesItem.todoReembolsado"
                                        text
                                        color="accent-4"
                                    >
                                        Reembolsado 💔
                                    </v-btn>
                                    <v-btn
                                        v-else-if="esValidoReembolsar()"
                                        text
                                        color="red accent-4"
                                        @click="cambiarVistaReembolso(index, true)"
                                    >
                                        Reembolsar 😔
                                    </v-btn>
                                </v-card-actions>

                                <v-expand-transition>
                                <v-card
                                    v-if="vistaReembolso[index]"
                                    class="transition-fast-in-fast-out v-card--reveal"
                                    style="height: 100%;"
                                >
                                    <v-card-text style="margin-bottom: -20px;">
                                        <!-- Solo tendras acceso al contenido gratis, tu progreso se mantiene y te devolvemos tus JP. -->
                                        <nuxt-link to="">
                                            <p class="text-h6 text--primary">
                                                ¿Qué ocurre si reembolso este producto?
                                            </p>
                                        </nuxt-link>
                                    </v-card-text>

                                    <div class="container textFieldReembolso">
                                        <v-text-field
                                            v-model="quieroReembolsar[index]"
                                            :label="`Escribe: Quiero reembolsar`"
                                        ></v-text-field>
                                        <v-text-field
                                            v-if="!esObtencionUnica(detallesItem.tipoItem)"
                                            v-model="cantidadAReembolsar[index]"
                                            type="number"
                                            min="1"
                                            :max="detallesItem.cantidad-detallesItem.cantidadReembolsado"
                                            :label="`Puedes reembolsar ${detallesItem.cantidad-detallesItem.cantidadReembolsado} item/s`"
                                        ></v-text-field>
                                    </div>

                                    <v-card-actions class="pt-0">
                                        <v-btn
                                            :loading="procesandoReembolso[index]"
                                            :disabled="quieroReembolsar[index] !== 'Quiero reembolsar'"
                                            text
                                            color="red accent-4"
                                            @click="reembolsar(index)"
                                        >
                                            Si, quiero reembolsar
                                        </v-btn>
                                        <v-btn
                                            class="white--text"
                                            color="green"
                                            @click="cambiarVistaReembolso(index, false)"
                                        >
                                            Volver 😇
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                    </v-row>
                    
                </div>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { fb } from '~/plugins/firebase'
const db = fb.firestore()
import { tiposObtencionUnica } from '@/helpers/tiposDeObtencionPorProducto'

export default {
    name: '',
    middleware: 'accesoAutenticado',
    data() {
        return {
            cargando: true,
            pedidos: [],
            ultimoDoc: null,
            existeMas: false,
            dialogPedido: false,
            dataDialogPedido: null,
            vistaReembolso: [],
            cantidadAReembolsar: [],
            quieroReembolsar: [],
            procesandoReembolso: [],
            cantidadAMostrar: 5,
            cargandoPedidos: false,
        }
    },
    methods: {
        getFecha (seconds) {
            let d = new Date(seconds*1000)
            return d.toLocaleString()
        },
        getFormaDePago(formaDePago) {
            if (formaDePago === 'points') return 'Points'
            else return ''
        },
        generateLinkProducto (tipoItem, detallesItem) {
            if (tipoItem === 'curso') return `/curso/${detallesItem.informacion.codigo}`
        },
        cambiarVistaReembolso(indexDetallesItems, reembolsar) {
            let aux = JSON.parse( JSON.stringify( this.vistaReembolso ) )
            aux[indexDetallesItems] = reembolsar
            this.vistaReembolso = aux
        },
        esValidoReembolsar () {
            const diasValidos = 60 * 60 * 24 * 1000 * 30
            const fechaCompra = this.dataDialogPedido.fechaCompra.seconds*1000

            return Date.now() <= fechaCompra+diasValidos
        },
        async reembolsar (index) {

            let procesandoReembolso = JSON.parse( JSON.stringify( this.procesandoReembolso ) )
            procesandoReembolso[index] = true
            this.procesandoReembolso = procesandoReembolso

            try {
                let token = this.$firebase.auth().currentUser
                token = token ? await token.getIdToken() : ''
                await this.$store.dispatch('modules/usuarios/setTOKEN', token)

                const uidPedido = this.dataDialogPedido.uid
                const uidItem = this.dataDialogPedido.detallesItems[index].uidItem
                const tipoItem = this.dataDialogPedido.detallesItems[index].tipoItem
                const cantidad = this.cantidadAReembolsar[index]

                let body = {
                    listaItems: [ { tipoItem, uidItem, cantidad } ]
                }

                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const { resultado } = await this.$axios.$put(`/servicePedido/producto/reembolsar/${uidPedido}`, body, config)

                // Actualizar detalles del item: cantidadReembolsado, tieneAlgunReembolso, todoReembolsado
                const cantidadReembolsado = this.dataDialogPedido.detallesItems[index].cantidadReembolsado + cantidad
                this.dataDialogPedido.detallesItems[index].cantidadReembolsado = cantidadReembolsado
                this.dataDialogPedido.detallesItems[index].tieneAlgunReembolso = true
                this.dataDialogPedido.detallesItems[index].todoReembolsado = this.dataDialogPedido.detallesItems[index].cantidad === cantidadReembolsado

                // Actualizar pedido: cantidadReembolsado, todoReembolsado, tieneAlgunReembolso
                const pedido = this.pedidos.find(v => v.uid === this.dataDialogPedido.uid)
                pedido.cantidadReembolsado += cantidad
                if (pedido.cantidadTotalItems === pedido.cantidadReembolsado) pedido.todoReembolsado = true
                pedido.tieneAlgunReembolso = true

                // Devolver points al usuario
                this.$store.state.modules.usuarios.point += this.dataDialogPedido.detallesItems[index].precioTotal
                
                // Actualizar item como reembolsados
                this.dataDialogPedido.detallesItems[index].fechaReembolsado = {
                    nanoseconds: resultado._nanoseconds,
                    seconds: resultado._seconds,
                }

            } catch (error) {
                console.log('error', error)
                // const accion = await this.$store.dispatch('modules/sistema/errorHandler', error)
                const responseError = error.response.data

                if (responseError.mensajeCliente === 'no_se_puede_reembolsar') {
                    // Ya tienes 50% del curso realizado.
                }

            } finally {
                procesandoReembolso[index] = false
                this.procesandoReembolso = procesandoReembolso

                // Quitar vista
                this.cambiarVistaReembolso(index, false)
            }

        },
        async inicializarLista () {
            this.cargando = true
            this.cargandoPedidos = true

            const uid = this.$store.state.modules.usuarios.uid
            const snapshotPedidos = await db.collection('Usuarios').doc(uid)
            .collection('PedidosProductos')
            .where('estado', '==', 'completado')
            .orderBy('fechaCompra', 'desc')
            .limit(this.cantidadAMostrar)
            .get()

            if (snapshotPedidos.empty) {
                this.existeMas = false
                this.cargando = false
                return
            }

            this.ultimoDoc = snapshotPedidos.docs[snapshotPedidos.docs.length-1]

            for (const docPedido of snapshotPedidos.docs) {
                const pedido = docPedido.data()
                pedido.detallesItems = []

                const snapshotDetallesItems = await db.collection('Usuarios').doc(uid)
                    .collection('PedidosProductos').doc(docPedido.id)
                    .collection('DetallesItemsProducto')
                    .get()

                let j = 0
                for (const docDetallesItem of snapshotDetallesItems.docs) {
                    const dataDetallesItem = docDetallesItem.data()
                    pedido.detallesItems.push(dataDetallesItem)
                    
                    if (dataDetallesItem.tipoItem === 'curso') {
                        const docCurso = await db.collection('CursosPublicado').doc(dataDetallesItem.uidItem).get()
                        pedido.detallesItems[j].informacion = docCurso.data()
                    }

                    j++
                }

                this.pedidos.push(pedido)
            }

            this.existeMas = await this.verificarSiExisteMas()

            this.cargando = false
            this.cargandoPedidos = false
        },
        async paginar () {
            this.cargandoPedidos = true

            const uid = this.$store.state.modules.usuarios.uid
            const snapshotPedidos = await db.collection('Usuarios').doc(uid)
            .collection('PedidosProductos')
            .where('estado', '==', 'completado')
            .orderBy('fechaCompra', 'desc')
            .startAfter(this.ultimoDoc)
            .limit(this.cantidadAMostrar)
            .get()

            this.ultimoDoc = snapshotPedidos.docs[snapshotPedidos.docs.length-1]

            for (const docPedido of snapshotPedidos.docs) {
                const pedido = docPedido.data()
                pedido.detallesItems = []

                const snapshotDetallesItems = await db.collection('Usuarios').doc(uid)
                .collection('PedidosProductos').doc(docPedido.id)
                .collection('DetallesItemsProducto')
                .get()

                let j = 0
                for (const docDetallesItem of snapshotDetallesItems.docs) {
                    const dataDetallesItem = docDetallesItem.data()
                    pedido.detallesItems.push(dataDetallesItem)
                    
                    if (dataDetallesItem.tipoItem === 'curso') {
                        const docCurso = await db.collection('CursosPublicado').doc(dataDetallesItem.uidItem).get()
                        pedido.detallesItems[j].informacion = docCurso.data()
                    }

                    j++
                }

                this.pedidos.push(pedido)
            }

            this.existeMas = await this.verificarSiExisteMas()
            
            this.cargandoPedidos = false
        },
        async verificarSiExisteMas () {
            const uid = this.$store.state.modules.usuarios.uid
            const snapshotPedidos = await db.collection('Usuarios').doc(uid)
            .collection('PedidosProductos')
            .where('estado', '==', 'completado')
            .orderBy('fechaCompra', 'desc')
            .startAfter(this.ultimoDoc)
            .limit(1)
            .get()

            return !snapshotPedidos.empty
        },
        async abrirDialog (uidPedido) {
            const pedido = this.pedidos.find(v => v.uid === uidPedido)
            
            this.dataDialogPedido = pedido
            this.vistaReembolso = Array(this.dataDialogPedido.detallesItems.length).fill(false)
            this.cantidadAReembolsar = Array(this.dataDialogPedido.detallesItems.length).fill(1)
            this.quieroReembolsar = Array(this.dataDialogPedido.detallesItems.length).fill('')
            this.procesandoReembolso = Array(this.dataDialogPedido.detallesItems.length).fill(false)
            this.dialogPedido = true
        },
        esObtencionUnica (tipoProducto) {
            return tiposObtencionUnica.includes(tipoProducto)
        },
    },
    watch: {
        dialogPedido: function (n, v) {
            if (!this.dialogPedido) this.dataDialogPedido = null
        },
    },
    async created() {
        await this.inicializarLista()
    },
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

@media (max-width: 454px) {
    .textFieldReembolso {
        margin-top: -20px;
    }
}
</style>