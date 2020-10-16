const axios = require('axios');

require('../css/keyframes.css');
require('../css/banner.css');
require('../css/style.css');

document.getElementById("enviar").addEventListener("click", function() {

    let strNombre = document.getElementById("inputName").value;
    let strTel = document.getElementById("inputTel").value;
    let strCorreo = document.getElementById("inputEmail").value;
    let strAsunto = document.getElementById("inputAsunto").value;
    let strMensaje = document.getElementById("inputMensaje").value;


    if (strNombre != "" && strTel != "" && strCorreo != "" && strAsunto != "" && strMensaje != "") {

        let datos = {

            n: strNombre,
            t: strTel,
            c: strCorreo,
            a: strAsunto,
            m: strMensaje

        };

        axios.post('/api/contacto', datos)
            .then(function(response) {
                document.getElementById("inputName").value = "";
                document.getElementById("inputTel").value = "";
                document.getElementById("inputEmail").value = "";
                document.getElementById("inputAsunto").value = "";
                document.getElementById("inputMensaje").value = "";
                alert("Gracias por escribirnos, en breve te contactaremos.");


            }).catch(function(error) {
                console.log(error);
            });


    } else {
        alert("Favor de llenar todos los campos");
    }


});