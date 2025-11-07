let slideIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slides img").length;

function showSlides() {
  slideIndex++;
  if (slideIndex >= totalSlides) {
    slideIndex = 0;
  }

  slides.style.transform = `translateX(-${slideIndex * 100}%)`;

  setTimeout(showSlides, 4000); // every 3s
}

showSlides();
function openMenu() {
  document.getElementById("menuOverlay").style.width = "100%";
}
function closeMenu() {
  document.getElementById("menuOverlay").style.width = "0%";
}