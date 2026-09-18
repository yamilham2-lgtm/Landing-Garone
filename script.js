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

// Before / After interactive slider
const baFrame = document.getElementById('baFrame');
const baBefore = document.getElementById('baBefore');
const baHandle = document.getElementById('baHandle');

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

let dragging = false;
baFrame.addEventListener('mousedown', (e) => { dragging = true; updateFromClientX(e.clientX); });
window.addEventListener('mousemove', (e) => { if (dragging) updateFromClientX(e.clientX); });
window.addEventListener('mouseup', () => { dragging = false; });

baFrame.addEventListener('touchstart', (e) => { dragging = true; updateFromClientX(e.touches[0].clientX); }, { passive: true });
baFrame.addEventListener('touchmove', (e) => { if (dragging) updateFromClientX(e.touches[0].clientX); }, { passive: true });
baFrame.addEventListener('touchend', () => { dragging = false; });

setSlider(50);
