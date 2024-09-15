// VanillaTilt.js
const loadVanillaTilt = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js';
  script.onload = initializeTiltWithSettings; 
  document.head.appendChild(script);
};
const initializeTiltWithSettings = (options = {}) => {
  const tiltElements = document.querySelectorAll(".tilt-card-container");

  tiltElements.forEach((element) => {
    if (element.vanillaTilt) {
      element.vanillaTilt.destroy();
    }

    VanillaTilt.init(element, {
      max: options.max || 15,
      speed: options.speed || 300,
      reverse: options.reverse || false,
      reset: options.reset !== undefined ? options.reset : true,
      transition: true,
      perspective: 1000,
      scale: 1.05,
    });
  });
};
loadVanillaTilt();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const menuLinks = document.querySelectorAll('.nav-link');
  const disableTiltSwitch = document.getElementById('disableTilt');
  const themeSwitch = document.getElementById('themeSwitch');
  const body = document.body;
  const tiltCard = document.querySelector('.tilt-card-container');

  // Menu hadler(change section)
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      sections.forEach(section => {
        section.classList.add('opacity-0');
        setTimeout(() => section.classList.add('hidden'), 500);
      });

      setTimeout(() => {
        targetSection.classList.remove('hidden');
        setTimeout(() => targetSection.classList.remove('opacity-0'), 50);
      }, 500);
    });
  });

  // Disable Tilt
  disableTiltSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      const tiltElements = document.querySelectorAll(".tilt-card-container");
      tiltElements.forEach((element) => {
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      });
    } else {
      initializeTiltWithSettings();
    }
  });

  // Theme switch light/dark
  themeSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      body.classList.remove('bg-black', 'text-white');
      body.classList.add('bg-white', 'text-black');
      tiltCard.classList.remove('bg-black', 'border-white');
      tiltCard.classList.add('bg-gray-200', 'border-black');
    } else {
      body.classList.remove('bg-white', 'text-black');
      body.classList.add('bg-black', 'text-white');
      tiltCard.classList.remove('bg-gray-200', 'border-black');
      tiltCard.classList.add('bg-black', 'border-white');
    }
  });

  // Show About by default
  const defaultSection = document.getElementById('about');
  defaultSection.classList.remove('hidden', 'opacity-0');
});