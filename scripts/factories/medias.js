/*
Je créé ma classe MEDIAS avec mon constructeur qui va me permettre
de créer des nouvelles instances de ma classe Medias (= créer 
des images / vidéos)
*/

export class Media {
  createMedia(type, alt, date, id, link, likes, photographerId, path) {
    /*Si le type de Media = image, 
    je créé une instance d'image et 
    retourne les informations suivantes :
    */
    if (type === "jpg") {
      const photo = new Photo();
      photo.type = type;
      photo.alt = alt;
      photo.date = new Date(date);
      photo.id = id;
      photo.link = link;
      photo.likes = likes;
      photo.photographerId = photographerId;
      photo.title = link.replace(".jpg", "").replaceAll("_", " ");
      /*.replace("Event", "");*/
      photo.path = path + link;
      return photo;

      /*Si le type de Media = video, 
    je créé une instance de video et 
    retourne les informations suivantes :
    */
    } else if (type === "mp4") {
      const video = new Video();
      video.type = type;
      video.alt = alt;
      video.date = new Date(date);
      video.id = id;
      video.link = link;
      video.likes = likes;
      video.photographerId = photographerId;
      video.title = link.replace(".mp4", "").replaceAll("_", " ");
      return video;
    }
  }
}

/*Pour chaque photographe, je créé une instance des medias "image"
et les retourne sur son profil respectif :
*/
export class Photo extends Media {
  createImg(photographer) {
    const linkToPhoto = `../assets/medias/${photographer}/`;

    const pictureCard = document.createElement("img");

    pictureCard.src = linkToPhoto + this.link;
    pictureCard.alt = this.alt;
    pictureCard.classList.add("media-img");

    return pictureCard;
  }
}

/*Pour chaque photographe, je créé une instance des medias "vidéo"
et les retourne sur son profil respectif :
*/
export class Video extends Media {
  createImg(photographer) {
    const linkToPhoto = `../assets/medias/${photographer}/`;
    const cardsMediaVideo = document.createElement("video");
    cardsMediaVideo.loop = true;
    cardsMediaVideo.muted = true;

    cardsMediaVideo.src = linkToPhoto + this.link;
    cardsMediaVideo.alt = this.alt;
    cardsMediaVideo.classList.add("media-img");

    return cardsMediaVideo;
  }
}

/* Comme pour ma classe Photographers, je créé un tableau
 qui va stocker l'ensemble des médias des photographes
*/
export class MediaList {
  constructor() {
    this.mediaList = [];
  }

  /* Je créé ma fonction qui va permettre d'ajouter chaque média
créé (class Video/Photo et Medias) dans le Array de ma classe
"MediaList" (push)
La méthode push() = ajouter un ou plusieurs éléments à la fin 
d'un tableau et renvoyer la nouvelle longueur
*/
  addMedia(media) {
    this.mediaList.push(media);
  }

  /* Je créé ma fonction qui va permettre de récuperer mon tableau avec
l'ensemble de mes médias ajoutés et de les trier en fonction de 
la date, du titre ou du nombre de likes (popularité)
*/
  getMediaList(sort) {
    const galleryDisplay = this.mediaList.slice();
    let returnedList = [];

    /*
FILTRE permettant de classer les différents médias 
en fonction de l'option sélectionnée avec la methode SORT : 

DATE / POPULARITE -> ma methode sort() va me retourner l'ordre des dates en soustrayant 2 dates et en retournant
la différence entre ces 2 dates. Idem pour les "Likes"
TITRE -> methode localeCompare() qui va indiquer si l'élément en question se situe
avant, après ou est identique à l'élement passé en paramètre, ce qui va permettre de les classer
(nombre - : la string se situe avant celle à comparer)
(nombre + : la string se situe après)
(0 : les 2 strings sont au même niveau)
*/
    if (sort === "popularity") {
      galleryDisplay.sort((a, b) => b.likes - a.likes);
    } else if (sort === "date") {
      galleryDisplay.sort((a, b) => b.date - a.date);
    } else if (sort === "title") {
      galleryDisplay.sort((a, b) => {
        a.title.localeCompare(b.title, { ignorePunctuation: true });
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }

    if (length !== 0) {
      galleryDisplay.forEach((media) => {
        if (!returnedList.includes(media)) {
          returnedList.push(media);
        }
      });
      /*
      La méthode slice() renvoie un objet tableau
      contenant une copie (shallow copy) d'une portion 
      du tableau d'origine
      */
    } else {
      returnedList = galleryDisplay.slice();
    }

    return returnedList;
  }
  /* Je créé ma fonction qui va permettre de récuperer le nombre
    de likes sur chaque media et d'en comptabiliser le total*/
  getLikes() {
    let sum = 0;
    this.mediaList.forEach((media) => {
      sum += media.likes;
    });
    return sum;
  }
}
