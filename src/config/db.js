const mongoose = require('mongoose')
const dns = require('dns')

async function connectDB(){
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI no está definido en el archivo .env");
        process.exit(1);
    }

    try {
        if (uri.startsWith('mongodb+srv://')) {
            dns.setServers(['8.8.8.8', '1.1.1.1']);
            console.log('Usando DNS público para resolver SRV de MongoDB Atlas');
        }

        await mongoose.connect(uri);
        console.log("Conectado a MongoDB");
    } catch(error) {
        console.error("error conectando a MongoDB", error);
        process.exit(1);
    }
}

module.exports = connectDB;