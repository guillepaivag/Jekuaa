const middleware = {}

middleware['accesoAutenticado'] = require('..\\..\\jekuaaNuxt\\middleware\\accesoAutenticado.js')
middleware['accesoAutenticado'] = middleware['accesoAutenticado'].default || middleware['accesoAutenticado']

middleware['accesoNoAutenticado'] = require('..\\..\\jekuaaNuxt\\middleware\\accesoNoAutenticado.js')
middleware['accesoNoAutenticado'] = middleware['accesoNoAutenticado'].default || middleware['accesoNoAutenticado']

middleware['check-auth'] = require('..\\..\\jekuaaNuxt\\middleware\\check-auth.js')
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

middleware['esMiembroJekuaa'] = require('..\\..\\jekuaaNuxt\\middleware\\esMiembroJekuaa.js')
middleware['esMiembroJekuaa'] = middleware['esMiembroJekuaa'].default || middleware['esMiembroJekuaa']

export default middleware
