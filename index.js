const express = require("express");
const mongoose = require("mongoose");
const postosRoutes = require("./Controllers/postos.js");
const basicAuth = require("./Middleware/auth.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Rota raiz opcional para verificar se o servidor está online no Render
app.get("/", (req, res) => {
    res.send("Servidor ativo e a funcionar!");
});

// Ligar ao MongoDB Atlas
const URL = "mongodb+srv://gabriel95_db_user:feijao@cluster0.cqcaaih.mongodb.net/";

mongoose.connect(URL)
    .then(() => {
        console.log("Ligado ao MongoDB com sucesso.");
        // Rotas e arranque do servidor
        app.use("/postos", basicAuth, postosRoutes);
        app.listen(PORT, () => {
            console.log(`Servidor na porta ${PORT}`);
        });
    })
    .catch((erro) => {
        console.error("Erro ao ligar ao MongoDB:", erro.message);
    });