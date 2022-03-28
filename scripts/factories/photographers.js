/*
Je créé ma classe PHOTOGRAPHERS avec mon constructeur qui va me permettre
de créer des nouvelles instances de ma classe Photographer (= créer 
un nouveau photographe)
*/
export class Photographers {
  constructor(name, id, city, country, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }

  getFileName() {
    return this._name.toLowerCase().replace(" ", "");
  }
}

/* Tableau qui va stocker les photographes créés 
avec ma classe Photographers
*/
export class PhotographerList {
  constructor() {
    this.photographerList = [];
  }

  /* Je créé ma fonction qui va permettre d'ajouter chaque photographe
créé (class Photographers) dans le Array de ma classe
"PhotographerList"
*/
  addPhotographer(photographer) {
    this.photographerList.push(photographer);
  }

  /* Je récupère mon tableau avec l'ensemble 
des photographes ajoutés
*/
  getPhotographerList() {
    let returnedList = [];

    if (length !== 0) {
      this.photographerList.forEach((photograph) => {
        if (!returnedList.includes(photograph)) {
          returnedList.push(photograph);
        }
      });
    } else {
      returnedList = this.photographerList.slice();
    }

    return returnedList;
  }
}
