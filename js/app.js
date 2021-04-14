 // select the nav element to add the elements titles/links
const navigation = document.querySelector('nav');

// select all section with [data-section]
const sectionNames = document.querySelectorAll('[data-section]');
const menuList = document.createElement('ul');


// ratio for the observer
const ratio = 0.6;

// selet all elements with the class '.section-class'
const spies = document.querySelectorAll('.section-class');


// variable observer : will take the value of the part of the screen to observe
let observer = null;


// CREATION MENU

function createNavigation() {
  for(let i = 0; i < sectionNames.length; i++){

      // add the id name to the section
      sectionNames[i].id = `section${i+1}`;

      // create the new li element
      const newItemList = document.createElement('li');

      // textNode creation with the name of the section contained in [data-section] to add to the li element
      const sectionName = document.createTextNode(sectionNames[i].dataset.section);

      // create link element
      const link = document.createElement('a');
       // append the name of the section to the link
      link.appendChild(sectionName);
       // append the name of the section to the title of the link
      link.title = sectionName.textContent;
       // add the href link with the section to point
      link.href = "#section"+(i+1);

      newItemList.appendChild(link); // append link to li
      menuList.appendChild(newItemList); // append li to the menu
      navigation.appendChild(menuList); // append menu to nav
  }
}

createNavigation();



// ACTIVE SECTION

// fonction that will add the active class to the observed section
  const activate = function(elem) {
  // get the id of the element
  const id = elem.getAttribute('id');


  // first we need to remove all active classes from the sections to be sure that 2 sections will not be active
  // get all elements with the class active-section
  const activeSections = document.getElementsByClassName('active-section');
  // delete the class active-section from all sections
  for (var i = 0; i < activeSections.length; i++) {
    activeSections[i].classList.remove('active-section')
  }

  // get the id from the visible section
  const activeSection = document.getElementById(`${id}`);
  // add the active-section class to the section
  activeSection.classList.add('active-section');


  // get the link from the active section
  const anchor = document.querySelector(`a[href="#${id}"]`)

  // if no link is active, return null
  if (anchor === null) {
    return null
  }

  // get the parent element from the link to remove the active class from all links and add the new active link

  const activeNav = document.querySelector('.navbar__menu');
  const activeLinks = activeNav.querySelectorAll('.active');
  // remove the active class from every link
  activeLinks.forEach(node => node.classList.remove('active'));
  // add the active class to the link
  anchor.classList.add('active');

};


// entries are the elements in the visible viewport
const callback = function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      activate(entry.target);
    }
  })
};


// function to reinitialise the observer when we resize the window
const observe = function(elems) {
  if(observer !== null){
    // remove the observer
    elems.forEach(elem => observer.unobserve(elem));
  }
console.log(spies);
  // bottom margin observer
  const bottom = (window.innerHeight * ratio);

  // top margin observer
  const top = (window.innerHeight - bottom - 1);

  // set the IntersectionObserver
  observer = new IntersectionObserver(callback, {rootMargin: `-${top}px 0px -${bottom}px 0px`});

  spies.forEach(elem => observer.observe(elem));
}


// LOGIC

// we will check if there are elements to spy (section with the class section-class)

if (spies.length > 0) {
  // call the observe function
  observe(spies);

  // check if the window has been resized, if so, call the resize function
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
