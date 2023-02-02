import mongoose from "mongoose";
import { config } from "./config";

function connection() {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(config.dataBaseURL, (err) => {
            if (err) return console.log('erro ao conectar no MongoDB:', err);

            console.log('Conectado ao banco de dados');
        });
    } catch (error) {
        console.error('erro ao se conectar com o banco de dados:', error);
    }
}

export { connection };