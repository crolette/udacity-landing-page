const navigation = document.querySelector('nav'); // on va sélectionner l'élément nav pour pouvoir lui ajouter les éléments
const sectionNames = document.querySelectorAll('[data-section]'); // cherche tous les sélecteurs 'data-section'
const menuList = document.createElement('ul');


// // ratio qui doit être visible par l'observeur
const ratio = 0.6;

// recherche tous les éléments avec la classe section
const spies = document.querySelectorAll('.section-class');


// définition de la variable observeur, qui prendre la valeur de la partie de l'écran à observer
let observer = null;


// CREATION MENU

function createNavigation() {
  for(let i = 0; i < sectionNames.length; i++){

      // on ajoute le nom de l'id à la section sectionx
      sectionNames[i].id = `section${i+1}`;

      // Création d'une nouvelle puce de liste
      const newItemList = document.createElement('li');

      // Création d'un textNode avec le nom de la section pour le placer dans li
      const sectionName = document.createTextNode(sectionNames[i].dataset.section);

      // Création d'un élément link
      const link = document.createElement('a');
       //on attache le textNode au lien
      link.appendChild(sectionName);
       //on donne le textNode comme titre du lien
      link.title = sectionName.textContent;
       //on donne le nom du lien vers lequel il doit pointer
      link.href = "#section"+(i+1);

      newItemList.appendChild(link); // On attache le lien avec le texte à li
      menuList.appendChild(newItemList); // On attache li au menu
      navigation.appendChild(menuList); // On attache li dans le nav
  }
}

createNavigation();



// SECTION ACTIVE

// fonction qui va mettre la classe active à l'élément observé
const activate = function(elem) {
  //Retourne l'id de l'élément activé
  const id = elem.getAttribute('id');


  // Activation classe de la section active
  // Recherche toutes les sections qui ont la classe active-section
  const activeSections = document.getElementsByClassName('active-section');
  // Va supprimer la classe active-section de toutes les sections
  for (var i = 0; i < activeSections.length; i++) {
    activeSections[i].classList.remove('active-section')
  }

  // retourne la section visible
  const activeSection = document.getElementById(`${id}`);
  // ajoute la classe active-section
  activeSection.classList.add('active-section');


  // Activation classe du lien de la section active
  const anchor = document.querySelector(`a[href="#${id}"]`)
  //ajoute la classe active a l'élément observé

  if (anchor === null) {
    return null
  }

  // prend l'élément parent du lien pour y séléctionner tous les éléments qui ont une classe active
  const activeNav = document.querySelector('.navbar__menu');
  const activeLinks = activeNav.querySelectorAll('.active');
  //va enlever la classe active de chaque élément/node
  activeLinks.forEach(node => node.classList.remove('active'));
  //ajoute la classe active a l'élément observé
  anchor.classList.add('active');

};


// entries sont les éléments qui entrent et sortent de la zone d'affichage
const callback = function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      activate(entry.target);
    }
  })
};


// Fonction pour quand on redimensionne la fenêtre
const observe = function(elems) {
  if(observer !== null){
    // on va enlever l'observeur
    elems.forEach(elem => observer.unobserve(elem));
  }

  // bottom margin observeur
  const bottom = (window.innerHeight * ratio);

  // top margin observeur
  const top = (window.innerHeight - bottom - 1);

  observer = new IntersectionObserver(callback, {rootMargin: `-${top}px 0px -${bottom}px 0px`});

  spies.forEach(elem => observer.observe(elem));
}


// LOGIQUE

// on va vérifier qu'il y a bien des éléments à espionner, sinon pas la peine de créer d'observeur

if (spies.length > 0) {
  // appel à la fonction observe
  observe(spies);

  // vérifie si il y a une redimension, et si oui, appel à la fonction observe
  window.addEventListener('resize', function() {
      observe(spies);
    })
};



// BACK TO TOP BUTTON
const backToTopBtn = document.querySelector('#back-to-top');

// When the user scrolls down from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopBtn.classList.add('visible')
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
