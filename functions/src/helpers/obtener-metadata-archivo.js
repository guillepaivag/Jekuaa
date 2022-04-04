const ffmpeg = require('fluent-ffmpeg')
const ffprobePath = require("@ffprobe-installer/ffprobe").path


const obtenerMetadataArchivo = async (req, res, next) => {
    const { files } = req
    const promiseAll = []

    ffmpeg.setFfprobePath(ffprobePath)

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        promiseAll.push(new Promise((resolve, reject) => {
            ffmpeg.ffprobe(file.filePath, function(err, metadata) {
                if (err) return reject(err)
                
                // metadata should contain 'width', 'height' and 'display_aspect_ratio'
                req.files[i].metadata = metadata
                
                resolve()
            })
        }))
    }

    try {
        await Promise.all(promiseAll)

        next()
    } catch (error) {
        next(error)
    }
}


module.exports = obtenerMetadataArchivo