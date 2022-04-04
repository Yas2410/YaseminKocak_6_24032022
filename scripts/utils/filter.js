export function displayFilter(displayMediaList) {
  /*Je récupère dans ma section html de mon filtre, les éléments
  (les classes) qui vont intéragir afin de filter les médias
  */
  const dropdownFilter = document.querySelector(".dropdown");
  const sortChoices = document.querySelector(".sort_choices");
  const sortChoicesListbox = document.querySelector(".sort_choices_listbox");
  const sortChoicesLaunch = document.querySelector(".launch_sort_choices");
  const filterOptions = document.querySelectorAll(".filter_option");

  /*Je cible l'élément "a" qui fait référence 
  au premier enfant de mon élément parent.
  */
  const firstFilterOption = document.querySelector(
    ".sort_choices a:first-child"
  );
  /*Je cible l'élément "a" qui fait référence 
  au dernier enfant de mon élément parent.
  */
  const lastFilterOption = document.querySelector(".sort_choices a:last-child");

  /* Au clic sur ma div "dropdown",
  je parcours le tableau contenant les différentes options
  */
  for (const filter of filterOptions) {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      /*Dans le cas ou la classe "selected" est absente de 
      l'un de mes filtres, je selectionne le parent contenant la
      classe de ma const selected*/
      if (!this.classList.contains("selected")) {
        const selected = this.parentNode.querySelector(
          ".filter_option.selected"
        );

        selected.classList.remove("selected");
        this.classList.add("selected");
        this.setAttribute("aria-selected", "true");

        /* Le filtre selectionné se retrouve en tête de liste;
  Les autres options sont cachées
  */
        this.closest(".sort_choices").querySelector(
          ".launch_sort_choices span"
        ).textContent = this.textContent;
        hideDropdown();
        displayMediaList();
      }
    });
  }

  /*Au clic sur le menu de filtre,
  Si le filtre selectionné contient la class ".open",
  alors ferme le menu déroulant;
  A l'inverse, affiche le menu avec l'ensemble des options (filtres)
  */
  dropdownFilter.addEventListener("click", function (e) {
    e.preventDefault();
    if (sortChoices.classList.contains("open")) {
      hideDropdown();
    } else {
      displayDropdown();
    }
  });

  /*OUVRIR LE MENU DES FILTRES
  Avec l'ajout de ma classe "open"
  aria-expended : true = le menu est "déplié"
  */
  const dropdown = document.querySelector(".btn_down");
  const dropup = document.querySelector(".btn_up");

  dropdown.addEventListener("click", function (e) {
    sortChoicesListbox.style.display = "block";
    dropdown.style.display = "none";
    dropup.style.display = "block";
  });

  /*FERMER LE MENU DES FILTRES
  avec la suppression de ma classe "open"
   aria-expended : true = le menu n'apparait pas
  */
  function hideDropdown() {
    sortChoices.classList.remove("open");
    sortChoicesLaunch.setAttribute("aria-expanded", "false");
    dropdown.style.display = "block";
    dropup.style.display = "none";
    sortChoicesListbox.style.display = "none";
  }
  function displayDropdown() {
    sortChoices.classList.add("open");
    sortChoicesLaunch.setAttribute("aria-expanded", "true");
  }

  /*
ACCESSIBILITE AU CLAVIER DU MENU 
DEROULANT DES FILTRES
KEYDOWN : Lorsqu'une touche est enfoncée
  */
  lastFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && !e.shiftKey) {
      hideDropdown();
    }
  });

  firstFilterOption.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && e.shiftKey) {
      hideDropdown();
    }
  });

  window.addEventListener("click", function (e) {
    if (!sortChoices.contains(e.target)) {
      hideDropdown();
    }
  });
}
