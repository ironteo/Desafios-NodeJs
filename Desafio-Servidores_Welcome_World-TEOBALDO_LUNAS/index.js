const http = require('http')
const url = require('url')
const fs = require('fs')

http
    .createServer(function(req, res) {
        const params = url.parse(req.url, true).query
        const archivo = params.archivo
        const contenido = params.contenido
        const nuevoNombre = params.nuevoNombre

        if (req.url.includes('/crear')) {
            fs.writeFile(archivo, contenido, () => {
                res.write('Archivo creado con exito')
                res.end()
            })
        }
        if (req.url.includes('/leer')) {
            fs.readFile(archivo, contenido, (err, data) => {
                res.write(data)
                res.end()
            })
        }
        if (req.url.includes('/renombrar')) {
            fs.rename(archivo, nuevoNombre, (err, data) => {
                res.write(`Se renombro con exito el archivo ${archivo}, su nuevo nombre es ${nuevoNombre}`)
                res.end()
            })
        }
        if (req.url.includes('/eliminar')) {
            fs.unlink(archivo, (err, data) => {
                res.write(`Archivo ${archivo} fue eliminado con exito`)
                res.end()
            })
        }

    })
    .listen(8080, () => console.log('Escuchando en el puerto 8080'))