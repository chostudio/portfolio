// Function to check browser width and toggle video autoplay
function handleVideoAutoplay() {
  const videos = document.querySelectorAll('.projectGif');
  const screenWidth = window.innerWidth;

  videos.forEach(video => {
    if (screenWidth < 800) {
      video.removeAttribute('autoplay'); // Remove autoplay attribute for widths below 800px
    } else {
      video.setAttribute('autoplay', true); // Set autoplay attribute for other cases
    }
  });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  handleVideoAutoplay(); // Check on page load
  addResizeListener(); // Add listener for resize events
});