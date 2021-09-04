import jwtDecode from 'jwt-decode'
const cookieparser = require('cookieparser')

export function getUserFromCookie (req) {
  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.__session
    console.log('parsed.__session', parsed.__session)
    if (!accessTokenCookie) { return }

    const decodedToken = jwtDecode(accessTokenCookie)
    if (!decodedToken) { return }

    return {
      decodedToken,
      accessTokenCookie
    }
  }

  return null
}

export function getUserFromSession (req) {
  console.log('[CHECK-AUTH] - checking if user is stored in session')
  return req.session ? req.session.userId : null
}
