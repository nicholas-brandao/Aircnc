const express = require('express');
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect("mongodb+srv://nicholas-adm:nicholas-adm@node-react-reactnative-llpp0.mongodb.net/oministack-semana09?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

// Recomendado colocar em um banco de usuarios conectados quando for em produção, ex "redis"
const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

// Utilização de um middleware para que fique disponivel as variaveis "io","connectedUsers" em toda aplicação.
app.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    // Ao utilizar um middleware interno deve-se usar a função "next" para que a aplicação não fique presa apenas neste middleware e siga pelos middlewares abaixo
    return next();
});


app.use(cors());
app.use(express.json());
// utilizado para retornar algum tipo de arquivo, ex imagem, pdf
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);


server.listen(3333);