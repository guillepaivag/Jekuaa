const middleware = {}

middleware['accesoAutenticado'] = require('..\\..\\jekuaaNuxt\\middleware\\accesoAutenticado.js')
middleware['accesoAutenticado'] = middleware['accesoAutenticado'].default || middleware['accesoAutenticado']

middleware['accesoNoAutenticado'] = require('..\\..\\jekuaaNuxt\\middleware\\accesoNoAutenticado.js')
middleware['accesoNoAutenticado'] = middleware['accesoNoAutenticado'].default || middleware['accesoNoAutenticado']

middleware['check-auth'] = require('..\\..\\jekuaaNuxt\\middleware\\check-auth.js')
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

middleware['esUsuarioTeamJekuaa'] = require('..\\..\\jekuaaNuxt\\middleware\\esUsuarioTeamJekuaa.js')
middleware['esUsuarioTeamJekuaa'] = middleware['esUsuarioTeamJekuaa'].default || middleware['esUsuarioTeamJekuaa']

export default middleware
