const { Nuxt } = require('nuxt')
const express = require('express')

const appNuxt = express()

const config = {
  dev: false,
}

const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt.ready()
.then(() => {
  isReady = true
})
.catch(() => {
  process.exit(1)
})

async function handleRequest(req, res) {
  try {
    if (!isReady) await readyPromise

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    await nuxt.render(req, res)
  } catch (error) {
    console.log('handleRequest-error: ')
    console.log(error)
  }
}

appNuxt.use(handleRequest)
appNuxt.get('*', handleRequest)

module.exports = appNuxt