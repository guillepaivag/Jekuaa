const admin = require('../../firebase-service')
const timestamp = {}

timestamp.milliseconds_a_timestamp = ( milliseconds = Date.now() ) => {
    if ( !milliseconds ) return null
    let timestamp = admin.firestore.Timestamp.fromMillis ( milliseconds )

    return timestamp
}

module.exports = timestamp