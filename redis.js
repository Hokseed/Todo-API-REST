import redis from 'redis';
import Task from './model/task';
import Tag from './model/tag';

/*
* Création du client REDIS
*/
var client = redis.createClient();

client.on('connect', function() { //connexion
    console.log('Le client REDIS est maitenant connecté');
});
client.on('error', function (err) { //en cas d'erreur
    console.log('Une erreur est survenue ' + err);
});

export default client;

/*
* Implémentation d'un Mock
*/
let tag1 = new Tag("Ecole");
let tag2 = new Tag("Business");
let tag3 = new Tag("Invest");
let tag4 = new Tag("Blog");
let task1 = new Task("Réviser Maths", "12/03/2020", "14/05/2020", "En cours", [tag1.title]);
let task2 = new Task("Contacter client", "28/03/2020", "07/04/2020", "Achevée", [tag2.title, tag3.title]);

/*
* Insertion des données dans le client REDIS
*/
client.hset('tag', tag1.id, JSON.stringify(tag1), redis.print);
client.hset('tag', tag2.id, JSON.stringify(tag2), redis.print);
client.hset('tag', tag3.id, JSON.stringify(tag3), redis.print);
client.hset('tag', tag4.id, JSON.stringify(tag4), redis.print);
client.hset('task', task1.id, JSON.stringify(task1), redis.print);
client.hset('task', task2.id, JSON.stringify(task2), redis.print);
