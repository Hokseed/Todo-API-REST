/*
* Défintion de l'objet catégorie et de ses attributs
*/

class Tag {
    /*
    * Constructeur de l'objet catégorie
    */
    constructor(title) {
        this._id = id++; // l'identifiant unique est généré automatiquement
        this.title = title;
    }

    get id() {
        return this._id;
    }
}

let id = 0;

export default Tag;
