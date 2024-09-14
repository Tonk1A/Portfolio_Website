import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const loadVanillaTilt = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js';
    script.onload = () => {
      // Initialize VanillaTilt after it has been loaded
      VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 200,
        glare: true,
        transition: false,
        reverse: true,
        "max-glare": 0.5
      });
    };
    document.head.appendChild(script);
  };
  
  loadVanillaTilt();
  