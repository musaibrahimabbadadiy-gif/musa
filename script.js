const main = document.querySelector('main');
const rotatorText = document.getElementById('rotatorText');
const heroSection = document.querySelector('.hero');
const aboutSection = document.getElementById('about');
const heroTemplate = heroSection ? heroSection.cloneNode(true) : null;

const startRotator = (rotatorElement) => {
  if (!rotatorElement) return;

  const phrases = [
    'Engr Musa Ibrahim',
    'I am a problem solver',
    'Skills: HTML • CSS • JavaScript • Python',
    'Career: Software Engineer',
    'Goals: Specialized AI Engineer'
  ];

  let currentIndex = 0;

  const rotateText = () => {
    rotatorElement.classList.remove('is-active');
    rotatorElement.classList.add('is-leaving');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      rotatorElement.textContent = phrases[currentIndex];
      rotatorElement.classList.remove('is-leaving');
      rotatorElement.classList.add('is-active');
    }, 450);
  };

  rotatorElement.classList.add('is-active');
  setInterval(rotateText, 3200);
};

const restoreHeroSection = () => {
  if (!main || !heroTemplate || !aboutSection) return;
  const existingHero = document.querySelector('.hero');
  if (existingHero) return;

  const restoredHero = heroTemplate.cloneNode(true);
  main.insertBefore(restoredHero, aboutSection);
  startRotator(restoredHero.querySelector('#rotatorText'));
};

if (rotatorText) {
  startRotator(rotatorText);
}

if (main) {
  const observer = new MutationObserver(() => {
    restoreHeroSection();
  });

  observer.observe(main, { childList: true, subtree: false });
}
