function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

window.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});
