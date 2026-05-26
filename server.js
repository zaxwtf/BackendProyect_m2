const app = require('./src/app');

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/health', (req, res) =>{
    res.status(200).json({status: ok})
})