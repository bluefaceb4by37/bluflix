document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrapper');
  setTimeout(() => loader.style.display = 'none', 1000);

  const movies = [
    { id: 1, title: "B.A.D. POP - ZOLTY JESIENNY LISC", yt: "B2qxIb96rvQ" },
    { id: 2, title: "POPEK & DENIS & EW SZATANSKIE DISCO LOVE SONG", yt: "H1Tfu59UHH4" },
    { id: 3, title: "Trelinka u Szwagra - Video Dowcip", yt: "tV05n63jMjA" },
    { id: 4, title: "20.000.000 PLN BUGATTI CHIRON w Warszawie! 🤩 1500 HP + wywiad z właścicielem (biznesman)", yt: "ycoDUc0kRJo" },
    { id: 5, title: "Film 5", yt: "GTXUFRbyaZk" },
    { id: 6, title: "Film 6", yt: "A9fXR18kl0k" },
    { id: 7, title: "Film 7", yt: "gkbxUiSb3HQ" },
    { id: 8, title: "Film 8", yt: "JTPbgHFo8cI" },
    { id: 9, title: "Film 9", yt: "8PX1dTttb9s" },
    { id: 10, title: "Film 10", yt: "p_MWCtzKrkI" },
    { id: 11, title: "Film 11", yt: "lP-cV4crIoY" },
    { id: 12, title: "Film 12", yt: "v3-4_4-owXI" },
    { id: 13, title: "Film 13", yt: "A2lZRQbVO20" },
    { id: 14, title: "Film 14", yt: "Kh6opRJ9_M0" },
    { id: 15, title: "Film 15", yt: "mgQVD6QUVBE" },
    { id: 16, title: "Film 16", yt: "vJj4ktxMDhQ" },
    { id: 17, title: "Film 17", yt: "z4Utm5VJCZE" },
    { id: 18, title: "Film 18", yt: "pLBCIKtM8_Q" }
  ];

  const gallery = document.getElementById('movieGallery');
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${movie.yt}/0.jpg" alt="${movie.title}">
      <div class="movie-title">${movie.title}</div>
    `;
    card.onclick = () => window.location.href = `film.html?id=${movie.id}`;
    gallery.appendChild(card);
  });

  // Licznik odwiedzin
  let visits = localStorage.getItem('visit-count') || 0;
  visits++;
  localStorage.setItem('visit-count', visits);
  document.getElementById('visit-count').innerText = visits;

  // Scroll top
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  };
  scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Dark mode toggle
  const toggle = document.getElementById('toggle-theme');
  toggle.onclick = () => document.body.classList.toggle('dark');
});
