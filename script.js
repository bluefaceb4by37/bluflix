function openVideo(videoUrl) {
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('videoPlayer');
  player.src = videoUrl + "?autoplay=1";
  modal.style.display = "block";
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('videoPlayer');
  player.src = "";
  modal.style.display = "none";
}

function hidePreloader() {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 2000); // ukrywa preloader po 2 sekundach
}
