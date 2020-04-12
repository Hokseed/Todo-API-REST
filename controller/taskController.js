import Task from '../model/task';
import TaskDao from '../dao/taskDao';
import moment from 'moment';

// Objet Statuts liant ll'affichage bdd avec l'affichage utilisateur
const Statuts = Object({
  non_precise: 'Non précisé',
  tache_requise: 'Une tâche est requise',
  en_cours: 'En cours',
  achevee: 'Achevée',
  annulee: 'Annulée'
});

/*
* Contrôleur des tâches
* Logique concernant les actions effectuées par l'utilisateur
*/
class TaskController {

  /*
  * Récupération de toutes les tâches
  */
  getTasks(req, res) {
    // récupère les filtres dans une variable params
    let params = ({
      expired: req.query.expired,
      statut: req.query.statut,
      tags: req.query.tags
    });

    if (params.statut) { // si il y a un filtre statut
      if (!(params.statut instanceof Array)) {
        params.statut = params.statut.split(","); // permet de requeter en separant les statuts par une virgule
      }
    }
    if (params.tags) { // si il y a un filtre catégorie
      if (!(params.tags instanceof Array)) {
        params.tags = params.tags.split(","); // permet de requeter en separant les catégories par une virgule
      }
    }

    // récupère toutes les catégories via le dao
    TaskDao.getTasks(function (tasks) {

      // filtrage des tâches en fonction de la date de fin, du statut et des catégories
      tasks = tasks.filter((task) => {
        // Si la date de fin de la tache est apres la date du jour
        // alors la tache n'est pas expirée
        if (params.expired && !moment(task.dateEnd, "DD/MM/YYYY").isBefore(moment())) {
          return null;
        }

        // Si le statut de la tâche ne correspond pas aux statuts indiqués
        if (params.statut && !params.statut.some(s => Statuts[s] === task.statut)) {
          return null;
        }

        // Si les catégories de la tâche ne correspondent pas aux catégories indiquées
        if (params.tags && !params.tags.some(t => task.tags.includes(t))) {
          return null;
        }

        return task;
      });

      // envoi des tâches filtrées si un filtre était indiqué
      return res.status(200).send({
        success: 'true',
        message: 'Toutes les tâches ont été trouvées',
        tasks: tasks
      });
    });
  }

  /*
  * Récupération d'une seule tâche
  */
  getTask(req, res) {
    const id = parseInt(req.params.id, 10); // récupère l'id en base 10

    // récupère la tâche via le dao
    TaskDao.getTask(id, function (task) {
      if (task != null) {
        return res.status(200).send({
          success: 'true',
          message: 'La tâche a été trouvée',
          task: task
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'La tâche n\'existe pas',
        });
      }
    });
  }

  /*
  * Suppression d'une catégorie
  */
  deleteTask(req, res) {
    const id = parseInt(req.params.id, 10);

    // suppression de la tâche via le dao
    TaskDao.deleteTask(id, function (isDeleted) {
      if (isDeleted === 1) {
        return res.status(200).send({
          success: 'true',
          message: 'La tâche a été supprimée',
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'La tâche n\'existe pas',
        });
      }
    });
  }

  /*
  * Création d'une tâche
  */
  createTask(req, res) {
    // récupération de la valeur des attributs
    let title = req.body.title;
    let dateBegin = req.body.dateBegin;
    let dateEnd = req.body.dateEnd;
    let statut = req.body.statut;
    let tags = req.body.tags;

    if (!title) { // si pas de titre
      return res.status(400).send({
        success: 'false',
        message: 'Le titre est requis',
      });
    } else if (!dateBegin) { // si pas de date de début
      return res.status(400).send({
        success: 'false',
        message: 'La date de début est requise',
      });
    } else if (!dateEnd) { // si pas de date de fin
      return res.status(400).send({
        success: 'false',
        message: 'La date de fin est requise',
      });
    } else if (!statut) { // si pas de statut
      return res.status(400).send({
        success: 'false',
        message: 'Le statut est requis',
      });
    } else if (!tags) { // si pas au moins une catégorie
      return res.status(400).send({
        success: 'false',
        message: 'Les tags sont requis',
      });
    }

    const task = new Task(title, dateBegin, dateEnd, statut, tags); // Nouvelle instance de tâche

    // ajout de la tâche grace au dao
    TaskDao.addTask(task, function (task) {
      if (task != null) {
        return res.status(200).send({
          success: 'true',
          message: 'Nouvelle tâche créée',
          task: task
        });
      } else {
        return res.status(500).send({
          success: 'false',
          message: 'Nouvelle tâche non ajoutée',
        });
      }
    });
  }

  /*
  * Mise à jour d'une tâche
  */
  editTask(req, res) {
    const id = parseInt(req.params.id, 10);

    // Find task by id
    TaskDao.getTask(id, function (task) {
      if (task == null) {
        return res.status(200).send({
          success: 'false',
          message: 'La tâche n\'existe pas'
        });
      }

      // modification des attributs en recupérant leurs valeurs
      if (req.body.title) {
        task.title = req.body.title;
      }
      if (req.body.dateBegin) {
        task.dateBegin = req.body.dateBegin;
      }
      if (req.body.dateEnd) {
        task.dateEnd = req.body.dateEnd;
      }
      if (req.body.statut) {
        task.statut = req.body.statut;
      }
      if (req.body.tags) {
        task.tags = req.body.tags;
      }

      // modification de la tâche via le dao
      TaskDao.editTask(id, task, function (task) {
        return res.status(201).send({
          success: 'true',
          message: 'La tâche a été mise à jour',
          task: task,
        });
      });
    });
  }
}

const taskController = new TaskController();
export default taskController;
