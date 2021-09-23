const express = require('express')
const app = express()

const Contenedor = require('./contenedor.js')
const contenedor = new Contenedor("./productos.txt")



app.get('/productos', (req, res) => {
    contenedor.getAll().then(data => {
        res.send(data)})
})

app.get('/productoRandom', (req, res) => {
    contenedor.getByRandomId().then(data => {
        res.send(data)})
    
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))