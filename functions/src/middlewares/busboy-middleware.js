const busboy = require("busboy")
const os = require('os')
const path = require('path')
const fs = require('fs')

const busboyMiddleware = async (req, res, next) => {
    // See https://cloud.google.com/functions/docs/writing/http#multipart_data
    const bb = busboy({
        headers: req.headers,
        limits: {
            // Cloud functions impose this restriction anyway
            fileSize: 4 * 1024 * 1024 * 1024,
        }
    })

    const fields = {}
    const files = []
    const fileWrites = []
    let filePath = ''
    
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = path.join(os.tmpdir())

    bb.on('field', (name, val, info) => {
        fields[name] = val
    })

    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info
        const filenameWithTime = `${Date.now()}-${filename}`

        filePath = path.join(tmpdir, filenameWithTime)
        const writeStream = fs.createWriteStream(filePath)
        file.pipe(writeStream)

        fileWrites.push(new Promise((resolve, reject) => {
            file.on('end', () => writeStream.end())

            writeStream.on('finish', () => {
                fs.readFile(filePath, (err, buffer) => {
                    const size = Buffer.byteLength(buffer)
                    console.log('info', info)
                    const array = filename.split('.')
                    const fileExtension = array[array.length-1]
                    
                    if (err) return reject(err)

                    files.push({
                        filePath: filePath,
                        fileExtension: fileExtension,
                        fieldName: name,
                        fileName: filename,
                        encoding,
                        mimeType: mimeType,
                        buffer,
                        size,
                    })

                    resolve()
                })
            })
            
            writeStream.on('error', reject)
        }))
    })

    bb.on('finish', async () => { 
        try {
            await Promise.all(fileWrites)

            req.body = fields
            req.files = files

            next()
        } catch (error) {
            next(error)
        }
    })

    bb.end(req.rawBody)
}

module.exports = busboyMiddleware