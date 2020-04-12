import Tag from '../model/tag';
import TagDao from '../dao/tagDao';

/*
* Contrôleur des Catégories
* Logique concernant les actions effectuées par l'utilisateur
*/
class TagController {

  /*
  * Récupération de toutes les catégories
  */
  getTags(req, res) {
    // récupère toutes les catégories via le dao
    TagDao.getTags(function (tags) {
      return res.status(200).send({
        success: 'true',
        message: 'Toutes les catégories ont été trouvées',
        tags: tags
      });
    });
  }

  /*
  * Récupération d'une seule catégorie
  */
  getTag(req, res) {
    const id = parseInt(req.params.id, 10); // récupère l'id en base 10

    // récupère la catégorie via le dao
    TagDao.getTag(id, function (tag) {
      if (tag != null) {
        return res.status(200).send({
          success: 'true',
          message: 'La catégorie a été trouvée',
          tag: tag
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'La catégorie n\'a pas été trouvée',
        });
      }
    });
  }

  /*
  * Suppression d'une catégorie
  */
  deleteTag(req, res) {
    const id = parseInt(req.params.id, 10);

    // suppression de la catégorie via le dao
    TagDao.deleteTag(id, function (success) {
      if (success === 1) {
        return res.status(200).send({
          success: 'true',
          message: 'Le tag a été supprimé',
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'Le tag n\'existe pas',
        });
      }
    });
  }

  /*
  * Création d'une catégorie
  */
  createTag(req, res) {
    // récupération de la valeur du titre
    let title = req.body.title;

    if (!title) { // si pas de titre
      return res.status(400).send({
        success: 'false',
        message: 'Le titre est requis',
      });
    }

    //title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    const tag = new Tag(title); // Nouvelle instance de catégorie

    // ajout de la catégorie grace au dao
    TagDao.addTag(tag, function (tag) {
      if (tag != null) {
        return res.status(200).send({
          success: 'true',
          message: 'Nouveau tag crée',
          tag: tag
        });
      } else {
        return res.status(400).send({
          success: 'false',
          message: 'Un tag avec le même titre existe déjà',
        });
      }
    });
  }

  /*
  * Mise à jour d'une catégorie
  */
  editTag(req, res) {
    const id = parseInt(req.params.id, 10);

    // récupère la catégorie à modifier grace au dao
    TagDao.getTag(id, function (tag) {
      if (tag == null) { // si la catégorie est introuvable
        return res.status(200).send({
          success: 'false',
          message: 'Le tag n\'existe pas'
        });
      }

      // modification du titre en recupérant sa valeur
      if (req.body.title) {
        tag.title = req.body.title;
      }

      // modification de la catégorie via le dao
      TagDao.editTag(id, tag, function (tag) {
        return res.status(200).send({
          success: 'true',
          message: 'Le tag a été mise à jour',
          tag: tag,
        });
      });
    });
  }
}

const tagController = new TagController();
export default tagController;
