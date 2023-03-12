import mongoose from "mongoose";
import { config } from "./config";

async function connection() {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(config.dataBaseURL)
            .then(() => console.log('Conectado ao MongoDB'))
            .catch((error) => console.log('Erro ao conectar no MongoDB:', error));
    } catch (error) {
        console.error("erro ao se conectar com o banco de dados:", error);
    }
}

export { connection };