const secondImage = document.getElementById('SecondFrame');
const frontSecondText = document.getElementById('frontsecond');
const thirdText = document.querySelector('.thirdText h1');
const cremeHeader = document.querySelector('.TitleThird h2');

function revealTextOnScroll() {
  const windowHeight = window.innerHeight;

  if (secondImage.getBoundingClientRect().bottom < windowHeight + 100) {
    frontSecondText.classList.add('visible-text');
  } else {
    frontSecondText.classList.remove('visible-text');
  }

  if (thirdText.getBoundingClientRect().top < windowHeight - 100) {
    thirdText.classList.add('visible-text');
  } else {
    thirdText.classList.remove('visible-text');
  }

  if (cremeHeader.getBoundingClientRect().top < windowHeight - 100) {
    cremeHeader.classList.add('visible-text');
  } else {
    cremeHeader.classList.remove('visible-text');
  }
}

window.addEventListener('scroll', revealTextOnScroll);
revealTextOnScroll();

window.addEventListener('scroll', () => {
  const backdrop = document.getElementById('backdrop1');
  const scrollTextContainer = document.querySelector('.scroll-text-container');

  const rect = backdrop.getBoundingClientRect();

  // If backdrop1 is in view, show scroll text
  if (rect.top <= 0 && rect.bottom > window.innerHeight) {
    scrollTextContainer.style.opacity = '1';
  } else {
    scrollTextContainer.style.opacity = '0';
  }
});

