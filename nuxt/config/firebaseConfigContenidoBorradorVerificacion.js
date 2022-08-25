import configsDev from "~/helpers/config_firebase_dev"
import configsProd from "~/helpers/config_firebase_prod"

const firebaseConfig = process.env.NODE_ENV === 'development' ? 
configsDev['CONTENIDO_CLASE_BORRADOR_VERIFICACION'] : configsProd['CONTENIDO_CLASE_BORRADOR_VERIFICACION']

export default firebaseConfig