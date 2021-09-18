const { Nuxt } = require('nuxt')
const express = require('express')

const appNuxt = express()

const nuxt = new Nuxt({
  dev: true
})

let isReady = false
const readyPromise = nuxt.ready()
.then(() => {
  isReady = true
})
.catch(() => {
  process.exit(1)
})

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
  await nuxt.render(req, res)
}

appNuxt.get('*', handleRequest)
appNuxt.use(handleRequest)

module.exports = appNuxt