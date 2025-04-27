function openVideo(id) {
  document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  document.getElementById('player-container').style.display = 'flex';
}

function closeVideo() {
  document.getElementById('videoFrame').src = '';
  document.getElementById('player-container').style.display = 'none';
}
