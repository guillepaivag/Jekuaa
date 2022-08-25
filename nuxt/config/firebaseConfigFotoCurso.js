import configsDev from "~/helpers/config_firebase_dev"
import configsProd from "~/helpers/config_firebase_prod"

const firebaseConfig = process.env.NODE_ENV === 'development' ? 
configsDev['FOTO_CURSO'] : configsProd['FOTO_CURSO']

export default firebaseConfig