/*Je créé ma fonction qui va me permettre d'afficher le profil
de chaque photographe après clic sur les miniatures de ma page
principale regroupant l'ensemble des photographes
*/
function displayProfile(currentPhotographer, displayMediaList) {
  const urlParams = new URLSearchParams(window.location.search);

  /* Je créé les éléments concernant chaque photographe 
  dans ma section "header_profile"
 de ma page html
 */
  const photographerProfile = document.querySelector(".header_profile");
  const profileHeader = document.createElement("div");
  profileHeader.classList.add("profile");
  const infoSection = `
  <div class="profile_content">
                          <h1 class="profile_name">${currentPhotographer.name}</h1>
                          <h2 class="profile_localization">${currentPhotographer.city}, ${currentPhotographer.country}</h2>
                          <p class="profile_motto">${currentPhotographer.tagline}</p>
                      </div>
  <button class="contact_button" type="button" role="button" tabindex="0" onclick="displayModal()" 
  aria-label="Contacter le photographe ${currentPhotographer.name}" >Contactez-moi
        </button>
        <img src="../assets/medias/photographersID/${currentPhotographer.portrait}" class="profile_img" alt="Photo de profil du photographe ${currentPhotographer.name}">
  `;
  profileHeader.innerHTML = infoSection;
  photographerProfile.append(profileHeader);
}
export { displayProfile };
