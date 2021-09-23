const fs = require("fs");

class Contenedor{
    constructor(filePath){
        this.path = filePath
    }

    async leer(){
        try {
            const body = await fs.promises.readFile(this.path)
            const bodyArray = JSON.parse(body)
            return bodyArray
             
        } catch (error) {
            console.log('Error en lectura')
        }
    }

    async getMaxId(){
        const bodyArray = await this.leer()
        let maxId = 1
        if (bodyArray) {
            const ids = bodyArray.map(m => m.id)
            maxId =  Math.max(...ids)
        }
        return maxId
        
         
    }

    async getByRandomId(){
        const min = 1
        const max = await this.getMaxId()
        const randomId = Math.floor(Math.random() * (max + 1 - min)) + min
        return await this.getById(randomId)
    }

    async save(object){
        try {  
            let body = []
            let bodyArray = await this.leer()
            if (bodyArray) {
                const ids = bodyArray.map(m => m.id)
                const max =  Math.max(...ids)
                object.id = max+1
                body = bodyArray
                body.push(object)
            } else{
                object.id=1
                body[0] = object
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(body))
            return object.id
        } catch (err) {
            throw new Error("Error en save", err)
        }
    }

    async getById(id){
        const body = await this.leer()
        const resp = body.filter(f => f.id===id)
        return JSON.stringify(resp[0])

    }

    async getAll(){
        const body = await this.leer()
        return JSON.stringify(body)

    }

    async deleteById(id){
        const body = await this.leer()
        const contenido = body.filter(f => !(f.id===id))

        try {  
            await fs.promises.writeFile(this.path, JSON.stringify(contenido))
        } catch (err) {
            throw new Error("Error en borrar por id", err)
        }

    }

    async deleteAll(){
        try {  
            await fs.promises.writeFile(this.path, '')
        } catch (err) {
            throw new Error("Error al borrar todos", err)
        }

    }
}
module.exports = Contenedor;

