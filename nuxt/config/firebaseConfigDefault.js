import configsDev from "~/helpers/config_firebase_dev"
import configsProd from "~/helpers/config_firebase_prod"

const firebaseConfig = process.env.NODE_ENV === 'development' ? 
configsDev['DEFAULT'] : configsProd['DEFAULT']

export default firebaseConfig