// ========== TEMA (CLARO/OSCURO/AUTO) ==========
const themeSelect = document.getElementById('themeSelect');

function applyTheme(mode) {
  document.documentElement.classList.remove('light', 'dark');

  const themeImage = document.getElementById('themeImage'); // e.g., img1
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');

  const isDark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.add(isDark ? 'dark' : 'light');

  // Swap images based on theme
  if (themeImage) themeImage.src = isDark ? 'dark1.png' : 'light1.png';
  if (img2)       img2.src       = isDark ? 'dark2.png' : 'light2.png';
  if (img3)       img3.src       = isDark ? 'dark3.png' : 'light3.png';
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

function initDropdownMenu() {
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const menuIcon = dropdown.querySelector('.menu-icon');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    console.log("menuIcon:", menuIcon, "dropdownContent:", dropdownContent);

    if (!menuIcon || !dropdownContent) return;

    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownContent.classList.toggle("show");
      menuIcon.textContent = dropdownContent.classList.contains("show") ? "×" : "☰";
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdownContent.classList.remove("show");
        menuIcon.textContent = "☰";
      }
    });
  });
}



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


// ========== INICIALIZACIÓN GLOBAL ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDropdownMenu();
    ['slideshow1', 'slideshow2'].forEach(id => {
    slideIndices[id] = 1;
    showSlides(1, id);
  });
});
