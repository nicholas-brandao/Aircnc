const express = require('express');
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

mongoose.connect("mongodb+srv://nicholas-adm:nicholas-adm@node-react-reactnative-llpp0.mongodb.net/oministack-semana09?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(express.json());
// utilizado para retornar algum tipo de arquivo, ex imagem, pdf
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);
app.listen(3333);