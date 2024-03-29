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

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  handleVideoAutoplay(); // Check on page load
  addResizeListener(); // Add listener for resize events
});

window.onresize = handleVideoAutoplay();