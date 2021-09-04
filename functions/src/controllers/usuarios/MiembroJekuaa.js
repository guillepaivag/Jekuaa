const controllerMiembroJekuaa = {}

controllerMiembroJekuaa.verUsuarioPorUID = async (req, res) => {

    try {

        const {

        } = req.body
        
    } catch (error) {
        
    }

}

controllerMiembroJekuaa.crearUsuario = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}

controllerMiembroJekuaa.actualizarUsuarioPorUID = async (req, res) => {

    try {
        const { uid } = req.params
        const { data } = req.body
        const {
            datosActualizados
        } = data

        const listaDeDatosParaActualizar = Object.keys(datosActualizados)

        if (listaDeDatosParaActualizar.includes('nombreUsuario')) {
            
        }

        
    } catch (error) {
        
    }

}

controllerMiembroJekuaa.habilitarUsuarioPorUID = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}

controllerMiembroJekuaa.eliminarUsuarioPorUID = async (req, res) => {
    
    try {
        
    } catch (error) {
        
    }

}

module.exports = controllerMiembroJekuaa