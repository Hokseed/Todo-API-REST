import client from '../redis';

var hash = Object.freeze('task');

/*
* Objet d'accès aux données propre aux tâches
* Voir la documentation REDIS pour plus d'info sur les fonctions
* NPM - REDIS : https://www.npmjs.com/package/redis
*/
class TaskDao {

    /*
    * Fonction qui récupère toutes les tâches dans redis
    */
    getTasks(callback) {
        let tasks = [];
        client.hgetall(hash, function (err, results) {
            if (err) throw err;
            if (results != null) {
                for (var key of Object.keys(results)) {
                    tasks.push(JSON.parse(results[key]));
                }
                callback(tasks);
            }
        });
    }

    /*
    * Fonction qui récupère une tâche dans redis en fonction de l'id
    */
    getTask(id, callback) {
        client.hget(hash, id, function (err, results) {
            if (err) throw err;
            callback(JSON.parse(results));
        });
    }

    /*
    * Fonction qui supprime une tâche dans redis en fonction de l'id
    */
    deleteTask(id, callback) {
        client.hdel(hash, id, function (err, reply) {
            if (err) throw err;
            callback(reply);
        });
    }

    /*
    * Fonction qui ajoute une tâche dans redis
    */
    addTask(task, callback) {
        client.hset(hash, task.id, JSON.stringify(task));
        callback(task);
    }

    /*
    * Fonction qui modifie une tâche dans redis en fonction de l'id
    */
    editTask(id, task, callback) {
        client.hset(hash, id, JSON.stringify(task));
        callback(task);
    }
}

const taskService = new TaskDao();
export default taskService;
