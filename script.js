// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navCta.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navCta.classList.remove('open');
  });
});

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Before / After interactive slider with multiple cases and angles
const CASES = [
  {
    label: 'Caso 1',
    angles: [
      { label: 'Frente', src: 'assets/img/before-after/caso1-frente.jpg', ratio: 0.7565 },
      { label: '3/4', src: 'assets/img/before-after/caso1-tres-cuartos.jpg', ratio: 0.7565 },
      { label: 'Perfil', src: 'assets/img/before-after/caso1-perfil.jpg', ratio: 0.7565 }
    ]
  },
  {
    label: 'Caso 2',
    angles: [
      { label: 'Frente', src: 'assets/img/before-after/caso2-frente.jpg', ratio: 0.5 },
      { label: '3/4', src: 'assets/img/before-after/caso2-tres-cuartos.jpg', ratio: 0.5 },
      { label: 'Perfil', src: 'assets/img/before-after/caso2-perfil.jpg', ratio: 0.5 }
    ]
  }
];

const baFrame = document.getElementById('baFrame');
const baBefore = document.getElementById('baBefore');
const baAfter = document.getElementById('baAfter');
const baHandle = document.getElementById('baHandle');
const baCasesEl = document.getElementById('baCases');
const baAnglesEl = document.getElementById('baAngles');

let activeCase = 0;
let activeAngle = 0;

function setSlider(percent) {
  const clamped = Math.min(100, Math.max(0, percent));
  baBefore.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
  baHandle.style.left = `${clamped}%`;
}

function updateFromClientX(clientX) {
  const rect = baFrame.getBoundingClientRect();
  const percent = ((clientX - rect.left) / rect.width) * 100;
  setSlider(percent);
}

function loadAngle() {
  const angle = CASES[activeCase].angles[activeAngle];
  baBefore.style.backgroundImage = `url('${angle.src}')`;
  baAfter.style.backgroundImage = `url('${angle.src}')`;
  baFrame.style.setProperty('--ba-ratio', angle.ratio);
  setSlider(50);
  baAnglesEl.querySelectorAll('.ba-angle-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === activeAngle);
  });
}

function renderAngles() {
  const angles = CASES[activeCase].angles;
  baAnglesEl.innerHTML = '';
  baAnglesEl.style.display = angles.length > 1 ? 'flex' : 'none';
  angles.forEach((angle, i) => {
    const btn = document.createElement('button');
    btn.className = 'ba-angle-btn';
    btn.textContent = angle.label;
    btn.addEventListener('click', () => {
      activeAngle = i;
      loadAngle();
    });
    baAnglesEl.appendChild(btn);
  });
}

function renderCases() {
  baCasesEl.innerHTML = '';
  CASES.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'ba-case-btn';
    btn.textContent = c.label;
    btn.addEventListener('click', () => {
      activeCase = i;
      activeAngle = 0;
      renderAngles();
      loadAngle();
      baCasesEl.querySelectorAll('.ba-case-btn').forEach((b, j) => {
        b.classList.toggle('active', j === i);
      });
    });
    baCasesEl.appendChild(btn);
  });
  baCasesEl.style.display = CASES.length > 1 ? 'flex' : 'none';
}

renderCases();
renderAngles();
loadAngle();
if (baCasesEl.firstElementChild) baCasesEl.firstElementChild.classList.add('active');

let dragging = false;
baFrame.addEventListener('mousedown', (e) => { dragging = true; updateFromClientX(e.clientX); });
window.addEventListener('mousemove', (e) => { if (dragging) updateFromClientX(e.clientX); });
window.addEventListener('mouseup', () => { dragging = false; });

baFrame.addEventListener('touchstart', (e) => { dragging = true; updateFromClientX(e.touches[0].clientX); }, { passive: true });
baFrame.addEventListener('touchmove', (e) => { if (dragging) updateFromClientX(e.touches[0].clientX); }, { passive: true });
baFrame.addEventListener('touchend', () => { dragging = false; });
