import jwtDecode from 'jwt-decode'
const cookieparser = require('cookieparser')

export function getUserFromCookie (req) {
  if (!req.headers.cookie) return null

  const parsed = cookieparser.parse(req.headers.cookie)
  const accessTokenCookie = parsed.__session
  if (!accessTokenCookie) return null

  const decodedToken = jwtDecode(accessTokenCookie)
  if (!decodedToken) return null

  return { decodedToken, accessTokenCookie }
}

export function getUserFromSession (req) {
  console.log('[CHECK-AUTH] - checking if user is stored in session')
  return req.session ? req.session.userId : null
}
