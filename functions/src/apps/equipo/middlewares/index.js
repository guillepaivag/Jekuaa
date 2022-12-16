const { request, response } = require("express")
const db = require("../../../../db")
const Errores = require("../../../models/Error/Errores")
const esCodigo = require("../../../utils/esCodigo")
const timestamp = require("../../../utils/timestamp")

const middlewares = {}

middlewares.validacionEquipo = async (req = request, res = response, next) => {
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const {
            codigo,
            nombre,
            descripcion,
            responsable,
        } = body

        if (!codigo || !nombre || !descripcion || !responsable) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'campos_faltantes',
                mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion y responsable',
            })
        }

        if (typeof codigo !== 'string' || typeof nombre !== 'string'
            || typeof descripcion !== 'string' || typeof responsable !== 'string') {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'tipos_invalidos',
                mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion y responsable deben ser string',
            })
        }

        // Codigo
        if (codigo.trim().length < 5) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'codigo_error',
                mensajeServidor: 'El codigo debe ser mayor o igual a 5.',
            })
        }

        if (codigo.trim().length > 60) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'codigo_error',
                mensajeServidor: 'El codigo debe ser menor o igual a 60.',
            })
        }

        if (!esCodigo(codigo.trim())) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'codigo_error',
                mensajeServidor: 'El codigo solo se acepta: a-z A-Z 0-9 -',
            })
        }

        // Nombre
        if (nombre.trim().length < 5) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'nombre_error',
                mensajeServidor: 'El nombre debe ser mayor o igual a 5.',
            })
        }

        if (nombre.trim().length > 60) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'nombre_error',
                mensajeServidor: 'El nombre debe ser menor o igual a 60.',
            })
        }

        // Descripcion
        if (descripcion.trim().length < 5) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'descripcion_error',
                mensajeServidor: 'La descripcion debe ser mayor o igual a 5.',
            })
        }

        if (descripcion.trim().length > 100) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'descripcion_error',
                mensajeServidor: 'La descripcion debe ser menor o igual a 100.',
            })
        }

        // responsable
        if (responsable.trim().length < 5) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'responsable_error',
                mensajeServidor: 'El responsable debe ser mayor o igual a 5.',
            })
        }

        if (responsable.trim().length > 100) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'responsable_error',
                mensajeServidor: 'El responsable debe ser menor o igual a 100.',
            })
        }

        // comprobamos que el codigo no exista
        const snapshotCodigo = await db.collection('Equipos')
            .where('codigo', '==', codigo)
            .get()

        if (snapshotCodigo.docs.length !== 0) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'codigo_existe',
                mensajeServidor: 'Ya existe un equipo con ese codigo',
            })
        }

        // comprobamos que el responsable exista
        const snapshotResponsable = await db.collection('Usuarios')
            .where('uid', '==', responsable)
            .get()

        if (snapshotResponsable.docs.length === 0) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'responsable_no_existe',
                mensajeServidor: 'No existe el responsable del equipo',
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.validacionEquipoActualizar = async (req = request, res = response, next) => {
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidEquipo } = params

        const {
            codigo,
            nombre,
            descripcion,
            responsable,
            verificado
        } = body

        let datosActualizados = {}

        // validamos que exista el equipo
        uidEquipo
        const docEquipo = await db.collection('Equipos')
            .doc(uidEquipo).get()

        if (!docEquipo.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'equipo_no_existe',
                mensajeServidor: 'El equipo no existe',
            })
        }

        if (docEquipo.data().eliminado) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'equipo_eliminado',
                mensajeServidor: 'El equipo ya fue eliminado',
            })
        }

        // Codigo
        if (codigo) {
            if (typeof codigo !== 'string') {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'tipos_invalidos',
                    mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion y responsable deben ser string',
                })
            }
            if (codigo.trim().length < 5) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'codigo_error',
                    mensajeServidor: 'El codigo debe ser mayor o igual a 5.',
                })
            }

            if (codigo.trim().length > 60) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'codigo_error',
                    mensajeServidor: 'El codigo debe ser menor o igual a 60.',
                })
            }

            if (!esCodigo(codigo.trim())) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'codigo_error',
                    mensajeServidor: 'El codigo solo se acepta: a-z A-Z 0-9 -',
                })
            }

            // comprobamos que el codigo no exista
            const snapshotCodigo = await db.collection('Equipos')
                .where('codigo', '==', codigo)
                .get()

            if (snapshotCodigo.docs.length !== 0) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'codigo_existe',
                    mensajeServidor: 'Ya existe un equipo con ese codigo',
                })
            }

            datosActualizados.codigo = codigo

        }

        if (nombre) {
            if (typeof nombre !== 'string') {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'tipos_invalidos',
                    mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion y responsable deben ser string',
                })
            }
            // Nombre
            if (nombre.trim().length < 5) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'nombre_error',
                    mensajeServidor: 'El nombre debe ser mayor o igual a 5.',
                })
            }

            if (nombre.trim().length > 60) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'nombre_error',
                    mensajeServidor: 'El nombre debe ser menor o igual a 60.',
                })
            }
            datosActualizados.nombre = nombre
        }

        if (descripcion) {
            // Descripcion
            if (typeof descripcion !== 'string') {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'tipos_invalidos',
                    mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion y responsable deben ser string',
                })
            }
            if (descripcion.trim().length < 5) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'descripcion_error',
                    mensajeServidor: 'La descripcion debe ser mayor o igual a 5.',
                })
            }

            if (descripcion.trim().length > 100) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'descripcion_error',
                    mensajeServidor: 'La descripcion debe ser menor o igual a 100.',
                })
            }
            datosActualizados.descripcion = descripcion
        }

        if (responsable) {
            // responsable
            if (typeof responsable !== 'string') {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'tipos_invalidos',
                    mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion y responsable deben ser string',
                })
            }
            if (responsable.trim().length < 5) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'responsable_error',
                    mensajeServidor: 'El responsable debe ser mayor o igual a 5.',
                })
            }

            if (responsable.trim().length > 100) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'responsable_error',
                    mensajeServidor: 'El responsable debe ser menor o igual a 100.',
                })
            }

            // comprobamos que el responsable exista
            const snapshotResponsable = await db.collection('Usuarios')
                .where('uid', '==', responsable)
                .get()

            if (snapshotResponsable.docs.length === 0) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'responsable_no_existe',
                    mensajeServidor: 'No existe el responsable del equipo',
                })
            }

            datosActualizados.responsable = responsable
        }

        if (verificado) {
            if (typeof verificado !== 'boolean') {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'tipos_invalidos',
                    mensajeServidor: 'Los campos a enviar son codigo, nombre, descripcion, y responsable deben ser string, verificado boolean',
                })
            }

            datosActualizados.verificado = verificado
            if (verificado)
                datosActualizados.fechaVerificado = timestamp.milliseconds_a_timestamp(requestStartTime)
        }

        body.datosActualizados = datosActualizados

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.validacionEquipoEliminar = async (req = request, res = response, next) => {
    try {
        const { datos, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidEquipo } = params

        // validamos que exista el equipo
        uidEquipo
        const docEquipo = await db.collection('Equipos')
            .doc(uidEquipo).get()

        if (!docEquipo.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'equipo_no_existe',
                mensajeServidor: 'El equipo no existe',
            })
        }
        if (docEquipo.data().eliminado) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'equipo_eliminado',
                mensajeServidor: 'El equipo ya fue eliminado',
            })
        }
    next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares