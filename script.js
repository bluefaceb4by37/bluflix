/* ====== SCRIPT.JS ====== */

// Płynne przewijanie po kliknięciu w linki
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    navbar.classList.toggle('sticky', window.scrollY > 0);
});

// Efekt pojawiania się sekcji
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Przycisk scroll do góry
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

// Lazy loading dla iframe
document.addEventListener("DOMContentLoaded", function() {
    const iframes = document.querySelectorAll("iframe[data-src]");

    const lazyLoad = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.getAttribute("data-src");
                observer.unobserve(iframe);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, {
        rootMargin: "0px 0px 200px 0px",
        threshold: 0
    });

    iframes.forEach(iframe => {
        observer.observe(iframe);
    });
});
