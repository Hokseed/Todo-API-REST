/*
* Défintion de l'objet tâche et de ses attributs
*/

class Task {
    /*
    * Constructeur de l'objet tâche
    */
    constructor(title, dateBegin, dateEnd, statut, tags) {
        this._id = id++; // l'identifiant unique est généré automatiquement
        this.title = title;
        this.dateBegin = dateBegin;
        this.dateEnd = dateEnd;
        this.statut = statut;
        this.tags = tags;
    }

    get id() {
        return this._id;
    }
}

let id = 0;

export default Task;
