const express = require('express')
const {connection,PORT} = require('./Config/db')
const {UserController} = require('./Controllers/usercontroller')
const {PetrolController} = require('./Controllers/PetrolControler')
const bodyparser = require('body-parser')
const {authorization} = require('./Middleware/authorization')

const app = express()
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send({msg: 'API running'})
})

app.use('/user',UserController)

app.use(authorization)

app.use('/petrol',PetrolController)

app.listen(PORT, async ()=>{
    try {
        await connection
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
    console.log(`Listening on PORT: ${PORT}`)
})