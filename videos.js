// Function to check browser width and toggle video autoplay
function handleVideoAutoplay() {
  const videos = document.querySelectorAll('.projectGif');
  const screenWidth = window.innerWidth;

  videos.forEach(video => {
    if (screenWidth > 1000) {
      video.setAttribute('autoplay', true);
      video.setAttribute('loop', true);
    }
    else {
      video.setAttribute('controls', true);
    }
  });
}

function initProjectObserver() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the card is visible
    rootMargin: "0px 0px -50px 0px"
  });

  const projectCards = document.querySelectorAll('.projectCard');
  projectCards.forEach((card, index) => {
    // Add a slight transition delay based on grid column if we want a stagger effect
    // By default, just relying on scroll works well, but we can add a small base delay
    card.style.transitionDelay = `${(index % 3) * 0.1}s`;
    observer.observe(card);
  });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  handleVideoAutoplay(); // Check on page load
  initProjectObserver(); // Initialize scroll fade-in
});

window.addEventListener('resize', handleVideoAutoplay);