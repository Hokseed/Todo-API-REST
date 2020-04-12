import bodyParser from 'body-parser';
import express from 'express';
import router from './index.js';

/*
* Inclusion d'express en appelant la fonction express()
*/
const app = express();


app.use(function(req, res, next) {
  // on précise ici qu'on autorise toutes les sources
  res.header("Access-Control-Allow-Origin", "*");

  // liste des headers http qui sont acceptés
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // le serveur accepte les méthodes PUT, POST, GET et DELETE
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

/*
* L'application écoute le port 5000 à la recherche de connexions
*/
app.listen(5000, () => {
  console.log(`L'API écoute le port 5000`)
});
