const express = require("express")
const http = require('node:http')

const app = express();
const PORT = 3000;

app.get("/", (req, res) =>{
    res.send("Hola desde mi primera API")
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`)
})

app.use(express.json());

