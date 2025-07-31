let scrollProgress = 0;
let maxScroll = document.body.scrollHeight - window.innerHeight;

const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

function updateStrips() {
  const leftWrappers = document.querySelectorAll('.left-strip-wrapper');
  const rightWrappers = document.querySelectorAll('.right-strip-wrapper');
  const allStrips = document.querySelectorAll('.left-strip, .right-strip');

  progressBar.style.transform = `scaleX(${scrollProgress})`;

  const baseDistance = 70;
  const currentDistance = baseDistance * (1 - scrollProgress);

  leftWrappers.forEach((wrapper, index) => {
    const strip = wrapper.querySelector('.left-strip');
    const verticalOffset = Math.sin(scrollProgress * Math.PI * 1.5 + index * 0.5) * 15;
    wrapper.style.transform = `translateX(-${currentDistance}vw) translateY(${verticalOffset}px)`;
    const currentRotation = 2 * (1 - scrollProgress);
    const currentScale = 0.8 + scrollProgress * 0.3;
    strip.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
    strip.style.opacity = 0.5 + scrollProgress * 0.5;
  });

  rightWrappers.forEach((wrapper, index) => {
    const strip = wrapper.querySelector('.right-strip');
    const verticalOffset = Math.cos(scrollProgress * Math.PI * 1.5 + index * 0.5) * 15;
    wrapper.style.transform = `translateX(${currentDistance}vw) translateY(${verticalOffset}px)`;
    const currentRotation = -2 * (1 - scrollProgress);
    const currentScale = 0.8 + scrollProgress * 0.3;
    strip.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
    strip.style.opacity = 0.5 + scrollProgress * 0.5;
  });

  if (scrollProgress > 0.8) {
    allStrips.forEach((strip, index) => {
      const pulse = Math.sin(Date.now() * 0.003 + index) * 0.05 + 1;
      const currentTransform = strip.style.transform;
      strip.style.transform = currentTransform.replace(/scale\([^)]*\)/, `scale(${(0.7 + scrollProgress * 0.4) * pulse})`);
    });
  }
}

function handleScroll() {
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const backdrop1 = document.querySelector('#backdrop1');
  const scrollText = document.querySelector('.scroll-text');

  const backdrop1Top = backdrop1.offsetTop;
  const backdrop1Height = backdrop1.offsetHeight;

  if (scrollTop >= backdrop1Top && scrollTop <= backdrop1Top + backdrop1Height) {
    const progress = (scrollTop - backdrop1Top) / backdrop1Height;
    scrollProgress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1

    scrollText.style.opacity = '1';
    scrollText.style.pointerEvents = 'auto';
    requestAnimationFrame(updateStrips);
  } else {
    scrollProgress = 1;
    scrollText.style.opacity = '0';
    scrollText.style.pointerEvents = 'none';
  }
}

}


let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('resize', () => {
  maxScroll = document.body.scrollHeight - window.innerHeight;
  handleScroll();
});

document.addEventListener('mousemove', (e) => {
  if (scrollProgress > 0.6) {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll('.left-strip, .right-strip').forEach((strip, index) => {
      const intensity = 0.01 * (index % 3 + 1);
      const mouseOffsetX = mouseX * intensity * 15;
      const mouseOffsetY = mouseY * intensity * 8;
      const currentTransform = strip.style.transform;
      if (!currentTransform.includes('translate')) {
        strip.style.transform = currentTransform + ` translate(${mouseOffsetX}px, ${mouseOffsetY}px)`;
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
});

handleScroll();
