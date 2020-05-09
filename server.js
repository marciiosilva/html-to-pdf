const fs = require('fs')
const pdf = require('html-pdf')
const express = require('express')
const bodyParser = require('body-parser')
 
//Iniciando Express e configurações para requisição post
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = 8080;

//servidor escutando na porta 80
app.listen(port);

// post
app.post('/generate-pdf', function(req, res){
    const html = fs.readFileSync('index.html').toString()
        
    const options = {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait'
    }

    pdf.create(html, options).toBuffer((err, buffer) => {
        //Caso ocorra um erro.
        if(err) return res.status(500).json(err)

        //Status de resposta HTTP 200 - Arquivo gerado com sucesso.
        res.status(200).end(buffer, 'binary');
    })

});
  