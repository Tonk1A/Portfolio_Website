// Hide loading screen after load
window.onload = function() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('opacity-0', 'transition-opacity', 'duration-500');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 500);  // Matches the duration of the transition
};


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
      max: options.max || 5,
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

// Function to show the modal and display the full image
function showModal(imageSrc) {
  const modal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('modalImage');

  modalImage.src = imageSrc; // Set the full certificate image
  modal.classList.remove('hidden'); // Show the modal

  // Apply tilt effect to modal if tilt is not disabled
  if (!document.getElementById('disableTilt').checked) {
    initializeTiltForModal();
  }
}

// Function to hide the modal when clicking outside of it
document.getElementById('certificateModal').addEventListener('click', hideModal);

function hideModal() {
  const modal = document.getElementById('certificateModal');
  modal.classList.add('hidden'); // Hide the modal

  // Destroy tilt effect on the modal when hiding
  destroyModalTilt();
}

// Initialize tilt effect for the modal
function initializeTiltForModal() {
  const modalContent = document.querySelector('.modal-content');
  VanillaTilt.init(modalContent, {
    max: 10,
    speed: 300,
    reverse: false,
    reset: true,
    gyroscope: true,
    scale: 1.05,
  });
}

// Destroy tilt effect on the modal
function destroyModalTilt() {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent.vanillaTilt) {
    modalContent.vanillaTilt.destroy();
  }
}

// Theme switch logic
const switchTheme = (isLight) => {
  const body = document.body;
  const tiltCard = document.querySelector('.tilt-card-container');
  const settingsMenu = document.querySelector('.dropdown-content');

  // Toggle Tailwind classes for light/dark theme
  body.classList.toggle('bg-primary', !isLight);
  body.classList.toggle('bg-white', isLight);
  body.classList.toggle('text-primary-content', !isLight);
  body.classList.toggle('text-black', isLight);

  // Set tilt card background and border
  tiltCard.classList.toggle('bg-primary', !isLight);
  tiltCard.classList.toggle('bg-white', isLight);
  tiltCard.classList.toggle('border-white', !isLight);
  tiltCard.classList.toggle('border-black', isLight);

  // Set settings menu background and text colors
  settingsMenu.classList.toggle('bg-primary', !isLight);
  settingsMenu.classList.toggle('bg-white', isLight);
  settingsMenu.classList.toggle('text-primary-content', !isLight);
  settingsMenu.classList.toggle('text-black', isLight);

  // Change the background image based on the theme
  const backgroundImage = isLight ? "url('./src/assets/images/day.webp')" : "url('./src/assets/images/night.webp')";
  body.style.backgroundImage = backgroundImage;

  // Update label for the theme switch
  const themeSwitchLabel = document.querySelector('label[for="themeSwitch"]');
  themeSwitchLabel.textContent = isLight ? 'Dark Theme' : 'Light Theme';
};

// Initialize background based on the current theme
const initializeBackground = () => {
  const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
  const body = document.body;

  // Apply the background on page load based on the theme
  const backgroundImage = isLightTheme ? "url('./src/assets/images/day.webp')" : "url('./src/assets/images/night.webp')";
  body.style.backgroundImage = backgroundImage;
};

// Handle section visibility
const handleSectionVisibility = () => {
  const sections = document.querySelectorAll('main .section');
  const menuLinks = document.querySelectorAll('.nav-link');

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      sections.forEach(section => {
        section.classList.add('opacity-0');
        section.classList.add('hidden');
      });

      targetSection.classList.remove('hidden');
      setTimeout(() => {
        targetSection.classList.remove('opacity-0');
      }, 50);
    });
  });
};

// Handle theme switch event
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('themeSwitch');
  const disableTiltSwitch = document.getElementById('disableTilt');
  const tiltElements = document.querySelectorAll(".tilt-card-container");

  // Initialize Vanilla Tilt
  loadVanillaTilt();

  // Initialize background on page load
  initializeBackground();

  // Switch theme on toggle
  themeSwitch.addEventListener('change', (e) => {
    switchTheme(e.target.checked);
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

  // Handle section visibility
  handleSectionVisibility();

  // Show About section by default
  const defaultSection = document.getElementById('about');
  defaultSection.classList.remove('hidden', 'opacity-0');
});

// Handle disabling tilt globally
document.getElementById('disableTilt').addEventListener('change', (e) => {
  const modal = document.querySelector('.modal-content');
  if (e.target.checked) {
    // Disable tilt on modal
    destroyModalTilt();
  } else {
    // Re-enable tilt on modal
    initializeTiltForModal();
  }
});
