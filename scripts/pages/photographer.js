import { Photographers } from "../factories/photographers.js";
import { Media, MediaList } from "../factories/medias.js";
import { displayFilter } from "../utils/filter.js";
import { displayProfile } from "../utils/profile.js";
import { displayLightbox, launchLightbox } from "../utils/lightbox.js";

const urlParams = new URLSearchParams(window.location.search);
/* Array des objets stockés et instanciés depuis
 ma classe Medias
 */
const mediaList = new MediaList();
const main = document.querySelector(".main");
let mediaFactory = new Media();
let currentPhotographer;
let totalLikes = [];

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
    .then((data) => createProfile(data))
    .then(launchPage);
});

/*
Pour chaque photographe, je créé une instance de ma classe Photographer
en passant en paramètre l'id de ce dernier afin que les éléments qui me
sont retournés correspondent bien à l'ID du photographe
 */
function createProfile(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      currentPhotographer = new Photographers(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      );
    }
  });
  /*
Pour chaque photographe, je récupère l'ensemble de ses médias
Photos & Vidéos (ID identique) que je retourne et affiche sur son profil
 */
  data.media.forEach((media) => {
    if (media.photographerId === currentPhotographer.id) {
      media.getLikes;

      mediaList.addMedia(
        mediaFactory.createMedia(
          media.image?.split(".").pop() || media.video?.split(".").pop(),
          media.alt,
          media.date,
          media.id,
          media.image || media.video,
          media.likes,
          media.photographerId,
          media.title,
          currentPhotographer.name.toLowerCase().replace(" ", "") + "/"
        )
      );
    }
  });
}

export function displayMediaList() {
  let displayMediaList = [];

  /*
Section qui va contenir la gallerie de médias
pour chacun des photographes
 */
  const gallery = document.querySelector(".gallery");

  /*Va permettre le tri des médias*/
  const sort = document
    .querySelector(".filter_option.selected")
    ?.getAttribute("data-value");

  gallery.innerHTML = "";

  displayMediaList = mediaList.getMediaList(sort);

  /*Je créé l'affichage de la galerie contenant photos/vidéos 
  pour chacun des photographes*/
  displayMediaList.forEach((media) => {
    const mediaElement = media.createImg(currentPhotographer.getFileName());
    /*Je créé une section pour chaque media*/
    const galleryCard = document.createElement("section");
    galleryCard.classList.add("cards_media");
    const mediaImg = document.createElement("a");
    mediaImg.classList.add("media_img");
    const mediaFooter = document.createElement("div");
    mediaFooter.classList.add("media_footer");
    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("media_title");
    mediaTitle.textContent = `${media.title}`;
    const mediaLike = document.createElement("div");
    mediaLike.classList.add("media_like");

    /*Lien de mes images qui vont, au clic, me permettre d'ouvrir la lightbox*/
    const lightboxOpen = document.querySelectorAll(".media_img");
    lightboxOpen.forEach((link) => {
      link.addEventListener("click", launchLightbox);
    });

    /*LIKES*/
    const likeNumber = document.createElement("p");
    likeNumber.classList.add("like_number");
    likeNumber.setAttribute("aria-label", "likes");
    likeNumber.textContent = `${media.likes}`;

    const heartBtn = document.createElement("button");
    heartBtn.classList.add("heart_link");
    heartBtn.setAttribute("aria-label", "Aimer ce média");
    heartBtn.setAttribute("role", "button");

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("heart");
    heartIcon.classList.add("far");
    heartIcon.classList.add("fa-heart");

    /*ACCESSIBILITE : J'attribue des descriptions, 
    label et textes alternatifs
    aux différents médias*/
    mediaImg.setAttribute("role", "button");
    mediaImg.setAttribute("title", `${media.title}`);
    mediaImg.href = "#";

    /*TEXTE ALTERNATIF MEDIAS*/
    mediaElement.setAttribute(
      "alt",
      ` Média ayant pour titre '${media.title}'`
    );
    heartBtn.setAttribute("tabindex", "0");
    likeNumber.setAttribute("tabindex", "0");
    likeNumber.setAttribute("aria-label", `Nombre de likes ${media.likes}`);

    /*JE RETOURNE ET AFFICHE MES ELEMENTS
    SUR MON HTML */
    gallery.append(galleryCard);
    galleryCard.append(mediaImg, mediaFooter);
    mediaImg.append(mediaElement);
    mediaFooter.append(mediaTitle, mediaLike);
    mediaLike.append(likeNumber, heartBtn);
    heartBtn.append(heartIcon);

    compteurLikes(totalLikes);

    /*COMPTABILISER LES LIKES*/
    function compteurLikes() {
      heartBtn.addEventListener("click", () => {
        if (heartIcon.classList.contains("fas")) {
          media.likes--;
          heartIcon.classList.remove("fas");
          heartIcon.classList.add("far");
          likeNumber.textContent = media.likes;
          displayLikesInfo();
        } else {
          media.likes++;
          heartIcon.classList.remove("far");
          heartIcon.classList.add("fas");
          likeNumber.textContent = media.likes;
          displayLikesInfo();
        }
      });
    }

    mediaImg.addEventListener("click", (e) => e.preventDefault());

    mediaImg.addEventListener("click", () =>
      displayLightbox(media, displayMediaList, currentPhotographer)
    );
    /*ACCESSIBILITE*/
    mediaImg.addEventListener("keyCode", (e) => {
      /*CODE TOUCHE ENTREE
      Si touche entrée activée sur un média 
      de la gallerie, lancer le diaporama
      */

      if (e.code === "13") {
        displayLightbox(media, displayMediaList, currentPhotographer);
      }
    });
  });
}

function displayLikesInfo() {
  const totalLikesSection = document.createElement("div");
  totalLikesSection.classList.add("total_section");
  const priceInfo = document.createElement("div");
  priceInfo.classList.add("price_info");
  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = `${currentPhotographer.price}€ / jour`;
  const totalLikesInfo = document.createElement("div");
  totalLikesInfo.classList.add("total_likes");
  totalLikesInfo.textContent = `${mediaList.getLikes()}`;

  const heartTotalCount = document.createElement("i");
  heartTotalCount.classList.add("fas");
  heartTotalCount.classList.add("fa-heart");
  heartTotalCount.classList.add("heart");
  heartTotalCount.classList.add("heart_total");

  main.append(totalLikesSection);
  totalLikesInfo.append(heartTotalCount);
  priceInfo.append(price);
  totalLikesSection.append(totalLikesInfo, priceInfo);
}

function launchPage() {
  document.title += " - " + currentPhotographer.name;

  displayProfile(currentPhotographer, displayMediaList);
  displayLikesInfo(displayMediaList);
  displayFilter(displayMediaList);
  displayMediaList();
}
