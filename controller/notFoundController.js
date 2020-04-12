/*
* Contrôleur par défaut
* Logique concernant les actions effectuées par l'utilisateur
*/
class NotFoundController {

  /*
  * Réponse par défaut en cas d'erreur 404
  */
  notFound(req, res) {
    return res.status(404).send('Désolé, Impossible de trouver cette URL');
  }
}

const notFoundController = new NotFoundController();
export default notFoundController;
