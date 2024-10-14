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
      max: options.max || 10,
      speed: options.speed || 300,
      reverse: options.reverse || false,
      reset: options.reset !== undefined ? options.reset : true,
      gyroscope: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      transition: true,
      perspective: 1000,
      scale: 1.05,
    });
  });
};

// Call Vanilla Tilt after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const menuLinks = document.querySelectorAll('.nav-link');
  const disableTiltSwitch = document.getElementById('disableTilt');
  const themeSwitch = document.getElementById('themeSwitch');
  const body = document.body;
  const tiltCard = document.querySelector('.tilt-card-container');
  const tiltElements = document.querySelectorAll(".tilt-card-container");

    // Theme switching logic
  const switchTheme = (isLight) => {
    const toggleClasses = (element, remove, add) => {
      element.classList.remove(...remove);
      element.classList.add(...add);
    };

    // Toggle body background and text colors
    toggleClasses(body, isLight ? ['bg-black', 'text-white'] : ['bg-white', 'text-black'], 
                      isLight ? ['bg-white', 'text-black'] : ['bg-black', 'text-white']);

    // Toggle tilt card background and border
    toggleClasses(tiltCard, isLight ? ['bg-black', 'border-white'] : ['bg-gray-200', 'border-black'], 
                          isLight ? ['bg-gray-200', 'border-black'] : ['bg-black', 'border-white']);

    // Toggle settings menu text color
    const settingsTextElements = document.querySelectorAll('.dropdown-content, label');
    settingsTextElements.forEach((element) => {
      toggleClasses(element, isLight ? ['text-white'] : ['text-black'], 
                            isLight ? ['text-black'] : ['text-white']);
    });

    // Update label to reflect current theme
    themeSwitch.nextElementSibling.textContent = isLight ? 'Dark Theme' : 'Light Theme';
  };

  // Handle menu clicks
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
      tiltElements.forEach((element) => {
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();  // Properly destroy tilt effect
        }
      });
    } else {
      initializeTiltWithSettings();  // Reinitialize tilt effect
    }
  });

    // Theme switch light/dark
  themeSwitch.addEventListener('change', (e) => {
  switchTheme(e.target.checked);
  });

  // Show About section by default
  const defaultSection = document.getElementById('about');
  defaultSection.classList.remove('hidden', 'opacity-0');

  // Initialize Vanilla Tilt on load
  loadVanillaTilt();
});
