// Updated script.js
const gallery = document.querySelector('.gallery');
let isScrolling = false;
let scrollSpeed = 2; // Scroll speed for desktop
let animationFrameId;

// Function to detect mobile devices
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Clone gallery items for seamless looping (only for desktop)
if (!isMobileDevice()) {
    function cloneGalleryItems() {
        const galleryItems = gallery.innerHTML;
        gallery.innerHTML += galleryItems;
    }
    cloneGalleryItems();
}

// Function to start continuous scrolling (only for desktop)
function startContinuousScroll() {
    if (isScrolling || isMobileDevice()) return; // Disable auto-scrolling on mobile
    isScrolling = true;

    function scrollGallery() {
        gallery.scrollLeft += scrollSpeed;
        if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
            gallery.scrollLeft = 0;
        }
        animationFrameId = requestAnimationFrame(scrollGallery);
    }
    scrollGallery();
}

// Function to stop scrolling
function stopContinuousScroll() {
    cancelAnimationFrame(animationFrameId);
    isScrolling = false;
}
// Function to detect mobile devices
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to autoplay videos in view
function playVideosInView() {
    const videos = document.querySelectorAll('.gallery video');
    videos.forEach(video => {
        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );
        videoObserver.observe(video);
    });
}

// Initialize video autoplay when the gallery is in view
const gallery = document.querySelector('.gallery');
if (gallery) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playVideosInView();
                }
            });
        },
        { threshold: 0.5 }
    );
    observer.observe(gallery);
}
