import express from 'express';
import NotFoundController from './controller/notFoundController';
import TagController from './controller/tagController';
import TaskController from './controller/taskController';

/*
* Utilisation d'un système de routage complet grace à express
*/
const router = express.Router();

/*
* Liste des routes propres aux tâches
*/
router.get('/tasks', TaskController.getTasks);
router.get('/task/:id', TaskController.getTask);
router.post('/tasks', TaskController.createTask);
router.put('/task/:id', TaskController.editTask);
router.delete('/task/:id', TaskController.deleteTask);

/*
* Liste des routes propres aux catégories
*/
router.get('/tags', TagController.getTags);
router.get('/tag/:id', TagController.getTag);
router.post('/tags', TagController.createTag);
router.put('/tag/:id', TagController.editTag);
router.delete('/tag/:id', TagController.deleteTag);

/*
* En cas d'erreur 404, liste des routes pour gérer les mauvaises requetes
*/
router.put('*', NotFoundController.notFound);
router.post('*', NotFoundController.notFound);
router.get('*', NotFoundController.notFound);
router.delete('*', NotFoundController.notFound);


export default router;
