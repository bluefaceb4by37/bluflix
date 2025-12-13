document.addEventListener('DOMContentLoaded', () => {
  // Data
  const movies = [
    { id: 1, title: "Film 1", yt: "B2qxIb96rvQ", year: 2021 },
    { id: 2, title: "Film 2", yt: "H1Tfu59UHH4", year: 2020 },
    { id: 3, title: "Film 3", yt: "tV05n63jMjA", year: 2019 },
    { id: 4, title: "Film 4", yt: "ycoDUc0kRJo", year: 2022 },
    { id: 5, title: "Film 5", yt: "GTXUFRbyaZk", year: 2023 },
    { id: 6, title: "Film 6", yt: "A9fXR18kl0k", year: 2018 },
    { id: 7, title: "Film 7", yt: "gkbxUiSb3HQ", year: 2020 },
    { id: 8, title: "Film 8", yt: "JTPbgHFo8cI", year: 2017 },
    { id: 9, title: "Film 9", yt: "8PX1dTttb9s", year: 2016 },
    { id: 10, title: "Film 10", yt: "p_MWCtzKrkI", year: 2015 },
    { id: 11, title: "Film 11", yt: "lP-cV4crIoY", year: 2014 },
    { id: 12, title: "Film 12", yt: "v3-4_4-owXI", year: 2013 },
    { id: 13, title: "Film 13", yt: "A2lZRQbVO20", year: 2012 },
    { id: 14, title: "Film 14", yt: "Kh6opRJ9_M0", year: 2011 },
    { id: 15, title: "Film 15", yt: "mgQVD6QUVBE", year: 2010 },
    { id: 16, title: "Film 16", yt: "vJj4ktxMDhQ", year: 2009 },
    { id: 17, title: "Film 17", yt: "z4Utm5VJCZE", year: 2008 },
    { id: 18, title: "Film 18", yt: "pLBCIKtM8_Q", year: 2007 }
  ];

  // Elements
  const loader = document.querySelector('.loader-wrapper');
  const gallery = document.getElementById('movieGallery');
  const myListGallery = document.getElementById('myListGallery');
  const visitCountEl = document.getElementById('visit-count');
  const scrollBtn = document.getElementById('scrollTopBtn');
  const modal = document.getElementById('playerModal');
  const playerFrame = document.getElementById('playerFrame');
  const trailerBtn = document.getElementById('trailerBtn');

  // Hide loader
  setTimeout(() => loader && (loader.style.display = 'none'), 700);

  // Visits
  let visits = Number(localStorage.getItem('visit-count') || 0) + 1;
  localStorage.setItem('visit-count', visits);
  visitCountEl && (visitCountEl.innerText = visits);

  // Render cards
  function createCard(movie){
    const el = document.createElement('article');
    el.className = 'movie-card';
    el.tabIndex = 0;
    el.setAttribute('role','button');
    el.innerHTML = `
      <img data-src="https://img.youtube.com/vi/${movie.yt}/hqdefault.jpg" alt="${movie.title}">
      <div class="movie-meta">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-sub">${movie.year}</div>
      </div>
    `;
    el.addEventListener('click', () => openPlayer(movie.yt));
    el.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPlayer(movie.yt); } });
    return el;
  }

  movies.forEach(m => gallery.appendChild(createCard(m)));

  // Lazy load images
  const imgs = Array.from(document.querySelectorAll('img[data-src]'));
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const img = e.target; img.src = img.dataset.src; img.removeAttribute('data-src'); o.unobserve(img);
        }
      });
    },{rootMargin:'200px'});
    imgs.forEach(i => obs.observe(i));
  } else { imgs.forEach(i => { i.src = i.dataset.src; }); }

  // Modal player
  function openPlayer(yt){
    modal.setAttribute('aria-hidden','false');
    playerFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1&rel=0" title="Wideo" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.body.style.overflow = 'hidden';
  }
  function closePlayer(){
    modal.setAttribute('aria-hidden','true');
    playerFrame.innerHTML = '';
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', closePlayer));
  document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closePlayer));
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closePlayer(); });

  // Trailer button
  trailerBtn && trailerBtn.addEventListener('click', ()=> openPlayer(trailerBtn.dataset.yt));

  // Scroll to top
  window.addEventListener('scroll', ()=> { scrollBtn.style.display = window.scrollY > 350 ? 'block' : 'none'; });
  scrollBtn && scrollBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Theme toggle
  const toggle = document.getElementById('toggle-theme');
  const theme = localStorage.getItem('theme') || 'dark';
  if(theme === 'dark') document.body.classList.add('dark');
  toggle && toggle.addEventListener('click', ()=>{
    const dark = document.body.classList.toggle('dark');
    toggle.setAttribute('aria-pressed', String(dark));
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });

  // Tabs
  const navBtns = Array.from(document.querySelectorAll('.nav-btn'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));
  navBtns.forEach(btn => btn.addEventListener('click', ()=>{
    navBtns.forEach(b=>{ b.setAttribute('aria-selected','false'); b.classList.remove('active') });
    btn.setAttribute('aria-selected','true'); btn.classList.add('active');
    const target = btn.dataset.tab;
    panels.forEach(p=>{
      if(p.dataset.panel === target){ p.hidden = false; p.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.2,.9,.2,1)'}); }
      else p.hidden = true;
    });
  }));

  // Discover button scroll into gallery
  const discover = document.getElementById('discoverBtn');
  discover && discover.addEventListener('click', ()=>{
    const first = gallery.querySelector('.movie-card');
    first && first.scrollIntoView({behavior:'smooth',block:'center'});
  });

  // Search
  const search = document.getElementById('search');
  search && search.addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.movie-card').forEach(card=>{
      const title = card.querySelector('.movie-title').textContent.toLowerCase();
      card.style.display = title.includes(q) ? '' : 'none';
    });
  });

});
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrapper');
  setTimeout(() => loader.style.display = 'none', 1000);

  const movies = [
    { id: 1, title: "Film 1", yt: "B2qxIb96rvQ" },
    { id: 2, title: "Film 2", yt: "H1Tfu59UHH4" },
    { id: 3, title: "Film 3", yt: "tV05n63jMjA" },
    { id: 4, title: "Film 4", yt: "ycoDUc0kRJo" },
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
