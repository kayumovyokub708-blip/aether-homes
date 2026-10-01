document.addEventListener('DOMContentLoaded', () => {
  // Header scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // Render houses
  const houses = getHouses();
  renderProjects(houses.filter(h => h.type === 'project').slice(0, 3));
  renderCatalog(houses.filter(h => h.type === 'project'));
  renderPortfolio(houses.filter(h => h.type === 'built'));

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const projects = houses.filter(h => h.type === 'project');
      const filtered = filter === 'all' ? projects : projects.filter(h => h.category === filter);
      renderCatalog(filtered);
    });
  });

  // Calculator
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculateCost);
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Паёми шумо фиристода шуд! Мо ба зудӣ бо шумо тамос мегирем.');
      contactForm.reset();
    });
  }

  // Modal
  const modal = document.getElementById('houseModal');
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

function renderProjects(list) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = list.map(h => houseCardHTML(h)).join('');
  bindCardClicks(grid);
}

function renderCatalog(list) {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  grid.innerHTML = list.map(h => houseCardHTML(h)).join('');
  bindCardClicks(grid);
}

function renderPortfolio(list) {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  grid.innerHTML = list.map(h => houseCardHTML(h, true)).join('');
  bindCardClicks(grid);
}

function houseCardHTML(h, isBuilt = false) {
  return `
    <article class="house-card" data-id="${h.id}">
      <div class="house-card-image">
        <img src="${h.image}" alt="${h.title}" loading="lazy">
        <span class="house-card-badge">${h.status}</span>
      </div>
      <div class="house-card-body">
        <h3 class="house-card-title">${h.title}</h3>
        <div class="house-card-meta">
          <span>📐 ${h.area} м²</span>
          <span>🛏️ ${h.rooms} ҳуҷра</span>
          <span>🏠 ${h.floors} ошёна</span>
        </div>
        <div class="house-card-price">${formatPriceSimple(h.price)}</div>
      </div>
    </article>
  `;
}

function bindCardClicks(container) {
  container.querySelectorAll('.house-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openHouseModal(id);
    });
  });
}

function openHouseModal(id) {
  const houses = getHouses();
  const h = houses.find(x => x.id === id);
  if (!h) return;
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-image">
      <img src="${h.image}" alt="${h.title}">
    </div>
    <div class="modal-info">
      <h2 class="modal-title">${h.title}</h2>
      <div class="modal-meta">
        <span>📐 ${h.area} м²</span>
        <span>🛏️ ${h.rooms} ҳуҷра</span>
        <span>🏠 ${h.floors} ошёна</span>
        <span>${h.status}</span>
      </div>
      <div class="modal-price">${formatPriceSimple(h.price)}</div>
      <p class="modal-desc">${h.description}</p>
      <ul class="modal-features">
        ${h.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn btn-primary" onclick="closeModal()">Дархост фиристодан</a>
    </div>
  `;
  document.getElementById('houseModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('houseModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function calculateCost() {
  const area = parseFloat(document.getElementById('calcArea').value) || 100;
  const type = document.getElementById('calcType').value;
  const floors = parseInt(document.getElementById('calcFloors').value) || 1;
  const finish = document.getElementById('calcFinish').value;

  const baseRates = { standard: 450, premium: 650, luxury: 950 };
  const finishMult = { rough: 0.7, semi: 0.9, full: 1.15 };
  const floorMult = floors === 1 ? 1 : floors === 2 ? 1.15 : 1.3;

  const total = Math.round(area * baseRates[type] * finishMult[finish] * floorMult);
  document.getElementById('calcPrice').textContent = formatPriceSimple(total);
}

// Expose for inline onclick
window.closeModal = closeModal;
