var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config');
var badyParser = require("body-parser");

const email = require("./servidor/email")


var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(badyParser.json());
app.use(badyParser.urlencoded({ extended: true }));
app.use('/static', express.static('dist'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

const oEmail = new email({
    "host": "smtp.live.com",
    "port": "25",
    "auth": {
        "type": "login",
        "user": "braulio_hermida@hotmail.com",
        "pass": "NAVIDAD15393926"
    }
});

app.get('/', function(req, res, next) {
    res.send('Eco Sys')
});

app.post('/api/contacto', function(req, res, next) {

    let email = {
        from: "braulio_hermida@hotmail.com",
        to: "braulio.hermida@cplatina.com",
        subject: "Nuevo mensaje de usuario",
        html: `
                <div>
                    <p>Correo:  ${req.body.c}</p>
                    <p>Nombre:  ${req.body.n}</p>
                    <p>Asunto:  ${req.body.a}</p>
                    <p>Mensaje: ${req.body.m}</p>
                    <p>Tel: ${req.body.t}</p>
                </div>
              `
    };

    oEmail.enviarCorreo(email);
    res.send("ok");
});


app.listen(app.get('port'), () => {
    console.log('Servidor activo');
})