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
