document.addEventListener('DOMContentLoaded', () => {
  const backdropSection = document.getElementById('backdrop-section');
  const stripes = document.querySelectorAll('.stripe');

  const initialOffsets = [
    { left: '-100%', angle: -6 },
    { right: '-100%', angle: 5 },
    { left: '-100%', angle: -4 },
    { right: '-100%', angle: 3 },
    { left: '-100%', angle: -5 },
  ];

  const finalOffsets = [
    { left: '5%', angle: -2 },
    { right: '5%', angle: 1 },
    { left: '5%', angle: 0 },
    { right: '5%', angle: 1 },
    { left: '5%', angle: -1 },
  ];

  function updateStripePositions() {
    const rect = backdropSection.getBoundingClientRect();
    const scrollProgress = Math.min(
      Math.max(-rect.top / (rect.height - window.innerHeight), 0),
      1
    );

    stripes.forEach((stripe, i) => {
      const initial = initialOffsets[i];
      const final = finalOffsets[i];

      let left = initial.left && final.left
        ? `calc(${initial.left} + (${parseFloat(final.left) - parseFloat(initial.left)}% * ${scrollProgress}))`
        : 'auto';

      let right = initial.right && final.right
        ? `calc(${initial.right} + (${parseFloat(final.right) - parseFloat(initial.right)}% * ${scrollProgress}))`
        : 'auto';

      let angle = initial.angle + (final.angle - initial.angle) * scrollProgress;

      stripe.style.left = left;
      stripe.style.right = right;
      stripe.style.setProperty('--angle', `${angle}deg`);
      stripe.style.opacity = Math.min(1, scrollProgress * 2);
    });
  }

  window.addEventListener('scroll', updateStripePositions);
  window.addEventListener('resize', updateStripePositions);
  updateStripePositions();
});
