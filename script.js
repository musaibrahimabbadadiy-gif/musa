const avatar = document.getElementById('avatarCard');
const rotatorText = document.getElementById('rotatorText');

if (avatar) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  avatar.addEventListener('pointerdown', (event) => {
    isDragging = true;
    avatar.setPointerCapture(event.pointerId);
    const rect = avatar.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
  });

  avatar.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

    const parentRect = avatar.parentElement.getBoundingClientRect();
    const x = event.clientX - parentRect.left - offsetX;
    const y = event.clientY - parentRect.top - offsetY;

    avatar.style.transform = `translate(${x}px, ${y}px)`;
  });

  const stopDragging = () => {
    isDragging = false;
  };

  avatar.addEventListener('pointerup', stopDragging);
  avatar.addEventListener('pointerleave', stopDragging);
  avatar.addEventListener('pointercancel', stopDragging);
}

if (rotatorText) {
  const phrases = [
    'Engr Musa Ibrahim',
    'I am a problem solver',
    'Skills: HTML • CSS • JavaScript • Python',
    'Career: Software Engineer',
    'Goals: Specialized AI Engineer'
  ];

  let currentIndex = 0;

  const rotateText = () => {
    rotatorText.classList.remove('is-active');
    rotatorText.classList.add('is-leaving');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      rotatorText.textContent = phrases[currentIndex];
      rotatorText.classList.remove('is-leaving');
      rotatorText.classList.add('is-active');
    }, 450);
  };

  rotatorText.classList.add('is-active');
  setInterval(rotateText, 3200);
}
