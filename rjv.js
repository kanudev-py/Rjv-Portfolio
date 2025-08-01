// ==============================
// 1. Scroll Reveal Logic
// ==============================
const secondImage = document.getElementById('SecondFrame');
const frontSecondText = document.getElementById('frontsecond');
const thirdText = document.querySelector('.thirdText h1');
const cremeHeader = document.querySelector('.TitleThird h2');
const backdrop2Text = document.querySelector('.backdrop2-text');


function revealTextOnScroll() {
  const windowHeight = window.innerHeight;

  if (secondImage && secondImage.getBoundingClientRect().bottom < windowHeight + 100) {
    frontSecondText.classList.add('visible-text');
  } else if (frontSecondText) {
    frontSecondText.classList.remove('visible-text');
  }

  if (thirdText && thirdText.getBoundingClientRect().top < windowHeight - 100) {
    thirdText.classList.add('visible-text');
  } else if (thirdText) {
    thirdText.classList.remove('visible-text');
  }

  if (cremeHeader && cremeHeader.getBoundingClientRect().top < windowHeight - 100) {
    cremeHeader.classList.add('visible-text');
  } else if (cremeHeader) {
    cremeHeader.classList.remove('visible-text');
  }

  if (backdrop2Text && backdrop2Text.getBoundingClientRect().top < windowHeight - 100) {
  backdrop2Text.classList.add('visible-text');
} else if (backdrop2Text) {
  backdrop2Text.classList.remove('visible-text');
}

}

window.addEventListener('scroll', revealTextOnScroll);
revealTextOnScroll();

// ==============================
// 2. Stripe Scroll Animation Logic (Starts Early)
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('backdrop1');
  const stripes = document.querySelectorAll('.stripe');

  if (!backdrop || stripes.length === 0) return;

  const initialOffsets = Array.from(stripes).map((_, i) => ({
    [i % 2 === 0 ? 'left' : 'right']: '-100%',
    angle: (i % 2 === 0 ? -6 : 5) + (Math.random() * 2 - 1),
  }));

  const finalOffsets = Array.from(stripes).map((_, i) => ({
    [i % 2 === 0 ? 'left' : 'right']: '5%',
    angle: (i % 2 === 0 ? -2 : 1) + (Math.random() * 2 - 1),
  }));

  let targetScroll = 0;
  let currentScroll = 0;

  function updateScrollTarget() {
    const rect = backdrop.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.9; // Start animation when 10% of backdrop is visible

    if (rect.top < threshold && rect.bottom > 0) {
      const scrollRange = rect.height - windowHeight;
      const progress = Math.min(Math.max((threshold - rect.top) / scrollRange, 0), 1);
      targetScroll = progress;
    }
  }

  function animateStripes() {
    currentScroll += (targetScroll - currentScroll) * 0.1;

    stripes.forEach((stripe, i) => {
      const initial = initialOffsets[i];
      const final = finalOffsets[i];

      let left = initial.left && final.left
        ? `calc(${initial.left} + (${parseFloat(final.left) - parseFloat(initial.left)}% * ${currentScroll}))`
        : 'auto';

      let right = initial.right && final.right
        ? `calc(${initial.right} + (${parseFloat(final.right) - parseFloat(initial.right)}% * ${currentScroll}))`
        : 'auto';

      let angle = initial.angle + (final.angle - initial.angle) * currentScroll;

      stripe.style.left = left;
      stripe.style.right = right;
      stripe.style.setProperty('--angle', `${angle}deg`);
      stripe.style.opacity = Math.min(1, currentScroll * 2);
    });

    requestAnimationFrame(animateStripes);
  }

  window.addEventListener('scroll', updateScrollTarget);
  window.addEventListener('resize', updateScrollTarget);

  updateScrollTarget();
  animateStripes();
});

// ==============================
// 3. Navbar Hide/Show on Scroll
// ==============================
let lastScrollTop = 0;
const navbar = document.getElementById('navbar'); // Fixed selector to use ID

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop + 10) {
    // Scrolling down
    if (navbar) navbar.style.transform = 'translateY(-100%)';
  } else if (scrollTop < lastScrollTop - 10) {
    // Scrolling up
    if (navbar) navbar.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollTop;
});