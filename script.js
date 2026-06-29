const main = document.querySelector('main');
const avatar = document.getElementById('avatarCard');
const rotatorText = document.getElementById('rotatorText');
const heroSection = document.querySelector('.hero');
const aboutSection = document.getElementById('about');
const heroTemplate = heroSection ? heroSection.cloneNode(true) : null;

const attachAvatarDrag = (avatarElement) => {
  if (!avatarElement) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const stopDragging = () => {
    isDragging = false;
  };

  avatarElement.addEventListener('pointerdown', (event) => {
    isDragging = true;
    avatarElement.setPointerCapture(event.pointerId);
    const rect = avatarElement.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
  });

  avatarElement.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

    const parentRect = avatarElement.parentElement.getBoundingClientRect();
    const x = event.clientX - parentRect.left - offsetX;
    const y = event.clientY - parentRect.top - offsetY;

    avatarElement.style.transform = `translate(${x}px, ${y}px)`;
  });

  avatarElement.addEventListener('pointerup', stopDragging);
  avatarElement.addEventListener('pointerleave', stopDragging);
  avatarElement.addEventListener('pointercancel', stopDragging);
};

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

  attachAvatarDrag(restoredHero.querySelector('#avatarCard'));
  startRotator(restoredHero.querySelector('#rotatorText'));
};

if (avatar) {
  attachAvatarDrag(avatar);
}

if (rotatorText) {
  startRotator(rotatorText);
}

if (main) {
  const observer = new MutationObserver(() => {
    restoreHeroSection();
  });

  observer.observe(main, { childList: true, subtree: false });
}
