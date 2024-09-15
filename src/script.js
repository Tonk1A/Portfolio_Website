// Load VanillaTilt
const loadVanillaTilt = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js';
  script.onload = initializeTiltWithSettings; // Initialize after the script loads
  document.head.appendChild(script);
};

// Initialize VanillaTilt with settings
const initializeTiltWithSettings = (options = {}) => {
  const tiltElements = document.querySelectorAll(".tilt-card-container");

  tiltElements.forEach((element) => {
    if (element.vanillaTilt) {
      element.vanillaTilt.destroy(); // Destroy previous instance if it exists
    }

    VanillaTilt.init(element, {
      max: options.max || 15,            // Reduced max tilt to reduce edge intensity
      speed: options.speed || 300,
      reverse: options.reverse || false,         // Can be set to true for reverse tilt effect
      reset: options.reset !== undefined ? options.reset : true,
      transition: true,                // Enable smooth transition between mouse movements
      perspective: 1000,               // Higher perspective for less distortion at the edges
      scale: 1.05,                     // Slight scale for a zoom-in effect during hover
    });
  });
};

// Call this function after the script loads to set up the tilt
loadVanillaTilt();

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const menuLinks = document.querySelectorAll('.nav-link');
  const disableTiltSwitch = document.getElementById('disableTilt');
  const themeSwitch = document.getElementById('themeSwitch');
  const body = document.body;
  const tiltCard = document.querySelector('.tilt-card-container');

  // Handle menu links to switch between sections
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      // Hide all sections
      sections.forEach(section => {
        section.classList.add('opacity-0');
        setTimeout(() => section.classList.add('hidden'), 500);
      });

      // Show target section
      setTimeout(() => {
        targetSection.classList.remove('hidden');
        setTimeout(() => targetSection.classList.remove('opacity-0'), 50);
      }, 500);
    });
  });

  // Disable Tilt Effect
  disableTiltSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      // Destroy tilt when disabled
      const tiltElements = document.querySelectorAll(".tilt-card-container");
      tiltElements.forEach((element) => {
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy(); // Destroy the instance
        }
      });
    } else {
      // Reinitialize with default settings
      initializeTiltWithSettings();
    }
  });

  // Theme Switcher: Light/Dark Theme
  themeSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      // Light Theme
      body.classList.remove('bg-black', 'text-white');
      body.classList.add('bg-white', 'text-black');
      tiltCard.classList.remove('bg-black', 'border-white');
      tiltCard.classList.add('bg-gray-200', 'border-black');
    } else {
      // Dark Theme
      body.classList.remove('bg-white', 'text-black');
      body.classList.add('bg-black', 'text-white');
      tiltCard.classList.remove('bg-gray-200', 'border-black');
      tiltCard.classList.add('bg-black', 'border-white');
    }
  });

  // Optionally, show the About section by default
  const defaultSection = document.getElementById('about');
  defaultSection.classList.remove('hidden', 'opacity-0');
});