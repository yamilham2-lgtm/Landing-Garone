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

// Before / After interactive slider factory (supports multiple cases and angles)
function createBeforeAfterSlider(ids) {
  const frame = document.getElementById(ids.frame);
  const before = document.getElementById(ids.before);
  const after = document.getElementById(ids.after);
  const handle = document.getElementById(ids.handle);
  const casesEl = document.getElementById(ids.cases);
  const anglesEl = document.getElementById(ids.angles);

  let cases = [];
  let activeCase = 0;
  let activeAngle = 0;

  function setSlider(percent) {
    const clamped = Math.min(100, Math.max(0, percent));
    before.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    handle.style.left = `${clamped}%`;
  }

  function updateFromClientX(clientX) {
    const rect = frame.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSlider(percent);
  }

  function loadAngle() {
    if (!cases.length) return;
    const angle = cases[activeCase].angles[activeAngle];
    before.style.backgroundImage = `url('${angle.src}')`;
    after.style.backgroundImage = `url('${angle.src}')`;
    frame.style.setProperty('--ba-ratio', angle.ratio);
    setSlider(50);
    anglesEl.querySelectorAll('.ba-angle-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === activeAngle);
    });
  }

  function renderAngles() {
    const angles = cases.length ? cases[activeCase].angles : [];
    anglesEl.innerHTML = '';
    anglesEl.style.display = angles.length > 1 ? 'flex' : 'none';
    angles.forEach((angle, i) => {
      const btn = document.createElement('button');
      btn.className = 'ba-angle-btn';
      btn.textContent = angle.label;
      btn.addEventListener('click', () => {
        activeAngle = i;
        loadAngle();
      });
      anglesEl.appendChild(btn);
    });
  }

  function renderCases() {
    casesEl.innerHTML = '';
    cases.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className = 'ba-case-btn';
      btn.textContent = c.label;
      btn.addEventListener('click', () => {
        activeCase = i;
        activeAngle = 0;
        renderAngles();
        loadAngle();
        casesEl.querySelectorAll('.ba-case-btn').forEach((b, j) => {
          b.classList.toggle('active', j === i);
        });
      });
      casesEl.appendChild(btn);
    });
    casesEl.style.display = cases.length > 1 ? 'flex' : 'none';
    if (casesEl.firstElementChild) casesEl.firstElementChild.classList.add('active');
  }

  let dragging = false;
  frame.addEventListener('mousedown', (e) => { dragging = true; updateFromClientX(e.clientX); });
  window.addEventListener('mousemove', (e) => { if (dragging) updateFromClientX(e.clientX); });
  window.addEventListener('mouseup', () => { dragging = false; });

  frame.addEventListener('touchstart', (e) => { dragging = true; updateFromClientX(e.touches[0].clientX); }, { passive: true });
  frame.addEventListener('touchmove', (e) => { if (dragging) updateFromClientX(e.touches[0].clientX); }, { passive: true });
  frame.addEventListener('touchend', () => { dragging = false; });

  return {
    setCases(newCases) {
      cases = newCases;
      activeCase = 0;
      activeAngle = 0;
      renderCases();
      renderAngles();
      loadAngle();
    }
  };
}

// Rinoplastia results gallery
const resultadosGallery = createBeforeAfterSlider({
  frame: 'baFrame', before: 'baBefore', after: 'baAfter', handle: 'baHandle',
  cases: 'baCases', angles: 'baAngles'
});
resultadosGallery.setCases([
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
  },
  {
    label: 'Caso 3',
    angles: [
      { label: 'Frente', src: 'assets/img/before-after/caso3-frente.jpg', ratio: 0.5 },
      { label: '3/4', src: 'assets/img/before-after/caso3-tres-cuartos.jpg', ratio: 0.5 },
      { label: 'Perfil', src: 'assets/img/before-after/caso3-perfil.jpg', ratio: 0.5 }
    ]
  },
  {
    label: 'Caso 4',
    angles: [
      { label: 'Frente', src: 'assets/img/before-after/caso4-frente.jpg', ratio: 0.5 },
      { label: '3/4', src: 'assets/img/before-after/caso4-tres-cuartos.jpg', ratio: 0.5 },
      { label: 'Perfil', src: 'assets/img/before-after/caso4-perfil.jpg', ratio: 0.5 }
    ]
  },
  {
    label: 'Caso 5',
    angles: [
      { label: 'Frente', src: 'assets/img/before-after/caso5-frente.jpg', ratio: 0.75 },
      { label: 'Perfil', src: 'assets/img/before-after/caso5-perfil.jpg', ratio: 0.75 }
    ]
  }
]);

// Otras cirugías: category tabs + gallery
const OTHER_SURGERIES = [
  {
    key: 'parpados',
    label: 'Párpados',
    description: 'Blefaroplastia: rejuvenece la mirada eliminando el exceso de piel y bolsas en párpados superiores e inferiores.',
    cases: [
      {
        label: 'Caso 1',
        angles: [
          { label: 'Frente', src: 'assets/img/before-after/parpados-caso1-frente.jpg', ratio: 2 }
        ]
      }
    ]
  },
  {
    key: 'mamas',
    label: 'Mamas',
    description: 'Aumento, reducción o lifting mamario, adaptado a la anatomía y objetivo de cada paciente.',
    cases: [
      {
        label: 'Caso 1',
        angles: [
          { label: 'Frente', src: 'assets/img/before-after/mamas-caso1-frente.jpg', ratio: 0.5 },
          { label: '3/4', src: 'assets/img/before-after/mamas-caso1-tres-cuartos.jpg', ratio: 0.5 },
          { label: 'Perfil', src: 'assets/img/before-after/mamas-caso1-perfil.jpg', ratio: 0.5 }
        ]
      },
      {
        label: 'Caso 2',
        angles: [
          { label: 'Frente', src: 'assets/img/before-after/mamas-caso2-frente.jpg', ratio: 0.8707 },
          { label: 'Perfil', src: 'assets/img/before-after/mamas-caso2-perfil.jpg', ratio: 0.9653 }
        ]
      }
    ]
  },
  {
    key: 'lipo',
    label: 'Liposucción',
    description: 'Remodelado corporal de alta definición para eliminar grasa localizada y definir contornos.',
    cases: []
  }
];

const ocCategoriesEl = document.getElementById('ocCategories');
const ocDescriptionEl = document.getElementById('ocDescription');
const ocSliderWrap = document.getElementById('ocSliderWrap');
const ocEmptyEl = document.getElementById('ocEmpty');

const otrasCirugiasGallery = createBeforeAfterSlider({
  frame: 'ocFrame', before: 'ocBefore', after: 'ocAfter', handle: 'ocHandle',
  cases: 'ocCases', angles: 'ocAngles'
});

function loadCategory(index) {
  const category = OTHER_SURGERIES[index];
  ocDescriptionEl.textContent = category.description;
  ocCategoriesEl.querySelectorAll('.oc-category-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  const hasCases = category.cases.length > 0;
  ocSliderWrap.style.display = hasCases ? 'block' : 'none';
  ocEmptyEl.classList.toggle('visible', !hasCases);
  if (hasCases) otrasCirugiasGallery.setCases(category.cases);
}

OTHER_SURGERIES.forEach((category, i) => {
  const btn = document.createElement('button');
  btn.className = 'oc-category-btn';
  btn.textContent = category.label;
  btn.addEventListener('click', () => loadCategory(i));
  ocCategoriesEl.appendChild(btn);
});

loadCategory(0);
