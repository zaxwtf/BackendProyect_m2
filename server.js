require("dotenv").config()
const app = require('./src/app');
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok" });
});



async function initServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

initServer();