// ========== TEMA (CLARO/OSCURO/AUTO) ==========
const themeSelect = document.getElementById('themeSelect');

function applyTheme(mode) {
  document.documentElement.classList.remove('light', 'dark');

  if (mode === 'auto') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(systemDark ? 'dark' : 'light');
  } else {
    document.documentElement.classList.add(mode);
  }
}

function savePreference(value) {
  localStorage.setItem('theme-preference', value);
}

function loadPreference() {
  const saved = localStorage.getItem('theme-preference');
  return saved || 'auto';
}

function watchSystemChanges() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeSelect.value === 'auto') applyTheme('auto');
  });
}

function initTheme() {
  const preference = loadPreference();
  themeSelect.value = preference;
  applyTheme(preference);
  watchSystemChanges();

  themeSelect.addEventListener('change', () => {
    const selected = themeSelect.value;
    savePreference(selected);
    applyTheme(selected);
  });
}

// ========== DROPDOWNS ==========
document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.classList.toggle('active');
      btn.querySelector('.arrow').textContent = content.classList.contains('active') ? '▲' : '▼';
  });
});



// ====== SLIDESHOW ======
const slideIndices = {};

function plusSlides(n, slideshowId) {
  showSlides(slideIndices[slideshowId] += n, slideshowId);
}

function currentSlide(n, slideshowId) {
  showSlides(slideIndices[slideshowId] = n, slideshowId);
}

function showSlides(n, slideshowId) {
  let slides = document.querySelectorAll(`#${slideshowId} .mySlides${slideshowId.slice(-1)}`);
  let dots = document.querySelectorAll(`#${slideshowId} ~ .center .dot`);

  if (!slideIndices[slideshowId]) slideIndices[slideshowId] = 1;
  if (n > slides.length) slideIndices[slideshowId] = 1;
  if (n < 1) slideIndices[slideshowId] = slides.length;

  slides.forEach(s => s.style.display = "none");
  dots.forEach(d => d.classList.remove("active"));

  slides[slideIndices[slideshowId] - 1].style.display = "block";
  if (dots.length >= slideIndices[slideshowId])
    dots[slideIndices[slideshowId] - 1].classList.add("active");
}

// Init both slideshows
document.addEventListener("DOMContentLoaded", () => {
  ['slideshow1', 'slideshow2'].forEach(id => {
    slideIndices[id] = 1;
    showSlides(1, id);
  });
});



// ========== INICIALIZACIÓN GLOBAL ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
