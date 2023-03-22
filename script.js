// Add/remove class on scroll
const targetDiv = document.querySelector('.scroll-reveal');

window.addEventListener('scroll', () => {
  const targetDivRect = targetDiv.getBoundingClientRect();

  if (
    targetDivRect.top <= window.innerHeight - 800 &&
    targetDivRect.bottom >= 100
  ) {
    targetDiv.classList.add('css-filter');
  } else {    
    targetDiv.classList.remove('css-filter');
  }
});

// == Light Types Vertical Slider == //
const slider = document.querySelector('.light-types--slider');
const slides = document.querySelector('.light-types--slides');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationId = 0;
let currentIndex = 0;

slides.addEventListener('mousedown', onStart);
slides.addEventListener('mouseup', onEnd);
slides.addEventListener('mouseleave', onEnd);
slides.addEventListener('mousemove', onMove);

slides.addEventListener('touchstart', onStart);
slides.addEventListener('touchend', onEnd);
slides.addEventListener('touchcancel', onEnd);
slides.addEventListener('touchmove', onMove);

function onStart(event) {
  if (event.type === 'touchstart') {
    startPosition = event.touches[0].clientY;
    event.preventDefault();
  } else {
    startPosition = event.clientY;
    slides.style.cursor = 'grabbing';
  }
  isDragging = true;
  animationId = requestAnimationFrame(animation);
}

function onEnd(event) {
  cancelAnimationFrame(animationId);
  isDragging = false;
  const touchEnd = event.type === 'touchend' || event.type === 'touchcancel';
  if (touchEnd) {
    const currentPosition = event.changedTouches[0].clientY;
    previousTranslate = currentTranslate;
    if (currentPosition < startPosition) {
      currentIndex += 1;
    } else if (currentPosition > startPosition) {
      currentIndex -= 1;
    }
    setPositionByIndex();
  } else {
    slides.style.cursor = 'grab';
  }
}

function onMove(event) {
  if (isDragging) {
    const currentPosition = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
    currentTranslate = previousTranslate + currentPosition - startPosition;
  }
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slides.style.transform = `translateY(${currentTranslate}px)`;
}

function setPositionByIndex() {
  const maxIndex = slides.children.length - 1;
  currentIndex = Math.min(currentIndex, maxIndex);
  currentTranslate = currentIndex * -150;
  previousTranslate = currentTranslate;
  setSliderPosition();
}

// === Moonrays Styles Section Horizontal Slider == //
const sliders = document.querySelectorAll('.slider-container');

sliders.forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
  });
});

// Copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();