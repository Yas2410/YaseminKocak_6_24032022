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

  /* Pour chaque photographe de ma page d'accueil, je souhaite afficher :
  - Sa photo de profil avec lien renvoyant sur son propre profil
  - Sa localisation
  - Sa devise
  - Son tarif journalier
  */
  photographerList.getPhotographerList().forEach((photographer) => {
    const photographerCard = document.createElement("div");
    photographerCard.classList.add("photographers");
    const infoCard = `
    <a href="photographer.html?id=${photographer.id}"
                    aria-label="Aller sur la page du photographe ${photographer.name}. Ce dernier est basé à ${photographer.city}, ${photographer.country}.
                    Son tarif journalier est de ${photographer.price} euros et sa devise est ${photographer.tagline}"
                    >
                      <img class="photographers_img" src="../assets/medias/photographersID/${photographer.portrait}"; alt="Photo de profil du photographe ${photographer.name}">
                      <h2 class="photographers_name">${photographer.name}</h2>
                    </a>
                    <h3 class="photographers_localization">${photographer.city}, ${photographer.country}</h3>
                    <p class="photographers_motto">${photographer.tagline}</p>
                    <span class="photographers_price">${photographer.price}€/jour</span>
    `;
    photographerCard.innerHTML = infoCard;
    main.append(photographerCard);
  });
}

/*Va permettre l'affichage de mes "vues", rappelées plus haut
dans ma méthode "fetch"
*/
function launchPage() {
  displayPhotographers();
}
