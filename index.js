const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const connection = require('./database');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

const Data = require('./data');

connection
  .authenticate()
  .then(() => {
    console.log('Connection Database successful')
  }).catch(error => {
    console.log(`There was an error ${error}`);
  })

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/enviado', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    Data.create({
      email,
      password
    }).then(() => {
      res.render('index');
    })
  } 
})

app.get('/login', (req, res) =>{
  res.render('login');
})

app.post('/logado', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  Data.findAll({ raw: true }).then(data => {
    let account = false;
    data.forEach(acc => {
      if (acc.email == email && acc.password == password) {
        account = true;
      }
    })

    if (account == true) {
      res.render('logado');
    } else {
      res.redirect('login');
    }

  })
})

app.listen(8080, (error) => {
  if (error) {
    console.log(`Ocorreu um erro ${error}`);
  } else {
    console.log('Servidor iniciado!');
  }
})