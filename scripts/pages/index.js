import { Photographers, PhotographerList } from "../factories/photographers.js";

/* Array des objets stockés et instanciés depuis
 ma classe Photographers
 */
const photographerList = new PhotographerList();

/*
J'appelle ma méthode fetch() qui va prendre en paramètre url le chemin de 
mon fichier JSON contenant l'ensemble des données des photographes.
Elle va me retourner une réponse (promesse) avec les données. Dans le cas 
contraire, cela me retournera une erreur (catch)
 */
window.addEventListener("load", () => {
  fetch("../data/photographers.json")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.error("An error has occured");
      }
    })
    .then((data) => createPhotographerList(data))
    .then(launchPage);
});

/*
Pour chaque photographe, je créé une instance de ma classe Photographer,
que j'ajoute à mon tableau contenant l'ensemble des photographes,
avec l'id, le nom, la localisation, le "motto", le prix
ainsi que la photo de profil
 */
function createPhotographerList(data) {
  data.photographers.forEach((photographer) => {
    photographerList.addPhotographer(
      new Photographers(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      )
    );
  });
  return PhotographerList;
}

/*Je créé ma section qui va retourner l'ensemble de mes données (PhotographerList)
sur ma page "index.html" (section ayant pour classe "photographer_section",
à l'aide des éléments suivants : 
  */
function displayPhotographers() {
  const main = document.querySelector(".photographer_section");

  /* Pour chaque photographe de ma page d'accueil, je souhaite afficher :*/
  photographerList.getPhotographerList().forEach((photographer) => {
    const profileLink = "photographer.html?id=" + photographer.id;
    const profilePicture =
      "assets/medias/photographersID/" + photographer.portrait;

    /*La carte de chaque photographe
    - Photo de profil avec lien renvoyant au profil du photographe au clic
    - Nom du photographe
    - Sa localisation
    */
    const photographerCard = document.createElement("div");
    photographerCard.classList.add("photographer_card");
    const cardLink = document.createElement("a");
    cardLink.classList.add("profile_link");
    const cardImg = document.createElement("img");
    cardImg.classList.add("photographer_pix");
    const photographerName = document.createElement("h2");
    photographerName.classList.add("photographer_name");
    const photographerLocation = document.createElement("h3");
    photographerLocation.classList.add("photographer_location");

    cardLink.setAttribute("role", "link");
    cardLink.href = profileLink;
    cardImg.src = profilePicture;
    cardImg.alt = "";

    photographerName.textContent = photographer.name;
    photographerLocation.textContent =
      photographer.city + ", " + photographer.country;

    main.append(photographerCard);
    photographerCard.append(cardLink, photographerLocation);
    cardLink.append(cardImg, photographerName);
  });
}

/*Va permettre l'affichage de mes "vues", rappelées plus haut
dans ma méthode "fetch"
*/
function launchPage() {
  displayPhotographers();
}
