// Inicjalizacja Plyr
const player = new Plyr('#player');

// Obsługa kliknięcia miniaturki
document.querySelectorAll('.video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const videoId = thumb.getAttribute('data-video-id');
        const iframe = document.querySelector('#player iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?origin=https://yourdomain.com&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&autoplay=1`;
    });
});

// Scroll do góry
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
