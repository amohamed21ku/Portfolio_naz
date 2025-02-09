// Continuous smooth scrolling functionality for the gallery
const gallery = document.querySelector('.gallery');
let isScrolling = false;
let scrollSpeed = 4; // Adjust scroll speed (pixels per frame)
let animationFrameId;

// Clone gallery items and append them to the gallery for seamless looping
function cloneGalleryItems() {
    const galleryItems = gallery.innerHTML; // Get all gallery items
    gallery.innerHTML += galleryItems; // Append a copy of the items
}

cloneGalleryItems(); // Call the function to clone items

// Function to start continuous scrolling
function startContinuousScroll() {
    if (isScrolling) return; // Prevent multiple loops
    isScrolling = true;

    function scrollGallery() {
        // Scroll to the right
        gallery.scrollBy({ left: scrollSpeed, behavior: 'auto' });

        // If near the end of the cloned items, reset scroll position seamlessly
        if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
            gallery.scrollTo({ left: 0, behavior: 'instant' });
        }

        animationFrameId = requestAnimationFrame(scrollGallery); // Continue scrolling
    }

    scrollGallery(); // Start the scrolling loop
}

// Function to stop continuous scrolling
function stopContinuousScroll() {
    cancelAnimationFrame(animationFrameId);
    isScrolling = false;
}

// Detect when the gallery section is in view
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start continuous scrolling when the gallery is in view
                startContinuousScroll();
            } else {
                // Stop continuous scrolling when the gallery is out of view
                stopContinuousScroll();
            }
        });
    },
    { threshold: 0.5 } // Trigger when 50% of the gallery is visible
);

// Observe the gallery section
observer.observe(gallery);

// Allow manual scrolling
let scrollTimeout;

gallery.addEventListener('scroll', () => {
    if (isScrolling) {
        stopContinuousScroll(); // Stop auto-scrolling if the user manually scrolls
    }

    // Restart continuous scrolling after manual scrolling stops
    clearTimeout(scrollTimeout); // Clear any existing timeout
    scrollTimeout = setTimeout(() => {
        if (!isScrolling) {
            startContinuousScroll(); // Restart continuous scrolling after a delay
        }
    }, 0); // Adjust the delay time (in milliseconds) as needed
});
