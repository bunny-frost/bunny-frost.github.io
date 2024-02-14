const hamburgerMenu = document.querySelector(".hamburger-menu");
// Get the navigation links container
const navLinksContainer = document.querySelector(".nav-links");

// Toggle the visibility of the navigation links
hamburgerMenu.addEventListener("click", function () {
  navLinksContainer.classList.toggle("show");
});
