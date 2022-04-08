function displayLightbox(media, displayMediaList, currentPhotographer) {
  let currentMedia = media;
  const lightbox = document.querySelector(".lightbox");
  const slider = document.querySelector(".slider");
  const closeBtn = document.querySelector(".close");
  const next = document.querySelector(".right");
  const previous = document.querySelector(".left");
  const lightboxMediaTitle = document.querySelector(".lightbox_media_title");
  const mediaImg = document.createElement("img");
  const mediaVideo = document.createElement("video");

  next.addEventListener("click", nextSlide);
  previous.addEventListener("click", previousSlide);
  closeBtn.addEventListener("click", closelightbox);

  /*NAVIGATION AU CLAVIER SUR LE DIAPORAMA*/
  lightbox.addEventListener("keydown", (e) => {
    /*Si touche "escape" activée, fermer la lightbox
    et revenir sur la page du photographe*/
    if (e.code === "Escape") {
      closelightbox(e, media);
    }
    /*Si touche ">" activée, passer au média 
    suivant*/
    if (e.code === "ArrowRight") {
      nextSlide(e);
    }
    /*Si touche "<" activée, revenir au média 
    précédent*/
    if (e.code === "ArrowLeft") {
      previousSlide(e);
    }
  });

  /*PASSER A LA DIAPO SUIVANTE*/
  /*La méthode indexOf() renvoie le premier indice pour lequel 
  on trouve un élément donné dans un tableau.*/
  function nextSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) + 1 >= displayMediaList.length) {
      currentMedia = displayMediaList[0];
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) + 1];
    }
    displayContent();
  }

  /*REVENIR A LA DIAPO PRECEDENTE*/
  function previousSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) <= +0) {
      currentMedia = displayMediaList[displayMediaList.length - 1];
      displayContent(currentMedia);
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) - 1];
      displayContent(currentMedia);
    }
  }

  /*FERMER LE DIAPORAMA*/
  function closelightbox() {
    const lightbox = document.querySelector(".lightbox");
    const main = document.querySelector(".main");
    /*Au clic sur l'icone "x", ma lightbox disparait (display "none")
    et je reviens sur la page du photographe (display "block")*/
    lightbox.style.display = "none";
    main.classList.remove("anti-scroll");
    main.style.display = "block";
  }

  displayContent(currentMedia);
  function displayContent() {
    if (currentMedia.type === "jpg") {
      mediaVideo.replaceWith(mediaImg);
      mediaImg.src = `../assets/medias/${currentPhotographer.getFileName()}/${
        currentMedia.link
      }`;
      lightboxMediaTitle.textContent = `${currentMedia.title}`;
      mediaImg.alt = currentMedia.alt;
      slider.appendChild(mediaImg);
    } else if (currentMedia.type === "mp4") {
      mediaVideo.src = `../assets/medias/${currentPhotographer.getFileName()}/${
        currentMedia.link
      }`;
      lightboxMediaTitle.textContent = `${currentMedia.title}`;

      mediaImg.replaceWith(mediaVideo);
      mediaVideo.setAttribute("alt", currentMedia.alt);
      mediaVideo.autoplay = true;
      mediaVideo.loop = true;
      slider.appendChild(mediaVideo);
    }
  }
}
function launchLightbox() {
  const main = document.querySelector(".main");
  const close = document.querySelector(".close");
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "flex";
  main.classList.add("anti-scroll");
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.setAttribute("tabindex", "0");
  main.setAttribute("aria-hidden", "true");
  main.setAttribute("tabindex", "-1");
  close.focus();
  main.style.display = "none";
}
export { displayLightbox, launchLightbox };
