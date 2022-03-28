/*
J'appelle ma méthode fetch() qui va prendre en paramètre url le chemin de 
mon fichier JSON contenant l'ensemble des données des photographes.
Elle va me retourner une réponse (promesse) avec les données. Dans le cas 
contraire, cela me retournera une erreur (catch)
 */
window.addEventListener("load", () => {
  fetch("../data/photographers.json").then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.error("An error has occured");
    }
  });

  async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
      {
        name: "Ma data test",
        id: 1,
        city: "Paris",
        country: "France",
        tagline: "Ceci est ma data test",
        price: 400,
        portrait: "account.png",
      },
      {
        name: "Autre data test",
        id: 2,
        city: "Londres",
        country: "UK",
        tagline: "Ceci est ma data test 2",
        price: 500,
        portrait: "account.png",
      },
    ];
    // et bien retourner le tableau photographers seulement une fois
    return {
      photographers: [...photographers, ...photographers, ...photographers],
    };
  }

  async function displayData(photographers) {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }

  async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
  }

  init();
});
