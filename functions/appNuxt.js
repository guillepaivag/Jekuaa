const { Nuxt } = require('nuxt')
const express = require('express')
const { isSitemap } = require('./src/middlewares/sitemap')

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

    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    await nuxt.render(req, res)
  } catch (error) {
    console.log('handleRequest-error: ', error)
  }
}

appNuxt.get('*', isSitemap, handleRequest)

module.exports = appNuxt