// script.js — simple gallery: drag-to-reorder + lightbox + year
document.getElementById('year').textContent = new Date().getFullYear();

const gallery = document.getElementById('gallery');

// -------------------- Drag & drop reordering (simple) --------------------
let dragEl = null;

function onDragStart(e){
  dragEl = this;
  this.classList.add('dragging');
  // set effect
  e.dataTransfer.effectAllowed = 'move';
  try { e.dataTransfer.setData('text/plain', ''); } catch(e){}
}
function onDragEnd(e){
  if(dragEl) dragEl.classList.remove('dragging');
  dragEl = null;
}
function onDragOver(e){
  e.preventDefault();
  const target = e.target.closest('.thumb');
  if(!target || target === dragEl) return;
  const rect = target.getBoundingClientRect();
  const next = (e.clientY - rect.top) > rect.height / 2;
  gallery.insertBefore(dragEl, next ? target.nextSibling : target);
}

gallery.querySelectorAll('.thumb').forEach(t => {
  t.addEventListener('dragstart', onDragStart);
  t.addEventListener('dragend', onDragEnd);
});
gallery.addEventListener('dragover', onDragOver);

// -------------------- Lightbox --------------------
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const closeBtn = document.querySelector('.lb-close');

function openLightbox(src){
  lbImg.src = src;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lb.classList.remove('open');
  lbImg.src = '';
  lb.setAttribute('aria-hidden','true');
}

closeBtn.addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => { if(e.target === lb) closeLightbox(); });

document.querySelectorAll('.thumb img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src));
});

// Esc to close
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });
