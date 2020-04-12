import client from '../redis';

var hash = Object.freeze('tag');

/*
* Objet d'accès aux données propre aux catégories
* Voir la documentation REDIS pour plus d'info sur les fonctions
* NPM - REDIS : https://www.npmjs.com/package/redis
*/
class TagDao {

    /*
    * Fonction qui récupère toutes les catégories dans redis
    */
    getTags(callback) {
        let tags = [];
        client.hgetall(hash, function (err, results) {
            if (err) throw err;
            if (results != null) {
                for (var key of Object.keys(results)) {
                    tags.push(JSON.parse(results[key]));
                }
            }
            callback(tags);
        });
    }

    /*
    * Fonction qui récupère une catégorie dans redis en fonction de l'id
    */
    getTag(id, callback) {
        client.hget(hash, id, function (err, results) {
            if (err) throw err;
            callback(JSON.parse(results));
        });
    }

    /*
    * Fonction qui supprime une catéorie dans redis en fonction de l'id
    */
    deleteTag(id, callback) {
        client.hdel(hash, id, function (err, reply) {
            if (err) throw err;
            callback(reply);
        });
    }

    /*
    * Fonction qui ajoute une catégorie dans redis
    */
    addTag(tag, callback) {
        client.hset(hash, tag.id, JSON.stringify(tag));
        callback(tag);
    }

    /*
    * Fonction qui modifie une catégorie dans redis en fonction de l'id
    */
    editTag(id, tag, callback) {
        client.hset(hash, id, JSON.stringify(tag));
        callback(tag);
    }
}

const tagService = new TagDao();
export default tagService;
