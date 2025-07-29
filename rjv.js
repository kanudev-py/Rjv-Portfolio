// NAVBAR HIDE ON SCROLL
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    navbar.style.top = "-100px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// TEXT REVEAL ON SCROLL
const secondImage = document.getElementById('SecondFrame');
const frontSecondText = document.getElementById('frontsecond');
const thirdText = document.querySelector('.thirdText h1');

function revealTextOnScroll() {
  const windowHeight = window.innerHeight;

  // Reveal frontsecond text near secondImage
  if (secondImage.getBoundingClientRect().bottom < windowHeight + 100) {
    frontSecondText.classList.add('visible-text');
  } else {
    frontSecondText.classList.remove('visible-text');
  }

  // Reveal thirdText when it's near viewport
  if (thirdText.getBoundingClientRect().top < windowHeight - 100) {
    thirdText.classList.add('visible-text');
  } else {
    thirdText.classList.remove('visible-text');
  }
}

window.addEventListener('scroll', revealTextOnScroll);
revealTextOnScroll(); // run once on load
