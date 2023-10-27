const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

const cidadeController = require('../controllers/cidadeController');
const aereportoController = require('../controllers/aeroportoController');

// const cors = require("cors");
const app = express();

const urlPrevisaoCidade = 'https://brasilapi.com.br/api/cptec/v1/clima/previsao/';
const urlPrevisaoAeroporto = 'https://brasilapi.com.br/api/cptec/v1/clima/aeroporto/';

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

//passando app para a função que esta nesse caminho
// require("../routes/usuarioRoutes")(app); 
// require("../routes/graficoRoutes")(app);
// require("../routes/dashboardRoutes")(app);

// app.use("/cadastrousuario", UsuarioRoutes);

app.get('/:code', async(req, res) => {
    
    let cityCode = req.params.code;

    try {
        const response = await axios.get(`${urlPrevisaoCidade}${cityCode}`);
        cidadeController.create(response);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.log(error);
    }
})

app.get('/aero/:code', async(req, res) => {
    
    let icaoCode = req.params.code;

    try {
        const response = await axios.get(`${urlPrevisaoAeroporto}${icaoCode}`);
        aereportoController.create(response);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.log(error);
    }
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});